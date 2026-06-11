import { orders } from "@/data/TempDB";
import { Account_ } from "@/types/Account";
import { Order_ } from "@/types/Order";

export async function createAccount(authId: number, email: string, firstName: string, lastName?: string): Promise<Account_> {
    const newAccount = new Account_(authId, email, firstName, lastName);
    console.log(`Account created for ${authId} with email ${email} and name ${firstName} ${lastName}.`);
    return newAccount;
}

export async function purchaseCourse(account: Account_, courseId: number) {
    const alreadyPurchased = await hasPurchasedCourse(account, courseId);
    if (alreadyPurchased) {
        throw new Error("You have already purchased this course.");
    }

    const newOrderId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
    const newOrder = new Order_(newOrderId, [courseId], account.authId, new Date(), 0);
    orders.push(newOrder);
    // account.purchasedCourseIds.push(courseId);
    console.log(`Course with ID ${courseId} has been purchased by ${account.authId}.`);
}

async function hasPurchasedCourse(account: Account_, courseId: number): Promise<boolean> {
    const orders = await getOrders(account);
    return orders.some(order => order.courseIds.includes(courseId));
}


export async function getOrderIds(account: Account_): Promise<number[]> {
    return [];
}
export async function getOrders(account: Account_): Promise<Order_[]> {
    const orderIds = await getOrderIds(account);
    return orders.filter(order => orderIds.includes(order.id));
}
export async function getPurchasedCoursesIds(account: Account_): Promise<number[]> {
    const orders = await getOrders(account);
    return orders.flatMap(order => order.courseIds);
}
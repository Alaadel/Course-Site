import { accounts } from "@/data/TempDB";
import { Account } from "@/types/Account";

export function registerAccount(email: string, password: string, name: string): Account {
    if (doesAccountExist(email)) {
        throw new Error("An account with this email already exists.");
    }

    const newAccount = new Account(email, password, name);
    accounts.push(newAccount);
    return newAccount;
}

function doesAccountExist(email: string): boolean {
    return accounts.some(account => account.email === email);
}

export function purchaseCourse(account: Account, courseId: number) {
    if (account.purchasedCourseIds.includes(courseId)) {
        throw new Error("You have already purchased this course.");
    }
    account.purchasedCourseIds.push(courseId);
    console.log(`Course with ID ${courseId} has been purchased by ${account.email}.`);
}

function hasPurchasedCourse(account: Account, courseId: number): boolean {
    return account.purchasedCourseIds.includes(courseId);
}

export function getPurchasedCourseIds(account: Account): number[] {
    return account.purchasedCourseIds;
}
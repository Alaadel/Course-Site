import { supabase } from "@/lib/supabase-client";

import type { EnrollmentOrder, EnrollmentRow } from "@/lib/dbTypes";

export async function purchaseCourse(accountId: string, courseId: number): Promise<void> {
    const { data, error } = await supabase
        .from('enrollment')
        .insert({ account_id: accountId, course_id: courseId });

    if (error) {
        throw new Error(`Error purchasing course: ${error.message}`);
    }

    console.log(`Course with ID ${courseId} has been purchased by account ${accountId}.`);
}

export async function getEnrolledCourses(accountId: string): Promise<number[]> {
    const { data, error } = await supabase
        .from('enrollment')
        .select('course_id')
        .eq('account_id', accountId);

    if (error) {
        throw new Error(`Error fetching enrolled courses: ${error.message}`);
    }

    return data.map((enrollment) => enrollment.course_id);
}

export async function getOrders(accountId: string): Promise<EnrollmentOrder[]> {
    const { data, error } = await supabase
        .from('enrollment')
        .select('*')
        .eq('account_id', accountId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching orders: ${error.message}`);
    }

    return data as EnrollmentOrder[];
}

export async function isEnrolled(accountId: string, courseId: number): Promise<boolean> {
    const { data, error } = await supabase
        .from('enrollment')
        .select('id')
        .eq('account_id', accountId)
        .eq('course_id', courseId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // No rows found
            return false;
        }
        throw new Error(`Error checking enrollment: ${error.message}`);
    }

    return true;
}

export async function getNumberOfEnrolledCoursesInAccount(accountId: string): Promise<number> {
    const { data, error } = await supabase
        .from('enrollment')
        .select('course_id', { count: 'exact' })
        .eq('account_id', accountId);

    if (error) {
        throw new Error(`Error fetching enrolled courses: ${error.message}`);
    }

    return data.length;
}

export async function getEnrolledAccountsInCourse(courseId: number): Promise<string[]> {
    const { data, error } = await supabase
        .from('enrollment')
        .select('account_id')
        .eq('course_id', courseId);

    if (error) {
        throw new Error(`Error fetching enrolled accounts: ${error.message}`);
    }

    return data.map((enrollment) => enrollment.account_id);
}

export async function getEnrollmentCountInWindow(year: number, month: number): Promise<number> {
    const from = new Date(year, month - 1, 1).toISOString();
    const to = new Date(year, month, 0, 23, 59, 59).toISOString();

    const { data, error } = await supabase
        .from('enrollment')
        .select('id', { count: 'exact' })
        .gte('created_at', from)
        .lte('created_at', to);

    if (error) {
        throw new Error(`Error fetching enrollment count: ${error.message}`);
    }

    return data.length;
}

export async function getEnrollmentRevenueInWindow(year: number, month: number): Promise<number> {
    const from = new Date(year, month - 1, 1).toISOString();
    const to = new Date(year, month, 0, 23, 59, 59).toISOString();

    const { data, error } = await supabase
        .from('enrollment')
        .select('course ( price )')
        .gte('created_at', from)
        .lte('created_at', to);

    const total = (data ?? []).reduce((sum, row) => sum + (row.course?.price ?? 0), 0);

    if (error) {
        throw new Error(`Error fetching enrollment revenue: ${error.message}`);
    }

    return total;
}

export async function getEnrollmentRevenuePerAccount(year: number, month: number): Promise<{ account_id: string; revenue: number }[]> {
    const from = new Date(year, month - 1, 1).toISOString();
    const to = new Date(year, month, 0, 23, 59, 59).toISOString();

    const { data, error } = await supabase
        .from('enrollment')
        .select('account_id, course ( price )') // can aggregate directly using price.sum(), but have to enable it because it has security and performance implications
        .gte('created_at', from)
        .lte('created_at', to);

    if (error) {
        throw new Error(`Error fetching enrollment revenue per account: ${error.message}`);
    }

    const revenueMap: Record<string, number> = {};
    (data ?? []).forEach(row => {
        const accountId = row.account_id;
        const price = row.course?.price ?? 0;
        revenueMap[accountId] = (revenueMap[accountId] || 0) + price;
    });

    return Object.entries(revenueMap).map(([account_id, revenue]) => ({ account_id, revenue }));
}

export async function getEnrollmentCountForCourseInWindow(courseId: number, year: number, month: number): Promise<number> {
    const from = new Date(year, month - 1, 1).toISOString();
    const to = new Date(year, month, 0, 23, 59, 59).toISOString();

    const { data, error } = await supabase
        .from('enrollment')
        .select('id', { count: 'exact' })
        .eq('course_id', courseId)
        .gte('created_at', from)
        .lte('created_at', to);

    if (error) {
        throw new Error(`Error fetching enrollment count for course: ${error.message}`);
    }

    return data.length;
}
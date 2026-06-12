import { supabase } from "@/lib/supabase-client";


export type EnrollmentSchema = {
    account_id: number
    course_id: number
    created_at: string
}


export async function purchaseCourse(accountId: number, courseId: number): Promise<void> {
    const { data, error } = await supabase
        .from('enrollments')
        .insert({ account_id: accountId, course_id: courseId });

    if (error) {
        throw new Error(`Error purchasing course: ${error.message}`);
    }

    console.log(`Course with ID ${courseId} has been purchased by account ${accountId}.`);
}

export async function getEnrolledCourses(accountId: number): Promise<number[]> {
    const { data, error } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('account_id', accountId);

    if (error) {
        throw new Error(`Error fetching enrolled courses: ${error.message}`);
    }

    return data.map((enrollment) => enrollment.course_id);
}

export async function isEnrolled(accountId: number, courseId: number): Promise<boolean> {
    const { data, error } = await supabase
        .from('enrollments')
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

export async function getNumberOfEnrolledCoursesInAccount(accountId: number): Promise<number> {
    const { data, error } = await supabase
        .from('enrollments')
        .select('course_id', { count: 'exact' })
        .eq('account_id', accountId);

    if (error) {
        throw new Error(`Error fetching enrolled courses: ${error.message}`);
    }

    return data.length;
}

export async function getEnrolledAccountsInCourse(courseId: number): Promise<number[]> {
    const { data, error } = await supabase
        .from('enrollments')
        .select('account_id')
        .eq('course_id', courseId);

    if (error) {
        throw new Error(`Error fetching enrolled accounts: ${error.message}`);
    }

    return data.map((enrollment) => enrollment.account_id);
}
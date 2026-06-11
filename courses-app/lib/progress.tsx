import { supabase } from "@/lib/supabase-client";

export async function updateProgress(accountId: number, courseId: number, progress: any): Promise<void> {
    const { data, error } = await supabase
        .from('enrollments')
        .update({ progress: JSON.stringify(progress) })
        .eq('account_id', accountId)
        .eq('course_id', courseId);

    if (error) {
        throw new Error(`Error updating progress: ${error.message}`);
    }

    console.log(`Progress for course ${courseId} has been updated for account ${accountId}.`);
}

export async function getProgress(accountId: number, courseId: number): Promise<any> {
    const { data, error } = await supabase
        .from('enrollments')
        .select('progress')
        .eq('account_id', accountId)
        .eq('course_id', courseId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // No rows found
            return null;
        }
        throw new Error(`Error fetching progress: ${error.message}`);
    }

    return data.progress ? JSON.parse(data.progress) : null;
}
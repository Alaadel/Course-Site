import { supabase } from "@/lib/supabase-client";

import type { InstructorRow } from "@/lib/dbTypes";
import { sanitizeInput } from "../sanitize";

export type InstructorDataType = {
    name: string;
    id: number;
}
export async function createInstructor(name: string): Promise<InstructorDataType> {
    [name] = sanitizeInput(name);

    const { data, error } = await supabase
        .from('instructor')
        .insert({ name })
        .select()
        .single();

    if (error) {
        throw new Error(`Error creating instructor: ${error.message}`);
    }

    return data as InstructorDataType;
}

export async function getAvailableInstructors(): Promise<InstructorRow[]> {
    const { data, error } = await supabase
        .from('instructor')
        .select('*');

    if (error) {
        throw new Error(`Error fetching instructors: ${error.message}`);
    }

    return data as InstructorRow[];
}

export async function deleteInstructorIfUnused(instructorId: number): Promise<void> {
    const { data, error } = await supabase
        .from('course')
        .select('id')
        .eq('instructor_id', instructorId);

    if (error) {
        throw new Error(`Error deleting instructor: ${error.message}`);
    }
    if (data && data.length > 0) {
        throw new Error(`Cannot delete instructor with id ${instructorId} because it is used in courses.`);
    }

    const { error: deleteError } = await supabase
        .from('instructor')
        .delete()
        .eq('id', instructorId);

    if (deleteError) {
        throw new Error(`Error deleting instructor: ${deleteError.message}`);
    }

    console.log(`Instructor with id ${instructorId} deleted successfully.`);
}
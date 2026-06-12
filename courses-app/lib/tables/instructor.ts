import { supabase } from "@/lib/supabase-client";

import type { InstructorRow } from "@/lib/dbTypes";

export async function createInstructor(name: string): Promise<void> {
    const { data, error } = await supabase
        .from('instructor')
        .insert({ name });
        
    if (error) {
        throw new Error(`Error creating instructor: ${error.message}`);
    }

    console.log(`Instructor created: ${name}`);
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
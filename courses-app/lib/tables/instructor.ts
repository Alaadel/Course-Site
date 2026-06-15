import { supabase } from "@/lib/supabase-client";

import type { InstructorRow } from "@/lib/dbTypes";
import { sanitizeInput } from "../sanitize";

export async function createInstructor(name: string): Promise<void> {
    [name] = sanitizeInput(name);
    
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
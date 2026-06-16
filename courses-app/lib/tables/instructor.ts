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
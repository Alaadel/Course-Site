import { supabase } from "@/lib/supabase-client";

export type InstructorSchema = {
    id: number;
    name: string;
}

export async function createInstructor(name: string): Promise<void> {
    const { data, error } = await supabase
        .from('instructors')
        .insert({ name });
        
    if (error) {
        throw new Error(`Error creating instructor: ${error.message}`);
    }

    console.log(`Instructor created: ${name}`);
}

export async function getAvailableInstructors(): Promise<InstructorSchema[]> {
    const { data, error } = await supabase
        .from('instructors')
        .select('*');
    
        if (error) {
        throw new Error(`Error fetching instructors: ${error.message}`);
    }

    return data as InstructorSchema[];
}
import { supabase } from "@/lib/supabase-client";

import { TagRow } from "@/lib/dbTypes";
import { sanitizeInput } from "../sanitize";

export async function getAllTags(): Promise<TagRow[]> {
    console.log("getAllTags ...");

    const { data, error } = await supabase
        .from('tag')
        .select('*');

    if (error) {
        throw new Error(`Error fetching tags: ${error.message}`);
    }

    return data;
}

export async function createTag(name: string): Promise<TagRow> {
    console.log("createTag ...", name);

    [name] = sanitizeInput(name);

    const { data, error } = await supabase
        .from('tag')
        .insert({ name })
        .select()
        .single();

    if (error) {
        throw new Error(`Error creating tag: ${error.message}`);
    }

    return data;
}


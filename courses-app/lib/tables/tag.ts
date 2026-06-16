import { supabase } from "@/lib/supabase-client";

import { TagRow } from "@/lib/dbTypes";

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
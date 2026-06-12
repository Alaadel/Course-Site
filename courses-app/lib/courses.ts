import { supabase } from "./supabase-client";

export type CourseSchema = {
    id: number;
    created_at: string;
    instructor_id: number;

    title: string;
    description: string;
    price: number;
    thumbnail_url: string;
    active: boolean;

    tags: string[];
}

export type SectionSchema = {
    id: number;
    course_id: number;
    name: string;
    position: number;
}

export type LessonSchema = {
    id: number;
    section_id: number;
    name: string;
    position: number;
    content: string;
}

export async function getAllCourses(): Promise<CourseSchema[]> {
    const { data, error } = await supabase
        .from('course')
        .select('*');

    if (error) {
        console.error("Error fetching courses:", error);
        throw new Error("Failed to fetch courses");
    }

    /*since .select('*') returns all columns, the shape will match CourseSchema as long as the actual course table columns align exactly with the type definition.
    
    If the table has extra columns, they'll be included but TypeScript will ignore them.
    
    If it's missing any column defined in CourseSchema, the result will be undefined values at runtime with no compile-time warning.*/
    
    return data;
}
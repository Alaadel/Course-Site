import { supabase } from "../supabase-client";

import type { CourseRow } from "../dbTypes";

export async function getAllCourses(): Promise<CourseRow[]> {
    const { data, error } = await supabase
        .from('course')
        .select('*');

    if (error) {
        console.error("Error fetching courses:", error);
        throw new Error("Failed to fetch courses");
    }

    return data;
}

export async function getNewestCourses(limit: number): Promise<CourseRow[]> {
    const { data, error } = await supabase
        .from('course')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching newest courses:", error);
        throw new Error("Failed to fetch newest courses");
    }

    return data as CourseRow[];
}

export async function getPopularCourses(limit: number): Promise<CourseRow[]> {
    const { data, error } = await supabase
        .from('course')
        .select('*, enrollment_count:enrollment(course_id)')
        .order('enrollment_count', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching popular courses:", error);
        throw new Error("Failed to fetch popular courses");
    }

    return data as CourseRow[];
}

export async function getLessonContent(lessonId: number): Promise<string> {
    const { data, error } = await supabase
        .from('lesson')
        .select('content')
        .eq('id', lessonId)
        .single();

    if (error) {
        console.error("Error fetching lesson content:", error);
        throw new Error("Failed to fetch lesson content");
    }

    return data.content;
}
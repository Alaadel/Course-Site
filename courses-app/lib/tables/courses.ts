import { supabase } from "../supabase-client";

import type { CourseRow } from "../dbTypes";
import { sanitizeInput } from "../sanitize";

import type { AdminCourseCardData } from "@/components/courses/cards/AdminCourseCard";

export async function createCourse(courseData: Omit<CourseRow, 'id' | 'created_at'>): Promise<CourseRow> {
    const { data, error } = await supabase
        .from('course')
        .insert(courseData)
        .select()
        .single();

    if (error) {
        console.error("Error creating course:", error);
        throw new Error("Failed to create course");
    }

    return data as CourseRow;
}

export async function getCourseById(courseId: number): Promise<CourseRow> {
    const { data, error } = await supabase
        .from('course')
        .select('*')
        .eq('id', courseId)
        .single();

    if (error) {
        console.error("Error fetching course:", error);
        throw new Error("Failed to fetch course");
    }

    return data as CourseRow;
}

export async function getAllCourses(): Promise<CourseRow[]> {
    const { data, error } = await supabase
        .from('course')
        .select('*');

    if (error) {
        console.error("Error fetching courses:", error);
        throw new Error("Failed to fetch courses");
    }

    return data as CourseRow[];
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

export async function getSearchCourses(searchTerm: string, tags: string[], priceFrom?: number, priceTo?: number): Promise<CourseRow[]> {
    [searchTerm, ...tags] = sanitizeInput(searchTerm, ...tags);

    let query = supabase
        .from('course')
        .select('*')
        .ilike('title', `%${searchTerm}%`);

    if (tags.length > 0) {
        query = query.overlaps('tags', tags);
    }

    if (priceFrom !== undefined) {
        query = query.gte('price', priceFrom);
    }

    if (priceTo !== undefined) {
        query = query.lte('price', priceTo);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error searching courses:", error);
        throw new Error("Failed to search courses");
    }

    return data as CourseRow[];
}

export async function getCourseAdminData(courseId: number): Promise<AdminCourseCardData> {
    console.log("Fetching admin data for course ID:", courseId);

    const { data, error } = await supabase
        .from('course')
        .select(`id, active,
            total_lessons:lesson(id),
            total_orders:enrollment(course_id)`)
        .eq('id', courseId)
        .single();

    if (error) {
        console.error("Error fetching course admin data:", error);
        throw new Error("Failed to fetch course admin data");
    }

    return {
        totalLessons: data.total_lessons.length,
        isActive: data.active,
        totalOrders: data.total_orders.length
    } as AdminCourseCardData;
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

    return data.content as string;
}
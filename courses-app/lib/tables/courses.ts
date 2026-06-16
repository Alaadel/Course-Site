import { supabase } from "../supabase-client";

import type { CourseRow, OrderCourseCardData, ViewerCourseCardData } from "../dbTypes";
import { sanitizeInput } from "../sanitize";

import type { AdminCourseCardData } from "../dbTypes";
import { getCourseIndexAndProgress } from "./progress";

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


export async function getCourseViewerData(courseId: number, userId: string): Promise<ViewerCourseCardData> {
    console.log("Fetching viewer data for course ID:", courseId, "and user ID:", userId);

    [userId] = sanitizeInput(userId);

    const { data, error } = await supabase
        .from('enrollment')
        .select('course_id')
        .eq('course_id', courseId)
        .eq('account_id', userId)
        .single();

    if (error && error.code !== 'PGRST116') { // Ignore "No rows found" error
        console.error("Error fetching course viewer data:", error);
        throw new Error("Failed to fetch course viewer data");
    }

    return {
        isOwned: !!data
    } as ViewerCourseCardData;
}

export async function getCourseOrderData(courseId: number, userId: string): Promise<OrderCourseCardData> {
    console.log("Fetching order data for course ID:", courseId, "and user ID:", userId);

    [userId] = sanitizeInput(userId);

    const { data, error } = await supabase
        .from('enrollment')
        .select('created_at, course:course_id(price)')
        .eq('course_id', courseId)
        .eq('account_id', userId)
        .single();

    if (error) {
        console.error("Error fetching course order data:", error);
        throw new Error("Failed to fetch course order data");
    }

    return {
        purchasedAt: data.created_at,
        price: data.course.price
    } as OrderCourseCardData;
}

export async function getCourseProgressData(courseId: number, userId: string): Promise<{ lessonsFinished: number; totalLessons: number }> {
    console.log("Fetching progress data for course ID:", courseId, "and user ID:", userId);

    const response = await getCourseIndexAndProgress(userId, courseId);

    if (!response) {
        console.error("Error fetching course progress data: No response from getCourseIndexAndProgress");
        throw new Error("Failed to fetch course progress data");
    }

    return {
        lessonsFinished: response.lesson_completed_count,
        totalLessons: response.lesson_count,
    };
}

export async function getCourseAdminData(courseId: number): Promise<AdminCourseCardData> {
    console.log("Fetching admin data for course ID:", courseId);

    const { data, error } = await supabase
        .from('course')
        .select(`
            id,
            active,
            total_orders:enrollment(course_id),
            section(
                id,
                lesson(id)
            )
        `)
        .eq('id', courseId)
        .single();

    if (error) {
        console.error("Error fetching course admin data:", error);
        throw new Error("Failed to fetch course admin data");
    }

    const totalLessons = data.section.reduce((acc: number, s: { lesson: { id: number }[] }) => acc + s.lesson.length, 0);

    return {
        totalLessons,
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
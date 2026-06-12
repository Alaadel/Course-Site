import { supabase } from "@/lib/supabase-client";

// course table contain course data, section table contains section data, lesson table contains lesson data
// progress table contains account_id, lesson_id, complete 

export class CourseProgress_ {
    courseId: number;
    section_progress: Map<number, SectionProgress_>;

    constructor(courseId: number) {
        this.courseId = courseId;
        this.section_progress = new Map<number, SectionProgress_>();
    }
}
export class SectionProgress_ {
    lesson_progress: Map<number, LessonProgress_>;

    constructor() {
        this.lesson_progress = new Map<number, LessonProgress_>();
    }
}
export type LessonProgress_ = {
    complete: boolean;
}

// getCourseProgress: joins course, section, lesson and progress tables to get the progress of all lessons in a course for an account
export async function getCourseProgress(accountId: number, courseId: number): Promise<CourseProgress_> {
    const { data, error } = await supabase
        .from('course')
        .select(`
        id,
        section (
            id,
            lesson (
                id,
                complete
            )
        )
    `);

    if (error) {
        console.error("Error fetching course progress:", error);
        throw new Error("Failed to fetch course progress");
    }

    const courseProgress = new CourseProgress_(courseId);

    data.forEach((course) => {
        course.section.forEach((section) => {
            const sectionProgress = new SectionProgress_();
            section.lesson.forEach((lesson) => {
                sectionProgress.lesson_progress.set(lesson.id, { complete: lesson.complete });
            });
            courseProgress.section_progress.set(section.id, sectionProgress);
        });
    });

    return courseProgress;
}


// markLessonAsStarted: creates a new entry in the progress table for the account and lesson, with complete set to false
export async function markLessonAsStarted(accountId: number, lessonId: number): Promise<void> {
    const { error } = await supabase
        .from('progress')
        .insert({ account_id: accountId, lesson_id: lessonId, complete: false });

    if (error) {
        console.error("Error marking lesson as started:", error);
        throw new Error("Failed to mark lesson as started");
    }
}

// markLessonAsFinished: updates the progress table to mark the lesson as finished for the account
export async function markLessonAsFinished(accountId: number, lessonId: number): Promise<void> {
    const { error } = await supabase
        .from('progress')
        .update({ complete: true })
        .eq('account_id', accountId)
        .eq('lesson_id', lessonId);

    if (error) {
        console.error("Error marking lesson as finished:", error);
        throw new Error("Failed to mark lesson as finished");
    }
}
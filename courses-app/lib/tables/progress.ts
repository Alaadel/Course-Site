import { supabase } from "@/lib/supabase-client";

// course table contain course data, section table contains section data, lesson table contains lesson data
// progress table contains account_id, lesson_id, complete 

export class CourseProgress_ {
    courseId: number;
    section_progress: Map<number, SectionProgress_>;

    section_count: number;
    section_completed_count: number;

    lesson_count: number;
    lesson_completed_count: number;

    constructor(courseId: number) {
        this.courseId = courseId;
        this.section_progress = new Map<number, SectionProgress_>();

        this.section_count = 0;
        this.section_completed_count = 0;
        this.lesson_count = 0;
        this.lesson_completed_count = 0;
    }

    calculateProgress() {
        this.section_count = this.section_progress.size;
        this.section_completed_count = Array.from(this.section_progress.values()).filter(s => s.lesson_completed_count === s.lesson_count && s.lesson_count > 0).length;

        this.lesson_count = Array.from(this.section_progress.values()).reduce((acc, s) => acc + s.lesson_count, 0);
        this.lesson_completed_count = Array.from(this.section_progress.values()).reduce((acc, s) => acc + s.lesson_completed_count, 0);
    }
}

export class SectionProgress_ {
    lesson_progress: Map<number, LessonProgress_>;

    lesson_count: number;
    lesson_completed_count: number;

    constructor() {
        this.lesson_progress = new Map<number, LessonProgress_>();
        this.lesson_count = 0;
        this.lesson_completed_count = 0;
    }

    calculateProgress() {
        this.lesson_count = this.lesson_progress.size;
        this.lesson_completed_count = Array.from(this.lesson_progress.values()).filter(p => p.complete).length;
    }
}
export type LessonProgress_ = {
    complete: boolean;
}

// getCourseProgress: joins course, section, lesson and progress tables to get the progress of all lessons in a course for an account
export async function getCourseIndexAndProgress(accountId: string, courseId: number): Promise<CourseProgress_> {
    const { data, error } = await supabase
        .from('course')
        .select(`
        id,
        section (
            id,
            lesson (
                id,
                progress!inner(account_id, complete)
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
                const progress = lesson.progress.find((p) => p.account_id === accountId);
                sectionProgress.lesson_progress.set(lesson.id, { complete: progress ? progress.complete : false });
            });
            sectionProgress.calculateProgress();
            courseProgress.section_progress.set(section.id, sectionProgress);
        });
        courseProgress.calculateProgress();
    });

    return courseProgress;
}

export type AccountCourseProgress = {
    courseId: number;
    progress: CourseProgress_;
}

export async function getAccountCourseProgress(accountId: string): Promise<AccountCourseProgress[]> {
    const { data, error } = await supabase
        .from('course')
        .select(`
        id,
        section (
            id,
            lesson (
                id,
                progress!inner(account_id, complete)
            )
        )
    `);

    if (error) {
        console.error("Error fetching course progress:", error);
        throw new Error("Failed to fetch course progress");
    }

    const progressList: AccountCourseProgress[] = [];

    data.forEach((course) => {
        const courseProgress = new CourseProgress_(course.id);
        course.section.forEach((section) => {
            const sectionProgress = new SectionProgress_();
            section.lesson.forEach((lesson) => {
                const progress = lesson.progress.find((p) => p.account_id === accountId);
                sectionProgress.lesson_progress.set(lesson.id, { complete: progress ? progress.complete : false });
            });
            sectionProgress.calculateProgress();
            courseProgress.section_progress.set(section.id, sectionProgress);
        });
        courseProgress.calculateProgress();
        progressList.push({ courseId: course.id, progress: courseProgress });
    });

    return progressList;
}

// markLessonAsStarted: creates a new entry in the progress table for the account and lesson, with complete set to false
export async function markLessonAsStarted(accountId: string, lessonId: number): Promise<void> {
    const { error } = await supabase
        .from('progress')
        .insert({ account_id: accountId, lesson_id: lessonId, complete: false });

    if (error) {
        console.error("Error marking lesson as started:", error);
        throw new Error("Failed to mark lesson as started");
    }
}

// markLessonAsFinished: updates the progress table to mark the lesson as finished for the account
export async function markLessonAsFinished(accountId: string, lessonId: number): Promise<void> {
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
export class Account {
    authId: number;
    name: string;

    progress: CourseProgress_[];

    constructor(id: number, name: string) {
        this.authId = id;
        this.name = name;
        this.progress = [];
    }

    getCourseProgress(courseId: number): CourseProgress_ | undefined {
        return this.progress.find(p => p.courseId === courseId);
    }
}

export type CourseProgress_ = {
    courseId: number;
    sectionsFinished: number;
    lastAccessed: Date;
};
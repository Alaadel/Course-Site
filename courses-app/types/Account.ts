export class Account_ {
    authId: number;
    email: string;

    firstName: string;
    lastName?: string;

    progress: CourseProgress_[];

    constructor(id: number, email: string, firstName: string, lastName?: string) {
        this.authId = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
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
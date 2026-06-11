import { Order_ } from "./Order";

export class Account {
    authId: number;
    name: string;

    progress: CourseProgress_[];

    constructor(id: number, name: string) {
        this.authId = id;
        this.name = name;
        this.progress = [];
    }
}

export type CourseProgress_ = {
    courseId: number;
    sectionsFinished: number;
    lastAccessed: Date;
};
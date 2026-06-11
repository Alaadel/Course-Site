export class Order_ {
    id: number;
    courseId: number;
    userId: number;
    createdAt: Date;
    amountPaid: number;

    constructor(id: number, courseId: number, userId: number, createdAt: Date, amountPaid: number) {
        this.id = id;
        this.courseId = courseId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.amountPaid = amountPaid;
    }
}
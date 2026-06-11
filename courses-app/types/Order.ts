export class Order_ {
    id: number;
    courseIds: number[];
    userId: number;
    createdAt: Date;
    amountPaid: number;

    constructor(id: number, courseIds: number[], userId: number, createdAt: Date, amountPaid: number) {
        this.id = id;
        this.courseIds = courseIds;
        this.userId = userId;
        this.createdAt = createdAt;
        this.amountPaid = amountPaid;
    }
}
export class Account {
    email: string;
    password: string;

    name: string;

    purchasedCourseIds: number[];

    constructor(email: string, password: string, name: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.purchasedCourseIds = [];
    }
}

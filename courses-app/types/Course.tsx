export default class Course {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string[] = [];

  createdAt: Date;
  purchaseCount: number;

  constructor(id: number, title: string, price: number, description: string, imageUrl: string, tags: string[]) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.tags = tags;

    this.createdAt = new Date();
    this.purchaseCount = 0;
  }
}
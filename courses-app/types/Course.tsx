export default class Course {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;

  createdAt: Date;
  purchaseCount: number;

  constructor(id: number, title: string, price: number, description: string, imageUrl: string) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;

    this.createdAt = new Date();
    this.purchaseCount = 0;
  }
}
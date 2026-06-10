export default class Course {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;

  constructor(id: number, title: string, price: number, description: string, imageUrl: string) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
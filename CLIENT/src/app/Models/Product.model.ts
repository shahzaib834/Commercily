export class ProductDataModel {
    public id: string;
    public name: string;
    public price: number;
    public desc: string;
    public ratings: number;
    public category: string;
    public image: string;
    public soldBy: string;
    public stock: number;
    public numOfReviews: number;
    public brand: string;
    public likesCount: number;
    public sold: number;
    public reviews: Review[];
    public toOrder?: number;
  
    constructor(
      name: string,
      desc: string,
      category: string,
      ratings: number,
      price: number,
      image: string,
      soldBy: string,
      stock: number,
      numberOfReviews: number,
      brand: string,
      likesCount: number,
      sold: number,
      reviews: [],
      id: string,
      toOrder: number
    ) {
      this.name = name;
      this.desc = desc;
      this.category = category;
      this.price = price;
      this.ratings = ratings;
      this.image = image;
      this.soldBy = soldBy;
      this.stock = stock;
      this.numOfReviews = numberOfReviews;
      this.reviews = reviews;
      this.brand = brand;
      this.likesCount = likesCount;
      this.sold = sold;
      this.toOrder = toOrder;
      this.id = id;
    }
  }

  export interface Review {
    name?: string;
    comment: string,
    rating?: number
  }
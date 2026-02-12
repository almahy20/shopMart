export interface CategoryI {
  _id: string;
  title: string;
  imageCover: string;
  image:string
  price: number;
  ratingsAverage: number;
  name: string;
  brand?: {
    name: string;
  };
  category?: {
    name: string;
  };
}

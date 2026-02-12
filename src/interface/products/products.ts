import { BrandI } from "../Brand/BrandI";
import { CategoryI } from "../Category/CategoryI";
import { SubcategoryI } from "../Subcategory/SubcategoryI";

export interface productI {
  sold: number;
  images: string[];
  subcategory: SubcategoryI[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: CategoryI;
  brand: BrandI;
  ratingsAverage: number;
  createdAt: string;
  name:string

  updatedAt: string;
  id: string;
}

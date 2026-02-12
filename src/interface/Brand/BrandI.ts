export interface BrandI {
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
  availableColors: any[];
  imageCover: string;
  category: CategoryI;
  brand: BrandI;
  name: string;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface SubcategoryI {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CategoryI {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

import { productI } from "../products/products";

export interface CartI {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDataI;
}

export interface CartDataI {
  _id: string;
  cartOwner: string;
  products: CartproductI[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartproductI {
  count: number;
  id: string;
  product: productI;
  price: number;
}
export interface CategoryI {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandI {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

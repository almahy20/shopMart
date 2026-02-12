import Wishlist from "@/components/addWishlist/Wishlist";
import AddCartButton from "@/components/product/product-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetSpecificBrand } from "@/serveses/products-serveses";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ProductI {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  name?: string;
  category?: {
    name: string;
  };
}

export default async function brand({
  params,
}: {
  params: Promise<{ brands: string }>;
}) {
  const { brands } = await params;

  const response = await GetSpecificBrand(brands);

  const products: ProductI[] = response?.data || [];
  if (!response) {
    return <p>Brand not found</p>;
  }
  return (
    <>
      <div className="max-w-5xl mx-auto py-4 mt-20">
        <div className="grid grid-cols-12 gap-3">
          {products?.map((prod) => (
            <div
              key={prod._id}
              className="col-span-12 p-0 sm:col-span-12 md:col-span-6 lg:col-span-3"
            >
              <Card className="h-full border p-2 pb-0 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/products/${prod._id}`}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      width={300}
                      height={400}
                      src={prod.imageCover}
                      alt="producteimge"
                      className="w-full object-center object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-3 pb-0">
                    <CardDescription className="text-xs text-gray-500 uppercase tracking-wide">
                      {prod.name}
                    </CardDescription>
                    <CardTitle className="text-base font-semibold line-clamp-2 leading-snug mt-1">
                      {prod.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400 mt-1">
                      {prod.category?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center p-3 py-2">
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((star) => {
                        const fillstar = star < Math.round(prod.ratingsAverage);
                        return (
                          <React.Fragment key={star}>
                            <Star
                              className={`w-4 h-4 ${fillstar ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <p className="ml-2 text-sm text-gray-600">
                      {prod.ratingsAverage}
                    </p>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex-col items-start">
                    <p className="text-lg font-bold text-gray-900">
                      {prod.price}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        EGP
                      </span>
                    </p>
                  </CardFooter>
                </Link>
                <div className="flex items-center gap-2 px-3 pb-3">
                  <div className="flex-1">
                    <AddCartButton prodId={prod._id} />
                  </div>
                  <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                    <Wishlist productId={prod._id} />
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

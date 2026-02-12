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
import { CategoryI } from "@/interface/Category/CategoryI";
import { GetSpecificCategory } from "@/serveses/products-serveses";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface GetAllCategories {
  categories: string;
}

export default async function categories({
  params,
}: {
  params: Promise<GetAllCategories>;
}) {
  const CategoryI = await params;
  const data = await GetSpecificCategory(CategoryI.categories);
  console.log("data", CategoryI.categories);

  if (!data || data.length === 0) {
    return <p>Category not found</p>;
  }
  const categorie: CategoryI[] = data && data.data ? data.data : [];
  console.log("PARAMS:", categorie);
  if (!data) {
    return <p>Category not found s</p>;
  }
  return (
    <>
      <div className="max-w-5xl mx-auto mt-20 pt-4 px-4">
        <div className="grid grid-cols-12 gap-3">
          {categorie.map((prod) => (
            <div
              key={prod._id}
              className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 "
            >
              <Card className="h-full border p-2 pb-0 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/products/${prod._id}`} className="block">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      width={300}
                      height={400}
                      src={prod.imageCover}
                      alt="producteimge"
                      className="w-full h-80  object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-3 pb-0">
                    <CardDescription className="text-xs text-gray-500 uppercase tracking-wide">
                      {prod.brand?.name}
                    </CardDescription>
                    <CardTitle className="text-sm font-semibold line-clamp-2 leading-snug mt-1">
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
                    <p className="text-base font-bold text-gray-900">
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

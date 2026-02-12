import { getAllproducts } from "@/serveses/products-serveses";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { productI } from "@/interface/products/products";
import { Star } from "lucide-react";
import React from "react";
import Link from "next/link";
import AddCartButton from "@/components/product/product-button";
import Wishlist from "@/components/addWishlist/Wishlist";
export default async function products() {


  const { data } = await getAllproducts();
  const products: productI[] = await data;


  
  return (
    <>
      <div className="max-w-5xl mx-auto py-4 mt-20">
        <div className="grid grid-cols-12 gap-3">
          {products?.map((prod) => (
            <div
              key={prod._id}
              className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3"
            >
              <Card className="h-full p-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/products/${prod._id}`}>
                  <Image
                    width={300}
                    height={300}
                    src={prod.imageCover}
                    alt="producteimge"
                    className="rounded-lg w-full"
                  />
                  <CardHeader className="p-2">
                    <CardDescription className="text-xs text-gray-500">
                      {prod.brand.name}
                    </CardDescription>
                    <CardTitle className="text-sm font-medium truncate">
                      {prod.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {prod.category.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex p-2">
                    {[0, 1, 2, 3, 4].map((star) => {
                      const fillstar = star < Math.round(prod.ratingsAverage);
                      return (
                        <React.Fragment key={star}>
                          <Star
                            className={`size-6 ${fillstar ? "fill-amber-300 text-amber-300" : "fill-gray-200 text-gray-200"}`}
                          />
                        </React.Fragment>
                      );
                    })}
                    <p className="ml-2 text-gray-500 text-sm">
                      {prod.ratingsAverage}
                    </p>
                  </CardContent>
                  <CardFooter className="p-2">
                    <p className="text-sm">
                      price :{" "}
                      <strong className="text-base">{prod.price}</strong> EGP
                    </p>
                  </CardFooter>
                </Link>
                <div className="flex items-center justify-between gap-3 px-3 pb-2">
                  <div className="botton w-full">
                    <AddCartButton prodId={prod._id} />
                  </div>
                  <Wishlist productId={prod._id} />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

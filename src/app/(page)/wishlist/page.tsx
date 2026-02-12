"use client";
import { getWishlist } from "@/app/actions/actions";
import DeleteWishlist from "@/components/deleteWishlist/deleteWishlist";
import AddCartButton from "@/components/product/product-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function wishlist() {
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  async function getwishlistO() {
    try {
      setLoading(true);
      const data = await getWishlist();

      const items = (await data?.data) || [];
      setWishlistItems(items);
      console.log(items, "wishlistItems");
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getwishlistO();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-8 w-8" />
        <span className="mr-2"> loading...</span>
      </div>
    );
  }

  return (
    <div className="wishlist mt-20 max-w-5xl mx-auto py-4 px-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">قائمة المفضلة</h1>

      {wishlistItems?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">قائمة المفضلة فارغة.</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-3">
          {wishlistItems?.map((prod) => (
            <div
              key={prod?._id}
              className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 "
            >
              <Card className="h-full p-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative ">
                <DeleteWishlist
                  setWishlistItems={setWishlistItems}
                  productId={prod?._id}
                />

                <Link href={`/products/${prod?._id}`} className="block">
                  <div className="relative overflow-hidden pt-0 mt-0 rounded-t-lg">
                    <Image
                      width={300}
                      height={300}
                      src={prod?.imageCover}
                      alt="producteimge"
                      className="w-full p-0   h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader className="p-3 pb-0">
                    <CardDescription className="text-xs text-gray-500 uppercase tracking-wide">
                      {prod?.brand?.name}
                    </CardDescription>
                    <CardTitle className="text-sm font-semibold truncate mt-1">
                      {prod?.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      {prod?.category?.name}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex items-center p-3 py-2">
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((star) => {
                        const fillstar =
                          star < Math.round(prod?.ratingsAverage);
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
                      {prod?.ratingsAverage}
                    </p>
                  </CardContent>

                  <CardFooter className="p-3 pt-0 flex-col items-start">
                    <p className="text-base font-bold text-gray-900">
                      {prod?.price}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        EGP
                      </span>
                    </p>
                  </CardFooter>
                </Link>

                <div className="px-3 pb-3">
                  <AddCartButton prodId={prod?._id} />
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

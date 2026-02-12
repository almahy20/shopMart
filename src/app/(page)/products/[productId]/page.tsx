import { getproductsdetails } from "@/serveses/products-serveses";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddCartButton from "@/components/product/product-button";
import Wishlist from "@/components/addWishlist/Wishlist";
import { productI } from "@/interface/products/products";

interface GetProductDetailsParams {
  productId: string;
}

export default async function productDetails({
  params,
}: {
  params: GetProductDetailsParams;
}) {
  
  const resolvedParams = await params;
  const { productId } = resolvedParams;
  const { data } = await getproductsdetails(productId);
  const product: productI = await data;




  return (
    <main>
      <div className="max-w-5xl mx-auto py-4 mt-20 border-b border-gray-100">
        <Breadcrumb>
          <BreadcrumbList className="text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-gray-500 hover:text-gray-900"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-300" />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/abuot"
                className="text-gray-500 hover:text-gray-900"
              >
                abuot
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-300" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 font-medium">
                products
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-5xl mx-auto ">
        <Card className="my-8 border border-gray-200 ">
          <div className="grid grid-cols-3">
            <div className="col-span-3 sm:col-span-1 sm bg-gray-50">
              <Carousel className="h-full">
                <CarouselContent className="h-full">
                  {product?.images?.map((img, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="w-full h-96 relative">
                        <Image
                          fill
                          src={img}
                          alt="producteimge"
                          className="object-contain w-full p-6"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="col-span-3 sm:col-span-2 p-6 flex flex-col justify-center">
              <CardHeader className="p-0 pb-4 space-y-1">
                <CardDescription className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {product?.brand?.name}
                </CardDescription>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {product?.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {product?.category?.name}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 py-4 flex items-center border-b border-gray-100">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((star) => {
                    const fillstar = star < Math.round(product?.ratingsAverage);
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
                  {product?.ratingsAverage}
                </p>
              </CardContent>

              <CardFooter className="p-0 py-4 flex-col items-start">
                <p className="text-sm text-gray-500 mb-1">price</p>
                <p className="text-2xl font-bold text-gray-900">
                  {product?.price}{" "}
                  <span className="text-sm font-normal text-gray-500">EGP</span>
                </p>
              </CardFooter>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1">
                  <AddCartButton prodId={product?._id} />
                </div>
                <button className="p-3   hover:bg-gray-50 transition-colors">
                  <Wishlist productId={product?._id} />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

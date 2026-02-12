import { GetAllBrands } from "@/app/actions/actions";
import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
// import { BrandI } from "@/interface/Brand/BrandI";

export interface BrandI {
  _id: string;
  name: string;
  image: string;
  images?: string[];
  slug?: string;
}
export default async function Brands() {
  const { data } = await GetAllBrands();
  const brands: BrandI[] = await data;
  console.log(brands);

  // const data = await getuserToken();
  // console.log(data);
  return (
    <>
      <div className="mt-20 pt-4 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands?.map((brand) => (
          <div key={brand._id} className="col-span-1">
            <Card className="h-full border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group">
              <Link href={`/brands/${brand._id}`} className="block">
                <div className="relative bg-gray-50 p-4">
                  <Image
                    src={brand.image}
                    width={300}
                    height={400}
                    alt={brand.name}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardFooter className="p-3 bg-white border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 text-center w-full">
                    {brand.name}
                  </p>
                </CardFooter>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

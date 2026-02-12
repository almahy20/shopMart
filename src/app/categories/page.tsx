import React from "react";
import { GetAllCategories } from "../actions/actions";
import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { CategoryI } from "@/interface/Category/CategoryI";

export default async function categories() {
  const { data } = await GetAllCategories();
  const categories: CategoryI[] = await data;
  console.log(categories, "GetAllCategories");

  return (
    <>
      <div className="mt-20 pt-4 max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category._id} className="col-span-1">
            <Card className="h-full border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group">
              <Link href={`/categories/${category._id}`} className="block">
                <div className="relative bg-gray-50 p-6 h-56 flex items-center justify-center">
                  <Image
                    src={category.image}
                    width={300}
                    height={400}
                    alt={category.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardFooter className="p-4 bg-white border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 text-center w-full">
                    {category.name}
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

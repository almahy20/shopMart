"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cart from "@/components/Cart/Cart";
import { ClearUserCart, getLoggeduserCart } from "@/app/actions/actions";
import { CartDataI, CartI, CartproductI } from "@/interface/Cart/cart";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import OrdarNow from "@/components/OrdarNow/OrdarNow";
// import OrdarNow from "@/components/OrdarNow/OrdarNow";
// import Ordar from "@/components/Ordar/Ordar";
export default function CartProduct() {
  const [isLoding, setIsLoding] = useState(true);
  const [isLoding2, setIsLoding2] = useState(false);

  const [products, setProducts] = useState<CartproductI[] | []>([]);
  const [cart, setCart] = useState<CartI | null>(null);
  const [cartData, setCartData] = useState<CartDataI | null>(null);
  async function getuserCart() {
    try {
      setIsLoding(true);
      const data: CartI = await getLoggeduserCart();

      console.log("log", data);
      setProducts(data.data.products);
      setCart(data);
      setCartData(data.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoding(false);
    }
  }
  useEffect(() => {
    getuserCart();
  }, []);

  async function ClearAllProduct() {
    try {
      setIsLoding2(true);
      const data = await ClearUserCart();
      console.log(data);
      setProducts([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsLoding2(false);
    }
  }
  if (isLoding) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner /> loading...
      </div>
    );
  }
  if (products?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Your cart is empty.</p>
        <Link href="/products">
          <Button className="ml-4">Shop Now</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 mt-20">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
      <p className="text-gray-500 text-sm mt-1">
        {products.length} items in your cart
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-3">
          {products?.map((prod, index) => (
            <React.Fragment key={index}>
              <Cart setProducts={setProducts} product={prod} />
            </React.Fragment>
          ))}
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white h-fit">
          <h2 className="text-base font-semibold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Subtotal ({products.length} items)
              </span>
              <span className="font-medium">
                {cartData?.totalCartPrice} EGP
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between font-bold text-base">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">
                  {cartData?.totalCartPrice} EGP
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <OrdarNow cartId={cart?.data?._id || ""} />
            <Link href="/products" className="block">
              <Button
                variant="outline"
                className="w-full rounded-md py-5 text-sm font-medium border-gray-300 hover:bg-gray-50"
              >
                Continue Shopping
              </Button>
            </Link>

            <button
              onClick={ClearAllProduct}
              className="w-full py-2 text-red-600 flex items-center justify-center gap-2 text-sm font-medium hover:text-red-700 transition-colors"
            >
              {isLoding2 ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  <span>Clear Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

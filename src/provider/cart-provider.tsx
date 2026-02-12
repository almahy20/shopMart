"use client";
import { getLoggeduserCart, getWishlist } from "@/app/actions/actions";
import { CartI } from "@/interface/Cart/cart";
import { WishlistI } from "@/interface/Wishlist/getWishlist";
import React, { createContext, useEffect, useState } from "react";

interface CartContextI {
  noOfCartItems: number;
  handelcart: () => void;
  isLoding: boolean;
  noOfWishlist: number;
  handelWishlist: () => void;
  isLoding2: boolean;
}

export const cartContext = createContext<CartContextI>({
  noOfCartItems: 0,
  noOfWishlist: 0,
  handelWishlist: () => {},

  handelcart: () => {},
  isLoding: false,
  isLoding2: false,
});
export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [noOfWishlist, setNoOfWishlist] = useState(0);
  const [isLoding, setIsLoding] = useState(false);
  const [isLoding2, setIsLoding2] = useState(false);
  async function handelWishlist() {
    try {
      setIsLoding2(true);
      const data: WishlistI = await getWishlist();
      const count = data?.data?.length || 0;
      console.log("rtyuiok", count);

      setNoOfWishlist(count);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoding2(false);
    }
  }
  async function handelcart() {
    try {
      setIsLoding(true);
      const data: CartI = await getLoggeduserCart();
      if (!data?.data?.products) {
        setNoOfCartItems(0);
        return;
      }
      const total = await data?.data?.products.reduce(
        (accu, prod) => prod.count + accu,
        0,
      );

      setNoOfCartItems(total);
    } catch (error) {
      console.log(error);
      setNoOfCartItems(0);
    } finally {
      setIsLoding(false);
    }
  }
  useEffect(() => {
    handelcart();
    handelWishlist();
  }, []);

  return (
    <>
      <cartContext.Provider
        value={{
          noOfCartItems,
          handelcart,
          isLoding,
          isLoding2,
          noOfWishlist,
          handelWishlist,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}

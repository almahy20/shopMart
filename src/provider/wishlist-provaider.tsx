// "use client";
// import { getLoggeduserCart } from "@/app/actions/actions";
// import { CartI } from "@/interface/Cart/cart";
// import React, { createContext, useEffect, useState } from "react";
// import { boolean } from "zod";

// interface CartContextI {
//   noOfCartItems: number;
//   handelcart: () => void;
//   isLoding: boolean;
// }

// export const cartContext = createContext<CartContextI>({
//   noOfCartItems: 0,
//   handelcart: () => {},
//   isLoding: false,
// });
// export default function CartProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [noOfCartItems, setNoOfCartItems] = useState(0);
//   const [isLoding, setIsLoding] = useState(false);
//   async function handelcart() {
//     try {
//       setIsLoding(true);
//       const data: CartI = await getLoggeduserCart();
//       const total = data.data.products.reduce(
//         (accu, prod) => prod.count + accu,
//         0,
//       );

//       setNoOfCartItems(total);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoding(false);
//     }
//   }
//   useEffect(() => {
//     handelcart();
//   }, []);

//   return (
//     <>
//       <cartContext.Provider value={{ noOfCartItems, handelcart, isLoding }}>
//         {children}
//       </cartContext.Provider>
//     </>
//   );
// }

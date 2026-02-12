// "use client";

// import { getWishlist } from "@/app/actions/actions";
// import React, { createContext, useEffect, useState } from "react";

// // ✅ صلحنا الاسم: handleWishlist (مش handel)
// interface WishlistContextI {
//   noOfWishlistItems: number;
//   handleWishlist: () => Promise<void>; // ✅ غيرنا لـ Promise<void>
//   isLoading: boolean;
// }

// export const wishlistContext = createContext<WishlistContextI>({
//   noOfWishlistItems: 0,
//   handleWishlist: async () => {}, // ✅ async هنا كمان
//   isLoading: false,
// });

// export default function WishlistProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [noOfWishlistItems, setNoOfWishlistItems] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ صلحنا الاسم: handleWishlist
//   const handleWishlist = async () => {
//     try {
//       setIsLoading(true);
//       const response = await getWishlist();

//       console.log("hjkml,", response);
//       // ✅ الـ Wishlist بيرجع { data: [...] } مش { data: { products: [...] } }
//       const count = response.length || 0;

//       setNoOfWishlistItems(count);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//       setNoOfWishlistItems(0);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleWishlist();
//   }, []);

//   return (
//     <wishlistContext.Provider
//       value={{
//         noOfWishlistItems,
//         handleWishlist, // ✅ الاسم الصحيح
//         isLoading,
//       }}
//     >
//       {children}
//     </wishlistContext.Provider>
//   );
// }

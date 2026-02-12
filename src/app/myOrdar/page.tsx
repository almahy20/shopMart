"use client";

import React, { useEffect, useState } from "react";
import { getLoggeduserCart, getUserOrders } from "../actions/actions";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { OrdarI } from "@/interface/ordar/Ordar";
import { toast } from "sonner";
import { getAllproducts } from "@/serveses/products-serveses";

export default function MyOrders() {
  const [orders, setOrders] = useState<OrdarI[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUserOrders() {
    try {
      setLoading(true);

      const { data } = await getAllproducts();
      console.log("bvcxd", data);

      const id: string = data.category._id;
      console.log("id", id);

      const ordersResponse = await getUserOrders(id);
      console.log("hhhh", ordersResponse);
      setOrders(Array.isArray(ordersResponse.data) ? ordersResponse.data : []);
      if (data.statusMsg == "fail") {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserOrders();
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
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No orders currently available</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="">
          {orders?.map((order) => (
            <div key={order._id}></div>
          ))}
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Spinner } from "@/components/ui/spinner";
// import Link from "next/link";
// import { toast } from "sonner";
// import { OrdarI } from "@/interface/ordar/Ordar";
// import { getUserOrders } from "../actions/actions";

// export default function MyOrders() {
//   const [orders, setOrders] = useState<OrdarI[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // ⬅️ تغيير الاسم لـ loadUserOrders وبدون parameters
//   async function loadUserOrders() {
//     try {
//       setLoading(true);
//       setError(null);

//       // ⬅️ استدعاء صحيح - getUserOrders بدون parameters
//       const response = await getUserOrders();
//       console.log("Orders data:", response);

//       if (response?.status === "success" && Array.isArray(response.data)) {
//         setOrders(response.data);
//       } else if (response?.status === "success" && response.data?.orders) {
//         setOrders(response.data.orders);
//       } else {
//         setOrders([]);
//         if (response?.message) {
//           toast.error(response.message);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError("Failed to load orders. Please try again.");
//       toast.error("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadUserOrders(); // ⬅️ استدعاء صحيح بدون parameters
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen gap-3">
//         <Spinner className="h-8 w-8" />
//         <span className="text-gray-600">جاري تحميل الطلبات...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen gap-4">
//         <p className="text-red-500 text-lg">{error}</p>
//         <div className="flex gap-3">
//           <button
//             onClick={loadUserOrders} // ⬅️ استدعاء صحيح
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             إعادة المحاولة
//           </button>
//           <Link href="/products">
//             <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
//               تصفح المنتجات
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-20">
//       <h2 className="text-2xl font-bold mb-6 text-gray-900">طلباتي</h2>

//       {orders.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <p className="text-gray-500 text-lg">لا توجد طلبات حالياً</p>
//           <Link
//             href="/products"
//             className="mt-4 inline-block text-blue-600 hover:underline"
//           >
//             تصفح المنتجات
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     طلب #{order._id?.slice(-6) || "unknown"}
//                   </h3>
//                   <p className="text-gray-500 text-sm">
//                     {new Date(order.createdAt).toLocaleDateString("ar-EG")}
//                   </p>
//                 </div>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     order.isPaid
//                       ? "bg-green-100 text-green-800"
//                       : "bg-yellow-100 text-yellow-800"
//                   }`}
//                 >
//                   {order.isPaid ? "تم الدفع" : "قيد الانتظار"}
//                 </span>
//               </div>

//               <div className="space-y-2">
//                 {order.cartItems?.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center py-2 border-b last:border-0"
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="font-medium">{item.product?.title}</span>
//                       <span className="text-gray-500 text-sm">
//                         x{item.count}
//                       </span>
//                     </div>
//                     <span className="font-semibold">{item.price} ج.م</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 pt-4 border-t flex justify-between items-center">
//                 <span className="text-gray-600">الإجمالي:</span>
//                 <span className="text-xl font-bold text-blue-600">
//                   {order.totalOrderPrice} ج.م
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

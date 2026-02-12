import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartproductI } from "@/interface/Cart/cart";
import { DeleteCartItem, UpdateCartProduct } from "@/app/actions/actions";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { cartContext } from "@/provider/cart-provider";

export default function Cart({
  product,
  setProducts,
}: {
  product: CartproductI;
  setProducts: (products: CartproductI[]) => void;
}) {
  console.log("setProducts type:", typeof setProducts);

  const [isLoding, setIsLoding] = useState(false);
  const [isLoding2, setIsLoding2] = useState(false);
  const [isLoding3, setIsLoding3] = useState(false);
    const { handelcart } = useContext(cartContext);

  async function deleteCartItem(id: string) {
    try {
      setIsLoding3(true);

      const data = await DeleteCartItem(id);
      console.log(data);
      if (data.status == "success") {
        toast.success("Item removed from cart", { position: "top-center" });
      }
      setProducts(data?.data?.products || []);
      handelcart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to remove item from cart", {
        position: "top-center",
      });
    } finally {
      setIsLoding3(false);
    }
  }
  async function updateCartItemCount(id: string, newCount: number) {
    try {
      setIsLoding(true);
      const data = await UpdateCartProduct(id, newCount);
      console.log(data);
      toast.success("Item count updated successfully", {
        position: "top-center",
      });
      setProducts(data.data.products);
      handelcart();
    } catch (error) {
      console.error("Error updating cart item count:", error);
      toast.error("Failed to update item count", {
        position: "top-center",
      });
    } finally {
      setIsLoding(false);
    }
  }

  return (
    <>
      <div className="flex gap-4 rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
        <Image
          width={100}
          height={100}
          src={product.product.imageCover}
          alt={product.product.title}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {product.product.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {product.product.brand.name} · {product.product.category.name}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-gray-400 text-xs block">
                {product.count} × {product.price * product.count} EGP
              </span>
              <span className="font-semibold text-sm text-gray-900">
                {product.price} EGP
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center border border-gray-200 rounded-md">
              <Button
                onClick={() => {
                  updateCartItemCount(product.product._id, product.count - 1);
                }}
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </Button>

              {isLoding ? (
                <Spinner className="h-4 w-4 mx-2" />
              ) : (
                <span className="w-8 text-center text-sm font-medium">
                  {product.count}
                </span>
              )}

              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  updateCartItemCount(product.product._id, product.count + 1)
                }
                className="h-8 w-8 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={() => deleteCartItem(product.product._id)}
              variant="ghost"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs h-8 px-2"
            >
              {isLoding3 ? (
                <>
                  <Spinner className="h-3 w-3" />
                  <span className="ml-1.5">Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  <span>Remove</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

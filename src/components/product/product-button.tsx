"use client";
import { addcard } from "@/app/actions/actions";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { cartContext } from "@/provider/cart-provider";
import { redirect } from "next/navigation";

export default function AddCartButton({ prodId }: { prodId: string }) {
  const [isLoding, setisLoding] = useState(false);
  const { handelcart } = useContext(cartContext);
  async function addproductToCart(productId: string) {
    try {
      setisLoding(true);
      const respons = await addcard(productId);
      if (respons.status == "success") {
        toast.success(respons.message, { position: "top-center" });
      } else {
        toast.error(respons.error, { position: "top-center" });
      }
      handelcart();
      console.log(respons);
    } catch (error: any) {
      toast.error(error.message || "An error occurred", {
        position: "top-center",
      });

      console.log(error);
      redirect("/login");
    } finally {
      setisLoding(false);
    }
  }
  return (
    <>
      <Button
        disabled={isLoding}
        onClick={() => {
          addproductToCart(prodId);
        }}
        className="w-full"
        variant="outline"
      >
        {isLoding ? (
          <Spinner />
        ) : (
          <>
            Add to card <ShoppingCart />
          </>
        )}
      </Button>
    </>
  );
}

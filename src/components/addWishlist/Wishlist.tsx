"use client";
import { addToWishlist } from "@/app/actions/actions";
import { Heart } from "lucide-react";
import { useContext, useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { cartContext } from "@/provider/cart-provider";

interface WishlistProps {
  productId: string;
}

export default function Wishlist({ productId }: WishlistProps) {
  const [isLoding, setisLoding] = useState(false);
  const { handelWishlist } = useContext(cartContext);

  async function addWishlist(productId: string) {
    try {
      setisLoding(true);
      const data = await addToWishlist(productId);
      console.log(data, "wishlistItems");
      toast.success("Item added to wishlist", { position: "top-center" });
      handelWishlist();
    } catch (error) {
      toast.error("Failed to add item to wishlist", { position: "top-center" });
      console.log(error);
    } finally {
      setisLoding(false);
    }
  }

  return (
    <div>
      {isLoding ? (
        <Spinner className="size-6" />
      ) : (
        <Heart onClick={() => addWishlist(productId)} />
      )}
    </div>
  );
}

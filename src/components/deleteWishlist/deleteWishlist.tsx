"use client";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { getWishlist, removeFromWishlist } from "@/app/actions/actions";
import { useContext, useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { cartContext } from "@/provider/cart-provider";

interface WishlistItem {
  _id: string;
}

export default function DeleteWishlist({
  productId,
  setWishlistItems,
}: {
  productId: string;
  setWishlistItems: (items: WishlistItem[]) => void;
}) {
  const [isLoding, setisLoding] = useState(false);
  const { handelWishlist } = useContext(cartContext);
  const deleteWishlistItem = async (productId: string) => {
    try {
      setisLoding(true);
      const response = await removeFromWishlist(productId);
      const data = await getWishlist();
      handelWishlist();
      toast.success("Item removed from wishlist", { position: "top-center" });
      console.log(data.data, "ttttt");
      setWishlistItems(data.data);
    } catch (error) {
      console.error("An error occurred while deleting the item:", error);
      toast.error("Failed to remove item from wishlist", {
        position: "top-center",
      });
    } finally {
      setisLoding(false);
    }
  };

  return (
    <div className="z-10">
      {isLoding ? (
        <Spinner className="p-1 absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs" />
      ) : (
        <Button
          onClick={() => deleteWishlistItem(productId)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs"
        >
          <Trash className="size-6" />
        </Button>
      )}
    </div>
  );
}

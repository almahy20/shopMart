"use client";

import { CreateCashOrder } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartContext } from "@/provider/cart-provider";
import { useContext, useState } from "react";
import { toast } from "sonner";

interface OrderNowPr {
  cartId: string;
}

export default function OrderNow({ cartId }: OrderNowPr) {
  const { handelcart } = useContext(cartContext);

  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await CreateCashOrder(cartId, details, phone, city);

      if (data?.status == "success") {
        toast.success(data.status, { position: "top-center" });
      } else {
        toast.error(data.message, { position: "top-center" });
      }
      handelcart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full">
            Proceed to Checkout
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Shipping Address</DialogTitle>
              <DialogDescription>
                Enter your shipping details to complete the order.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="01xxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Cairo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="details">Address Details</Label>
                <Input
                  id="details"
                  name="details"
                  placeholder="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

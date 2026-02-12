"use client";

import { VerifyResetCode } from "@/app/actions/actions";
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
import { useState } from "react";
import { toast } from "sonner";

export default function Verifyresetcode() {
  const [resetCode, setResetCode] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await VerifyResetCode(resetCode);
      console.log("data", data);
      if (data.statusMsg == "success") {
        setOpen(true);
        toast.success(data.message, { position: "top-center" });
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("error", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-20">
            Forgot Password?
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleForm} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Verify Reset Code</DialogTitle>
              <DialogDescription>
                Enter the 5-digit verification code sent to your email.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <Label htmlFor="email">Verification Code</Label>
                <Input
                  type="text"
                  onChange={(e) => setResetCode(e.target.value)}
                  value={resetCode}
                  id="email"
                  name="email"
                  placeholder="193213"
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
              <Button type="submit">submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { UpdateLoggedUserPassword } from "@/app/actions/actions";
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

export default function UpdateUserPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [open, setOpen] = useState(false);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const data = await UpdateLoggedUserPassword(
        currentPassword,
        password,
        rePassword,
      );
      console.log("data", data);
      if (data?.message == "success") {
        setOpen(false);
        setCurrentPassword("");
        setPassword("");
        setRePassword("");
      }
      if (data.message == "success") {
        setOpen(true);
        toast.success(data.message, { position: "top-center" });
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("error", { position: "top-center" });
    } finally {
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-20">
            Change Password
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleForm} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Update Password</DialogTitle>
              <DialogDescription>
                Enter your current password and new password.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Current password"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="password">New Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  placeholder="New password"
                  minLength={8}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="rePassword">Confirm Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setRePassword(e.target.value)}
                  value={rePassword}
                  id="rePassword"
                  name="rePassword"
                  placeholder="Confirm password"
                  required
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

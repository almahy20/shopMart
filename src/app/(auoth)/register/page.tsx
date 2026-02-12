"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  registerschema,
  registerschemaType,
} from "@/app/lib/authschema/auth.schema";
import { signupuser } from "@/serveses/auth.serveses";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerschema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function getsubmit(values: registerschemaType) {
    const respons = await signupuser(values);
    if (respons.message == "success") {
      toast.success("success");
      router.push("/login");
    } else toast.error("error");
    console.log(respons);
  }
  return (
    <>
      <main className=" max-w-5xl mx-auto mt-20 py-1 px-4">
        <form
          onSubmit={form.handleSubmit(getsubmit)}
          className="max-w-[800] my-10 mb-5 mx-auto space-y-4 p-4 border border-2 rounded-2xl"
        >
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input id={field.name} {...field} type="text" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>email</FieldLabel>
                <Input id={field.name} {...field} type="email" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>password</FieldLabel>
                <Input id={field.name} {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>rePassword</FieldLabel>
                <Input id={field.name} {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>phone</FieldLabel>
                <Input id={field.name} {...field} type="tel" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button className="w-full">
            {form.formState.isSubmitting ? <Spinner /> : "submit"}
          </Button>
        </form>
        <p className="flex justify-center pb-5">
          If you have an account, click here.{" "}
          <Link href={"/login"} className="text-blue-500 ">
            <span className="font-bold "> login </span>
          </Link>
          Now
        </p>
      </main>
    </>
  );
}

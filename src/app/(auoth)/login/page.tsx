"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginschema, loginschemaType } from "@/app/lib/authschema/auth.schema";
import { signinuser } from "@/serveses/auth.serveses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ForgotPassworduser from "@/components/ForgotPassword/ForgotPassword";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginschema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handlelogin(values: loginschemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response?.ok) {
      toast.success("success");
      router.push("/");
    } else {
      toast.error(response?.error);
    }
  }
  return (
    <>
      <main className=" max-w-5xl mx-auto mt-20 p-4 h-screen ">
        <form
          onSubmit={form.handleSubmit(handlelogin)}
          className="max-w-[800] mx-auto space-y-4 border border-2 mx-2 p-6 rounded-2xl"
        >
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

          <Button className="w-full">
            {form.formState.isSubmitting ? <Spinner /> : "login"}
          </Button>
        </form>
        <div className="flex justify-center">
          <ForgotPassworduser />
        </div>
        <p className="flex justify-center">
          If you don't have account, please
          <Link href={"/register"} className="text-blue-500 ">
            <span className="font-bold "> SignUp </span>
          </Link>
          Now
        </p>
      </main>
    </>
  );
}

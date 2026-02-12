// import { error } from "console";
import * as z from "zod";

export const registerschema = z
  .object({
    name: z
      .string()
      .nonempty("name is required")
      .min(3, "name must be atleast 3")
      .max(20, "name 20"),
    email: z.email({ error: "email is required" }),
    password: z
      .string()
      .nonempty("password is required")
      .regex(/^\w{6,}$/),
    rePassword: z.string().nonempty("rePassword is required"),
    phone: z
      .string()
      .nonempty("phoneis required")
      .regex(/^01[0125][0-9]{8}$/),
  })
  .refine((object) => object.password == object.rePassword, {
    path: ["rePassword"],
    error: "rePassword and password must match",
  });

export type registerschemaType = z.infer<typeof registerschema>;

export const loginschema = z.object({
  email: z.email({ error: "email is required" }),
  password: z
    .string()
    .nonempty("password is required")
    .regex(/^\w{6,}$/),
});

export type loginschemaType = z.infer<typeof loginschema>;

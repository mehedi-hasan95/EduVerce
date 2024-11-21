import { z } from "zod";
import { User_Role } from "@prisma/client";
export const LoginSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email is required.",
  }),
  password: z.string().min(2, {
    message: "Password is required.",
  }),
});
export const RegisterSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First Name is required.",
    }),
    lastName: z.string().min(2, {
      message: "Last Name is required.",
    }),
    email: z.string().min(2, {
      message: "Email is required.",
    }),
    userRole: z
      .enum([User_Role.TEACHER, User_Role.USER])
      .default(User_Role.USER),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers"
      ),
    cPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.cPassword, {
    message: "passwords do not match",
    path: ["cPassword"],
  });

// app/(auth)/_components/schema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email address"),
    fullName: z
      .string("Full Name must be string")
      .min(3, "Full Name must be at least 3 characters long"),
    phoneNumber: z
      .string("Phone Number must be string")
      .min(10, "Phone Number must be at least 10 characters long"),
    password: z
      .string("Password must be string")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string("Confirm Password must be string")
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("Password must be string")
    .min(4, "Password must be at least 4 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

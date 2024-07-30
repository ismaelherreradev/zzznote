import { z } from "zod";
export const ZSignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const ZSignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type TSignUpSchema = z.infer<typeof ZSignUpSchema>;
export type TSignInSchema = z.infer<typeof ZSignInSchema>;

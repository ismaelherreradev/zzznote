import { z } from "zod";

export const ZSignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type TSignInSchema = z.infer<typeof ZSignInSchema>;

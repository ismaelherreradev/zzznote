import { z } from "zod";

export const ZMagicLinkSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type TMagicLinkSchema = z.infer<typeof ZMagicLinkSchema>;

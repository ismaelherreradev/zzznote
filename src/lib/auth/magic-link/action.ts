"use server";
import {
  createMagicLinkAccount,
  generateAndInsertMagicLinkToken,
} from "~/lib/auth/utils";
import { db } from "~/server/db";
import { type TSignInSchema, ZSignInSchema } from "./schema";

import { sendMagicLink } from "~/lib/email";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function loginWithMagicLink(
  previousState: null | ActionResponse<TSignInSchema>,
  formData: FormData,
): Promise<ActionResponse<TSignInSchema>> {
  const { success, error, data } = ZSignInSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!success) {
    return {
      fieldError: { email: error.flatten().fieldErrors.email?.[0] },
    };
  }

  let user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, data.email),
  });

  if (!user) {
    user = await createMagicLinkAccount(data.email);
  }

  await sendMagicLinkEmail(user?.id as string, user?.email as string);

  return {};
}

async function sendMagicLinkEmail(userId: string, email: string) {
  const result = await generateAndInsertMagicLinkToken(userId);
  if (!result || !result.token) return;

  await sendMagicLink(result.token, email);
}

"use server";

import { createMagicLinkUser, generateAndInsertMagicLinkToken } from "~/lib/auth/utils";
import { db } from "~/server/db";

import { sendMagicLink } from "~/lib/email";

import { createServerAction, type inferServerActionReturnType, type inferServerActionReturnTypeHot } from "zsa";
import { ZMagicLinkSchema } from "~/lib/auth/validators";

export const produceLoginWithMagicLink = createServerAction()
  .input(ZMagicLinkSchema)
  .handler(async ({ input }) => {
    let user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, input.email),
    });

    if (!user) {
      user = await createMagicLinkUser(input.email);
    }

    await sendMagicLinkEmail(user?.id as string, user?.email as string);

    return { email: input.email, emailSend: true };
  });

export type ProduceLoginWithMagicLinkReturnType = inferServerActionReturnType<typeof produceLoginWithMagicLink>;
export type ProduceLoginWithMagicLinkTypeHot = inferServerActionReturnTypeHot<typeof produceLoginWithMagicLink>;

async function sendMagicLinkEmail(userId: string, email: string) {
  const result = await generateAndInsertMagicLinkToken(userId);
  if (!result || !result.token) return;

  await sendMagicLink(result.token, email);
}

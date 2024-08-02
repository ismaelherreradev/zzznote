"use server";

import { createMagicLinkUser, generateAndInsertMagicLinkToken, sendMagicLinkEmail } from "~/lib/auth/utils";
import { db } from "~/server/db";

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

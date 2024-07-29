"use server";
import { generateIdFromEntropySize } from "lucia";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { ZSignInSchema } from "./schema";
import { generateMagicLinkToken } from "./utils";

export async function loginWithMagicLink(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const { email } = ZSignInSchema.parse(data);

  const existedUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (existedUser) {
    const result = await generateMagicLinkToken(existedUser.id);

    // send email
    console.log(result);
  } else {
    const userId = generateIdFromEntropySize(10);

    await db.insert(users).values({
      id: userId,
      email,
    });

    const result = await generateMagicLinkToken(userId);
    // send email
    console.log(result);
  }
}

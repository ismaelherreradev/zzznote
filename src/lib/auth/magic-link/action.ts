"use server";
import { generateMagicLinkToken } from "~/lib/auth/utils";
import { createMagicLinkAccount } from "~/lib/auth/utils";
import { db } from "~/server/db";
import { ZSignInSchema } from "./schema";

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
    const user = await createMagicLinkAccount(email);

    const result = await generateMagicLinkToken(user?.id as string);
    // send email
    console.log(result);
  }
}

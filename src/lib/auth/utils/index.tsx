import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { db } from "~/server/db";
import { magicLinks, users } from "~/server/db/schema";

export async function generateAndInsertMagicLinkToken(userId: string) {
  const token = generateIdFromEntropySize(16);
  const tokenExpiresAt = createDate(new TimeSpan(5, "m"));

  const [result] = await db
    .insert(magicLinks)
    .values({
      userId,
      token,
      tokenExpiresAt,
    })
    .returning({ token: magicLinks.token });

  return result;
}

export async function getMagicToken(token: string) {
  const existingToken = await db.query.magicLinks.findFirst({
    where: eq(magicLinks.token, token),
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db.delete(magicLinks).where(eq(magicLinks.token, token));
}

export async function createMagicLinkUser(email: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
    })
    .returning();

  return user;
}

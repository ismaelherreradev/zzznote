import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { createDate, TimeSpan } from "oslo";
import { db } from "~/server/db";
import { magicLinks } from "~/server/db/schema";

export async function generateMagicLinkToken(userId: string) {
  const token = generateIdFromEntropySize(10);
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

export async function getMagicLinkTokenByUserId(userId: string) {
  const token = await db.query.magicLinks.findFirst({
    where: (magicLinks, { eq }) => eq(magicLinks.userId, userId),
  });

  return token;
}

export async function deleteMagicToken(userId: string) {
  await db.delete(magicLinks).where(eq(magicLinks.userId, userId));
}

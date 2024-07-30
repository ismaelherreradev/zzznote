import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "~/lib/auth";
import { validateRequest } from "./validate-request";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) {
    return undefined;
  }
  return session.user;
});

export async function setSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

import type { Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "~/lib/auth";

type validateRequestResult =
  | {
      user: User;
      session: Session;
    }
  | { user: null; session: null };

export async function uncachedValidateRequest(): Promise<validateRequestResult> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}

  return result;
}

export const validateRequest = cache(uncachedValidateRequest);

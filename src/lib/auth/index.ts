import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";
import { env } from "~/env";
import { db } from "~/server/db";
import { type SelectUser, sessions, users } from "~/server/db/schema";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "session",
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: SelectUser;
  }
}

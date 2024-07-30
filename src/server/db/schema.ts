import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { index, int, integer, primaryKey, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { generateIdFromEntropySize } from "lucia";

export const createTable = sqliteTableCreator((name) => `zzznote_${name}`);

export const accountTypeEnum = ["email", "google", "github"] as const;

export const users = createTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  email: text("email").unique(),
});

export type SelectUser = typeof users.$inferSelect;
export type UserInser = typeof users.$inferInsert;

export const accounts = createTable(
  "account",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .references(() => users.id)
      .unique()
      .notNull(),
    accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
    githubId: text("github_id").unique(),
    googleId: text("google_id").unique(),
  },
  (account) => ({
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export type SelecAccount = typeof accounts.$inferSelect;
export type InsertAccont = typeof accounts.$inferInsert;

export const magicLinks = createTable("magic_link", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .references(() => users.id)
    .unique()
    .notNull(),
  token: text("token").notNull(),
  tokenExpiresAt: integer("token_expires_at", { mode: "timestamp" }).notNull(),
});

export type SelectMagicLinks = typeof users.$inferSelect;
export type InsertMagicLinks = typeof users.$inferInsert;

export const profiles = createTable("profile", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .references(() => users.id)
    .unique()
    .notNull(),
  displayName: text("display_name"),
  avatar: text("image_id"),
  bio: text("bio").notNull().default(""),
  createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
});

export const sessions = createTable(
  "session",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    expiresAt: integer("expires_at").notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

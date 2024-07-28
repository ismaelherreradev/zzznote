// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
    int,
    integer,
    sqliteTableCreator,
    text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `zzznote_${name}`);

export const accountTypeEnum = ["email", "google", "github"] as const;

export const users = createTable("user", {
  id: text("id").notNull().primaryKey(),
  email: text("email").unique(),
});

export type User = typeof users.$inferSelect;

export const accounts = createTable("accounts", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
  // githubId: text("github_id").unique(),
  // googleId: text("google_id").unique(),
  // password: text("password"),
});

export const magicLinks = createTable("magic_links", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  token: text("token").notNull(),
  tokenExpiresAt: integer("token_expires_at", { mode: "timestamp" }).notNull(),
});

export type SelectMagicLinks = typeof users.$inferSelect;
export type InsertMagicLinks = typeof users.$inferInsert;

export const profiles = createTable("profile", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  displayName: text("display_name"),
  avatar: text("image_id"),
  bio: text("bio").notNull().default(""),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const sessions = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  expiresAt: integer("expires_at").notNull(),
});

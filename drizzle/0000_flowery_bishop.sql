CREATE TABLE `zzznote_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`account_type` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `zzznote_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `zzznote_magic_links` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text,
	`token_expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `zzznote_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `zzznote_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`display_name` text,
	`image_id` text,
	`bio` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `zzznote_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `zzznote_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `zzznote_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `zzznote_user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_accounts_user_id_unique` ON `zzznote_accounts` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_profile_user_id_unique` ON `zzznote_profile` (`user_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `zzznote_profile` (`display_name`);--> statement-breakpoint
CREATE INDEX `session_user_idx` ON `zzznote_session` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_user_email_unique` ON `zzznote_user` (`email`);
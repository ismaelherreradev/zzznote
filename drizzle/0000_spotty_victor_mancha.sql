CREATE TABLE `zzznote_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`account_type` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `zzznote_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `zzznote_magic_link` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`token` text NOT NULL,
	`token_expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `zzznote_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `zzznote_profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`display_name` text,
	`image_id` text,
	`bio` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `zzznote_user`(`id`) ON UPDATE no action ON DELETE cascade
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
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_account_user_id_unique` ON `zzznote_account` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_magic_link_user_id_unique` ON `zzznote_magic_link` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_profile_user_id_unique` ON `zzznote_profile` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_user_email_unique` ON `zzznote_user` (`email`);
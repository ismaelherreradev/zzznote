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
DROP INDEX IF EXISTS `session_user_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_profile_user_id_unique` ON `zzznote_profile` (`user_id`);
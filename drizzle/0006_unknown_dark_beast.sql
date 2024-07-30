DROP INDEX IF EXISTS `zzznote_account_provider_id_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `zzznote_account_provider_user_id_unique`;--> statement-breakpoint
/*
You're trying to delete PRIMARY KEY(provider_id,provider_user_id) from 'zzznote_account' table
SQLite does not supportprimary key deletion from existing table
You can do it in 3 steps with drizzle orm:
 - create new mirror table table without pk, rename current table to old_table, generate SQL
 - migrate old data from one table to another
 - delete old_table in schema, generate sql

or create manual migration like below:

ALTER TABLE table_name RENAME TO old_table;
CREATE TABLE table_name (
	column1 datatype [ NULL | NOT NULL ],
	column2 datatype [ NULL | NOT NULL ],
	...
	PRIMARY KEY (pk_col1, pk_col2, ... pk_col_n)
 );
INSERT INTO table_name SELECT * FROM old_table;

Due to that we don't generate migration automatically and it has to be done manually
*/
--> statement-breakpoint
ALTER TABLE `zzznote_account` ADD `id` integer PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE `zzznote_account` ADD `github_id` text;--> statement-breakpoint
ALTER TABLE `zzznote_account` ADD `google_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_account_github_id_unique` ON `zzznote_account` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `zzznote_account_google_id_unique` ON `zzznote_account` (`google_id`);--> statement-breakpoint
ALTER TABLE `zzznote_account` DROP COLUMN `provider_id`;--> statement-breakpoint
ALTER TABLE `zzznote_account` DROP COLUMN `provider_user_id`;
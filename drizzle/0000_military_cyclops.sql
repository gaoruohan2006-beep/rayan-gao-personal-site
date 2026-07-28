CREATE TABLE `visitor_events` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`city` text,
	`country` text,
	`path` text NOT NULL,
	`visit_day` text NOT NULL,
	`visited_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `visitor_events_visited_at_idx` ON `visitor_events` (`visited_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `visitor_events_daily_session_path_idx` ON `visitor_events` (`session_id`,`path`,`visit_day`);
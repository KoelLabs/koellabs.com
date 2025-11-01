CREATE TABLE IF NOT EXISTS "user_videos" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"video_id" varchar NOT NULL,
	"added_at" timestamp (3) DEFAULT now() NOT NULL,
	"last_watched" timestamp (3),
	"completed_sections" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videos" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"thumbnail" varchar NOT NULL,
	"vtt" varchar,
	"video" varchar NOT NULL,
	"link" varchar,
	"badge" varchar,
	"difficulty" varchar,
	"dialect" varchar,
	"dialect_flag" varchar,
	"dialect_icon" text,
	"duration" varchar,
	"completed_sections" integer DEFAULT 0,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);

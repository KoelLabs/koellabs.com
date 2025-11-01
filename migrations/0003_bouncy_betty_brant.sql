CREATE TABLE IF NOT EXISTS "user_section_progress" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"video_id" varchar NOT NULL,
	"section_id" varchar NOT NULL,
	"score" real,
	"transcription" text,
	"feedback" json,
	"top3_feedback" json,
	"word_scores" json,
	"side_by_side_feedback" json,
	"completed_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video_sections" (
	"id" varchar PRIMARY KEY NOT NULL,
	"video_id" varchar NOT NULL,
	"start" real NOT NULL,
	"end" real NOT NULL,
	"thumbnail" varchar,
	"target" text,
	"target_by_word" json,
	"order" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "captions" varchar;--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "external_link" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_section_progress" ADD CONSTRAINT "user_section_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_section_progress" ADD CONSTRAINT "user_section_progress_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_section_progress" ADD CONSTRAINT "user_section_progress_section_id_video_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."video_sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_sections" ADD CONSTRAINT "video_sections_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "beta_redirect_clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform" varchar(32) NOT NULL,
	"destination" varchar(64) NOT NULL,
	"campaign" varchar(128),
	"variant" varchar(128),
	"source" varchar(128),
	"medium" varchar(128),
	"recipient_id" varchar(128),
	"referrer" text,
	"user_agent" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);

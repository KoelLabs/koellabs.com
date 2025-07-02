ALTER TABLE "users" ADD COLUMN "metadata" json;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "onboarding_completed" boolean DEFAULT false;
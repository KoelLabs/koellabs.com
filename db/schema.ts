import { pgTable, varchar, integer, timestamp, text, boolean } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool);

// Define a User model
export const users = pgTable('users', {
  id: varchar('id').notNull().primaryKey(), // Firebase Auth UID
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  streak: integer('streak').notNull().default(0),
  stripeId: varchar('stripe_id'),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Define a Video model
export const videos = pgTable('videos', {
  id: varchar('id').notNull().primaryKey(),
  title: varchar('title').notNull(),
  thumbnail: varchar('thumbnail').notNull(),
  vtt: varchar('vtt'),
  video: varchar('video').notNull(),
  link: varchar('link'),
  badge: varchar('badge'),
  difficulty: varchar('difficulty'),
  dialect: varchar('dialect'),
  dialectFlag: varchar('dialect_flag'),
  dialectIcon: text('dialect_icon'),
  duration: varchar('duration'),
  completedSections: integer('completed_sections').default(0),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Define a User-Video association model
export const userVideos = pgTable('user_videos', {
  id: varchar('id').notNull().primaryKey(),
  userId: varchar('user_id').notNull(),
  videoId: varchar('video_id').notNull(),
  addedAt: timestamp('added_at', { mode: 'date', precision: 3 }).notNull().defaultNow(),
  lastWatched: timestamp('last_watched', { mode: 'date', precision: 3 }),
  completedSections: integer('completed_sections').default(0),
});

import { pgTable, varchar, integer, timestamp, text, boolean, json } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool);

// Auth
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),

  // extra columns, also add as additional fields in utils/auth.ts
  streak: integer('streak').notNull().default(0),
  stripeId: varchar('stripe_id'),

  // User preferences
  metadata: json('metadata'),
  onboardingCompleted: boolean('onboarding_completed').default(false),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),
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
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  videoId: varchar('video_id').notNull(),
  addedAt: timestamp('added_at', { mode: 'date', precision: 3 }).notNull().defaultNow(),
  lastWatched: timestamp('last_watched', { mode: 'date', precision: 3 }),
  completedSections: integer('completed_sections').default(0),
});

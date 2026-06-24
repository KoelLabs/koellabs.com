import { pgTable, varchar, integer, timestamp, serial, text } from 'drizzle-orm/pg-core';
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

export const betaRedirectClicks = pgTable('beta_redirect_clicks', {
  id: serial('id').primaryKey(),
  platform: varchar('platform', { length: 32 }).notNull(),
  destination: varchar('destination', { length: 64 }).notNull(),
  campaign: varchar('campaign', { length: 128 }),
  variant: varchar('variant', { length: 128 }),
  source: varchar('source', { length: 128 }),
  medium: varchar('medium', { length: 128 }),
  recipientId: varchar('recipient_id', { length: 128 }),
  referrer: text('referrer'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).notNull().defaultNow(),
});

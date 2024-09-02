import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool);

// Define a User model
export const User = pgTable('users', {
  id: varchar('id').notNull().primaryKey(), // Firebase Auth UID
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  stripeId: varchar('stripe_id'),
});

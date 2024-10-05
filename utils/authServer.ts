// import 'server-only';
'use server';

// firebase admin SDK to verify login tokens
import * as admin from 'firebase-admin';
try {
  admin.app();
} catch (e) {
  admin.initializeApp({
    credential: admin.credential.cert(
      process.env.FIREBASE_SERVICE_ACCOUNT
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
        : process.env.GOOGLE_APPLICATION_CREDENTIALS,
    ),
  });
}
// database access for user registration
import { db, users } from '../db/schema';
import { eq } from 'drizzle-orm';

export type User = {
  id: string;
  name: string;
  email: string;
};

/**
 * Verify a user's login token and return their user object
 * @param {string} token the user's login token
 * @returns {Promise<User | null>} the user object if successful, null otherwise
 */
export async function getVerifiedUser(token) {
  'use server';

  const id = await getVerifiedUserId(token);
  if (!id) return null;

  const user = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
    })
    .from(users)
    .where(eq(users.id, id))[0];

  return user;
}

/**
 * Verify a user's login token and return their user ID
 * @param token the user's login token
 * @returns {Promise<string | null>} the user ID if successful, null otherwise
 */
export async function getVerifiedUserId(token) {
  'use server';
  try {
    const decodedToken = await admin.auth().verifyIdToken(token, true);
    return decodedToken.uid;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Verify a user's login token and insert or update their user info in the database
 * @param {string} token the user's login token
 * @returns {Promise<User>} the user object if successful, null otherwise
 * @throws {Error} if the token is invalid/has expired
 */
export async function getAndSetUser(token) {
  'use server';

  const decodedToken = await admin.auth().verifyIdToken(token, true);
  const decodedUser = {
    id: decodedToken.uid,
    name: decodedToken.name ?? decodedToken.email.split('@')[0],
    email: decodedToken.email_verified ? decodedToken.email : 'Unverified: ' + decodedToken.email,
    picture: decodedToken.picture,
  };

  const user = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    streak: users.streak,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  }).from(users).where(eq(users.id, decodedToken.uid));

  if (user.length === 0) {
    await db.insert(users).values({
      id: decodedToken.uid,
      name: decodedToken.name ?? decodedToken.email.split('@')[0],
      email: decodedToken.email_verified ? decodedToken.email : 'Unverified: ' + decodedToken.email,
    });
  } else if (user[0].name !== decodedUser.name || user[0].email !== decodedUser.email) {
    await db.update(users).set(decodedUser).where(eq(users.id, decodedToken.uid));
  }

  // return the client user object
  return {
    ...user[0],
    ...decodedUser,
  };
}

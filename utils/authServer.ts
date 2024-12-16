import 'server-only';

// firebase admin SDK to verify login tokens
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
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

/**
 * Verify a user's login token and return their user id
 * @param {string} token the user's login token
 * @returns {Promise<string | null>} the user id if successful, null otherwise
 */
export async function getVerifiedUid(token) {
  'use server';

  // verify the token
  let decodedToken: DecodedIdToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(token, true);
  } catch (e) {
    return null;
  }

  return decodedToken.uid;
}

/**
 * Verify a user's login token and insert or update their user info in the database
 * @param {string} token the user's login token
 * @returns {Promise<any>} the user object if successful, null otherwise
 */
export async function getAndSetVerifiedUser(token) {
  'use server';

  // verify the token
  let decodedToken: DecodedIdToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(token, true);
  } catch (e) {
    return null;
  }

  // get latest user info from the token
  const decodedUser = {
    id: decodedToken.uid,
    name: decodedToken.name ?? decodedToken.email?.split('@')[0],
    email: decodedToken.email_verified ? decodedToken.email : 'Unverified: ' + decodedToken.email,
  };

  // upsert and get the user info in the database
  const user = await db
    .insert(users)
    .values(decodedUser)
    .onConflictDoUpdate({ target: users.id, set: decodedUser })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      streak: users.streak,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  // return the user object
  return {
    ...user[0],
    ...decodedUser,
    picture: decodedToken.picture,
  };
}

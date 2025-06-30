import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient();

export async function getUser() {
  const {
    data,
    error, // error object
  } = await authClient.getSession();

  return { user: data?.user, error };
}

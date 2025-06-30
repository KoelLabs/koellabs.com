import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient();

export async function getUser() {
  const {
    data,
    error, // error object
  } = await authClient.getSession();

  return { user: data?.user, error };
}

// How to use as hook in client components:
// import { authClient } from "@/lib/auth-client"
// const {
//     data: session,
//     isPending, // loading state
//     error, // error object
//     refetch // refetch the session
// } = authClient.useSession()

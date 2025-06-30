import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/schema';
import * as schema from '@/db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      // TODO: hook up nice react email template
      // await sendEmail({
      //   to: user.email,
      //   subject: 'Reset your password',
      //   text: `Click the link to reset your password: ${url}`,
      // });
    },
    requireEmailVerification: false, // TODO: enable
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // TODO: hook up nice react email template
      // await sendEmail({
      //     to: user.email,
      //     subject: 'Verify your email address',
      //     text: `Click the link to verify your email: ${url}`
      // })
    },
    sendOnSignUp: false, // TODO: enable
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()], // nextCookies must be last
  user: {
    additionalFields: {
      streak: {
        type: 'number',
        required: false,
        defaultValue: 0,
        input: false, // don't allow user to set
      },
      stripeId: {
        type: 'string',
        required: false,
        input: false, // don't allow user to set
      },
    },
  },
});

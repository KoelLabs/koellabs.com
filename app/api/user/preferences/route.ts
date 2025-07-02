import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    // Get the current session
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const { targetLanguage, targetDialect, nativeLanguage, nativeDialect, hasConsented } =
      await request.json();

    // Update the user record with the new preferences
    await db
      .update(users)
      .set({
        // Add preferences as JSON string in the metadata field
        metadata: JSON.stringify({
          targetLanguage,
          targetDialect,
          nativeLanguage,
          nativeDialect,
          hasConsented,
        }),
        // Mark onboarding as completed
        onboardingCompleted: true,
      })
      .where(eq(users.id, session.user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}

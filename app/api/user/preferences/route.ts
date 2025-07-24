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
    const body = await request.json();
    const {
      // New onboarding fields
      nativeLanguage,
      placeOfBirth,
      birthday,
      targetLanguage,
      experienceLevel,
      learningCity,
      challengingWords,
      // Legacy fields for backward compatibility
      hasConsented,
      avatar,
    } = body;

    // Create metadata object with all user preferences
    const metadata = {
      nativeLanguage,
      placeOfBirth,
      birthday,
      targetLanguage,
      experienceLevel,
      learningCity,
      challengingWords,
      // Include legacy fields for backward compatibility
      hasConsented,
      // Add timestamp for when preferences were last updated
      lastUpdated: new Date().toISOString(),
    };

    // Update the user record with the new preferences
    await db
      .update(users)
      .set({
        // Store all preferences as JSON in the metadata field
        metadata: JSON.stringify(metadata),
        // Update the image field if avatar is provided
        ...(avatar ? { image: avatar } : {}),
        // Mark onboarding as completed
        onboardingCompleted: true,
        // Update the updatedAt timestamp
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}

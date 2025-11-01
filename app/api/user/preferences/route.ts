import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      nativeLanguage,
      nativeLanguageCountry,
      birthday,
      targetLanguage,
      experienceLevel,
      learningCity,
      challengingWords,
      hasConsented,
      avatar,
    } = body;

    const metadata = {
      nativeLanguage,
      nativeLanguageCountry,
      birthday,
      targetLanguage,
      experienceLevel,
      learningCity,
      challengingWords,
      hasConsented,
      lastUpdated: new Date().toISOString(),
    };

    await db
      .update(users)
      .set({
        metadata: JSON.stringify(metadata),
        ...(avatar ? { image: avatar } : {}),
        onboardingCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}

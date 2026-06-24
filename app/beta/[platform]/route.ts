import { NextRequest, NextResponse } from 'next/server';

import { betaRedirectClicks, db } from '@/db/schema';

const destinations: Record<string, Record<string, string>> = {
  android: {
    testing: 'https://play.google.com/apps/testing/com.slayspeech.app',
    store: 'https://play.google.com/store/apps/details?id=com.slayspeech.app',
  },
};

const cleanParam = (value: string | null, maxLength: number) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform: rawPlatform } = await params;
  const platform = rawPlatform.toLowerCase();
  const searchParams = request.nextUrl.searchParams;
  const destination = cleanParam(searchParams.get('destination'), 64) || 'testing';
  const target = destinations[platform]?.[destination];

  if (!target) {
    return NextResponse.json({ error: 'Unsupported beta redirect target' }, { status: 404 });
  }

  try {
    await db.insert(betaRedirectClicks).values({
      platform,
      destination,
      campaign: cleanParam(searchParams.get('campaign') || searchParams.get('utm_campaign'), 128),
      variant: cleanParam(searchParams.get('variant') || searchParams.get('utm_content'), 128),
      source: cleanParam(searchParams.get('source') || searchParams.get('utm_source'), 128),
      medium: cleanParam(searchParams.get('medium') || searchParams.get('utm_medium'), 128),
      recipientId: cleanParam(searchParams.get('recipient_id'), 128),
      referrer: cleanParam(request.headers.get('referer'), 2048),
      userAgent: cleanParam(request.headers.get('user-agent'), 2048),
    });
  } catch (error) {
    console.error('Failed to record beta redirect click', error);
  }

  return NextResponse.redirect(target, { status: 302 });
}

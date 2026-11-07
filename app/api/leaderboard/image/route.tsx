import { ImageResponse } from 'next/og';
import { getLeaderboard } from '@/lib/leaderboard-server';
import { leaderboardImage } from '@/lib/leaderboard-image';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const variant =
    new URL(request.url).searchParams.get('variant') === 'hero' ? 'hero' : 'thumbnail';
  const { entries } = await getLeaderboard();
  const { element, font, width, height } = await leaderboardImage(entries, variant);
  return new ImageResponse(element, {
    width,
    height,
    fonts: [{ name: 'OpenRunde', data: font, weight: 500, style: 'normal' }],
    headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600' },
  });
}

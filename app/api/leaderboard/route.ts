import { getLeaderboard } from '@/lib/leaderboard-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await getLeaderboard(), {
    headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
  });
}

import { unstable_cache } from 'next/cache';
import { fallbackLeaderboard, parseLeaderboardEvent, type LeaderboardData } from './leaderboard';

const API = 'https://koellabs-ipa-transcription-en.hf.space/gradio_api/call/get_leaderboard_view';

export async function fetchHuggingFaceLeaderboard(): Promise<LeaderboardData> {
  // One deadline covers both queue submission and the streamed result, including a sleeping Space.
  const signal = AbortSignal.timeout(15_000);
  const response = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [['Average'], 'FER'] }),
    cache: 'no-store',
    signal,
  });
  if (!response.ok) throw new Error('Could not request leaderboard');
  const { event_id } = await response.json();
  if (typeof event_id !== 'string' || !/^[a-f\d]+$/i.test(event_id))
    throw new Error('Invalid leaderboard event ID');
  const result = await fetch(`${API}/${event_id}`, { cache: 'no-store', signal });
  if (!result.ok || !result.body) throw new Error('Could not read leaderboard');
  const reader = result.body.getReader();
  const decoder = new TextDecoder();
  let stream = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      stream += decoder.decode(value, { stream: !done });
      if (stream.length > 2_000_000) throw new Error('Leaderboard response too large');
      if (/(?:^|\n)event: (?:complete|error)\r?\n[\s\S]*?\r?\n\r?\n/.test(stream) || done) break;
    }
  } finally {
    await reader.cancel();
  }
  const entries = parseLeaderboardEvent(stream);
  return {
    entries,
    updated_at: entries.reduce(
      (latest, entry) => (entry.submission_date > latest ? entry.submission_date : latest),
      '',
    ),
    fetched_at: new Date().toISOString(),
    source: 'huggingface',
  };
}

// Cache only successful reads. Next keeps the last successful value while revalidating hourly.
const cachedLeaderboard = unstable_cache(fetchHuggingFaceLeaderboard, ['ipa-leaderboard-v1'], {
  revalidate: 3600,
});

export async function getLeaderboard(): Promise<LeaderboardData> {
  try {
    return await cachedLeaderboard();
  } catch {
    return fallbackLeaderboard;
  }
}

'use client';

import { useEffect, useState } from 'react';
import { fallbackLeaderboard, type LeaderboardData } from './leaderboard';

export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardData>(fallbackLeaderboard);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/leaderboard', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Leaderboard unavailable');
        return response.json();
      })
      .then((result: LeaderboardData) => {
        if (result.entries?.length) setData(result);
      })
      .catch(() => {
        /* Keep the snapshot visible if the request fails. */
      });
    return () => controller.abort();
  }, []);
  return data;
}

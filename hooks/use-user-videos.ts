'use client';

import useSWR from 'swr';
import { getUserVideos } from '@/lib/videos';
import { useMemo } from 'react';

async function fetchUserVideos() {
  try {
    return await getUserVideos();
  } catch (error) {
    console.error('Error fetching user videos:', error);
    return [];
  }
}

export function useUserVideos() {
  const { data, error, isLoading, mutate } = useSWR('user-videos', fetchUserVideos, {
    dedupingInterval: 5000,
    revalidateOnFocus: false,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
  });

  const videos = useMemo(() => data || [], [data]);

  return {
    videos,
    error,
    isLoading,
    mutate,
  };
}

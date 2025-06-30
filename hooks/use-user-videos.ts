'use client';

import useSWR from 'swr';
import { getUserVideos } from '@/lib/videos';

async function fetchUserVideos() {
  try {
    return await getUserVideos();
  } catch (error) {
    console.error('Error fetching user videos:', error);
    return [];
  }
}

export function useUserVideos() {
  const { data, error, isLoading, mutate } = useSWR('user-videos', fetchUserVideos);

  return {
    videos: data || [],
    error,
    isLoading,
    mutate,
  };
}

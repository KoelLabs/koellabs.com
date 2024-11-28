'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/base/badge';
import { Play, Pause } from 'lucide-react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function Page() {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // dummy data to represent user's data of videos
  const videos = [
    {
      name: 'Friends Season 1 - Clip Joey and Chandler',
      link: 'E6LpBIwGyA4',
      id: 'eWOKwlFQJAjQ',
      badge: 'Hard',
    },
    {
      name: 'Schitts Creek Season 3 - Clip David and Alexis',
      link: 'QIoVaphXbz8',
      id: '0A4Dq41bPQZ1',
      badge: 'Easy',
    },
    {
      name: 'The Office Season 1 - Clip Jim and Dwight',
      link: 'WaaANll8h18',
      id: 'JQMDL16t8isF',
      badge: 'Medium',
    },
  ];

  const currentVideo = videos.find(video => pathname.includes(video.id));

  useEffect(() => {
    // Load the YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize the player when the API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (currentVideo) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          videoId: currentVideo.link,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
          playerVars: {
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            autoplay: 0,
            rel: 0,
          },
        });
        setPlayer(newPlayer);
      }
    };
  }, [currentVideo]);

  const onPlayerReady = (event: any) => {
    setDuration(event.target.getDuration());
  };

  const onPlayerStateChange = (event: any) => {
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
  };

  useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [player]);

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0];
    player.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-900';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border border-orange-200 dark:border-orange-900';
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-200 dark:border-green-900';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-900';
    }
  };

  return (
    <div className="h-fit w-full rounded-md relative p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold tracking-tighter">
          {currentVideo ? currentVideo.name : 'No video selected'}
        </h1>
        {currentVideo && (
          <Badge
            className={`${getBadgeColor(currentVideo.badge)} px-2 py-1 text-xs font-medium rounded`}
          >
            {currentVideo.badge}
          </Badge>
        )}
      </div>
      <div className="flex w-full h-full gap-3">
        <div className="aspect-video flex-[4] w-full h-full bg-neutral-100 border border-dashed border-neutral-200 rounded-md overflow-hidden dark:bg-neutral-800 dark:border-neutral-950">
          <div ref={playerRef}></div>
        </div>
        <div className="aspect-[4/2] flex-1 w-full h-full bg-neutral-100 border border-dashed border-neutral-200 rounded-md overflow-hidden dark:bg-neutral-800 dark:border-neutral-950"></div>
      </div>
      <div className="bg-neutral-100 border border-dashed border-neutral-200 rounded-md p-4 w-full dark:bg-neutral-800 dark:border-neutral-950"></div>
    </div>
  );
}

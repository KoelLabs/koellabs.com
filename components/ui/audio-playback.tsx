'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/base/button';
import { Play, Pause } from 'lucide-react';
import WaveSurfer from '@wavesurfer/react';

interface AudioPlaybackProps {
  audioBlob?: Blob;
  onPlay?: () => void;
  className?: string;
}

export function AudioPlayback({ audioBlob, onPlay, className = '' }: AudioPlaybackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onReady = useCallback((ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
    setDuration(ws.getDuration());
  }, []);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);

  const handleTimeUpdate = useCallback((currentTime: number) => {
    setCurrentTime(currentTime);
  }, []);

  useEffect(() => {
    if (audioBlob && wavesurfer) {
      const audioUrl = URL.createObjectURL(audioBlob);
      wavesurfer.load(audioUrl);

      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioBlob, wavesurfer]);

  const handlePlayPause = async () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    } else if (onPlay) {
      // Fallback to external play function if no wavesurfer instance
      onPlay();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-3 p-3 border border-dashed rounded-2xl ${className}`}>
      <Button
        size="sm"
        disabled={!audioBlob}
        className="h-7 w-7 rounded-full text-white p-0 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <Pause className="h-3 w-3" fill="currentColor" />
        ) : (
          <Play className="h-3 w-3" fill="currentColor" />
        )}
      </Button>

      {/* Waveform visualization */}
      <div className="flex-1 flex items-center h-8" ref={containerRef}>
        {audioBlob ? (
          <WaveSurfer
            height={32}
            waveColor="rgb(163, 163, 163)"
            progressColor="rgb(115, 115, 115)"
            cursorColor="rgb(59, 130, 246)"
            barWidth={2}
            barGap={1}
            barRadius={2}
            onReady={onReady}
            onPlay={handlePlay}
            onPause={handlePause}
            onTimeupdate={handleTimeUpdate}
            normalize={true}
            backend="WebAudio"
            mediaControls={false}
          />
        ) : (
          // Fallback static visualization
          <div className="flex items-center gap-0.5 h-8 w-full">
            <span className="text-sm text-neutral-500 dark:text-neutral-400 open-runde-medium tracking-tight">
              {audioBlob === undefined ? 'No audio blob provided' : 'Loading audio...'}
            </span>
          </div>
        )}
      </div>

      <div className="text-sm font-mono text-neutral-600 dark:text-neutral-400 open-runde-medium tracking-tight">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}

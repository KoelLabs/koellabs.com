'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/base/button';
import { Circle, RefreshCw } from 'lucide-react';

export default function RecordingComponent({ feedbackGiver }) {
  const [status, setStatus] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setStatus('recorded');
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setStatus('recording');
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  }, []);

  const restartRecording = useCallback(() => {
    setStatus('idle');
    setAudioBlob(null);
    setAudioUrl(null);
    startRecording();
  }, [startRecording]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && status === 'idle') {
        e.preventDefault();
        startRecording();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && status === 'recording') {
        e.preventDefault();
        stopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [status, startRecording, stopRecording]);

  return (
    <div className="flex flex-col max-w-[22rem] bg-neutral-100 rounded-md dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-950">
      <div className="flex gap-3 justify-between items-center m-4 mb-2">
        <h2 className="text-xl font-semibold tracking-tighter flex items-center gap-2">
          {status === 'recording' ? 'Recording' : status === 'recorded' ? 'Recorded' : 'Record'}
          {status === 'recording' && (
            <Circle className="h-4 w-4 text-red-500 animate-pulse" fill="currentColor" />
          )}
          {status === 'recorded' && (
            <Circle className="h-4 w-4 text-[#1B997B]" fill="currentColor" />
          )}
        </h2>
        <p className="text-xs tracking-tight text-neutral-500">
          Hold{' '}
          <span className="rounded-full bg-neutral-200/50 border border-neutral-300 px-1.5 py-0.5">
            Space
          </span>
        </p>
      </div>
      <p className="text-sm tracking-tight text-neutral-600 mx-4 mb-4">
        {status === 'idle'
          ? 'Start recording below using the microphone button or hold down the space bar.'
          : status === 'recording'
            ? 'Recording in progress. Release space or click stop to finish.'
            : 'Recording complete. Click restart to record again.'}
      </p>
      <div className="flex border-y mb-1 border-neutral-200 dark:border-neutral-800 p-4 gap-2">
        {status !== 'recorded' && (
          <Button
            variant="outline"
            className={`px-2 h-7 text-xs font-medium rounded-md ${
              status === 'recording'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-900 hover:bg-red-200 dark:hover:bg-red-800'
                : 'bg-[#C7E9DE] border border-[#9DD8C5] text-[#1B997B] hover:bg-[#C7E9DE]/80 hover:text-[#1B997B]'
            }`}
            onClick={status === 'recording' ? stopRecording : startRecording}
          >
            <Circle
              className={`h-4 w-4 mr-1 ${status === 'recording' ? 'text-red-800 dark:text-red-200' : 'text-[#1B997B]'}`}
              fill="currentColor"
            />
            {status === 'recording' ? 'Stop' : 'Start'}
          </Button>
        )}
        {status === 'recorded' && (
          <Button
            variant="outline"
            className="px-2 h-7 text-xs font-medium rounded-md bg-neutral-200 text-neutral-700 border border-neutral-300 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-600"
            onClick={restartRecording}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Restart
          </Button>
        )}
      </div>
      {audioUrl && (
        <div className="m-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Recording saved!</p>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
  );
}

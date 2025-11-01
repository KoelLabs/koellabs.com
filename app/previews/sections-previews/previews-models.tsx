'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/base/button';
import { Mic, StopCircle, Loader2 } from 'lucide-react';
import { FeedbackGiver } from '@/server/src/static/FeedbackGiver.js';

export default function PreviewsModels() {
  const [isRecording, setIsRecording] = useState(false);
  const [isMicInitializing, setIsMicInitializing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const feedbackGiverRef = useRef<any>(null);

  // Create a long placeholder sentence to keep SpeechRecognition happy while we stream IPA
  const PLACEHOLDER_WORDS: any = Array.from({ length: 64 }, (_, i) => [`word${i + 1}`, []]);

  const start = async () => {
    try {
      if (isRecording) return;
      setIsMicInitializing(true);
      setTranscription('');

      const serverHost =
        process.env.NEXT_PUBLIC_SERVER_HOST && process.env.NEXT_PUBLIC_SERVER_HOST.length > 0
          ? process.env.NEXT_PUBLIC_SERVER_HOST
          : `${window.location.hostname}:8080`;

      feedbackGiverRef.current = new FeedbackGiver(
        PLACEHOLDER_WORDS,
        (newTranscription: any) => {
          const text = Array.isArray(newTranscription)
            ? newTranscription.join(' ')
            : String(newTranscription ?? '');
          setTranscription(text);
        },
        () => {},
        undefined, // ensure worklet loads from Next.js origin (/WavWorklet.js)
        serverHost,
      );

      await feedbackGiverRef.current.start();
      setIsRecording(true);
    } catch (e) {
      console.error('Error starting mic preview:', e);
    } finally {
      setIsMicInitializing(false);
    }
  };

  const stop = async () => {
    try {
      if (!isRecording) return;
      if (feedbackGiverRef.current) {
        await feedbackGiverRef.current.stop();
      }
    } catch (e) {
      console.error('Error stopping mic preview:', e);
    } finally {
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (feedbackGiverRef.current) {
        feedbackGiverRef.current.stop();
      }
    };
  }, []);

  return (
    <div id="models" className="">
      <div className="mx-auto">
        <section
          aria-labelledby="features-heading"
          className="mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 overflow-hidden"
        >
          <div
            data-cursor-opacity="0.8"
            data-cursor-size="240"
            data-cursor-color="#2A4BCC"
            className="bg-white py-24 sm:py-32"
          >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl lg:px-8 z-[1000] relative">
              <p className="text-base/7 font-semibold text-blue-600 relative z-10">Model Preview</p>
              <h2
                id="features-heading"
                className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10"
              >
                Speak and see the raw IPA transcript
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {isRecording ? (
                      <Button
                        className="border px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 border-[#FECACA] bg-[#FEE2E2] text-[#991B1B] dark:bg-[#451A1A] dark:text-[#FECACA] hover:bg-[#FEE2E2]/80"
                        onClick={stop}
                        disabled={isMicInitializing}
                      >
                        <StopCircle className="mr-2 size-4" /> Stop
                      </Button>
                    ) : (
                      <Button
                        className={`border px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 ${
                          isMicInitializing
                            ? 'text-neutral-400 bg-neutral-100 border-neutral-200 cursor-not-allowed'
                            : 'text-[#1B997B] bg-[#C7E9DE] border-[#9DD8C5] hover:bg-[#C7E9DE]/80'
                        }`}
                        onClick={start}
                        disabled={isMicInitializing}
                      >
                        {isMicInitializing ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" /> Initializing
                            Microphone...
                          </>
                        ) : (
                          <>
                            <Mic className="mr-2 size-4" /> Start
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <p className="text-sm text-neutral-600">
                    This demo streams your speech to our model and shows the raw IPA tokens in real
                    time.
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 rounded-2xl p-4 min-h-[160px]">
                  <h3 className="text-sm font-medium text-neutral-700 mb-2">Live IPA transcript</h3>
                  <div className="text-lg tracking-tight text-neutral-900 break-words whitespace-pre-wrap">
                    {transcription || '—'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/base/label';
import { Button } from '@/components/ui/base/button';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import { Mic, MicOff, Play, Pause, ArrowRight, ArrowLeft, Trash } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const phrases = [
  'Thieves who wore warm fleecy woolens blew strong winds past ragged flags, robbed friends who deserved jail, and sold fifty bonds at the booth counter.',
  'They shared chunks of a stale cheese burger while the girl watched with fright from the lodge.',
];

export default function SpeechAssessmentPage() {
  const { onboardingData, updateOnboardingData, completeOnboarding, isCompleting } =
    useOnboarding();
  const router = useRouter();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordings, setRecordings] = useState([null, null]);
  const [audioBlobs, setAudioBlobs] = useState([null, null]);
  const [audioDataNumbers, setAudioDataNumbers] = useState([null, null]);
  const [isPlayingFromNumbers, setIsPlayingFromNumbers] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);
  const analyzerRef = useRef(null);
  const wordIndexRef = useRef(0);
  const currentPhraseRef = useRef(0);

  const phraseWords = phrases.map(phrase => phrase.split(' '));

  // Keep refs in sync with state
  useEffect(() => {
    currentPhraseRef.current = currentPhrase;
  }, [currentPhrase]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const convertAudioToNumbers = async audioBlob => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      const arrayBuffer = await audioBlob.arrayBuffer();

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0);

      const audioArray = Array.from(channelData);

      return {
        audioData: audioArray,
        sampleRate: audioBuffer.sampleRate,
        duration: audioBuffer.duration,
        numberOfChannels: audioBuffer.numberOfChannels,
        length: audioArray.length,
      };
    } catch (error) {
      console.error('Error converting audio to numbers:', error);
      return null;
    }
  };

  const playAudioFromNumbers = async (audioData, sampleRate) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      const audioBuffer = audioContext.createBuffer(1, audioData.length, sampleRate);
      const channelData = audioBuffer.getChannelData(0);

      for (let i = 0; i < audioData.length; i++) {
        channelData[i] = audioData[i];
      }

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      setIsPlayingFromNumbers(true);
      source.start();

      source.onended = () => {
        setIsPlayingFromNumbers(false);
      };
    } catch (error) {
      console.error('Error playing audio from numbers:', error);
      setIsPlayingFromNumbers(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const newRecordings = [...recordings];
        const newAudioBlobs = [...audioBlobs];
        newRecordings[currentPhrase] = audioUrl;
        newAudioBlobs[currentPhrase] = audioBlob;
        setRecordings(newRecordings);
        setAudioBlobs(newAudioBlobs);

        const audioData = await convertAudioToNumbers(audioBlob);
        if (audioData) {
          const newAudioDataNumbers = [...audioDataNumbers];
          newAudioDataNumbers[currentPhrase] = audioData;
          setAudioDataNumbers(newAudioDataNumbers);

          console.log(`Speech Assessment - Phrase ${currentPhrase + 1} Audio Data:`, {
            phraseIndex: currentPhrase,
            phraseText: phrases[currentPhrase],
            audioMetadata: {
              sampleRate: audioData.sampleRate,
              duration: audioData.duration,
              numberOfChannels: audioData.numberOfChannels,
              dataLength: audioData.length,
            },
            audioPreview: audioData.audioData.slice(0, 100),
            speechAssessmentData: {
              userId: 'user-id-placeholder',
              phraseIndex: currentPhrase,
              audioData: audioData.audioData,
              sampleRate: audioData.sampleRate,
              duration: audioData.duration,
              timestamp: new Date().toISOString(),
            },
          });
        }

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    const audioUrl = recordings[currentPhrase];
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    const newRecordings = [...recordings];
    const newAudioBlobs = [...audioBlobs];
    const newAudioDataNumbers = [...audioDataNumbers];

    newRecordings[currentPhrase] = null;
    newAudioBlobs[currentPhrase] = null;
    newAudioDataNumbers[currentPhrase] = null;

    setRecordings(newRecordings);
    setAudioBlobs(newAudioBlobs);
    setAudioDataNumbers(newAudioDataNumbers);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPlayingFromNumbers(false);
    wordIndexRef.current = 0;
  };

  const handleNext = () => {
    updateOnboardingData('speechAssessment', {
      recordings: audioBlobs.filter(blob => blob !== null),
      completedPhrases: recordings.filter(recording => recording !== null).length,
      timestamp: new Date().toISOString(),
    });

    completeOnboarding();
  };

  const handleBack = () => {
    router.push('/onboarding/language-goals');
  };

  const allRecorded = recordings.every(recording => recording !== null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center p-8 text-center mx-4 rounded-xl z-40 bg-white/40 border-neutral-200 dark:border-neutral-800 max-w-2xl w-full">
        <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />

        <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Speech Assessment</h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-6 max-w-md text-balance z-10">
          Record yourself reading these phrases to help us understand your speech patterns
        </p>

        <div className="flex gap-2 mb-6">
          {phrases.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isRecording) {
                  setCurrentPhrase(index);
                  wordIndexRef.current = 0;
                }
              }}
              disabled={isRecording}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                recordings[index]
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : index === currentPhrase
                    ? 'border-sky-700 bg-sky-700 text-white'
                    : isRecording
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-neutral-300 text-neutral-500 hover:border-neutral-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="space-y-6 w-full">
          <div className="space-y-4">
            <div className="space-y-3 text-left">
              <Label className="text-lg font-medium tracking-tight">
                Phrase {currentPhrase + 1} of {phrases.length}
              </Label>
              <div
                className={`p-4 rounded-2xl mt-2 w-full overflow-hidden transition-colors duration-300 ${
                  recordings[currentPhrase]
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 dark:border-emerald-700 border-2'
                    : 'dark:bg-neutral-800 border'
                }`}
              >
                <p
                  className={`text-xl leading-relaxed break-words whitespace-normal tracking-tight transition-colors duration-300 ${
                    recordings[currentPhrase]
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {phraseWords[currentPhrase].map((word, index) => (
                    <>
                      {index > 0 && ' '}
                      <span key={index} className={``}>
                        {word}
                      </span>
                    </>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3 justify-between w-full">
                {!recordings[currentPhrase] ? (
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center gap-2 ${
                      isRecording ? 'bg-red-600 hover:bg-red-700 text-white' : ' text-white'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-4 h-4" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" />
                        Start Recording
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={isPlaying ? pauseRecording : playRecording}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Play
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetRecording}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Trash className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                )}
                {phrases.length > 1 && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        if (!isRecording) {
                          const newPhraseIndex = Math.max(0, currentPhrase - 1);
                          setCurrentPhrase(newPhraseIndex);
                          wordIndexRef.current = 0;
                        }
                      }}
                      disabled={currentPhrase === 0 || isRecording}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        if (!isRecording) {
                          const newPhraseIndex = Math.min(phrases.length - 1, currentPhrase + 1);
                          setCurrentPhrase(newPhraseIndex);
                          wordIndexRef.current = 0;
                        }
                      }}
                      disabled={currentPhrase === phrases.length - 1 || isRecording}
                      variant={recordings[currentPhrase] ? 'default' : 'outline'}
                      className="flex items-center gap-1"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isRecording && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm tracking-tight">Recording...</span>
                  </div>
                </div>
              )}

              {recordings[currentPhrase] && !isRecording && (
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-sm tracking-tight">Recording Complete</span>
                </div>
              )}
            </div>

            {/* Developer debuging - Keeping it here for now in case we need it later */}
            {/* {audioDataNumbers[currentPhrase] && (
              <div className="space-y-3 mt-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    🐛 Debug: Audio Numbers
                  </Label>
                  <Button
                    onClick={() =>
                      playAudioFromNumbers(
                        audioDataNumbers[currentPhrase].audioData,
                        audioDataNumbers[currentPhrase].sampleRate,
                      )
                    }
                    disabled={isPlayingFromNumbers}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                  >
                    {isPlayingFromNumbers ? (
                      <>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        Play from Numbers
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium">Sample Rate:</span>{' '}
                    {audioDataNumbers[currentPhrase].sampleRate}Hz |
                    <span className="font-medium"> Duration:</span>{' '}
                    {audioDataNumbers[currentPhrase].duration.toFixed(2)}s |
                    <span className="font-medium"> Length:</span>{' '}
                    {audioDataNumbers[currentPhrase].length.toLocaleString()} samples
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      First 20 numbers:
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-2 rounded text-xs font-mono border max-h-20 overflow-y-auto">
                      [
                      {audioDataNumbers[currentPhrase].audioData
                        .slice(0, 20)
                        .map(n => n.toFixed(6))
                        .join(', ')}
                      ...]
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      Statistics:
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      Min:{' '}
                      {audioDataNumbers[currentPhrase].audioData
                        .reduce((min, val) => Math.min(min, val), Infinity)
                        .toFixed(6)}{' '}
                      | Max:{' '}
                      {audioDataNumbers[currentPhrase].audioData
                        .reduce((max, val) => Math.max(max, val), -Infinity)
                        .toFixed(6)}{' '}
                      | Avg:{' '}
                      {(
                        audioDataNumbers[currentPhrase].audioData.reduce((a, b) => a + b, 0) /
                        audioDataNumbers[currentPhrase].audioData.length
                      ).toFixed(6)}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>

        <div className="flex gap-3 mt-8 w-full justify-between">
          <Button variant="outline" onClick={handleBack} className="flex-1 gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="rotate-90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Button>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 text-center px-2">
            Step 3 of 3
          </p>
          <Button
            onClick={handleNext}
            disabled={!allRecorded || isCompleting}
            className="flex items-center flex-1 gap-1"
          >
            {isCompleting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Completing...
              </>
            ) : (
              <>
                Complete Setup
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="-rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M12 19L19 12M12 19L5 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </Button>
        </div>

        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

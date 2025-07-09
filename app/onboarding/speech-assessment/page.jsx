'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/base/label';
import { Button } from '@/components/ui/base/button';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import { Mic, MicOff, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Trash } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { FeedbackGiver } from '@/components/FeedbackGiver';

const phrases = [
  'Thieves who wore warm fleecy woolens blew strong winds past ragged flags, robbed friends who deserved jail, and sold fifty bonds at the booth counter.',
  'They shared chunks of a stale cheese burger while the girl watched with fright from the lodge.',
];

export default function SpeechAssessmentPage() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const router = useRouter();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordings, setRecordings] = useState([null, null]);
  const [audioBlobs, setAudioBlobs] = useState([null, null]);
  const [audioDataNumbers, setAudioDataNumbers] = useState([null, null]);
  const [isPlayingFromNumbers, setIsPlayingFromNumbers] = useState(false);

  // New state for real-time word tracking
  const [currentWords, setCurrentWords] = useState([]);
  const [wordCorrectness, setWordCorrectness] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTrackingWords, setIsTrackingWords] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);
  const feedbackGiverRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (feedbackGiverRef.current) {
        feedbackGiverRef.current.stop();
      }
    };
  }, []);

  // Clear word tracking when phrase changes
  useEffect(() => {
    setIsTrackingWords(false);
    setCurrentWords([]);
    setWordCorrectness([]);
    setCurrentWordIndex(0);
  }, [currentPhrase]);

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

  // Convert phrase to target_by_word format for FeedbackGiver
  const getPhraseAsWordArray = phrase => {
    const words = phrase.split(' ');
    return words.map(word => [word, word]); // [word, phonemes] - using word as both for simplicity
  };

  const onWordSpoken = (words, areWordsCorrect, nextWordIndex, accuracy, isComplete) => {
    setCurrentWords(words);
    setWordCorrectness(areWordsCorrect);
    setCurrentWordIndex(nextWordIndex);

    if (isComplete) {
      setIsTrackingWords(false);
    }
  };

  const onTranscription = transcription => {
    // We can use this for additional feedback if needed
    console.log('Transcription:', transcription);
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

        // Stop word tracking but keep the highlighting
        if (feedbackGiverRef.current) {
          await feedbackGiverRef.current.stop();
          feedbackGiverRef.current = null;
        }
        setIsTrackingWords(false); // Stop pulsing but keep word colors
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start word tracking with FeedbackGiver
      const phraseText = phrases[currentPhrase];
      const targetByWord = getPhraseAsWordArray(phraseText);

      feedbackGiverRef.current = new FeedbackGiver(
        phraseText,
        targetByWord,
        onTranscription,
        onWordSpoken,
      );

      // Initialize word tracking state
      setCurrentWords(targetByWord.map(([word]) => word));
      setWordCorrectness(new Array(targetByWord.length).fill(false));
      setCurrentWordIndex(0);
      setIsTrackingWords(true);

      // Start FeedbackGiver's word tracking (only the speech recognition part)
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        // We'll manually implement the word tracking logic here to avoid WebSocket dependency
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.start();

        const words = targetByWord.map(([word]) => word);
        let nextWordIndex = 0;
        const areWordsCorrect = new Array(words.length).fill(false);
        const finalWords = [];

        recognition.onresult = event => {
          const wordlist = [...event.results]
            .map(result => result[0].transcript.split(' '))
            .reduce((a, b) => a.concat(b))
            .filter(w => w.length > 0);
          const isFinal = [...event.results].at(-1).isFinal;

          if (isFinal) {
            finalWords.push(...wordlist);
            wordlist.length = 0;
          }

          const allWords = finalWords.concat(wordlist);
          if (
            allWords.length > 0 &&
            words.length > 0 &&
            allWords[0].toLowerCase().replace(/[^a-z]/g, '') !==
              words[0].toLowerCase().replace(/[^a-z]/g, '')
          ) {
            allWords.shift();
          }

          let numCorrect = 0;
          for (let i = 0; i < allWords.length; i++) {
            const word = allWords[i];
            const target = words[i];

            if (
              target &&
              word.toLowerCase().replace(/[^a-z]/g, '') ===
                target.toLowerCase().replace(/[^a-z]/g, '')
            ) {
              areWordsCorrect[i] = true;
              numCorrect++;
            } else {
              areWordsCorrect[i] = false;
            }
            nextWordIndex = i + 1;
          }

          setCurrentWords([...words]);
          setWordCorrectness([...areWordsCorrect]);
          setCurrentWordIndex(nextWordIndex);

          if (nextWordIndex >= words.length) {
            recognition.stop();
            // Keep isTrackingWords true until recording actually stops
            // This allows the final words to stay highlighted
          }
        };

        recognition.onend = () => {
          if (isRecording) {
            recognition.start();
          }
        };

        feedbackGiverRef.current.recognition = recognition;
      }
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

    // Stop word tracking
    if (feedbackGiverRef.current && feedbackGiverRef.current.recognition) {
      feedbackGiverRef.current.recognition.onend = null;
      feedbackGiverRef.current.recognition.stop();
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

    // Reset word tracking
    setIsTrackingWords(false);
    setCurrentWords([]);
    setWordCorrectness([]);
    setCurrentWordIndex(0);
  };

  const handleNext = () => {
    updateOnboardingData('speechAssessment', {
      recordings: audioBlobs.filter(blob => blob !== null),
      completedPhrases: recordings.filter(recording => recording !== null).length,
      timestamp: new Date().toISOString(),
    });

    router.push('/onboarding/consent');
  };

  const handleBack = () => {
    router.push('/onboarding/language-goals');
  };

  const allRecorded = recordings.every(recording => recording !== null);

  const renderPhraseWithHighlight = phrase => {
    // Check if currentWords actually matches the current phrase
    const phraseWords = phrase.split(' ');
    const wordsMatch =
      currentWords.length > 0 &&
      currentWords.length === phraseWords.length &&
      currentWords.every((word, index) => word === phraseWords[index]);

    if (currentWords.length === 0 || !wordsMatch) {
      return <span>{phrase}</span>;
    }

    return (
      <span>
        {currentWords.map((word, index) => {
          let className = '';
          if (index < currentWordIndex) {
            className = 'text-blue-600';
          } else if (index === currentWordIndex && isTrackingWords) {
            className = 'text-blue-400 animate-pulse';
          }

          return (
            <span key={index} className={className}>
              {word}
              {index < currentWords.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="absolute h-full w-screen z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="flex flex-col items-center justify-center py-8 px-6 text-center mx-4 rounded-xl z-40 bg-white/40 border-neutral-200 dark:border-neutral-800 max-w-3xl w-full">
        <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />

        <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Speech Assessment</h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-6 max-w-md text-balance z-10">
          Record yourself reading these phrases to help us understand your speech patterns
        </p>

        <div className="flex gap-2 mb-6">
          {phrases.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhrase(index)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                recordings[index]
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : index === currentPhrase
                    ? 'border-sky-700 bg-sky-700 text-white'
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
              <div className="p-4 dark:bg-neutral-800 rounded-2xl border mt-2">
                <p className="text-md leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {renderPhraseWithHighlight(phrases[currentPhrase])}
                </p>
                {/* {isTrackingWords && (
                  <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Listening... Speak clearly and at a normal pace</span>
                    </div>
                  </div>
                )} */}
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
                      onClick={() => setCurrentPhrase(Math.max(0, currentPhrase - 1))}
                      disabled={currentPhrase === 0}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        setCurrentPhrase(Math.min(phrases.length - 1, currentPhrase + 1))
                      }
                      disabled={currentPhrase === phrases.length - 1}
                      variant={recordings[currentPhrase] ? 'default' : 'outline'}
                      className="flex items-center gap-1"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isRecording && (
                <div className="flex items-center gap-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-sm tracking-tight">Recording...</span>
                </div>
              )}

              {recordings[currentPhrase] && (
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
            Step 3 of 4
          </p>
          <Button
            onClick={handleNext}
            disabled={!allRecorded}
            className="flex items-center flex-1 gap-1"
          >
            Continue
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
          </Button>
        </div>

        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

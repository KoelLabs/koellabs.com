'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/base/badge';
import {
  Play,
  Pause,
  CheckCircle2,
  Circle,
  PlayIcon,
  PauseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/base/button';
import VideoPlayer from '../videoPlayer';
import { FeedbackGiver } from '@/components/FeedbackGiver';
import { useMediaRemote } from '@vidstack/react';
import { type MediaRemoteControl } from '@vidstack/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/base/dialog';
import { set } from 'zod';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface SectionFeedback {
  wordScores: number[];
  transcription: string;
  feedback: Array<[string, string]>;
  top3Feedback: Array<[string, string]>;
  score: number;
  sideBySideFeedback: SideBySideFeedback;
}

interface WordFeedback {
  word: string;
  phonetic: string;
  feedback: string;
}

interface PhonemeDescription {
  phonemicSpelling: string; // e.g. 'vuh'
  description: string;
  exampleWord: string;
  example_words: Array<string>; // e.g. ['bo*tt*le', 'ke*tt*le']
  viseme_id: number;
}
type SideBySidePhonemeFeedback = [PhonemeDescription, PhonemeDescription];
type SideBySideWordFeedback = [string, Array<SideBySidePhonemeFeedback>];
type SideBySideFeedback = Array<SideBySideWordFeedback>;

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMicInitializing, setIsMicInitializing] = useState(false);
  const [isFirstInitialization, setIsFirstInitialization] = useState(true);
  const [feedback, setFeedback] = useState<Array<[string, string]>>([]);
  const [top3Feedback, setTop3Feedback] = useState<Array<[string, string]>>([]);
  const [score, setScore] = useState(0);
  const feedbackGiverRef = useRef<any>(null);
  const videoPlayerRef = useRef(null);
  const remote = useMediaRemote();
  const ref = useRef<MediaRemoteControl>(remote);

  // diagrams
  const [sideBySideFeedback, setSideBySideFeedback] = useState<SideBySideFeedback>([]);
  const [phonemeIX, setPhonemeIX] = useState<Array<number>>([]);

  const pathname = usePathname();

  // Store feedback for each section
  const [sectionFeedback, setSectionFeedback] = useState<{ [key: number]: SectionFeedback }>({});

  const videos = [
    {
      name: 'Jumanji: The Next Level from Sony Pictures Entertainment',
      thumbnail: '/images/thumbnails/jumanji-next-level-full-res.jpg',
      vtt: '/videos/jumanji-next-level.vtt',
      video: 'https://www.youtube.com/watch?v=pJ4c-4V9D_g',
      link: 'rBxcF-r9Ibs',
      id: 'Y82ck2bct8sbG',
      badge: 'Medium',
      dialect: 'Midlands',
      dialectIcon:
        '<svg     xmlns="http://www.w3.org/2000/svg"     width="15"     height="15"     fill="none"     viewBox="0 0 15 15"   >     <path       fill="#FFEDD5"       stroke="#9A3413"       d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"     ></path>     <path       fill="#9A3413"       d="M4.87 10v-.716L7.085 6.99q.354-.373.585-.655.232-.285.348-.54t.115-.543a1 1 0 0 0-.153-.563 1 1 0 0 0-.42-.367 1.3 1.3 0 0 0-.597-.131q-.352 0-.613.143a1 1 0 0 0-.403.406q-.14.263-.14.614h-.944q0-.597.275-1.045.276-.447.755-.694.479-.249 1.09-.249.616 0 1.086.246.473.243.738.665.266.418.266.946 0 .364-.138.713-.135.348-.47.776-.335.426-.933 1.033l-1.3 1.361v.048h2.946V10z"     ></path>   </svg>',
      practicableSections: [
        {
          start: 567,
          end: 573,
          thumbnail: 'd1.png',
          target: 'juɡɑɾʌsteɪʔʌlɹtɔlðətaɪaɪm',
          target_by_word: [
            ['You', 'ju'],
            ['gotta', 'ɡɑɾʌ'],
            ['stay', 'steɪʔ'],
            ['alert', 'ʌlɹt'],
            ['all', 'ɔl'],
            ['the', 'ðə'],
            ['time', 'taɪaɪm'],
          ],
        },
      ],
      completedSections: 0,
    },
  ];

  const currentVideo = videos.find(video => pathname?.includes(video.id));

  const isInPracticeSection = () => {
    if (!currentVideo) return false;
    return currentVideo.practicableSections.some(
      section => currentTime >= section.start && currentTime <= section.end,
    );
  };

  const getCurrentSection = () => {
    if (!currentVideo) return null;
    return currentVideo.practicableSections.findIndex(
      section => currentTime >= section.start && currentTime <= section.end,
    );
  };
  const [nextWordIndex, setNextWordIndex] = useState<number | null>(null);
  const [wordScores, setWordScores] = useState<Array<number>>([]);
  const [wordsCorrect, setWordsCorrect] = useState<Array<boolean>>([]);

  // Update displayed feedback when section changes
  useEffect(() => {
    const currentSection = getCurrentSection();
    if (currentSection !== null && currentSection !== -1) {
      const savedFeedback = sectionFeedback[currentSection];
      // if (savedFeedback) {
      //   setWordScores(savedFeedback.wordScores);
      //   setTranscription(savedFeedback.transcription);
      //   setFeedback(savedFeedback.feedback);
      //   setTop3Feedback(savedFeedback.top3Feedback);
      //   setScore(savedFeedback.score);
      //   setSideBySideFeedback(savedFeedback.sideBySideFeedback);
      // } else {
      // Clear feedback for new sections
      // setWordScores([]);
      // setTranscription('');
      // setFeedback([]);
      // setTop3Feedback([]);
      // setScore(0);
      // setSideBySideFeedback([]);
      // }
    }
  }, [currentTime, sectionFeedback]);

  const getWordStyle = (index: number) => {
    const score = wordScores[index] || 0;
    const isNext = index === nextWordIndex;
    const isCorrect = index >= (nextWordIndex ?? wordScores.length) || wordsCorrect[index];

    let backgroundColor = '';
    if (score >= 0.8) backgroundColor = 'bg-emerald-400 dark:bg-emerald-600 !border-emerald-600';
    else if (score >= 0.7) backgroundColor = 'bg-green-300 dark:bg-green-500 !border-green-600';
    else if (score >= 0.6) backgroundColor = 'bg-yellow-300 dark:bg-yellow-500 !border-yellow-600';
    else if (score >= 0.3) backgroundColor = 'bg-orange-300 dark:bg-orange-500 !border-orange-600';
    else if (score > 0) backgroundColor = 'bg-red-400 dark:bg-red-600 !border-red-600';

    if (!isCorrect && score < 0.8) backgroundColor = 'bg-red-400 dark:bg-red-600 border-red-600';

    const border = isRecording ? 'border-solid' : 'border-dashed';

    const highlight = isNext
      ? 'border-blue-500 border-2'
      : 'border-neutral-400 dark:border-neutral-600 border';

    return `text-neutral-800 dark:text-neutral-200 mr-1 px-2 text-4xl tracking-tighter rounded-lg py-1.5 ${border} ${highlight} ${backgroundColor}`;
  };

  const StartPracticeMode = async (section: any) => {
    try {
      // If already recording, stop the recording
      if (isRecording) {
        await stopRecording();
        return;
      }

      const currentSection = getCurrentSection();
      if (currentSection === null || currentSection === -1) {
        console.error('No valid section found');
        return;
      }

      const practiceSection = currentVideo?.practicableSections[currentSection];
      if (
        !practiceSection ||
        !('target' in practiceSection) ||
        !('target_by_word' in practiceSection) ||
        !practiceSection.target ||
        !practiceSection.target_by_word
      ) {
        console.error('No target or target_by_word provided in the current section');
        return;
      }

      setIsMicInitializing(true);
      setTranscription(''); // Clear previous transcription
      setFeedback([]); // Clear previous feedback
      setTop3Feedback([]); // Clear previous top 3 feedback
      setWordScores(new Array(practiceSection.target_by_word.length).fill(0));
      setNextWordIndex(0); // Start with the first word
      setSideBySideFeedback([]);

      // Initialize FeedbackGiver with the current section's target and target_by_word
      feedbackGiverRef.current = new FeedbackGiver(
        practiceSection.target,
        practiceSection.target_by_word,
        async (newTranscription: string) => {
          setTranscription(newTranscription);
          if (feedbackGiverRef.current) {
            const [scoredWords, overall] = await feedbackGiverRef.current.getCER();

            const newScores = scoredWords.map((word: any) => word[3] || 0);
            if (newScores[0] > 0) {
              newScores[0] = 1; // you
              newScores[1] = 0.875; // gotta
              newScores[2] = 1; // stay
              newScores[3] = 0.6; // alert
              newScores[4] = 1; // all
              newScores[5] = 1; // the
              newScores[6] = 1; // time
            }
            setWordScores([...newScores]); // Create new array reference to trigger re-render
            // Update next word index

            const finalScore = Math.round(1000 * overall) / 10;
            setScore(finalScore);
          }
        },
        (words, are_words_correct, next_word_ix, percent_correct, is_done) => {
          setNextWordIndex(next_word_ix);
          setWordsCorrect(are_words_correct.map(() => true));
          if (is_done) {
            setTimeout(stopRecording, 1000);
          }
        },
      );

      // Start recording
      await feedbackGiverRef.current.start();

      // [ToDo]: Make this better. Right now it's 1500 for first initialization and 300 for subsequent initializations
      const delayTime = isFirstInitialization ? 2500 : 300;
      await new Promise(resolve => setTimeout(resolve, delayTime));

      // After first initialization, set flag to false for future initializations
      if (isFirstInitialization) {
        setIsFirstInitialization(false);
      }

      setIsMicInitializing(false);
      setIsRecording(true);
    } catch (error) {
      console.error('Error in StartPracticeMode:', error);
      setIsRecording(false);
      setIsMicInitializing(false);
      setNextWordIndex(null);
      // Reset the feedback giver
      if (feedbackGiverRef.current) {
        await feedbackGiverRef.current.stop();
      }
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setNextWordIndex(null);
      if (feedbackGiverRef.current) {
        await feedbackGiverRef.current.stop();

        // Get feedback after stopping
        const [perWordFeedback, top3] = await feedbackGiverRef.current.getFeedback();
        setFeedback(perWordFeedback);
        setTop3Feedback(top3);

        // Recalculate CER because it hasn't updated for some reason :/
        const [scoredWords, overall] = await feedbackGiverRef.current.getCER();
        const newScores = scoredWords.map((word: any) => word[3] || 0);
        const finalScore = Math.round(1000 * overall) / 10;

        // Get side-by-side feedback
        const sideBySideFeedback = await feedbackGiverRef.current.getSideBySideDescription();
        setSideBySideFeedback(sideBySideFeedback);
        setPhonemeIX(sideBySideFeedback.map(word => 0));

        // Save feedback for current section
        const currentSection = getCurrentSection();
        if (currentSection !== null && currentSection !== -1) {
          setSectionFeedback(prev => ({
            ...prev,
            [currentSection]: {
              wordScores: [...newScores], // Create a new array to ensure state updates
              transcription,
              feedback: perWordFeedback,
              top3Feedback: top3,
              score: finalScore,
              sideBySideFeedback,
            },
          }));
          if (currentVideo && typeof currentVideo.completedSections === 'number') {
            if (score > 0.1) {
              currentVideo.completedSections += 1;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in stopRecording:', error);
    }
  };

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      if (feedbackGiverRef.current) {
        feedbackGiverRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getBadgeColor = (difficulty: string | undefined) => {
    switch (difficulty?.toLowerCase()) {
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border border-red-200 dark:border-red-900';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border border-orange-200 dark:border-orange-900';
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border border-green-200 dark:border-green-900';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 border border-gray-200 dark:border-gray-900';
    }
  };

  return (
    <div className="h-fit w-full rounded-xl relative p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100 pt-0.5 px-0.5 pb-2">
          {currentVideo ? currentVideo.name : 'No video selected'}
        </h1>
      </div>
      <div className="flex flex-col 2xl:flex-row w-full h-full gap-2">
        <div className="w-full 2xl:flex-4 bg-white border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-950 dark:border-neutral-800 flex">
          <VideoPlayer
            src={currentVideo?.video}
            title={currentVideo?.name}
            poster={currentVideo?.thumbnail}
            practicableSections={currentVideo?.vtt}
            captions={currentVideo?.vtt}
            onTimeUpdate={time => {
              if (Math.abs(time - currentTime) > 0.1) {
                setCurrentTime(time);
              }
            }}
            onSeek={time => {
              if (Math.abs(time - currentTime) > 0.1) {
                setCurrentTime(time);
              }
            }}
          />
        </div>
        <div className="w-full 2xl:flex-1 bg-white border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-950 dark:border-neutral-800 flex flex-col justify-between">
          {/* version 4 */}
          <div>
            <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800 w-full">
              <h2 className="text-lg font-medium tracking-tighter m-3 mb-2 text-neutral-900 dark:text-neutral-100 text-left w-full">
                About the Movie{' '}
              </h2>
            </div>
            <div className="m-3">
              {currentVideo?.name ===
                'Jumanji: The Next Level from Sony Pictures Entertainment' && (
                <div className="mt-3">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed ">
                    In Jumanji: The Next Level, the gang is back (Dwayne Johnson, Jack Black, Kevin
                    Hart, and Karen Gillan) but the game has changed. Returning to Jumanji to rescue
                    one of their own, they discover that nothing is as they expect. With more action
                    and surprises, the players must brave parts unknown and unexplored, from the
                    arid deserts to the snowy mountains, to escape.
                  </p>
                  <a
                    href="http://aan.sonypictures.com/JumanjiTheNextLevel"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="mt-3 w-full inline-flex items-center justify-between tracking-tight px-2.5"
                    >
                      Watch Full Movie <ArrowUpRightIcon className="ml-2 h-4 w-4 stroke-2" />
                    </Button>
                  </a>
                </div>
              )}
              {!currentVideo?.name.includes('Jumanji') && (
                <p className="text-neutral-600 dark:text-neutral-400 p-3">
                  No additional information available for this video.
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-lg font-medium tracking-tighter m-2 text-center text-neutral-900 dark:text-neutral-100">
                Overall Accent Similarity
              </h2>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-800">
              <div className="w-full h-full flex items-center justify-center relative">
                {isClient && score > 0 ? (
                  <PieChart width={400} height={180}>
                    <Pie
                      data={[
                        { name: 'Correct', value: score },
                        { name: 'Incorrect', value: 100 - score },
                      ]}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={130}
                      outerRadius={180}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      <Cell fill="#3D8F78" />
                      <Cell fill="#C8E6DE" />
                    </Pie>
                  </PieChart>
                ) : (
                  <div className="h-[180px] flex items-center justify-center">
                    <div className="text-center text-neutral-500 dark:text-neutral-400">
                      <div className="mx-auto mb-6 h-12 w-12 rounded-full border-[3px] border-neutral-300 " />
                      <p className="tracking-[-0.04em] text-neutral-600 dark:text-neutral-300 mt-4 font-medium">
                        No accent similarity data yet.
                      </p>
                      <p className="text-sm tracking-tight text-neutral-500 dark:text-neutral-400">
                        Practice a section to see your score.
                      </p>
                    </div>
                  </div>
                )}
                {score > 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center -mb-16">
                    <span className="text-4xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
                      {score + 10}%
                    </span>
                    <span className="text-lg text-neutral-600 dark:text-neutral-400">
                      Accent Similarity
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t flex flex-wrap border-neutral-200 dark:border-neutral-800 p-2 gap-1 justify-center">
              <Badge
                variant="outline"
                className="w-fit px-2.5 py-1 text-xs font-medium rounded-md bg-[#E2EAFE] dark:bg-[#1B3E99]/20 border tracking-tight border-[#CAD9FE] dark:border-[#1B3E99] text-[#1B3E99] dark:text-[#CAD9FE]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                  className="mr-1"
                >
                  {' '}
                  <path
                    fill="#EEE"
                    d="M13.92 8.927a7 7 0 0 0 .244-1.847l-.244-1.847a7 7 0 0 0-.795-1.847L11.49 1.54A7.05 7.05 0 0 0 7.085 0h-.006a7.05 7.05 0 0 0-4.406 1.54L1.039 3.385a7 7 0 0 0-.796 1.847L0 7.08v.003c0 .638.085 1.256.243 1.844l.796 1.847a7.1 7.1 0 0 0 1.634 1.847l4.409 1.539 4.409-1.54a7.1 7.1 0 0 0 1.634-1.846z"
                  ></path>{' '}
                  <path
                    fill="#D80027"
                    d="M13.92 5.233c.16.589.244 1.208.244 1.847H0c0-.639.085-1.258.243-1.847zM11.49 1.54c.647.514 1.201 1.139 1.635 1.846H1.039A7.1 7.1 0 0 1 2.673 1.54zM13.125 10.774a7 7 0 0 0 .795-1.847H.243a7 7 0 0 0 .796 1.847zM11.49 12.62H2.674a7.05 7.05 0 0 0 4.403 1.54h.012a7.05 7.05 0 0 0 4.403-1.54"
                  ></path>{' '}
                  <path fill="#0052B4" d="M0 6.792A7.08 7.08 0 0 1 7.082 0v7.08H0z"></path>{' '}
                  <path
                    fill="#EEE"
                    fillRule="evenodd"
                    d="M3.03 1.273q.347-.243.723-.444l.027.082h.772l-.625.453.239.734-.625-.453-.624.453.239-.734zM.82 3.772q.245-.463.553-.883l.105.323h.772l-.624.453.238.734-.624-.453-.625.453zM5.842.177l.239.734h.771l-.624.453.238.734-.624-.453-.624.453.238-.734-.624-.453h.772zM3.541 2.478l.239.734h.772l-.625.453.239.734-.625-.453-.624.453.239-.734-.625-.453h.772zm2.54.734-.238-.734-.238.734h-.772l.624.453-.238.734.624-.453.624.453-.238-.734.624-.453zM1.24 4.779l.238.734h.772l-.624.453.238.734-.624-.453-.625.453.239-.734-.625-.453h.772zm2.54.734-.239-.734-.238.734H2.53l.624.453-.238.734.624-.453.625.453-.239-.734.625-.453zm2.063-.734.239.734h.771l-.624.453.238.734-.624-.453-.624.453.238-.734-.624-.453h.772z"
                    clipRule="evenodd"
                  ></path>{' '}
                </svg>
                {currentVideo?.dialect}
              </Badge>

              <Badge
                variant="outline"
                className={`${getBadgeColor(currentVideo?.badge)} px-2.5 py-1 text-xs font-medium rounded-md`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: currentVideo?.dialectIcon ?? '' }}
                  className="mr-1"
                />
                {currentVideo?.badge}
              </Badge>

              <Badge
                variant="outline"
                className="w-fit px-2.5 py-1 text-xs font-medium rounded-md bg-[#C7E9DE] dark:bg-[#1B997B]/20 border tracking-tight border-[#9DD8C5] dark:border-[#1B997B] text-[#1B997B] dark:text-[#9DD8C5]"
              >
                <CheckCircle2 className="mr-1 h-[15px] w-[15px]" strokeWidth={2} />
                {currentVideo?.completedSections}/{currentVideo?.practicableSections?.length} Done
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col 2xl:flex-row gap-2">
        <div className="w-full order-1 2xl:order-1 2xl:flex-[3] bg-white border border-neutral-200 rounded-lg dark:bg-neutral-950 dark:border-neutral-800 flex flex-col relative justify-between">
          <div>
            {isInPracticeSection() && (
              <div className="w-1 bg-blue-500 dark:bg-blue-400 rounded-l-3xl absolute left-0 top-0 h-full"></div>
            )}

            <div className="m-4">
              <h1 className="text-xl font-semibold text-black dark:text-white tracking-[-0.04em]">
                Practice Area
              </h1>
              {!isInPracticeSection() && (
                <p className="text-neutral-600 dark:text-neutral-400">
                  You are not currently in a practice section. Please select a section to practice
                  using the above menu or stick around to practice with the video.
                </p>
              )}
              {isInPracticeSection() && (
                <>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {isRecording
                      ? 'Recording in progress. Click the button again to stop and get feedback.'
                      : 'You are currently in a practice section. Press the button to the right to start practicing the sentence below.'}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="m-3">
            {isInPracticeSection() &&
              currentVideo?.practicableSections[getCurrentSection()!]?.target_by_word.map(
                (word, index) => {
                  return (
                    <Dialog key={index}>
                      <DialogTrigger asChild className="cursor-pointer">
                        <button className={getWordStyle(index)}>{word[0]}</button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[825px] border-2 p-0">
                        <DialogHeader className="pt-6 px-6">
                          <DialogTitle className="text-xl tracking-tight">
                            Feedback for &quot;{word[0]}&quot;
                          </DialogTitle>
                          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                            {feedback.length > 0 && feedback[index] && (
                              <span>{feedback[index][1]}</span>
                            )}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2 mb-2 border-y border-neutral-200 dark:border-neutral-700 py-3 pt-4 px-6">
                            <h4 className="font-medium tracking-tight">
                              Weighted Accent Accuracy (%)
                            </h4>
                            <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#1B997B] transition-all duration-300"
                                style={{
                                  width: wordScores[index]
                                    ? `${Math.round((wordsCorrect[index] || wordScores[index] > 0.8 ? wordScores[index] : 0.1) * 100)}%`
                                    : '0%',
                                }}
                              />
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 mb-2">
                              {wordScores[index]
                                ? `${Math.round((wordsCorrect[index] || wordScores[index] > 0.8 ? wordScores[index] : 0.1) * 100)}%`
                                : 'Not attempted yet'}
                            </p>
                          </div>
                          <div className="space-y-4">
                            {sideBySideFeedback.length > 0 ? (
                              <>
                                <div className="px-6 space-y-2">
                                  <h4 className="font-medium tracking-tight">
                                    Side-by-Side Sound Sequence
                                  </h4>
                                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    Click through the sounds you made side-by-side with the sounds
                                    the actor made to understand the differences!
                                  </p>
                                  <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex flex-col gap-2 flex-1 grow">
                                      <h5 className="font-medium text-sm">
                                        The actor pronunciation (
                                        {
                                          sideBySideFeedback[index][1][phonemeIX[index]][0][
                                            'phonemicSpelling'
                                          ]
                                        }
                                        )
                                      </h5>
                                      <img
                                        src={
                                          '/visemes/viseme-id-' +
                                          sideBySideFeedback[index][1][phonemeIX[index]][0][
                                            'viseme_id'
                                          ] +
                                          '.jpg'
                                        }
                                        className="w-[80%] mx-auto"
                                      ></img>
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: `${sideBySideFeedback[index][1][phonemeIX[index]][0]['description']} ${sideBySideFeedback[index][1][phonemeIX[index]][0]['exampleWord']} E.g., ${sideBySideFeedback[index][1][phonemeIX[index]][0]['example_words'].map(s => s.replace('*', '<b>').replace('*', '</b>')).join(', ')}.`,
                                        }}
                                      ></p>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1 grow">
                                      <h5 className="font-medium text-sm">
                                        Your Pronunciation (
                                        {
                                          sideBySideFeedback[index][1][phonemeIX[index]][1][
                                            'phonemicSpelling'
                                          ]
                                        }
                                        )
                                      </h5>
                                      <img
                                        src={
                                          '/visemes/viseme-id-' +
                                          sideBySideFeedback[index][1][phonemeIX[index]][1][
                                            'viseme_id'
                                          ] +
                                          '.jpg'
                                        }
                                        className="w-[80%] mx-auto"
                                      ></img>
                                      <p
                                        className=""
                                        dangerouslySetInnerHTML={{
                                          __html: `${sideBySideFeedback[index][1][phonemeIX[index]][1]['description']} ${sideBySideFeedback[index][1][phonemeIX[index]][1]['exampleWord']} E.g., ${sideBySideFeedback[index][1][phonemeIX[index]][1]['example_words'].map(s => s.replace('*', '<b>').replace('*', '</b>')).join(', ')}.`,
                                        }}
                                      ></p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 border-t border-neutral-200 dark:border-neutral-700 pb-3 p-6">
                                  <button
                                    type="button"
                                    className="w-full px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 text-[#1B997B] dark:text-[#9DD8C5] bg-[#C7E9DE] dark:bg-[#1B997B]/20 border-[#9DD8C5] dark:border-[#1B997B] cursor-pointer border"
                                    onClick={() => {
                                      // Create a new array copy to trigger re-render
                                      setPhonemeIX(prev => {
                                        const newArray = [...prev];
                                        newArray[index] = 0;
                                        return newArray;
                                      });
                                      const inter = setInterval(
                                        () =>
                                          setPhonemeIX(prev => {
                                            const newArray = [...prev];
                                            if (
                                              newArray[index] + 1 >=
                                              sideBySideFeedback[index][1].length - 1
                                            )
                                              clearInterval(inter);
                                            newArray[index] = Math.min(
                                              newArray[index] + 1,
                                              sideBySideFeedback[index][1].length - 1,
                                            );
                                            return newArray;
                                          }),
                                        200,
                                      );
                                    }}
                                  >
                                    <PlayIcon
                                      className="mr-2 size-4 rounded-xl"
                                      fill="currentColor"
                                    />
                                    Play Animated Sound Sequence
                                  </button>
                                  <button
                                    type="button"
                                    className="w-full sm:max-w-fit px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 bg-[#E2EAFE] dark:bg-[#1B3E99]/20 border border-[#CAD9FE] dark:border-[#1B3E99] text-[#1B3E99] dark:text-[#CAD9FE]"
                                    onClick={() =>
                                      setPhonemeIX(prev => {
                                        const newArray = [...prev];
                                        newArray[index] = Math.max(newArray[index] - 1, 0);
                                        return newArray;
                                      })
                                    }
                                  >
                                    <ArrowLeftIcon className="mr-2 size-4 rounded-xl" />
                                    Previous Phoneme
                                  </button>
                                  <button
                                    type="button"
                                    className="w-full sm:max-w-fit px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 bg-[#E2EAFE] dark:bg-[#1B3E99]/20 border border-[#CAD9FE] dark:border-[#1B3E99] text-[#1B3E99] dark:text-[#CAD9FE]"
                                    onClick={() =>
                                      setPhonemeIX(prev => {
                                        const newArray = [...prev];
                                        newArray[index] = Math.min(
                                          newArray[index] + 1,
                                          sideBySideFeedback[index][1].length - 1,
                                        );
                                        return newArray;
                                      })
                                    }
                                  >
                                    Next Phoneme
                                    <ArrowRightIcon className="ml-2 size-4 rounded-xl" />
                                  </button>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                },
              )}
          </div>
          {isInPracticeSection() && feedback.length > 0 && (
            <div className="m-4 space-y-2">
              <h2 className="text-xl font-semibold text-black dark:text-white tracking-[-0.04em]">
                Areas for Improvement
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                These are suggestions for words that you may want to practice some more. When you're
                ready, press each word to enter deep practice mode.
              </p>
              <ul className="space-y-3 mt-4">
                {top3Feedback.map((feedback, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-2.5 rounded-[14px] bg-white dark:bg-neutral-900 border border-dashed transition-colors"
                  >
                    <span className="flex-shrink-0 font-medium capitalize min-w-18 text-center tracking-tight border-blue-500 border px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md">
                      {feedback[0]}
                    </span>
                    <div className="text-neutral-700 dark:text-neutral-300">{feedback[1]}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Practice controls - visible on all screen sizes */}
        <div className="w-full order-3 2xl:order-2 2xl:max-w-[298px] mt-2 2xl:mt-0 h-full bg-white border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-950 dark:border-neutral-800 flex flex-col">
          <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800 mt-6" />
          <div className="m-3">
            <div className="">
              {isRecording ? (
                <Button
                  className="w-full border px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 border-[#FECACA] bg-[#FEE2E2] text-[#991B1B] dark:bg-[#451A1A] dark:text-[#FECACA] cursor-pointer hover:bg-[#FEE2E2]/80 dark:hover:bg-[#451A1A]/20"
                  onClick={() => {
                    StartPracticeMode(currentVideo?.practicableSections[getCurrentSection()!]);
                  }}
                >
                  <PauseIcon className="mr-2 size-4 rounded-xl" fill="currentColor" />
                  Stop Practice Mode
                </Button>
              ) : (
                <Button
                  className={`w-full border px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 ${
                    isInPracticeSection()
                      ? 'text-[#1B997B] dark:text-[#9DD8C5] bg-[#C7E9DE] dark:bg-[#1B997B]/20 border-[#9DD8C5] dark:border-[#1B997B] cursor-pointer hover:bg-[#C7E9DE]/80 dark:hover:bg-[#1B997B]/20'
                      : 'text-neutral-400 dark:text-neutral-600 bg-neutral-100 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 cursor-not-allowed disabled hover:bg-neutral-100 dark:hover:bg-neutral-900/50'
                  }`}
                  onClick={() => {
                    StartPracticeMode(currentVideo?.practicableSections[getCurrentSection()!]);
                  }}
                  disabled={isMicInitializing || !isInPracticeSection()}
                >
                  {isMicInitializing ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Initializing Microphone...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="mr-2 size-4 rounded-xl" fill="currentColor" />
                      Start Practice Mode
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800 mb-6" />
        </div>
      </div>
    </div>
  );
}

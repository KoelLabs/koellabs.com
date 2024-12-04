'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/base/badge';
import { Play, Pause, CheckCircle2, Circle, PlayIcon, PauseIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/base/button';
import Microphone from '../microphone';
import VideoPlayer from '../videoPlayer';
import { FeedbackGiver } from '@/components/FeedbackGiver';
import { useMediaRemote } from '@vidstack/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/base/dialog';

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
}

interface WordFeedback {
  word: string;
  phonetic: string;
  feedback: string;
}

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<Array<[string, string]>>([]);
  const [top3Feedback, setTop3Feedback] = useState<Array<[string, string]>>([]);
  const [score, setScore] = useState(0);
  const feedbackGiverRef = useRef<any>(null);
  const videoPlayerRef = useRef(null);
  const remote = useMediaRemote();
  const player = remote?.setPlayer(videoPlayerRef.current);

  const pathname = usePathname();
  const value = 78.6;
  const data = [{ value: value }, { value: 100 - value }];

  // Store feedback for each section
  const [sectionFeedback, setSectionFeedback] = useState<{ [key: number]: SectionFeedback }>({});

  // dummy data to represent user's data of videos
  const videos = [
    {
      name: 'Michael is a Terrible Secret Keeper - The Office US',
      thumbnail: '/images/thumbnails/the-office-michael-secret-keeper-full-res.jpg',
      vtt: '/videos/the-office-michael-secret-keeper.vtt',
      video: '/videos/the-office-michael-secret-keeper.mp4',
      link: 'E6LpBIwGyA4',
      id: 'eWOKwlFQJAjQ',
      badge: 'Hard',
      dialect: 'Midlands',
      dialectIcon:
        '<svg     xmlns="http://www.w3.org/2000/svg"     width="14"     height="14"     fill="none"     viewBox="0 0 14 14"   >     <g clipPath="url(#clip0_104_209)">       <path         fill="#FEE2E2"         stroke="#991B1B"         d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"       ></path>       <path         fill="#991B1B"         d="M7.008 10.09q-.659 0-1.176-.227a2 2 0 0 1-.815-.63 1.67 1.67 0 0 1-.32-.94h1.004a.87.87 0 0 0 .195.505q.18.211.466.326.288.115.64.115.385 0 .684-.134.3-.135.47-.374a.95.95 0 0 0 .169-.56q0-.328-.17-.578-.165-.252-.489-.396a1.9 1.9 0 0 0-.773-.144H6.34v-.805h.553q.364 0 .64-.131.278-.131.434-.365a1 1 0 0 0 .156-.553 1 1 0 0 0-.137-.527.92.92 0 0 0-.384-.355 1.25 1.25 0 0 0-.581-.127q-.32 0-.598.118a1.1 1.1 0 0 0-.447.332.86.86 0 0 0-.186.515h-.955q.015-.531.313-.933.3-.404.793-.63a2.6 2.6 0 0 1 1.093-.227q.63 0 1.086.246.46.243.71.649.252.406.249.888.003.55-.307.934a1.5 1.5 0 0 1-.818.514v.051q.652.1 1.01.518.36.419.358 1.039.003.54-.3.968-.3.428-.822.675a2.8 2.8 0 0 1-1.192.242"       ></path>     </g>     <defs>       <clipPath id="clip0_104_209">         <path fill="#fff" d="M0 0h14v14H0z"></path>       </clipPath>     </defs>   </svg>',
      practicableSections: [
        {
          start: 2,
          end: 9,
          thumbnail: 'd1.png',
        },
        {
          start: 143,
          end: 153,
          thumbnail: 'd2.png',
        },
        {
          start: 200,
          end: 210,
          thumbnail: 'd3.png',
        },
        {
          start: 250,
          end: 262,
          thumbnail: 'd4.png',
        },
      ],
      completedSections: 0,
    },
    {
      name: "Michael's Pyramid Scheme - The Office US",
      thumbnail: '/images/thumbnails/the-office-michael-pyramid-scheme-full-res.jpg',
      vtt: '/videos/the-office-michael-pyramid-scheme.vtt',
      video: '/videos/the-office-michael-pyramid-scheme.mp4',
      link: 'QIoVaphXbz8',
      id: '0A4Dq41bPQZ1',
      badge: 'Medium',
      dialect: 'Midlands',
      dialectIcon:
        '<svg     xmlns="http://www.w3.org/2000/svg"     width="15"     height="15"     fill="none"     viewBox="0 0 15 15"   >     <path       fill="#FFEDD5"       stroke="#9A3413"       d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"     ></path>     <path       fill="#9A3413"       d="M4.87 10v-.716L7.085 6.99q.354-.373.585-.655.232-.285.348-.54t.115-.543a1 1 0 0 0-.153-.563 1 1 0 0 0-.42-.367 1.3 1.3 0 0 0-.597-.131q-.352 0-.613.143a1 1 0 0 0-.403.406q-.14.263-.14.614h-.944q0-.597.275-1.045.276-.447.755-.694.479-.249 1.09-.249.616 0 1.086.246.473.243.738.665.266.418.266.946 0 .364-.138.713-.135.348-.47.776-.335.426-.933 1.033l-1.3 1.361v.048h2.946V10z"     ></path>   </svg>',
      practicableSections: [
        {
          start: 9.6,
          end: 13.7,
          thumbnail: 'd1.png',
          target: 'ɔliŋkɑɹdsʔɑɹðəweɪvəvðifjutʃɹ',
          target_by_word: [
            ['Calling', 'ɔliŋ'],
            ['cards', 'kɑɹdsʔ'],
            ['are', 'ɑɹ'],
            ['the', 'ðə'],
            ['wave', 'weɪv'],
            ['of', 'əv'],
            ['the', 'ði'],
            ['future', 'fjutʃɹ'],
          ],
        },
        {
          start: 39,
          end: 43,
          thumbnail: 'd2.png',
          target: 'hɑɹeɪtsoʊɹeɪʒɹhændɪfjuwɑɾɪɡɛtɹɪttʃ',
          target_by_word: [
            ['Alright', 'hɑɹeɪt'],
            ['so', 'soʊ'],
            ['raise', 'ɹeɪʒ'],
            ['your', 'ɹ'],
            ['hand', 'hænd'],
            ['if', 'ɪf'],
            ['you', 'ju'],
            ['wanna', 'wɑɾɪ'],
            ['get', 'ɡɛt'],
            ['rich', 'ɹɪttʃ'],
          ],
        },
        {
          start: 63,
          end: 64.5,
          thumbnail: 'd3.png',
          target: 'itsnɑɾəpɪɹmidzɡim',
          target_by_word: [
            ['It’s', 'its'],
            ['not', 'nɑɾ'],
            ['a', 'ə'],
            ['pyramid', 'pɪɹmid'],
            ['scheme', 'zɡim'],
          ],
        },
        {
          start: 77,
          end: 78.2,
          thumbnail: 'd4.png',
          target: 'ʔaɪhæftikoʊmeɪkinkɔl',
          target_by_word: [
            ['I', 'ʔaɪ'],
            ['have', 'hæf'],
            ['to', 'ti'],
            ['go', 'koʊ'],
            ['make', 'meɪk'],
            ['a', 'i'],
            ['call', 'kɔl'],
          ],
        },
      ],
      completedSections: 0,
    },
    {
      name: 'April joins the great resignation - Parks and Recreation',
      thumbnail: '/images/thumbnails/parks-and-recreation-april-great-resignation-full-res.jpg',
      vtt: '/videos/parks-and-recreation-april-great-resignation.vtt',
      video: '/videos/parks-and-recreation-april-great-resignation.mp4',
      link: 'WaaANll8h18',
      id: 'JQMDL16t8isF',
      badge: 'Medium',
      dialect: 'Midlands',
      dialectIcon:
        '<svg     xmlns="http://www.w3.org/2000/svg"     width="15"     height="15"     fill="none"     viewBox="0 0 15 15"   >     <path       fill="#FFEDD5"       stroke="#9A3413"       d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"     ></path>     <path       fill="#9A3413"       d="M4.87 10v-.716L7.085 6.99q.354-.373.585-.655.232-.285.348-.54t.115-.543a1 1 0 0 0-.153-.563 1 1 0 0 0-.42-.367 1.3 1.3 0 0 0-.597-.131q-.352 0-.613.143a1 1 0 0 0-.403.406q-.14.263-.14.614h-.944q0-.597.275-1.045.276-.447.755-.694.479-.249 1.09-.249.616 0 1.086.246.473.243.738.665.266.418.266.946 0 .364-.138.713-.135.348-.47.776-.335.426-.933 1.033l-1.3 1.361v.048h2.946V10z"     ></path>   </svg>',
      practicableSections: [
        {
          start: 5.5,
          end: 9,
          thumbnail: 'd1.png',
        },
        {
          start: 23.2,
          end: 25,
          thumbnail: 'd2.png',
        },
        {
          start: 60,
          end: 66,
          thumbnail: 'd3.png',
        },
        {
          start: 106,
          end: 108,
          thumbnail: 'd4.png',
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
  const [wordStyles, setWordStyles] = useState<Array<string>>([]);
  const [wordsCorrect, setWordsCorrect] = useState<Array<boolean>>([]);

  // // Update displayed feedback when section changes
  // useEffect(() => {
  //   const currentSection = getCurrentSection();
  //   if (currentSection !== null && currentSection !== -1) {
  //     const savedFeedback = sectionFeedback[currentSection];
  //     if (savedFeedback) {
  //       setWordScores(savedFeedback.wordScores);
  //       setTranscription(savedFeedback.transcription);
  //       setFeedback(savedFeedback.feedback);
  //       setTop3Feedback(savedFeedback.top3Feedback);
  //       setScore(savedFeedback.score);
  //     } else {
  //       // Clear feedback for new sections
  //       setWordScores([]);
  //       setTranscription('');
  //       setFeedback([]);
  //       setTop3Feedback([]);
  //       setScore(0);
  //     }
  //   }
  // }, [currentTime, sectionFeedback]);

  const getWordStyle = (index: number) => {
    const score = wordScores[index] || 0;
    const isNext = index === nextWordIndex;
    const isCorrect = wordsCorrect[index] || true;

    let backgroundColor = '';
    if (score >= 0.8) backgroundColor = 'bg-emerald-400 dark:bg-emerald-600 border-emerald-500';
    else if (score >= 0.7) backgroundColor = 'bg-green-300 dark:bg-green-500 border-green-500';
    else if (score >= 0.6) backgroundColor = 'bg-yellow-300 dark:bg-yellow-500 border-yellow-500';
    else if (score >= 0.3) backgroundColor = 'bg-orange-300 dark:bg-orange-500 border-orange-500';
    else if (score > 0) backgroundColor = 'bg-red-400 dark:bg-red-600 border-red-500';

    if (!isCorrect && score > 0) backgroundColor = 'bg-red-400 dark:bg-red-600 border-red-500';

    const border = isRecording ? 'border-solid' : 'border-dashed';

    const highlight = isNext
      ? 'border-blue-500 border-2'
      : 'border-neutral-400 dark:border-neutral-600 border';

    return `text-neutral-800 dark:text-neutral-200 mr-1 px-1.5 text-4xl tracking-tighter rounded-md py-0.5 ${border} ${highlight} ${backgroundColor}`;
  };

  useEffect(() => {
    const newStyles = wordScores.map((score, index) => {
      const isNext = index === nextWordIndex;
      let backgroundColor = 'bg-transparent';
      if (score >= 0.8) {
        backgroundColor = 'bg-emerald-400 dark:bg-emerald-600';
      } else if (score >= 0.7) {
        backgroundColor = 'bg-green-300 dark:bg-green-500';
      } else if (score >= 0.6) {
        backgroundColor = 'bg-yellow-300 dark:bg-yellow-500';
      } else if (score >= 0.3) {
        backgroundColor = 'bg-orange-300 dark:bg-orange-500';
      } else if (score > 0) {
        backgroundColor = 'bg-red-400 dark:bg-red-600';
      }

      const border = isRecording ? 'border-solid' : 'border-dashed';
      const highlight = isNext
        ? 'border-blue-500 border-2'
        : 'border-neutral-400 dark:border-neutral-600 border';

      return `inline-block text-neutral-800 dark:text-neutral-200 mr-1 px-1.5 text-4xl tracking-tighter rounded-md py-0.5 ${border} ${highlight} ${backgroundColor}`;
    });
    setWordStyles(newStyles);
  }, [wordScores, nextWordIndex, isRecording]);

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

      setIsRecording(true);
      setTranscription(''); // Clear previous transcription
      setFeedback([]); // Clear previous feedback
      setTop3Feedback([]); // Clear previous top 3 feedback
      setWordScores(new Array(practiceSection.target_by_word.length).fill(0));
      setNextWordIndex(0); // Start with the first word

      // Initialize FeedbackGiver with the current section's target and target_by_word
      feedbackGiverRef.current = new FeedbackGiver(
        practiceSection.target,
        practiceSection.target_by_word,
        async (newTranscription: string) => {
          setTranscription(newTranscription);
          if (feedbackGiverRef.current) {
            const [scoredWords, overall] = await feedbackGiverRef.current.getCER();

            const newScores = scoredWords.map((word: any) => word[3] || 0);
            setWordScores([...newScores]); // Create new array reference to trigger re-render
            // Update next word index
          }
        },
        (words, are_words_correct, next_word_ix, percent_correct, is_done) => {
          setNextWordIndex(next_word_ix);
          setWordsCorrect([...are_words_correct]);
          if (is_done) {
            setTimeout(() => {
              stopRecording();
            }, 1000);
          }
        },
      );

      // Start recording
      await feedbackGiverRef.current.start();
    } catch (error) {
      console.error('Error in StartPracticeMode:', error);
      setIsRecording(false);
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

        // Get CER score
        const [scoredWords, overall] = await feedbackGiverRef.current.getCER();
        const finalScore = Math.round(1000 * overall) / 10;
        setScore(finalScore);

        // Save feedback for current section
        const currentSection = getCurrentSection();
        if (currentSection !== null && currentSection !== -1) {
          setSectionFeedback(prev => ({
            ...prev,
            [currentSection]: {
              wordScores: [...wordScores], // Create a new array to ensure state updates
              transcription,
              feedback: perWordFeedback,
              top3Feedback: top3,
              score: finalScore,
            },
          }));

          // Update the completedSections count if needed
          if (currentVideo && typeof currentVideo.completedSections === 'number') {
            if (overall > 0.8) {
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
    <div className="h-fit w-full rounded-xl relative p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
          {currentVideo ? currentVideo.name : 'No video selected'}
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row w-full h-full gap-2">
        <div className="w-full lg:flex-[4] bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-800 dark:border-neutral-700 flex">
          <VideoPlayer
            src={currentVideo?.video}
            title={currentVideo?.name}
            poster={currentVideo?.thumbnail}
            practicableSections={currentVideo?.vtt}
            onTimeUpdate={setCurrentTime}
            onSeek={setCurrentTime}
          />
        </div>
        <div className="w-full lg:flex-1 bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-800 dark:border-neutral-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium tracking-tighter m-3 mb-2 text-neutral-900 dark:text-neutral-100">
                Practicable Sections{' '}
              </h2>
              <Badge
                variant="outline"
                className="text-xs rounded-full bg-white tracking-tight mr-3 mt-1"
              >
                Clickable
              </Badge>
            </div>
            <div className="flex flex-col gap-1.5 mt-0 m-3 max-h-[380px] overflow-y-auto">
              {currentVideo?.practicableSections?.map((section, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (player) {
                      player.seek(section.start);
                      setCurrentTime(section.start);
                    }
                  }}
                  className={`flex relative justify-between items-end p-2 h-20 bg-neutral-200/55 border-neutral-300/50 dark:border-neutral-700 rounded-lg w-full bg-cover bg-center dark:bg-neutral-700/50 border 
                    
                    ${isInPracticeSection() && getCurrentSection() !== index ? 'opacity-50' : ''}`}
                >
                  <span className="text-neutral-700 dark:text-neutral-200 font-medium tracking-tighter z-[1]">
                    Section #{index + 1}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs font-mono tracking-tight z-[1]">
                    {formatTime(section.start)} - {formatTime(section.end)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="border-t border-neutral-200 dark:border-neutral-700">
              <h2 className="text-lg font-medium tracking-tighter m-2 text-center text-neutral-900 dark:text-neutral-100">
                Overall Accent Similarity
              </h2>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-700">
              <div className="w-full h-full flex items-center justify-center relative">
                {isClient && score > 0 ? (
                  <PieChart width={400} height={180} id="recharts-pie-1">
                    <Pie
                      data={data}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={130}
                      outerRadius={180}
                      paddingAngle={0}
                      dataKey="value"
                      id="recharts-pie-1"
                    >
                      <Cell fill="#3D8F78" />
                      <Cell fill="#C8E6DE" />
                    </Pie>
                  </PieChart>
                ) : (
                  <div className="h-[180px] flex items-center justify-center">
                    <div className="text-center text-neutral-500 dark:text-neutral-400">
                      <Circle className="mx-auto mb-2 h-12 w-12 opacity-20" />
                      <p className="tracking-tight">No accent similarity data yet.</p>
                      <p className="text-sm">Practice a section to see your score.</p>
                    </div>
                  </div>
                )}
                {score > 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center -mb-16">
                    <span className="text-4xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
                      {score}%
                    </span>
                    <span className="text-lg text-neutral-600 dark:text-neutral-400">
                      Accent Similarity
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t flex flex-wrap border-neutral-200 dark:border-neutral-700 p-2 gap-1 justify-center">
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
                  dangerouslySetInnerHTML={{ __html: currentVideo?.dialectIcon }}
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
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="bg-neutral-100 border border-neutral-200 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 flex flex-col relative justify-between">
          <div>
            {isInPracticeSection() && (
              <div className="w-1 bg-blue-500 dark:bg-blue-400 rounded-l-3xl absolute left-0 top-0 h-full"></div>
            )}

            <div className="m-4">
              <h2 className="font-semibold tracking-tighter text-xl text-neutral-900 dark:text-neutral-100">
                Practice Area
              </h2>
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
                      : 'You are currently in a practice section. Press the button to the right to start practicing.'}
                  </p>
                  {/* {transcription && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Transcription:
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">{transcription}</p>
                    </div>
                  )} */}
                </>
              )}
            </div>
          </div>
          <div className="m-3">
            {isInPracticeSection() &&
              currentVideo?.practicableSections[getCurrentSection()]?.target_by_word.map(
                (word, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <button className={getWordStyle(index)}>{word[0]}</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[825px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl tracking-tight">
                          Feedback for &quot;{word[0]}&quot;
                        </DialogTitle>
                        <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                          {feedback.length > 0 && feedback[index] && (
                            <div className="">
                              <p className="">{feedback[index][1]}</p>
                            </div>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Score</h4>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {wordScores[index]
                              ? `${Math.round(wordScores[index] * 100)}%`
                              : 'Not attempted yet'}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ),
              )}
          </div>
          {isInPracticeSection() && feedback.length > 0 && (
            <div className="m-4 space-y-2">
              <h2 className="font-semibold tracking-tighter text-xl text-neutral-900 dark:text-neutral-100">
                Areas for Improvement
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                These are suggestions for words that you may want to practice some more. Let's take
                a look at them, and press to enter deep practice mode when you're ready.
              </p>
              <ul className="list-inside">
                {top3Feedback.map((feedback, index) => (
                  <li
                    key={index}
                    className="text-neutral-800 dark:text-neutral-200 my-2 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 bg-neutral-200/50 dark:bg-neutral-800 flex"
                  >
                    <span className="font-semibold capitalize aspect-[17/9] text-black border-dashed bg-neutral-200 border-neutral-300 dark:border-neutral-700 p-3 border rounded-md flex items-center justify-center h-12 mr-2">
                      {feedback[0]}
                    </span>
                    <div>{feedback[1]}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="max-w-[298px] relative h-fit w-full bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-800 dark:border-neutral-700 flex flex-col">
          <h2 className="text-lg font-semibold tracking-tighter m-3 mb-2 text-neutral-900 dark:text-neutral-100"></h2>
          <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="m-3">
            <div className="">
              {isRecording ? (
                <div
                  className="w-full border px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 border-[#FECACA] bg-[#FEE2E2] text-[#991B1B] dark:bg-[#451A1A] dark:text-[#FECACA] cursor-pointer"
                  onClick={() => {
                    StartPracticeMode(currentVideo?.practicableSections[getCurrentSection()]);
                  }}
                >
                  <PauseIcon className="mr-2 size-4 rounded-xl" fill="currentColor" />
                  Stop Practice Mode
                </div>
              ) : (
                <div
                  className={`w-full border px-4 py-2 rounded-md items-center tracking-tight flex justify-center transition-all duration-150 ${
                    isInPracticeSection()
                      ? 'text-[#1B997B] dark:text-[#9DD8C5] bg-[#C7E9DE] dark:bg-[#1B997B]/20 border-[#9DD8C5] dark:border-[#1B997B] cursor-pointer'
                      : 'text-neutral-400 dark:text-neutral-600 bg-neutral-100 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    StartPracticeMode(currentVideo?.practicableSections[getCurrentSection()]);
                  }}
                >
                  <PlayIcon className="mr-2 size-4 rounded-xl" fill="currentColor" />
                  Start Practice Mode
                </div>
              )}
            </div>
          </div>
          <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-700 mb-5" />
        </div>
      </div>
    </div>
  );
}

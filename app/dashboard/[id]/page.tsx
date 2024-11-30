'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/base/badge';
import { Play, Pause, CheckCircle2, Circle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/base/button';
import Microphone from '../microphone';
import VideoPlayer from '../videoPlayer';

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
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname();
  const value = 78.6;
  const data = [{ value: value }, { value: 100 - value }];

  // dummy data to represent user's data of videos
  const videos = [
    {
      name: 'Friends Season 1 - Clip Joey and Chandler',
      link: 'E6LpBIwGyA4',
      id: 'eWOKwlFQJAjQ',
      badge: 'Hard',
      dialect: 'New York',
      dialectIcon:
        '<svg     xmlns="http://www.w3.org/2000/svg"     width="15"     height="15"     fill="none"     viewBox="0 0 15 15"   >     <path       fill="#EEE"       d="M13.92 8.927a7 7 0 0 0 .244-1.847l-.244-1.847a7 7 0 0 0-.795-1.847L11.49 1.54A7.05 7.05 0 0 0 7.085 0h-.006a7.05 7.05 0 0 0-4.406 1.54L1.039 3.385a7 7 0 0 0-.796 1.847L0 7.08v.003c0 .638.085 1.256.243 1.844l.796 1.847a7.1 7.1 0 0 0 1.634 1.847l4.409 1.539 4.409-1.54a7.1 7.1 0 0 0 1.634-1.846z"     ></path>     <path       fill="#D80027"       d="M13.92 5.233c.16.589.244 1.208.244 1.847H0c0-.639.085-1.258.243-1.847zM11.49 1.54c.647.514 1.201 1.139 1.635 1.846H1.039A7.1 7.1 0 0 1 2.673 1.54zM13.125 10.774a7 7 0 0 0 .795-1.847H.243a7 7 0 0 0 .796 1.847zM11.49 12.62H2.674a7.05 7.05 0 0 0 4.403 1.54h.012a7.05 7.05 0 0 0 4.403-1.54"     ></path>     <path fill="#0052B4" d="M0 6.792A7.08 7.08 0 0 1 7.082 0v7.08H0z"></path>     <path       fill="#EEE"       fillRule="evenodd"       d="M3.03 1.273q.347-.243.723-.444l.027.082h.772l-.625.453.239.734-.625-.453-.624.453.239-.734zM.82 3.772q.245-.463.553-.883l.105.323h.772l-.624.453.238.734-.624-.453-.625.453zM5.842.177l.239.734h.771l-.624.453.238.734-.624-.453-.624.453.238-.734-.624-.453h.772zM3.541 2.478l.239.734h.772l-.625.453.239.734-.625-.453-.624.453.239-.734-.625-.453h.772zm2.54.734-.238-.734-.238.734h-.772l.624.453-.238.734.624-.453.624.453-.238-.734.624-.453zM1.24 4.779l.238.734h.772l-.624.453.238.734-.624-.453-.625.453.239-.734-.625-.453h.772zm2.54.734-.239-.734-.238.734H2.53l.624.453-.238.734.624-.453.625.453-.239-.734.625-.453zm2.063-.734.239.734h.771l-.624.453.238.734-.624-.453-.624.453.238-.734-.624-.453h.772z"       clipRule="evenodd"     ></path>   </svg>',
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
    },
    {
      name: 'Schitts Creek Season 3 - Clip David and Alexis',
      link: 'QIoVaphXbz8',
      id: '0A4Dq41bPQZ1',
      badge: 'Easy',
      dialect: 'New York',
    },
    {
      name: 'The Office Season 1 - Clip Jim and Dwight',
      link: 'WaaANll8h18',
      id: 'JQMDL16t8isF',
      badge: 'Medium',
    },
  ];

  const currentVideo = videos.find(video => pathname?.includes(video.id));

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <div className="h-fit w-full rounded-xl relative p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold tracking-tighter">
          {currentVideo ? currentVideo.name : 'No video selected'}
        </h1>
        {currentVideo && (
          <Badge
            variant="outline"
            className={`${getBadgeColor(currentVideo.badge)} px-2 py-1 text-xs font-medium rounded-lg`}
          >
            {currentVideo.badge}
          </Badge>
        )}
      </div>
      <div className="flex w-full h-full gap-2">
        <div className="aspect-video flex-[4] w-full h-full bg-neutral-100 border border-dashed border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-800 dark:border-neutral-950">
          {/* <div ref={playerRef} className="w-full h-full" /> */}
          <VideoPlayer
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            practicableSections={currentVideo?.practicableSections}
          />
        </div>
        <div className="aspect-[4/2] flex-1 w-full h-full bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-800 dark:border-neutral-950 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium tracking-tighter m-3 mb-2">Practicable Sections</h2>
            <div className="flex flex-col gap-1 mt-0 m-3 max-h-[380px] overflow-y-auto">
              {currentVideo?.practicableSections?.map((section, index) => (
                <div
                  key={index}
                  className="flex relative justify-between items-end p-2 h-24 bg-neutral-10 rounded-lg w-full bg-cover bg-center dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-800"
                  style={{
                    backgroundImage: `url(../images/thumbnails/${section.thumbnail})`,
                  }}
                >
                  <div className="absolute top-0 left-0 w-full z-0 h-full bg-gradient-to-b from-transparent via-black/50 to-black/80 opacity-80 rounded-lg"></div>
                  <span className="text-white font-medium tracking-tighter z-[1]">
                    {section.end - section.start} Seconds
                  </span>
                  <span className="text-neutral-300 text-xs tracking-tight z-[1]">
                    {formatTime(section.start)} - {formatTime(section.end)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="border-t border-neutral-200 dark:border-neutral-800">
              <div className="w-full h-full flex items-center justify-center relative">
                {isClient && (
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
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center -mb-16">
                  <span className="text-4xl font-semibold tracking-tighter text-black">
                    {value}%
                  </span>
                  <span className="text-lg text-neutral-600">Accent Similarity</span>
                </div>
              </div>
            </div>
            <div className="border-t flex border-neutral-200 dark:border-neutral-800 p-2 gap-0.5 justify-center">
              <Badge
                variant="outline"
                className="w-fit px-2 py-1 text-xs font-medium rounded-md bg-[#E2EAFE] border tracking-tight border-[#CAD9FE] text-[#1B3E99]"
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
                className={`${getBadgeColor(currentVideo?.badge)} px-2 py-1 text-xs font-medium rounded-md`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                  className="mr-1"
                >
                  <path
                    fill="#FEE2E2"
                    stroke="#991B1B"
                    d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"
                  ></path>
                  <path
                    fill="#991B1B"
                    d="M7.008 10.09q-.659 0-1.176-.227a2 2 0 0 1-.815-.63 1.67 1.67 0 0 1-.32-.94h1.004a.87.87 0 0 0 .195.505q.18.211.466.326.288.115.64.115.385 0 .684-.134t.47-.374a.95.95 0 0 0 .169-.56q0-.328-.17-.578-.165-.252-.489-.396a1.9 1.9 0 0 0-.773-.144H6.34v-.805h.553q.364 0 .64-.131.278-.131.434-.365a1 1 0 0 0 .156-.552 1 1 0 0 0-.137-.528.92.92 0 0 0-.384-.355 1.25 1.25 0 0 0-.581-.127q-.32 0-.598.118a1.1 1.1 0 0 0-.447.332.86.86 0 0 0-.186.515h-.955q.015-.531.313-.933.3-.404.793-.63a2.6 2.6 0 0 1 1.093-.227q.63 0 1.086.246.46.243.71.649.252.406.249.888.003.55-.307.934a1.5 1.5 0 0 1-.818.514v.051q.652.1 1.01.518.36.419.358 1.039.003.54-.3.968-.3.428-.822.675a2.8 2.8 0 0 1-1.192.242"
                  ></path>
                </svg>
                {currentVideo?.badge}
              </Badge>

              <Badge
                variant="outline"
                className="w-fit px-2 py-1 text-xs font-medium rounded-md bg-[#C7E9DE] border tracking-tight border-[#9DD8C5] text-[#1B997B]"
              >
                <CheckCircle2 className="mr-1 h-[15px] w-[15px]" strokeWidth={2} />
                0/3 Completed
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-neutral-100 border border-dashed border-neutral-200 rounded-lg p-4 w-full dark:bg-neutral-800 dark:border-neutral-950">
        {/* <div className="flex flex-col max-w-[22rem] bg-neutral-100 rounded-md dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-950">
          <div className="flex gap-3 justify-between items-center m-4 mb-2">
            <h2 className="text-xl font-semibold tracking-tighter">Record</h2>
            <p className="text-xs tracking-tight text-neutral-500">
              Hold{' '}
              <span className="rounded-full bg-neutral-200/50 border border-neutral-300 px-1.5 py-0.5">
                Space
              </span>
            </p>
          </div>
          <p className="text-sm tracking-tight text-neutral-600 mx-4 mb-4">
            Start recording below using the microphone button or hold down the space bar
          </p>
          <div className="flex border-y border-neutral-200 dark:border-neutral-800 p-4">
            <Button
              variant="outline"
              className="px-2 h-7 text-xs font-medium rounded-md bg-[#C7E9DE] border border-[#9DD8C5] text-[#1B997B] hover:bg-[#C7E9DE]/80 hover:text-[#1B997B]"
            >
              <Circle className="h-4 w-4 mr-1" fill="#1B997B" />
              Start
            </Button>
          </div>
        </div> */}
        <Microphone />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Dot, Search } from 'lucide-react';
import ClipsList from './ClipsList';
import { useId } from 'react';
import Fuse from 'fuse.js';

const shows = [
  {
    id: 'the-office',
    name: 'The Office',
    color: '#7A4926',
  },
  {
    id: 'parks-and-rec',
    name: 'Parks and Recreation',
    color: '#3AC218',
  },
  {
    id: 'good-place',
    name: 'The Good Place',
    color: '#17A763',
  },
  {
    id: 'greys-anatomy',
    name: "Grey's Anatomy",
    color: '#626A8C',
  },
  {
    id: 'friends',
    name: 'Friends',
    color: '#C01717',
  },
  {
    id: 'seinfeld',
    name: 'Seinfeld',
    color: '#1C499E',
  },
  {
    id: 'modern-family',
    name: 'Modern Family',
    color: '#FD7919',
  },
  {
    id: 'the-big-bang-theory',
    name: 'The Big Bang Theory',
    color: '#FF3565',
  },
  {
    id: 'breaking-bad',
    name: 'Breaking Bad',
    color: '#FFD600',
  },
  {
    id: 'lost',
    name: 'Lost',
    color: '#47A4A6',
  },
  {
    id: 'curious-george',
    name: 'Curious George',
    color: '#EB2C2E',
  },
  {
    id: 'the-simpsons',
    name: 'The Simpsons',
    color: '#FFD600',
  },
];

// Fuse.js options
const fuseOptions = {
  keys: ['title'],
  threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
  distance: 100, // How far to search for matches
  minMatchCharLength: 1,
};

interface RecommendedClip {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  show: string;
  difficulty: string;
  dialect: string;
  dialectFlag: string;
}

const recommendedClips: RecommendedClip[] = [
  {
    id: 4,
    title: 'Where Is My Desk!? - The Office US',
    duration: '1:55',
    thumbnail: '/images/thumbnails/where-is-my-desk.jpg',
    show: 'the-office',
    difficulty: 'Hard',
    dialect: 'US',
    dialectFlag: '🇺🇸',
  },
  {
    id: 5,
    title: 'Janet Loves Jason - The Good Place',
    duration: '1:37',
    thumbnail: '/images/thumbnails/the-good-place-janet-loves-jason.jpg',
    show: 'the-good-place',
    difficulty: 'Easy',
    dialect: 'US',
    dialectFlag: '🇺🇸',
  },
  {
    id: 6,
    title: 'Say Hello to Real Eleanor - The Good Place',
    duration: '2:37',
    thumbnail: '/images/thumbnails/the-good-place-say-hello-to-real-eleanor.jpg',
    show: 'the-good-place',
    difficulty: 'Medium',
    dialect: 'US',
    dialectFlag: '🇺🇸',
  },
  {
    id: 7,
    title: "Meredith Wins Harper Avery - Grey's Anatomy 300th Episode",
    duration: '1:26',
    thumbnail: '/images/thumbnails/meredith-wins-harper-avery.jpg',
    show: 'greys-anatomy',
    difficulty: 'Medium',
    dialect: 'US',
    dialectFlag: '🇺🇸',
  },
  {
    id: 2,
    title: 'Ben finally shoots his shot - Parks and Recreation',
    duration: '4:19',
    thumbnail: '/images/thumbnails/parks-and-recreation-ben-shoots-his-shot.jpg',
    show: 'parks-and-rec',
    difficulty: 'Easy',
    dialect: 'US',
    dialectFlag: '🇺🇸',
  },
  {
    id: 3,
    title: 'The Cursed Harvest Festival Interview - Parks and Recreation',
    duration: '2:14',
    thumbnail: '/images/thumbnails/the-cursed-harvest-festival-interview.jpg',
    show: 'parks-and-rec',
    difficulty: 'Easy',
    dialect: 'US',
    dialectFlag: '🇺🇸',
  },
];

interface RevisitClip {
  title: string;
  thumbnail: string;
  vtt: string;
  video: string;
  link: string;
  id: string;
  badge: string;
  dialect: string;
  difficulty: string;
  dialectFlag: string;
  completedSections: number;
  duration: string;
}

interface SearchCenterProps {
  clips: RevisitClip[];
}

export default function SearchCenter({ clips }: SearchCenterProps) {
  const [activeShow, setActiveShow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRevisitClips, setFilteredRevisitClips] = useState(clips);
  const [filteredRecommendedClips, setFilteredRecommendedClips] = useState(recommendedClips);
  const searchId = useId();

  const revisitFuse = useMemo(() => new Fuse(clips, fuseOptions), [clips]);
  const recommendedFuse = useMemo(() => new Fuse(recommendedClips, fuseOptions), []);

  useEffect(() => {
    let revisitResults = [...clips];
    let recommendedResults = [...recommendedClips];

    if (activeShow) {
      const showMatch = shows.find(show => show.id === activeShow);
      const showName = showMatch?.name.toLowerCase() || '';

      revisitResults = revisitResults.filter(clip => clip.title.toLowerCase().includes(showName));
      recommendedResults = recommendedResults.filter(clip =>
        clip.title.toLowerCase().includes(showName),
      );
    }

    if (searchQuery) {
      const filteredRevisitFuse = new Fuse(revisitResults, fuseOptions);
      const filteredRecommendedFuse = new Fuse(recommendedResults, fuseOptions);

      revisitResults = filteredRevisitFuse.search(searchQuery).map(result => result.item);
      recommendedResults = filteredRecommendedFuse.search(searchQuery).map(result => result.item);
    }

    setFilteredRevisitClips(revisitResults);
    setFilteredRecommendedClips(recommendedResults);
  }, [searchQuery, activeShow, clips]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full h-fit">
        <h1 className="text-2xl font-semibold text-black dark:text-white tracking-tighter pt-4 px-4">
          Search Clips
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full gap-2 px-4">
          <div className="space-y-2 w-full">
            <div className="flex gap-1 w-full relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Search size={16} strokeWidth={2} aria-hidden="true" />
              </div>
              <Input
                id={searchId}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 tracking-tight w-full rounded-full focus-visible:ring-neutral-500 focus-visible:ring-1 pl-8"
                placeholder="Search for clips..."
                type="text"
              />
              <Button variant="outline" className="rounded-full tracking-tight">
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Show Tabs */}
        <div className="flex gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide px-4 pb-6">
          <Button
            size="badge"
            variant="outline"
            onClick={() => setActiveShow(null)}
            className={`tracking-tight ${activeShow === null ? ' border border-neutral-500 dark:border-neutral-700' : ''}`}
          >
            <div className="w-4 overflow-hidden justify-center items-center grid pr-1.5 -ml-0.5">
              <Dot className="w-14 h-14 text-black dark:text-white" />
            </div>
            All Shows
          </Button>
          {shows.map(show => (
            <Button
              key={show.id}
              size="badge"
              variant="outline"
              onClick={() => setActiveShow(show.id)}
              className={`tracking-tight ${activeShow === show.id ? ' border border-neutral-500 dark:border-neutral-700' : ''}`}
            >
              <div className="w-4 overflow-hidden justify-center items-center grid pr-1.5 -ml-0.5">
                <Dot
                  className="w-14 h-14 text-black dark:text-white"
                  style={{ color: show.color }}
                />
              </div>
              {show.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-px w-full border-t border-dashed"></div>

      {/* Display filtered clips */}
      <div>
        <ClipsList title="Previously Practiced" clips={filteredRevisitClips} isRevisitList={true} />
        <ClipsList title="Recommended For You" clips={filteredRecommendedClips} />
      </div>

      {filteredRevisitClips.length === 0 && filteredRecommendedClips.length === 0 && (
        <div className="flex flex-col gap-1 px-4 w-full justify-center items-center relative">
          <div className="relative xl:mt-48 mt-24 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              className="shadow-lg rounded-[14px] mb-12 z-10 relative empty-state-center"
              viewBox="0 0 411 239"
            >
              <g clipPath="url(#clip0_2569_247)">
                <rect
                  width="410"
                  height="238"
                  x="0.5"
                  y="0.5"
                  fill="#fff"
                  stroke="#E1E1E1"
                  rx="13.5"
                ></rect>
                <rect width="392" height="194" x="10" y="11" fill="#F4F4F4" rx="6"></rect>
                <rect
                  width="308"
                  height="16"
                  fill="#F4F4F4"
                  rx="6"
                  transform="matrix(1 0 0 -1 10 227)"
                ></rect>
                <rect
                  width="36"
                  height="16"
                  fill="#F4F4F4"
                  rx="6"
                  transform="matrix(1 0 0 -1 366 227)"
                ></rect>
                <path
                  fill="#000"
                  fillOpacity="0.04"
                  d="M189.328 82.777c0-5.093 5.63-8.174 9.92-5.428l40.192 25.722c3.961 2.536 3.961 8.322 0 10.858l-40.192 25.722c-4.29 2.746-9.92-.335-9.92-5.428z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2569_247">
                  <rect width="411" height="239" fill="#fff" rx="14"></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              className="shadow-lg rounded-[14px] mb-12 absolute top-0 left-0 translate-x-[30px] translate-y-[30px] rotate-[3deg] empty-state-right"
              viewBox="0 0 411 239"
            >
              <g clipPath="url(#clip0_2569_247)">
                <rect
                  width="410"
                  height="238"
                  x="0.5"
                  y="0.5"
                  fill="#fff"
                  stroke="#E1E1E1"
                  rx="13.5"
                ></rect>
                <rect width="392" height="194" x="10" y="11" fill="#F4F4F4" rx="6"></rect>
                <rect
                  width="308"
                  height="16"
                  fill="#F4F4F4"
                  rx="6"
                  transform="matrix(1 0 0 -1 10 227)"
                ></rect>
                <rect
                  width="36"
                  height="16"
                  fill="#F4F4F4"
                  rx="6"
                  transform="matrix(1 0 0 -1 366 227)"
                ></rect>
                <path
                  fill="#000"
                  fillOpacity="0.04"
                  d="M189.328 82.777c0-5.093 5.63-8.174 9.92-5.428l40.192 25.722c3.961 2.536 3.961 8.322 0 10.858l-40.192 25.722c-4.29 2.746-9.92-.335-9.92-5.428z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2569_247">
                  <rect width="411" height="239" fill="#fff" rx="14"></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              className="shadow-lg rounded-[14px] mb-12 absolute top-0 left-0 translate-x-[-30px] -translate-y-[30px] rotate-[-3deg] empty-state-left"
              viewBox="0 0 411 239"
            >
              <g clipPath="url(#clip0_2569_247)">
                <rect
                  width="410"
                  height="238"
                  x="0.5"
                  y="0.5"
                  fill="#fff"
                  stroke="#E1E1E1"
                  rx="13.5"
                ></rect>
                <rect width="392" height="194" x="10" y="11" fill="#F4F4F4" rx="6"></rect>
                <rect
                  width="308"
                  height="16"
                  fill="#F4F4F4"
                  rx="6"
                  transform="matrix(1 0 0 -1 10 227)"
                ></rect>
                <rect
                  width="36"
                  height="16"
                  fill="#F4F4F4"
                  rx="6"
                  transform="matrix(1 0 0 -1 366 227)"
                ></rect>
                <path
                  fill="#000"
                  fillOpacity="0.04"
                  d="M189.328 82.777c0-5.093 5.63-8.174 9.92-5.428l40.192 25.722c3.961 2.536 3.961 8.322 0 10.858l-40.192 25.722c-4.29 2.746-9.92-.335-9.92-5.428z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2569_247">
                  <rect width="411" height="239" fill="#fff" rx="14"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-lg font-medium text-black tracking-tighter">No clips found</h2>
          <p className="text-sm text-muted-foreground">
            Try searching for a different show or clip.
          </p>
        </div>
      )}
    </div>
  );
}

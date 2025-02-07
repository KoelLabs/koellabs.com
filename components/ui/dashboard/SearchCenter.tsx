'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Dot, Search } from 'lucide-react';
import ClipsList from './ClipsList';
import { useId } from 'react';

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
];

interface RecommendedClip {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
}

const recommendedClips: RecommendedClip[] = [
  {
    id: 4,
    title: 'Where Is My Desk!? - The Office US',
    duration: '1:55',
    thumbnail: '/images/thumbnails/where-is-my-desk.jpg',
  },
  {
    id: 5,
    title: 'Janet Loves Jason - The Good Place',
    duration: '1:37',
    thumbnail: '/images/thumbnails/the-good-place-janet-loves-jason.jpg',
  },
  {
    id: 6,
    title: 'Say Hello to Real Eleanor - The Good Place',
    duration: '2:37',
    thumbnail: '/images/thumbnails/the-good-place-say-hello-to-real-eleanor.jpg',
  },
  {
    id: 7,
    title: "Meredith Wins Harper Avery - Grey's Anatomy 300th Episode",
    duration: '1:26',
    thumbnail: '/images/thumbnails/meredith-wins-harper-avery.jpg',
  },
  {
    id: 2,
    title: 'Ben finally shoots his shot - Parks and Recreation',
    duration: '4:19',
    thumbnail: '/images/thumbnails/parks-and-recreation-ben-shoots-his-shot.jpg',
  },
  {
    id: 3,
    title: 'The Cursed Harvest Festival Interview - Parks and Recreation',
    duration: '2:14',
    thumbnail: '/images/thumbnails/the-cursed-harvest-festival-interview.jpg',
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
  dialectIcon: string;
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

  // Filter clips based on search query and active show
  useEffect(() => {
    let revisitFiltered = [...clips];
    let recommendedFiltered = [...recommendedClips];

    // Filter by show
    if (activeShow) {
      const showMatch = shows.find(show => show.id === activeShow);
      const showName = showMatch?.name.toLowerCase() || '';

      revisitFiltered = revisitFiltered.filter(clip => clip.title.toLowerCase().includes(showName));

      recommendedFiltered = recommendedFiltered.filter(clip =>
        clip.title.toLowerCase().includes(showName),
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      revisitFiltered = revisitFiltered.filter(clip => clip.title.toLowerCase().includes(query));
      recommendedFiltered = recommendedFiltered.filter(clip =>
        clip.title.toLowerCase().includes(query),
      );
    }

    setFilteredRevisitClips(revisitFiltered);
    setFilteredRecommendedClips(recommendedFiltered);
  }, [searchQuery, activeShow, clips]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect, but we prevent form submission
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full h-fit p-4">
        <h1 className="text-2xl font-semibold text-black tracking-tighter">Search Clips</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full gap-2">
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
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
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
        <ClipsList title="Revisit Videos" clips={filteredRevisitClips} isRevisitList={true} />
        <ClipsList title="Recommended Videos" clips={filteredRecommendedClips} />
      </div>
    </div>
  );
}

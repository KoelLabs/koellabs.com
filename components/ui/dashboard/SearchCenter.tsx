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
    id: 'jumanji',
    name: 'Jumanji',
    color: '#228B22',
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
  id: string | number;
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
    id: 'Y82ck2bct8sbG',
    title: 'Jumanji: The Next Level from Sony Pictures Entertainment',
    duration: '9:35',
    thumbnail: '/images/thumbnails/jumanji-next-level-full-res.jpg',
    show: 'jumanji',
    difficulty: 'Medium',
    dialect: 'US Midlands',
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

interface SearchCenterProps {}

export default function SearchCenter({}: SearchCenterProps) {
  const [activeShow, setActiveShow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userClips, setUserClips] = useState<RevisitClip[]>([]);
  const [filteredRevisitClips, setFilteredRevisitClips] = useState<RevisitClip[]>([]);
  const [filteredRecommendedClips, setFilteredRecommendedClips] = useState(recommendedClips);
  const [isLoading, setIsLoading] = useState(true);
  const searchId = useId();

  const revisitFuse = useMemo(() => new Fuse(userClips, fuseOptions), [userClips]);
  const recommendedFuse = useMemo(() => new Fuse(recommendedClips, fuseOptions), []);

  // Fetch user's videos on component mount
  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        // Set loading state
        setIsLoading(true);

        // Simulate minimum loading time for better UX (at least 500ms to show skeleton)
        const startTime = Date.now();

        const response = await fetch('/api/userVideos');
        if (response.ok) {
          const videos = await response.json();
          setUserClips(videos);
        } else {
          console.warn('Failed to fetch user videos:', response.status);
          setUserClips([]);
        }

        // Ensure loading state shows for at least 500ms for better UX
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
        }
      } catch (error) {
        console.error('Error fetching user videos:', error);
        setUserClips([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVideos();
  }, []);

  useEffect(() => {
    let revisitResults = [...userClips];
    let recommendedResults = [...recommendedClips];

    // Step 1: Apply show filter if active
    if (activeShow) {
      const showMatch = shows.find(show => show.id === activeShow);
      const showName = showMatch?.name.toLowerCase() || '';

      revisitResults = revisitResults.filter(clip => clip.title.toLowerCase().includes(showName));
      recommendedResults = recommendedResults.filter(clip =>
        clip.title.toLowerCase().includes(showName),
      );
    }

    // Step 2: Apply search query if present
    if (searchQuery) {
      const filteredRevisitFuse = new Fuse(revisitResults, fuseOptions);
      const filteredRecommendedFuse = new Fuse(recommendedResults, fuseOptions);

      revisitResults = filteredRevisitFuse.search(searchQuery).map(result => result.item);
      recommendedResults = filteredRecommendedFuse.search(searchQuery).map(result => result.item);
    }

    // Step 3: Filter out videos from recommendations that already appear in user clips
    // Get a list of all video IDs in the user's previously practiced clips
    const userClipIds = revisitResults.map(clip => clip.id.toString());

    // Remove any recommended clips that have matching IDs with user clips
    recommendedResults = recommendedResults.filter(
      clip => !userClipIds.includes(clip.id.toString()),
    );

    setFilteredRevisitClips(revisitResults);
    setFilteredRecommendedClips(recommendedResults);
  }, [searchQuery, activeShow, userClips]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleVideoAdded = async (videoId: string) => {
    // Refetch user videos to update the "Previously Practiced" section
    try {
      console.log('Refetching user videos after adding video:', videoId);
      const response = await fetch('/api/userVideos');

      if (response.ok) {
        const videos = await response.json();
        console.log('Updated user videos:', videos);

        // Update local state with the new videos
        setUserClips(videos);
        setFilteredRevisitClips(videos);

        // If we have videos, make sure they're displayed
        if (videos.length > 0) {
          console.log('Videos found, updating UI');
        } else {
          console.log('No videos returned from API');
        }
      } else {
        console.warn('Failed to fetch updated videos:', response.status);
      }

      // Trigger a refresh of the sidebar using multiple approaches

      // 1. Main event with video data
      const mainEvent = new CustomEvent('koellabs:userVideosUpdated', {
        detail: {
          timestamp: Date.now(),
          videoId: videoId,
          action: 'add',
          forceRefresh: true,
        },
        bubbles: true,
      });
      console.log('Dispatching main update event');
      window.dispatchEvent(mainEvent);
      document.dispatchEvent(mainEvent); // Try both window and document

      // 2. Try a backup approach with a timeout
      setTimeout(() => {
        console.log('Dispatching backup events');

        // Force sidebar refresh with another event type
        const forceEvent = new CustomEvent('koellabs:forceRefresh', {
          detail: { source: 'SearchCenter', timestamp: Date.now() },
          bubbles: true,
        });
        window.dispatchEvent(forceEvent);
        document.dispatchEvent(forceEvent);

        // 3. Direct DOM manipulation as a last resort
        try {
          // Try multiple potential selectors
          const selectors = [
            '[data-sidebar-videos]',
            '#sidebar-videos',
            '.sidebar-videos',
            '[data-component="sidebar-videos"]',
          ];

          for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
              console.log(`Found sidebar element with selector: ${selector}`);
              element.setAttribute('data-force-update', Date.now().toString());
              element.setAttribute('data-last-video', videoId);

              // Try to trigger a custom event directly on the element
              element.dispatchEvent(new CustomEvent('refresh', { bubbles: true }));
              break;
            }
          }
        } catch (domError) {
          console.error('DOM manipulation error:', domError);
        }
      }, 100);

      // Force a re-render by updating state
      setSearchQuery(prev => prev);
    } catch (error) {
      console.error('Error refreshing user videos:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full h-fit">
        <div className="flex gap-2 w-full h-fit pt-4.5 px-4.5">
          {/* <div
            className="flex size-8 items-center justify-center rounded-lg bg-neutral-200"
            aria-hidden="true"
          >
            <Search
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="text-black/50 dark:text-white/50"
            />
          </div> */}
          <h1 className="text-2xl font-semibold text-black dark:text-white tracking-tighter">
            Search Clips
          </h1>
        </div>

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
                placeholder="Search for your favorite clips, shows, or movies..."
                type="text"
              />
              <Button variant="outline" className="rounded-full tracking-tight h-10 px-4">
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
              <Dot className="size-12 text-black dark:text-white" />
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
                <Dot className="size-12 text-black dark:text-white" style={{ color: show.color }} />
              </div>
              {show.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-px w-full border-t border-dashed"></div>

      {/* Display filtered clips with loading states */}
      <div>
        {isLoading ? (
          <>
            {/* Skeleton for Previously Practiced */}
            <div className="w-full">
              <div className="flex justify-between items-center p-4">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-48 animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="overflow-x-scroll pb-4 scrollbar-hide">
                  <div className="flex space-x-3 px-4">
                    {Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={`skeleton-revisit-${index}`}
                          className="flex-none w-[200px] sm:w-[364px] animate-pulse"
                        >
                          <div className="rounded-lg bg-neutral-200 dark:bg-neutral-800 aspect-video mb-2"></div>
                          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-2"></div>
                          <div className="flex justify-between">
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skeleton for Recommended */}
            <div className="w-full mt-4">
              <div className="flex justify-between items-center p-4">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-48 animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="overflow-x-scroll pb-4 scrollbar-hide">
                  <div className="flex space-x-3 px-4">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={`skeleton-recommended-${index}`}
                          className="flex-none w-[200px] sm:w-[364px] animate-pulse"
                        >
                          <div className="rounded-lg bg-neutral-200 dark:bg-neutral-800 aspect-video mb-2"></div>
                          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-2"></div>
                          <div className="flex justify-between">
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Only show sections if there are matching results or no search/filter is applied */}
            {(filteredRevisitClips.length > 0 || (!searchQuery && !activeShow)) && (
              <ClipsList
                title="Previously Practiced"
                clips={filteredRevisitClips}
                isRevisitList={true}
              />
            )}

            {/* Only show recommended section if there are matching results */}
            {filteredRecommendedClips.length > 0 && (
              <ClipsList
                title="Recommended For You"
                clips={filteredRecommendedClips}
                onVideoAdded={handleVideoAdded}
              />
            )}
          </>
        )}
      </div>

      {/* Show "No clips found" only when there are no results for either section */}
      {!isLoading && filteredRevisitClips.length === 0 && filteredRecommendedClips.length === 0 && (
        <div className="flex flex-col gap-1 px-4 w-full justify-center items-center relative">
          <div className="relative xl:mt-48 mt-24 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              viewBox="0 0 411 239"
              className="shadow-lg rounded-[14px] mb-12 absolute top-0 left-0 translate-x-[30px] translate-y-[30px] rotate-[3deg] empty-state-right dark:block hidden"
            >
              <g clipPath="url(#clip0_2588_330)">
                <rect width="411" height="239" fill="#27272A" rx="14"></rect>
                <rect
                  width="410"
                  height="238"
                  x="0.5"
                  y="0.5"
                  fill="#212121"
                  stroke="#2F2F2F"
                  rx="13.5"
                ></rect>
                <rect width="392" height="194" x="10" y="11" fill="#2F2F2F" rx="6"></rect>
                <rect
                  width="308"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 10 227)"
                ></rect>
                <rect
                  width="36"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 366 227)"
                ></rect>
                <path
                  fill="#3B3B3B"
                  d="M189.328 82.777c0-5.093 5.63-8.174 9.92-5.428l40.192 25.722c3.961 2.536 3.961 8.322 0 10.858l-40.192 25.722c-4.29 2.746-9.92-.335-9.92-5.428z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2588_330">
                  <rect width="411" height="239" fill="#fff" rx="14"></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              viewBox="0 0 411 239"
              className="shadow-lg rounded-[14px] mb-12 z-10 relative empty-state-center hidden dark:block"
            >
              <g clipPath="url(#clip0_2588_330)">
                <rect width="411" height="239" fill="#27272A" rx="14"></rect>
                <rect
                  width="410"
                  height="238"
                  x="0.5"
                  y="0.5"
                  fill="#212121"
                  stroke="#2F2F2F"
                  rx="13.5"
                ></rect>
                <rect width="392" height="194" x="10" y="11" fill="#2F2F2F" rx="6"></rect>
                <rect
                  width="308"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 10 227)"
                ></rect>
                <rect
                  width="36"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 366 227)"
                ></rect>
                <path
                  fill="#3B3B3B"
                  d="M189.328 82.777c0-5.093 5.63-8.174 9.92-5.428l40.192 25.722c3.961 2.536 3.961 8.322 0 10.858l-40.192 25.722c-4.29 2.746-9.92-.335-9.92-5.428z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2588_330">
                  <rect width="411" height="239" fill="#fff" rx="14"></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              viewBox="0 0 411 239"
              className="shadow-lg rounded-[14px] mb-12 absolute top-0 left-0 translate-x-[30px] translate-y-[30px] rotate-[3deg] empty-state-right dark:block hidden"
            >
              <g clipPath="url(#clip0_2588_330)">
                <rect width="411" height="239" fill="#27272A" rx="14"></rect>
                <rect
                  width="410"
                  height="238"
                  x="0.5"
                  y="0.5"
                  fill="#212121"
                  stroke="#2F2F2F"
                  rx="13.5"
                ></rect>
                <rect width="392" height="194" x="10" y="11" fill="#2F2F2F" rx="6"></rect>
                <rect
                  width="308"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 10 227)"
                ></rect>
                <rect
                  width="36"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 366 227)"
                ></rect>
                <path
                  fill="#3B3B3B"
                  d="M189.328 82.777c0-5.093 5.63-8.174 9.92-5.428l40.192 25.722c3.961 2.536 3.961 8.322 0 10.858l-40.192 25.722c-4.29 2.746-9.92-.335-9.92-5.428z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2588_330">
                  <rect width="411" height="239" fill="#fff" rx="14"></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              viewBox="0 0 411 239"
              className="shadow-lg rounded-[14px] mb-12 absolute top-0 left-0 translate-x-[-30px] -translate-y-[30px] rotate-[-3deg] empty-state-left hidden dark:block"
            >
              <g clipPath="url(#clip0_2588_330)">
                <rect width="411" height="239" fill="#27272A" rx="14"></rect>
                <rect
                  width="410"
                  height="238"
                  x="0.5"
                  y="0.5"
                  fill="#212121"
                  stroke="#2F2F2F"
                  rx="13.5"
                ></rect>
                <rect width="392" height="194" x="10" y="11" fill="#2F2F2F" rx="6"></rect>
                <rect
                  width="308"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 10 227)"
                ></rect>
                <rect
                  width="36"
                  height="16"
                  fill="#2F2F2F"
                  rx="6"
                  transform="matrix(1 0 0 -1 366 227)"
                ></rect>
                <path
                  fill="#3B3B3B"
                  d="M189.328 82.777c0-5.093 5.63-8.174 9.92-5.428l40.192 25.722c3.961 2.536 3.961 8.322 0 10.858l-40.192 25.722c-4.29 2.746-9.92-.335-9.92-5.428z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2588_330">
                  <rect width="411" height="239" fill="#fff" rx="14"></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="411"
              height="239"
              fill="none"
              className="shadow-lg rounded-[14px] mb-12 z-10 relative empty-state-center dark:hidden"
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
              className="shadow-lg rounded-[14px] mb-12 absolute top-0 left-0 translate-x-[30px] translate-y-[30px] rotate-[3deg] empty-state-right dark:hidden"
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
              className="shadow-lg rounded-[14px] mb-12 absolute top-0 left-0 translate-x-[-30px] -translate-y-[30px] rotate-[-3deg] empty-state-left dark:hidden"
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
          <h2 className="text-lg font-medium text-black dark:text-white tracking-tighter">
            No clips found
          </h2>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            Try searching for a different show or clip.
          </p>
        </div>
      )}
    </div>
  );
}

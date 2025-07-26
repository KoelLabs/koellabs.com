'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/base/card';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/base/button';
import { cn } from '@/lib/styles';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/base/badge';
import { useRouter } from 'next/navigation';
import { associateUserVideo } from '@/lib/videos';

interface BaseClip {
  id: string | number;
  title: string;
  duration: string;
  thumbnail: string;
  difficulty: string;
  dialect: string;
  dialectFlag: string;
}

interface RevisitClip {
  id: string;
  title: string;
  thumbnail: string;
  vtt: string | null;
  video: string;
  link: string | null;
  badge: string | null;
  difficulty: string | null;
  dialect: string | null;
  dialectFlag: string | null;
  dialectIcon: string | null;
  completedSections: number | null;
  duration: string | null;
  addedAt: Date | null;
  lastWatched: Date | null;
}

interface ClipsListProps {
  title: string;
  clips: (BaseClip | RevisitClip)[];
  isRevisitList?: boolean;
  onVideoAdded?: (videoId: string) => Promise<void>;
}

export default function ClipsList({
  title,
  clips,
  isRevisitList = false,
  onVideoAdded,
}: ClipsListProps) {
  const router = useRouter();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Memoize clip rendering to prevent unnecessary re-renders
  const handleRecommendedClipClick = React.useCallback(
    async (clip: BaseClip | RevisitClip) => {
      console.log('Video clicked:', clip.title, clip.id);

      try {
        console.log('Adding video to user collection...');
        // Start navigation and API call in parallel
        const navigationPromise = router.prefetch(`/dashboard/${clip.id}`);

        try {
          await associateUserVideo(clip.id.toString());
          console.log('Video added successfully');
        } catch (error) {
          console.warn('Failed to add video:', error);
        }

        // Store in session storage early
        sessionStorage.setItem('lastClickedVideo', clip.id.toString());

        if (onVideoAdded) {
          console.log('Updating parent state...');
          await onVideoAdded(clip.id.toString());
        }

        console.log('Navigating to video page...');
        router.push(`/dashboard/${clip.id}`);
      } catch (error) {
        console.error('Error adding video to user collection:', error);
        console.log('Navigating anyway...'); // TODO: what kind if error handling is this lol, should show something to the user
        router.push(`/dashboard/${clip.id}`);
      }
    },
    [router, onVideoAdded],
  );

  const handleScroll = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10 && scrollWidth > clientWidth);
    }
  }, []);

  const scroll = React.useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Use ResizeObserver to detect changes in container size
      const resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(scrollContainer);

      // Initial check for overflow
      handleScroll();

      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, [handleScroll]);

  const toggleExpand = React.useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const renderClip = React.useCallback(
    (clip: BaseClip | RevisitClip, index: number) => {
      const clipContent = (
        <>
          <Card className="border text-neutral-500 relative overflow-hidden dark:text-neutral-400 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300 dark:border-neutral-800">
            <CardContent
              className={cn(
                'flex aspect-video items-center justify-center',
                isRevisitList ? 'p-2' : 'p-0',
              )}
            >
              <Image
                src={clip.thumbnail}
                alt={clip.title}
                width={298}
                height={167.33}
                className={cn('w-full h-full object-cover', {
                  'absolute inset-0': isRevisitList,
                  'rounded-[7px]': !isRevisitList,
                })}
                loading="lazy"
              />
            </CardContent>
          </Card>
          <div className="flex justify-between mt-1.5">
            <h2 className="text-sm font-medium tracking-tight ml-1 line-clamp-1 text-neutral-700 dark:text-neutral-300 h-full">
              {clip.title}
            </h2>
            <p className="text-sm font-medium mr-1 text-neutral-500 dark:text-neutral-400">
              {clip.duration}
            </p>
          </div>
          <div className="flex justify-between mt-1.5">
            <Badge
              variant="outline"
              className="inline-flex items-center justify-center rounded-full border px-2 py-0 text-xs font-normal leading-normal text-foreground gap-1.5"
            >
              <span
                className={cn('size-1.5 rounded-full', {
                  'bg-green-500': clip.difficulty === 'Easy',
                  'bg-yellow-500': clip.difficulty === 'Medium',
                  'bg-red-500': clip.difficulty === 'Hard',
                })}
                aria-hidden="true"
              ></span>
              {clip.difficulty}
            </Badge>
            <Badge
              variant="outline"
              className="inline-flex items-center justify-center rounded-full border px-2 py-0 text-xs font-normal leading-normal text-foreground gap-2"
            >
              {clip.dialectFlag} {clip.dialect}
            </Badge>
          </div>
        </>
      );

      const clipWrapper = (
        <div
          key={index}
          className={cn('flex-none w-[200px] sm:w-[364px]', {
            'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-1.5 pb-6': isExpanded,
          })}
        >
          {isRevisitList ? (
            <Link href={`dashboard/${clip.id}`} className="block">
              {clipContent}
            </Link>
          ) : (
            <button
              onClick={() => handleRecommendedClipClick(clip)}
              className="block w-full text-left cursor-pointer transition-transform duration-200 rounded-lg"
            >
              {clipContent}
            </button>
          )}
        </div>
      );

      return clipWrapper;
    },
    [isRevisitList, handleRecommendedClipClick],
  );

  // Memoize this calculation
  const showViewAllButton = React.useMemo(() => clips.length >= 5, [clips.length]);

  // Render empty state with call to action for "Previously Practiced"
  const renderEmptyState = React.useCallback(() => {
    if (isRevisitList) {
      return (
        <div className="flex relative flex-col items-center justify-center text-center border mx-4 border-neutral-200 dark:border-neutral-800 rounded-xl border-dashed bg-[url('/NoPractice.svg')] dark:bg-[url('/DarkNoPractice.svg')] bg-cover bg-center">
          <div className="relative flex-col items-center justify-center flex bg-white/50 dark:bg-transparent py-10 px-4">
            <p className="mb-3 text-3xl">🎬</p>
            <h3 className="text-lg font-medium tracking-tight mb-2">No Practice History</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 max-w-xs text-balance">
              Start practicing with any clip from the home page to build history.
            </p>
            <Button
              variant="outline"
              className="flex items-center gap-2 tracking-tight"
              onClick={() => {
                // Scroll to recommended section
                const recommendedSection = document.querySelector('[data-section="recommended"]');
                if (recommendedSection) {
                  recommendedSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Browse Recommendations
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
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
        </div>
      );
    }
    return null;
  }, [isRevisitList]);

  const renderedClips = React.useMemo(() => {
    return clips.map((clip, index) => (
      <div
        key={`clip-${clip.id}`}
        className={cn('snap-center', {
          'pr-4': index === clips.length - 1,
        })}
      >
        {renderClip(clip, index)}
      </div>
    ));
  }, [clips, renderClip]);

  return (
    <div className="w-full" data-section={isRevisitList ? 'previously-practiced' : 'recommended'}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100 pt-0.5 px-0.5">
          {title}
        </h1>
        {clips.length > 0 && showViewAllButton && (
          <Button
            onClick={toggleExpand}
            variant="outline"
            size="sm"
            className="tracking-tight dark:border-neutral-800 dark:text-neutral-300"
          >
            {isExpanded ? 'Collapse' : 'View All'}
          </Button>
        )}
      </div>

      {clips.length === 0 && renderEmptyState()}

      {clips.length > 0 && (
        <div className={cn('relative', { 'px-5': isExpanded })}>
          {isExpanded ? (
            <div className="flex flex-wrap -mx-2">
              {clips.map((clip, index) => renderClip(clip, index))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory"
            >
              <div className="flex space-x-3 px-4">{renderedClips}</div>
            </div>
          )}
          {!isExpanded && showLeftArrow && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 border border-accent dark:border-accent-dark rounded-full h-8 w-8"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {!isExpanded && showRightArrow && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 border border-accent dark:border-accent-dark rounded-full h-8 w-8"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

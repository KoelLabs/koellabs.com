'use client';

import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Home,
  LifeBuoy,
  Send,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavVideos } from '@/components/sidebar/nav-videos';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import { NavUser } from '@/components/sidebar/nav-user';
import { BetaCard } from '@/components/sidebar/beta-card';
import { Button } from '@/components/ui/base/button';
import { MotionConfig } from 'framer-motion';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { getUser } from '@/lib/auth-client';
import { useUserVideos } from '@/hooks/use-user-videos';
import { Badge } from '../ui/base/badge';

const NAV_MAIN = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

const NAV_SECONDARY = [
  {
    title: 'Support',
    url: '#',
    icon: LifeBuoy,
  },
  {
    title: 'Feedback',
    url: '#',
    icon: Send,
  },
];

export function AppSidebar({ className }) {
  const shouldReduceMotion = useReducedMotion();
  const { open, onOpenChange } = useSidebar();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Loading...',
    email: 'Loading...',
    picture: '',
    isLoaded: false,
  });
  const [videosList, setVideosList] = useState([]);
  const { videos, mutate: refreshVideos } = useUserVideos();
  const isInitialLoad = useRef(true);

  const formattedVideos = useMemo(() => {
    return (videos || []).map(video => ({
      name: video.title || 'Untitled Video',
      id: video.id,
      icon: Clapperboard,
    }));
  }, [videos]);

  useEffect(() => {
    if (videos && videos.length > 0) {
      setVideosList(formattedVideos);
    }
  }, [formattedVideos, videos]);

  const loadUserData = useCallback(
    async (forceRefresh = false) => {
      try {
        const { user, error } = await getUser();
        if (error) throw error;

        setUserData(prevUserData => {
          if (
            !prevUserData.isLoaded ||
            prevUserData.email !== user.email ||
            prevUserData.picture !== user.picture
          ) {
            return {
              ...user,
              isLoaded: true,
            };
          }
          return prevUserData;
        });

        if (forceRefresh) {
          await refreshVideos();
        }

        setIsLoaded(true);
        return { user, videos: formattedVideos };
      } catch (error) {
        console.error('Error loading sidebar data:', error);
        return { user: userData, videos: [] };
      } finally {
        setIsLoaded(true);
      }
    },
    [refreshVideos],
  );

  useEffect(() => {
    const handleVideoUpdate = event => {
      if (window.sidebarUpdateTimeout) {
        clearTimeout(window.sidebarUpdateTimeout);
      }

      window.sidebarUpdateTimeout = setTimeout(() => {
        const videoId = event.detail?.videoId;
        const action = event.detail?.action;
        const forceRefresh = action === 'add';

        loadUserData(forceRefresh).then(result => {
          if (videoId) {
            setTimeout(() => {
              const videoElement = document.querySelector(`[data-video-id="${videoId}"]`);
              if (videoElement) {
                videoElement.classList.add('highlight-animation');
                setTimeout(() => videoElement.classList.remove('highlight-animation'), 2000);
              }
            }, 300);
          }
        });
      }, 300);
    };

    if (isInitialLoad.current) {
      loadUserData();
      isInitialLoad.current = false;
    }

    const events = ['koellabs:userUpdated'];

    events.forEach(event => {
      window.addEventListener(event, handleVideoUpdate);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleVideoUpdate);
      });

      if (window.sidebarUpdateTimeout) {
        clearTimeout(window.sidebarUpdateTimeout);
      }
    };
  }, [loadUserData]);

  const toggleSidebar = useCallback(() => {
    onOpenChange(!open);
  }, [open, onOpenChange]);

  const LogoSVG = useMemo(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1451"
        height="1437"
        fill="none"
        viewBox="0 0 1451 1437"
        className="inline-block h-7 w-7 -mt-0.5"
      >
        <rect
          width="344.708"
          height="691.027"
          x="1126.33"
          y="622.281"
          fill="#154063"
          rx="172.354"
          transform="rotate(90 1126.33 622.281)"
        ></rect>
        <rect
          width="344.708"
          height="691.027"
          x="1096.52"
          y="1040.13"
          fill="#3779B5"
          rx="172.354"
          transform="rotate(135 1096.52 1040.13)"
        ></rect>
        <mask
          id="mask0_3672_386"
          width="692"
          height="345"
          x="435"
          y="622"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <rect
            width="344.708"
            height="691.027"
            x="1126.33"
            y="622.281"
            fill="#fff"
            rx="172.354"
            transform="rotate(90 1126.33 622.281)"
          ></rect>
        </mask>
        <g mask="url(#mask0_3672_386)">
          <rect
            width="344.708"
            height="691.027"
            x="1096.52"
            y="1040.13"
            fill="#122438"
            rx="172.354"
            transform="rotate(135 1096.52 1040.13)"
          ></rect>
        </g>
        <path
          fill="#000"
          d="M501.589 575.587c-89.244-33.112-171.24-236.2-167.598-246.017 3.642-9.816 198.261-110.275 287.504-77.164s134.749 132.3 101.637 221.544-132.3 134.748-221.543 101.637"
        ></path>
      </svg>
    ),
    [],
  );

  return (
    <Sidebar className={`${className} bg-white/80 backdrop-blur-md dark:bg-black/80`}>
      <MotionConfig reducedMotion="always">
        <SidebarHeader className="py-2.5 pr-3">
          <Link
            href="/"
            className="flex items-center gap-2 -mb-px mt-px font-semibold py-1 h-[38px]"
          >
            {LogoSVG}
            <AnimatePresence>
              {open && (
                <motion.span
                  initial={isLoaded ? { opacity: 0, width: 0 } : false}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={shouldReduceMotion ? false : { opacity: 0, width: 0 }}
                  transition={
                    shouldReduceMotion ? { duration: 0.0 } : { duration: 0.15, ease: 'easeInOut' }
                  }
                  className="tracking-tighter -ml-1.5 text-xl overflow-hidden whitespace-nowrap"
                >
                  Koel Labs
                  <Badge variant="outline" className="ml-1.5 tracking-tight -translate-y-[3px]">
                    Beta
                  </Badge>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto h-7 w-7 py-1"
          >
            {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem>
            <SidebarLabel>{open && 'Platform'}</SidebarLabel>
            <NavMain items={NAV_MAIN} isCollapsed={!open} className={open ? '' : '-mb-3'} />
          </SidebarItem>
          {!open && <div className="h-[1px] bg-black/10 w-full"></div>}
          <SidebarItem>
            <SidebarLabel className="flex justify-between items-center">
              {open && 'Your Clips'}
            </SidebarLabel>
            <div data-sidebar-videos="true">
              <NavVideos
                videos={videosList}
                isCollapsed={!open}
                className={open ? '' : '-mb-3'}
                isLoading={!isLoaded}
              />
            </div>
          </SidebarItem>
          <SidebarItem className="mt-auto">
            <NavSecondary items={NAV_SECONDARY} isCollapsed={!open} />
          </SidebarItem>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={isLoaded ? { opacity: 0, width: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.0, ease: 'easeInOut' }}
                className="flex flex-col gap-3"
              >
                <SidebarItem>
                  <BetaCard />
                </SidebarItem>
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} isCollapsed={!open} isLoading={!isLoaded} />
        </SidebarFooter>
      </MotionConfig>
    </Sidebar>
  );
}

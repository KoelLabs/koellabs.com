'use client';

import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Home,
  LifeBuoy,
  Plus,
  Send,
  Settings2,
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
import { useEffect, useState } from 'react';
import { getUser } from '@/utils/authClient';
import { StreakCard } from '@/components/sidebar/streak-card';

const data = {
  user: {
    name: 'Loading...',
    email: 'Loading...',
    picture: '',
    isLoaded: false,
  },
  navMain: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
    },
  ],

  navSecondary: [
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
  ],
  videos: [
    {
      name: 'Michael is a Terrible Secret Keeper - The Office US',
      id: 'eWOKwlFQJAjQ',
      icon: Clapperboard,
    },
    {
      name: "Michael's Pyramid Scheme - The Office US",
      id: '0A4Dq41bPQZ1',
      icon: Clapperboard,
    },
    {
      name: 'April joins the great resignat ion - Parks and Recreation',
      id: 'JQMDL16t8isF',
      icon: Clapperboard,
    },
  ],
};

export function AppSidebar() {
  const shouldReduceMotion = useReducedMotion();
  const { open, onOpenChange } = useSidebar();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(open);

  useEffect(() => {
    getUser().then(user => {
      console.log(user);
      data.user = user;
      data.user.isLoaded = true;
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsFullyOpen(true), 150); // 150ms is the duration of the sidebar animation
      return () => clearTimeout(timer);
    } else {
      setIsFullyOpen(false);
    }
  }, [open]);

  const toggleSidebar = () => {
    onOpenChange(!open);
  };

  return (
    <Sidebar>
      <MotionConfig reducedMotion="always">
        <SidebarHeader>
          <Link
            href="/"
            className={`flex items-center gap-2 font-semibold py-1 h-[36px] ${open ? '' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="870"
              height="870"
              fill="none"
              viewBox="0 0 870 870"
              className=" h-7 w-7 -mt-0.5 hidden dark:inline-block"
            >
              <rect
                width="214"
                height="429"
                x="671.178"
                y="403"
                fill="url(#paint0_linear_1675_354)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.178 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="671.18"
                y="403"
                fill="url(#paint1_linear_1675_354)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.18 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint2_linear_1675_354)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint3_linear_1675_354)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <path
                fill="#fff"
                d="M349.176 383c-59.095 0-150.677-100.5-150.677-107s91.582-107 150.677-107c59.094 0 107 47.906 107 107s-47.906 107-107 107z"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_1675_354"
                  x1="778.178"
                  x2="778.178"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop></stop>
                  <stop offset="1" stopColor="#fff"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1675_354"
                  x1="778.18"
                  x2="778.18"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop></stop>
                  <stop offset="1" stopColor="#fff"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1675_354"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop></stop>
                  <stop offset="1" stopColor="#fff"></stop>
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1675_354"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop></stop>
                  <stop offset="1" stopColor="#fff"></stop>
                </linearGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="870"
              height="870"
              fill="none"
              viewBox="0 0 870 870"
              className="inline-block h-7 w-7 -mt-0.5 dark:hidden"
            >
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint0_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint1_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint2_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint3_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint4_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint5_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <path
                fill="#000"
                d="M283.332 374.002c-55.404-20.556-106.308-146.637-104.047-152.731 2.261-6.094 123.083-68.461 178.487-47.905 55.404 20.556 83.654 82.134 63.098 137.538-20.556 55.404-82.134 83.654-137.538 63.098z"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint4_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint5_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
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
                  Koel{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-black via-sky-950 to-sky-600 dark:from-white dark:via-white dark:to-black">
                    Labs
                  </span>
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
            <NavMain items={data.navMain} isCollapsed={!open} className={open ? '' : '-mb-3'} />
          </SidebarItem>
          {!open && <div className="h-[1px] bg-black/10 w-full"></div>}
          <SidebarItem>
            <SidebarLabel className="flex justify-between items-center">
              {open && 'Your Videos'}{' '}
              {open && (
                <Button variant="ghost" size="icon" className="h-6 w-6 -mr-0.5">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </SidebarLabel>
            <NavVideos videos={data.videos} isCollapsed={!open} className={open ? '' : '-mb-3'} />
          </SidebarItem>
          <SidebarItem className="mt-auto">
            <NavSecondary items={data.navSecondary} isCollapsed={!open} />
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
                {/* <SidebarItem>
                  <StreakCard />
                </SidebarItem> */}
                <SidebarItem>
                  <BetaCard />
                </SidebarItem>
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} isCollapsed={!open} isLoading={!isLoaded} />
        </SidebarFooter>
      </MotionConfig>
    </Sidebar>
  );
}

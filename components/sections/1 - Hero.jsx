import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/1 - header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';
import HeroVideoDialog from '@/components/ui/magicui/hero-video-dialog';

export default function Hero() {
  return (
    <div className="relative">
      <div className="color-bg h-full w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] opacity-10 top-48"></div>
      <div className="mx-auto md:px-6 pt-0 lg:px-8 py-32 relative">
        <div className="mx-auto p-4 max-w-3xl py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center relative">
            <div className="flex flex-row justify-center items-center my-6">
              <p className="font-[400] text-md text-neutral-700">Backed by</p>
              <div className="h-6 bg-black w-6 rounded-md overflow-hidden ml-2 mr-1.5 p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  enableBackground="new 0 0 68 68"
                  version="1.1"
                  viewBox="0 0 68 68"
                  xmlSpace="preserve"
                >
                  {' '}
                  <path d="M0 0H68V68H0z"></path>{' '}
                  <path
                    d="M57.9 42.6h3.9V49H49.5V32.4c0-5.1-1.7-7-5-7-4 0-5.6 2.9-5.6 6.9v10.2h3.9v6.4H30.5V32.4c0-5.1-1.7-7-5-7-4 0-5.6 2.9-5.6 6.9v10.2h5.6v6.4h-18v-6.4h3.9V26H7.5v-6.4h12.3V24c1.8-3.1 4.8-5 8.9-5 4.2 0 8.1 2 9.5 6.3 1.6-3.9 4.9-6.3 9.5-6.3 5.3 0 10.1 3.2 10.1 10.1v13.5z"
                    className="st0 text-white fill-white bg-white"
                  ></path>{' '}
                </svg>{' '}
              </div>
              <p className="font-[400] text-md text-neutral-700">Mozilla</p>
            </div>
            {/* <h1 className="text-4xl font-bold tracking-[-0.04em] text-gray-900 sm:text-6xl">
              A Novel Way to Quickly{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-600 to-blue-950">
                {' '}
                Master Pronunciation.
              </span>
            </h1> */}

            <h1 className="text-2xl sm:text-4xl font-bold tracking-[-0.04em] sm:max-w-[500px] lg:max-w-[1400px] mx-auto text-pretty text-gray-900 lg:text-6xl overflow-visible">
              Master Pronunciation with
              <span className="bg-clip-text text-transparent bg-gradient-to-br mr-1 from-sky-600 to-blue-950 overflow-visible py-1">
                {' '}
                Classic Movie Scenes{' '}
              </span>
            </h1>
            <svg
              className="absolute right-4 bottom-[126px] rotate-12 shimmer hidden lg:block"
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="47"
              fill="none"
              viewBox="0 0 44 47"
            >
              <path
                fill="url(#paint0_linear_1610_229)"
                d="M18.32 19.146c.042-.112.257-.068.251.052-.09 1.955-.097 6.527 1.578 9.074 1.675 2.548 5.874 4.355 7.705 5.048.112.042.067.257-.052.251-1.956-.09-6.527-.096-9.075 1.578-2.547 1.675-4.355 5.874-5.047 7.705-.043.112-.258.068-.252-.052.09-1.956.097-6.527-1.578-9.075-1.674-2.547-5.873-4.354-7.704-5.047-.113-.043-.068-.257.052-.252 1.955.09 6.527.097 9.074-1.578 2.548-1.674 4.355-5.873 5.048-7.704z"
              ></path>
              <path
                fill="url(#paint1_linear_1610_229)"
                d="M33.683 9.777c.044-.111.269-.065.265.055-.052 1.525.01 4.562 1.15 6.298 1.141 1.736 3.905 2.996 5.325 3.553.112.044.065.27-.055.265-1.525-.051-4.561.01-6.297 1.15-1.736 1.142-2.996 3.905-3.554 5.326-.044.111-.269.065-.265-.055.052-1.525-.009-4.562-1.15-6.298-1.141-1.736-3.904-2.996-5.325-3.554-.112-.043-.065-.268.055-.264 1.525.051 4.561-.01 6.297-1.15 1.736-1.142 2.997-3.905 3.554-5.326z"
              ></path>
              <path
                fill="url(#paint2_linear_1610_229)"
                d="M14.68 2.19c.047-.11.286-.06.285.059-.017 1.116.08 2.975.804 4.077.724 1.102 2.392 1.927 3.423 2.355.111.046.061.285-.058.284-1.117-.017-2.975.08-4.077.804-1.102.724-1.928 2.392-2.355 3.423-.046.11-.286.061-.284-.058.016-1.117-.08-2.975-.804-4.077-.724-1.102-2.392-1.928-3.424-2.355-.11-.046-.06-.286.059-.284 1.116.016 2.975-.08 4.077-.804 1.102-.724 1.927-2.392 2.355-3.424z"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_1610_229"
                  x1="18.632"
                  x2="13.367"
                  y1="18.269"
                  y2="43.73"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#172554"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1610_229"
                  x1="34.002"
                  x2="30.198"
                  y1="8.902"
                  y2="27.299"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#172554"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1610_229"
                  x1="15.009"
                  x2="12.373"
                  y1="1.318"
                  y2="14.065"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#172554"></stop>
                </linearGradient>
              </defs>
            </svg>
            <p className="mt-6 sm:text-lg leading-8 text-gray-600 max-w-xl mx-auto text-pretty">
              {/* Our platform uses cutting-edge technology to help you improve your pronunciation in a
              fun and engaging way via content that you already love. */}
              Practice, perfect, and pronounce like a native language speaker with fun, immersive
              movie and show clips at your fingertips.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row items-center justify-center gap-x-4 w-full">
              <Link href="#join-the-waitlist" className="w-full sm:w-auto">
                <Button className="w-full rounded-lg sm:w-40 bg-gradient-to-b border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
                  {/* Start Learning for Free w-44 */}
                  Join the Waitlist
                </Button>
              </Link>
              <Link href="#learn-more" className="w-full sm:w-auto">
                <Button className="w-full sm:w-32" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] h-full flex justify-between z-[-1]">
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops2"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops4"></div>
          <div className="h-full"></div>
        </div>

        <div className="flex justify-center sm:overflow-visible overflow-hidden">
          <Card className=" max-w-[1200px] min-w-[500px] border-neutral-300/50 p-6 bg-white border-2 rounded-3xl shadow-2xl w-full h-fit mx-auto  z-[0] relative ">
            <HeroVideoDialog
              className="rounded-[500px]"
              animationStyle="top-in-bottom-out"
              videoSrc="https://www.youtube.com/watch?v=BJS4_VUs7nQ"
              thumbnailSrc="/images/demoDayKoel.png"
              thumbnailAlt="Hero Video"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/base/card';
import HeroVideoDialog from '@/components/ui/magicui/hero-video-dialog';
import { Button } from '@/components/ui/base/button';
import Link from 'next/link';

export default function HeroNew() {
  return (
    <div className="relative min-h-[900px] h-full">
      <div className="absolute right-0 -top-20 w-full h-[500px] bg-gradient-to-b from-white via-10% via-white to-transparent z-[0]"></div>

      <div className="absolute left-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>

      <div className="absolute right-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>
      {/* <div className="absolute right-0 -top-20 w-full h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color pointer-events-none"></div> */}
      {/* <div className="absolute left-0 -top-20 w-[60px] h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color"></div> */}

      <div className="absolute right-0 -top-20 w-[50.5px] h-[110%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[-1] hidden 2xl:flex shadow-xl">
        <div className="flex-col h-full items-start gap-[8px] mt-[2px] flex">
          {Array(165)
            .fill(0)
            .map((_, i) => (
              <div
                key={`right-${i}`}
                className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
              ></div>
            ))}
        </div>
      </div>
      <div className="absolute left-0 -top-20 w-[50.5px] h-[110%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[-1] hidden 2xl:flex shadow-xl">
        <div className="flex-col h-full items-start gap-[8px] mt-[2px] flex">
          {Array(165)
            .fill(0)
            .map((_, i) => (
              <div
                key={`right-${i}`}
                className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
              ></div>
            ))}
        </div>
      </div>
      <div className="mx-auto md:px-6 pt-0 lg:px-8 py-32 pb-0">
        <div className="mx-auto p-4 max-w-4xl py-32 z-[999] relative">
          <section aria-labelledby="hero-heading" className="text-center relative">
            {/* <div className="flex flex-row justify-center items-center my-8"></div> */}
            <div className="hidden sm:mb-8 sm:flex sm:justify-center relative z-10 max-w-sm mx-auto">
              <div className="relative rounded-full px-2 py-0.5 pr-4.5 text-sm/6 text-gray-600 border-y border-l rounded-r-none">
                A new look for Koel Labs{' '}
              </div>
              <a
                href="/blog/new-look-for-koel-labs"
                className="font-semibold text-sky-600 rounded-full shadow-xs bg-white -ml-3 pl-2.5 border-l-none border text-sm/6 px-2 py-0.5 inset-0"
              >
                <span aria-hidden="true" className="absolute inset-0 tracking-tight" />
                Read more <ArrowUpRight className="w-4 h-4 inline-block -ml-0.5" strokeWidth={3} />
              </a>
            </div>
            <h1
              id="hero-heading"
              className=" text-4xl font-semibold tracking-tighter text-gray-950 sm:text-6xl relative text-balance ligat"
            >
              Pioneering Inclusive Speech Technology for Everyone
            </h1>

            <p className="mt-6 sm:text-lg leading-7 sm:leading-8 text-neutral-600 max-w-xl mx-auto text-pretty">
              We are building out state-of-the-art models, tools, and datasets to make speech
              technologies more inclusive for all dialects.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row items-center justify-center gap-x-4 w-full">
              <Link href="/research" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto"
                >
                  Read our research
                </Button>
              </Link>
              <Link href="/previews" className="w-full sm:w-auto">
                <Button className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto">
                  View our demos
                </Button>
              </Link>
            </div>
          </section>
        </div>

        {/* <div className="absolute -bottom-2  h-[65px] w-[90%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[3] mix-blend-color"></div> */}

        {/* <div className="absolute bottom-0 left-0 w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-t">
          <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
            {Array(500)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-full w-px bg-neutral-200 dark:bg-neutral-800 -mb-12"
                ></div>
              ))}
          </div>
        </div> */}
        <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] flex justify-between z-[-1] h-[1600px]">
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-200"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-200"></div>
          <div className="h-full"></div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="141"
          height="906"
          fill="none"
          className="absolute -bottom-28 xl:right-0 hidden 2xl:block z-[-3]"
          viewBox="0 0 141 906"
        >
          <path
            stroke="#E5E5E5"
            d="M140.505 0C140.505 97.5.721-.44.707 97.06c-.008 57.199 0 447.333 0 610.999m139.798 197.003c0-97.5-139.784.441-139.798-97.059-.008-57.2 0-447.333 0-611"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="141"
          height="906"
          fill="none"
          className="absolute rotate-180 -bottom-28 xl:left-0 hidden 2xl:block z-[-3]"
          viewBox="0 0 141 906"
        >
          <path
            stroke="#E5E5E5"
            d="M140.505 0C140.505 97.5.721-.44.707 97.06c-.008 57.199 0 447.333 0 610.999m139.798 197.003c0-97.5-139.784.441-139.798-97.059-.008-57.2 0-447.333 0-611"
          ></path>
        </svg>

        <div className="flex justify-center sm:overflow-visible overflow-hidden mb-[127px]">
          <Card
            data-cursor-size="200"
            className=" max-w-[1200px] min-w-[500px] p-6 bg-white rounded-[32px] shadow-xl w-full h-fit mx-auto  z-[30] "
          >
            {/* <div className="flex flex-col items-center justify-center aspect-video w-full h-full border rounded-[12px] shadow-lg"></div> */}
            <HeroVideoDialog
              className="rounded-[500px] z-[30] relative"
              animationStyle="top-in-bottom-out"
              videoSrc="https://www.youtube.com/watch?v=s7yPjSUjU9s"
              thumbnailSrc="/images/demoPitchUpdated.png"
              thumbnailAlt="Hero Video"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

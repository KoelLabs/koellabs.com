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
      <div className="color-bg h-full w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] transform-gpu opacity-10 top-48"></div>
      <div className="mx-auto md:px-6 pt-0 lg:px-8 py-32 relative">
        <div className="mx-auto p-4 max-w-4xl py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <section aria-labelledby="hero-heading" className="text-center relative">
            <div className="flex flex-row justify-center items-center my-6"></div>

            <h1
              id="hero-heading"
              className="text-2xl sm:text-4xl font-bold tracking-[-0.04em] sm:max-w-[500px] lg:max-w-[780px] mx-auto text-pretty text-gray-900 lg:text-6xl overflow-visible"
            >
              Speech Technology for <br></br>
              <span className="bg-clip-text text-transparent bg-gradient-to-br mr-1 from-sky-600 to-blue-950 overflow-visible py-1">
                {' '}
                Anyone Built by <span className="pr-0.5">Everyone</span>{' '}
              </span>
            </h1>

            <p className="mt-6 sm:text-lg leading-8 text-gray-600 max-w-xl mx-auto text-pretty">
              We are building out state-of-the-art models, tools, and datasets to make speech
              technologies more inclusive for all dialects.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row items-center justify-center gap-x-4 w-full">
              <Link
                href="#join-the-waitlist"
                className="w-full sm:w-auto"
                aria-label="Join the waitlist"
              >
                <Button className="w-full rounded-lg sm:w-40 bg-gradient-to-b border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
                  Join Waitlist
                </Button>
              </Link>
              <Link
                href="#learn-more"
                className="w-full sm:w-auto"
                aria-label="Learn more about Koel Labs"
              >
                <Button className="w-full sm:w-32" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </section>
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

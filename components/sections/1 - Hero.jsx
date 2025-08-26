import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';
import HeroVideoDialog from '@/components/ui/magicui/hero-video-dialog';

export default function Hero() {
  return (
    <div className="relative">
      <div className="mx-auto md:px-6 pt-0 lg:px-8 py-32 relative">
        <div className="mx-auto p-4 max-w-3xl py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <section aria-labelledby="hero-heading" className="text-center relative">
            <div className="flex flex-row justify-center items-center my-6">
              <p className="font-[400] text-md text-neutral-700">Backed by</p>
              <div className="h-6 bg-black w-6 rounded-md overflow-hidden ml-2 mr-1.5 p-0.5">
                <svg
                  aria-label="Mozilla Logo"
                  role="img"
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

            <h1
              id="hero-heading"
              className="text-2xl sm:text-4xl font-semibold tracking-[-0.05em] sm:max-w-[500px] lg:max-w-[1400px] mx-auto text-pretty text-gray-900 lg:text-6xl overflow-visible"
            >
              Pioneering Speech Technology for Everyone
            </h1>

            <p className="mt-6 sm:text-lg leading-8 text-gray-600 max-w-xl mx-auto text-pretty">
              Practice, perfect, and pronounce like a native language speaker with fun, immersive
              movie and show clips at your fingertips.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row items-center justify-center gap-x-4 w-full">
              <Link
                href="#join-the-waitlist"
                className="w-full sm:w-auto"
                aria-label="Join the waitlist"
              >
                <Button className="w-full rounded-lg sm:w-40 bg-linear-to-b border border-double outline-white/50 outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
                  Join the Waitlist
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
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops4"></div>
          <div className="h-full"></div>
        </div>

        <div className="flex justify-center sm:overflow-visible overflow-hidden">
          <Card className=" max-w-[1200px] min-w-[500px] p-6 bg-white outline-1 outline-neutral-200 rounded-[32px] shadow-2xl w-full h-fit mx-auto  z-[0] relative ">
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

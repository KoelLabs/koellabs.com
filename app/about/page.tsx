import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';
import HeroVideoDialog from '@/components/ui/magicui/hero-video-dialog';
import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';

const people = [
  {
    name: 'Alexander Metzger',
    role: 'Chief Executive Officer',
    imageUrl: '/images/alexShot.png',
    linkedinUrl: 'https://www.linkedin.com/in/alexander-le-metzger/',
  },
  {
    name: 'Aruna Srivastava',
    role: 'Chief Technology Officer',
    imageUrl: '/images/arunaShot.png',
    linkedinUrl: 'https://www.linkedin.com/in/arunasr/',
  },
  {
    name: 'Ruslan Mukhamedvaleev',
    role: 'Chief Product Officer',
    imageUrl: '/images/ruslanShot.png',
    linkedinUrl: 'https://www.linkedin.com/in/ruslan-muk/',
  },
];

export default function About() {
  return (
    <div className="relative">
      <div className="z-[9999] sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <div className="absolute right-0 -top-20 w-full h-[500px] bg-gradient-to-b from-white via-10% via-white to-transparent z-[0]"></div>

      <div className="absolute right-0 -top-20 w-[50.5px] h-[100%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[-1] hidden 2xl:flex shadow-xl">
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
      <div className="absolute left-0 -top-20 w-[50.5px] h-[100%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[-1] hidden 2xl:flex shadow-xl">
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
      <div className="mx-auto pt-0 py-32 pb-0 relative">
        <div className="relative">
          <div className="relative">
            <div className="absolute left-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[20] hidden 2xl:block">
              <div className="rounded-full w-full h-full border bg-white"></div>
            </div>

            <div className="absolute right-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[20] hidden 2xl:block">
              <div className="rounded-full w-full h-full border bg-white"></div>
            </div>
            <div className="mx-auto max-w-7xl px-6 py-16 pt-0 sm:py-40 lg:px-8 relative">
              <div className="mx-auto max-w-2xl lg:mx-0 mt-0 sm:mt-24 lg:mt-0 lg:my-12 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
                <h1 className="max-w-2xl xss:text-3xl pt-12 text-balance text-3xl font-semibold tracking-tighter text-gray-950 sm:text-6xl lg:col-span-2 xl:col-auto">
                  Building Inclusive <span className="text-[#003a59]">Speech Technology</span>
                </h1>
                <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                  <p className="sm:text-lg/8 text-neutral-600">
                    Your voice is unique and should be understood not just by those around you, but
                    also by the technology you interact with every day.
                  </p>
                  <p className="sm:text-lg/8 text-neutral-600 mt-4">
                    Too often, voice assistants and smart speakers struggle with accents, speech
                    differences, or non-standard dialects, leaving millions of people frustrated and
                    unheard.
                  </p>
                  <p className="sm:text-lg/8 text-neutral-600 mt-4">
                    As a research lab, we collaborate with top universities, other researchers, and
                    domain experts to create technologies that actually understand your voice.
                  </p>
                  <div className="flex gap-x-2">
                    <p className="text-pretty text-md font-medium text-neutral-600 mt-8">—</p>
                    <img
                      alt="Koel Labs Signature"
                      src="/images/koelLabsSig.png"
                      className="mt-6 w-1/2 sm:w-1/5 opacity-75"
                    />
                  </div>
                </div>
                <div className="mt-10 w-full md:max-w-lg rounded-[24px] object-cover sm:mt-16 lg:mt-0 xl:mt-8 lg:max-w-none xl:row-span-2 xl:row-end-2 p-2 bg-white/75 backdrop-blur-md border">
                  <img
                    alt="A photo of the Koel Labs founders, Alexander Metzger, Aruna Srivastava, and Ruslan Mukhamedvaleev standing in front of the bay bridge in San Francisco."
                    src="/images/aboutShot.jpeg"
                    className=" aspect-5/5 scale w-full md:max-w-lg rounded-2xl object-cover object-[23%] lg:max-w-none xl:row-span-2 xl:row-end-2 border"
                  />
                  <div className="w-full h-12 rounded-2xl mt-2 border relative gap-y-2 flex items-center overflow-hidden justify-center">
                    {Array(120)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={`bottom-${i}`}
                          className="h-[200%] w-px bg-neutral-200 dark:bg-neutral-800 -ml-1 -mr-1 rotate-45"
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-md border border-neutral-300/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-36">
              <div className="mx-auto max-w-6xl lg:mx-0">
                <p className="text-lg font-semibold text-sky-600 mb-2">The Team</p>
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                  Our Co-Founders
                </h2>
                <p className="mt-6 sm:text-lg/8 text-neutral-600">
                  Koel Labs began with three students sharing a common vision. As immigrants and
                  children of immigrants, the experience of language barriers shaped our
                  understanding of how pronunciation challenges impact confidence and opportunities.
                </p>
              </div>
              <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              >
                {people.map(person => (
                  <li key={person.name}>
                    <img
                      alt={`A photo of ${person.name}, ${person.role} at Koel Labs`}
                      src={person.imageUrl}
                      className="aspect-square w-full rounded-2xl object-cover"
                    />
                    <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-base/7 text-neutral-500">{person.role}</p>
                    <ul role="list" className="mt-6 flex gap-x-6">
                      <li>
                        <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            className="size-5"
                          >
                            <path
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-b">
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
        </div>
        <div className="w-full relative bg-white">
          <CTA />
        </div>
        <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
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
        </div>
        <Footer />
      </div>
    </div>
  );
}

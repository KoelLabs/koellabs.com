'use client';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/base/button';

const previews = [
  {
    title: 'Phrase Segmentation',
    status: 'In Beta',
    description:
      'Phrase Segmentation, our demonstration tool for how phonetic transcription models will eventually interact with users in conjunction with language learning materials, is now available in closed beta.  ',
    image: '/images/card-two.svg',
  },
  {
    title: 'Phonetic Models',
    status: 'Available',
    description:
      'XLSR-English-01, the state-of-the-art model for phonetic transcription, is available on Huggingface, alongside our other models, various datasets, and our IPA transcription leaderboard.',
    image: '/images/card-one-center.svg',
  },
  {
    title: 'Speech Analysis',
    status: 'Upcoming',
    description:
      'A robust and open speech analysis tool, powered by our own models, to allow for real-time feedback to users about speech, based on an actor reference, not a restricted, arbitrary standard.',
    image: '/images/card-three.svg',
  },
];

export default function PreviewsHero() {
  return (
    <div className="relative min-h-[900px] h-full overflow-hidden">
      <div className="absolute right-0 -top-20 w-full h-[500px] bg-gradient-to-b from-white via-10% via-white to-transparent z-[12]"></div>

      <div className="absolute left-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[12] hidden 2xl:block">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>

      <div className="absolute right-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[12] hidden 2xl:block">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>
      {/* <div className="absolute right-0 -top-20 w-full h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color pointer-events-none"></div> */}
      {/* <div className="absolute left-0 -top-20 w-[60px] h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color"></div> */}

      <div className="absolute right-0 -top-20 w-[50.5px] h-[110%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[11] hidden 2xl:flex shadow-xl">
        <div className="flex-col h-full items-start gap-[8px] mt-[2px] flex">
          {Array(145)
            .fill(0)
            .map((_, i) => (
              <div
                key={`right-${i}`}
                className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
              ></div>
            ))}
        </div>
      </div>
      <div className="absolute left-0 -top-20 w-[50.5px] h-[110%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[11] hidden 2xl:flex shadow-xl">
        <div className="flex-col h-full items-start gap-[8px] mt-[2px] flex">
          {Array(145)
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
        <div className="mx-auto p-4 max-w-4xl py-32 z-[90] relative">
          <section aria-labelledby="hero-heading" className="text-center relative">
            {/* <div className="flex flex-row justify-center items-center my-8"></div> */}
            <div className="hidden sm:mb-8 sm:flex sm:justify-center relative z-10 max-w-lg mx-auto">
              <div className="relative rounded-full px-2 py-0.5 pr-4.5 text-sm/6 text-gray-600 border-y border-l rounded-r-none w-fit">
                We've released a series of blogs about Wav2Vec2{' '}
              </div>
              <a
                href="/blog"
                className="font-semibold text-[#154063] rounded-full shadow-xs bg-white -ml-3 pl-2.5 border-l-none border text-sm/6 px-2 py-0.5 inset-0"
              >
                <span aria-hidden="true" className="absolute inset-0 tracking-tight" />
                Read more <ArrowUpRight className="w-4 h-4 inline-block -ml-0.5" strokeWidth={3} />
              </a>
            </div>
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-semibold tracking-tighter text-gray-950 sm:text-6xl relative sm:block hidden"
            >
              Making Speech Technology Understand You Better
            </h1>
            <h1
              id="hero-heading"
              className="text-balance text-[2.2rem] leading-[1.15] text-4xl font-semibold tracking-tighter text-gray-950 relative sm:hidden block"
            >
              Making Speech Tech Understand You Better
            </h1>

            <p className="mt-6 sm:text-lg leading-8 text-neutral-600 max-w-xl mx-auto text-pretty">
              Get the very first look at our research previews, straight from the future of speech
              technology and language learning.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row items-center justify-center gap-x-4 w-full">
              <Button
                variant="outline"
                className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto"
              >
                Join the waitlist
              </Button>
              <Button className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto">
                View our demos
              </Button>
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
        <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] flex justify-between z-[-1] h-[1300px]">
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

        <div className="bg-gradient-to-b from-transparent to-white via-white via-50% h-1/3 w-full absolute -bottom-0 left-0 z-[5] pointer-events-none"></div>

        <div className="flex justify-center sm:overflow-visible overflow-hidden mb-[127px] mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-[4] relative gap-4">
          {previews.map(preview => (
            <div
              key={preview.title}
              className="shadow-xl min-w-[330px] mt-8 sm:mt-0 rounded-3xl first:-rotate-12 last:rotate-12 scale-110 first:translate-y-12 last:translate-y-12 first:translate-x-24 last:-translate-x-24 last:hover:translate-y-6 last:hover:-translate-x-12 even:hover:-translate-y-12 first:hover:translate-y-6 first:hover:translate-x-12 transition-all duration-350"
            >
              <li
                key={preview.title}
                className="flex flex-col gap-2 border border-neutral-200 rounded-3xl p-2 relative group/item bg-white"
                data-cursor-size="2"
              >
                <div className="p-4 pb-2 rounded-2xl bg-white border border-neutral-200">
                  <div className="flex flex-row gap-2 items-center justify-between pb-2">
                    <h3 className="text-lg font-medium tracking-[-0.03em] text-black">
                      {preview.title}
                    </h3>

                    <span className="transition-all inline-flex items-center px-2 py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 w-fit flex-row justify-between hover:shadow-sm group">
                      <div
                        className={`h-2 w-2 rounded-full relative transition-all mr-1`}
                        style={{
                          backgroundColor:
                            preview.status === 'Available'
                              ? '#3779B5'
                              : preview.status === 'In Beta'
                                ? '#154063'
                                : 'black',
                        }}
                      ></div>
                      {preview.status}
                    </span>
                  </div>
                </div>
                <div
                  className=" rounded-2xl bg-white border border-neutral-200 aspect-square relative overflow-hidden"
                  data-cursor-size="320"
                >
                  <div className="h-[200%] w-[100%] bg-sky-700 rounded-full absolute -top-1/4 left-1/3 mix-blend-color blur-2xl  hidden group-hover/item:block"></div>
                  <div className="h-[200%] w-[100%] bg-[#2A4BCC] rounded-full absolute -bottom-1/4 -left-2/3 blur-2xl  mix-blend-color hidden group-hover/item:block"></div>

                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

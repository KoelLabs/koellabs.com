import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/1 - header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';

export default function Bento() {
  return (
    <div id="learn-more" className="relative">
      <div className="color-bg h-full w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] transform-gpu opacity-10 top-48"></div>
      <div className="mx-auto relative">
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <div className="mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 relative overflow-hidden">
          <div className="bg-white/50 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
              <p className="text-base/7 font-semibold text-sky-600 relative z-10">What is this?</p>
              <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10">
                Your new favorite tool for pronunciation learning
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                <div className="relative lg:col-span-3">
                  <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                    <img
                      alt=""
                      src="/images/bentoClips.png"
                      className="h-80 top-0 object-cover object-top"
                    />
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-sky-600">Engaging Content</h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Your favorite movies and shows
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                        Practicing pronunciation has never been easier or more fun. Start learning
                        today with engaging scenes from iconic movies and shows.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                </div>
                <div className="relative lg:col-span-3">
                  <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                    <img
                      alt=""
                      src="/images/bentoActionable.png"
                      className="h-80 object-cover object-left lg:object-top"
                    />
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-sky-600">Extensive Feedback</h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Actionable, tailored insights
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                        Learn faster with our curated, actionable feedback, designed for maximum
                        impact, that gives you everything you need to start improving immediately.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
                </div>
                <div className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                    <img
                      alt=""
                      src="/images/bentoFeedback.png"
                      className="h-80 object-cover object-left"
                    />
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-sky-600">Speed</h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Real-time analysis
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                        Get the first layer of feedback almost immediately after speaking.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
                </div>
                <div className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-white" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                    <img alt="" src="/images/bentoComplex.png" className="h-80 object-cover" />
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-sky-600">Dive in Deep</h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Master even the hardest words
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                        Practice hard-to-pronounce words by breaking them down into multiple
                        practical chunks.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
                </div>
                <div className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                    <img alt="" src="/images/bentoDialect.png" className="h-80 object-cover" />
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-sky-600">Dialect</h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Dialect-sensitive learning
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                        Take control of your learning by choosing the dialect you want to practice.
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

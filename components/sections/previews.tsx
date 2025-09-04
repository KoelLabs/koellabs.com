import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';

export default function Previews() {
  return (
    <div id="models" className=" relative">
      <div className="absolute left-0 top-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>

      <div className="absolute right-0 top-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>
      <div className="mx-auto">
        <div className="absolute right-0 top-0 w-[50.5px] h-[105.5%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[1] hidden 2xl:flex shadow-xl">
          <div className="flex-col h-full items-start gap-[8px] -mt-px flex">
            {Array(109)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`right-${i}`}
                  className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
                ></div>
              ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 w-[50.5px] h-[105.5%] overflow-hidden items-start justify-center bg-neutral-50 border-x z-[1] hidden 2xl:flex shadow-xl">
          <div className="flex-col h-full items-start gap-[8px] -mt-px flex z-20">
            {Array(109)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`right-${i}`}
                  className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
                ></div>
              ))}
          </div>
        </div>
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <section
          aria-labelledby="features-heading"
          className="mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-b border-neutral-200 overflow-hidden"
        >
          <div
            data-cursor-opacity="0.8"
            data-cursor-size="240"
            data-cursor-color="#2A4BCC"
            className="bg-white py-24 sm:py-32"
          >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-[1000] relative">
              <p className="text-base/7 font-semibold text-blue-800 relative z-10">
                Research Previews
              </p>
              <h2
                id="features-heading"
                className="mt-2 text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10"
              >
                We are building your favorite tool for pronunciation
              </h2>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2"
              >
                <li className="relative lg:col-span-3">
                  <div className="absolute inset-px rounded-lg bg-white" />
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                    <img
                      alt="Screenshot showing the massive library of content available to practice with"
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
                  </article>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
                </li>
                <li className="relative lg:col-span-3">
                  <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                    <img
                      alt="Screenshot showing detailed pronunciation feedback interface"
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
                  </article>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
                </li>
                <li className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                    <img
                      alt="Screenshot showing analysis interface"
                      src="/images/bentoFeedback.png"
                      className="h-80 object-cover object-center"
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
                  </article>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
                </li>
                <li className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-white" />
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                    <img
                      alt="Screenshot showing deep practice mode"
                      src="/images/bentoComplex.png"
                      className="h-80 object-cover"
                    />
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
                  </article>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
                </li>
                <li className="relative lg:col-span-2">
                  <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                    <img
                      alt="An image of the worlds map to highlight the diversity of dialects"
                      src="/images/bentoDialect.png"
                      className="h-80 object-cover"
                    />
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-sky-600">Dialect</h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Dialect-sensitive learning
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                        Take control of your learning by choosing the dialect you want to practice.
                      </p>
                    </div>
                  </article>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

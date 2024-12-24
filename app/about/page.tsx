import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/1 - header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';
import HeroVideoDialog from '@/components/ui/magicui/hero-video-dialog';
import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';

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
      <div className="z-[2] sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <div className="color-bg h-[80%] w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] transform-gpu opacity-10 top-48"></div>
      <div className="mx-auto pt-0  py-32 relative">
        <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] h-full flex justify-between z-[-1]">
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
          <div className="lg:w-[1px] h-full bg-neutral-200 drops1"></div>
          <div className="lg:w-[1px] h-full bg-neutral-200 drops2"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops4"></div>
          <div className="h-full w-[15px]"></div>
          <div className="h-full"></div>
        </div>
        <div className="">
          <div className="mx-auto max-w-7xl px-6 py-16 pt-0 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 mt-0 sm:mt-24 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
              <h1 className="max-w-2xl xss:text-3xl pt-12 text-balance text-2xl font-semibold tracking-tighter text-black sm:text-6xl lg:col-span-2 xl:col-auto">
                We Want to Change{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-600 to-blue-950">
                  Pronunciation Learning
                </span>
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-pretty text-lg font-medium text-neutral-600">
                  Current methods for pronunciation learning are outdated, lack accessibility, and
                  are ultimately boring. <br className="block sm:hidden" />{' '}
                  <br className="block sm:hidden" />
                  Large classrooms and most language apps fail to provide personalized feedback,
                  leaving already struggling learners to self-evaluate, which is ineffective.
                </p>
                <p className="text-pretty text-lg font-medium text-neutral-600 mt-4">
                  Language learners, like us and our families, desperately need a change—and we aim
                  to be just that.
                </p>
                <div className="flex gap-x-2">
                  <p className="text-pretty text-md font-medium text-black mt-8">—</p>
                  <img
                    alt="Koel Labs Signature"
                    src="/images/koelLabsSig.png"
                    className="mt-6 w-1/2 sm:w-1/5"
                  />
                </div>
              </div>
              <div className="mt-10 aspect-[6/5] w-full md:max-w-lg rounded-[32px] object-cover sm:mt-16 lg:mt-8 xl:-mt-8 lg:max-w-none xl:row-span-2 xl:row-end-2 p-4 bg-white/75 backdrop-blur-md border border-neutral-300/50">
                <img
                  alt="A photo of the Koel Labs founders, Alexander Metzger, Aruna Srivastava, and Ruslan Mukhamedvaleev standing in front of the bay bridge in San Francisco."
                  src="/images/aboutShot.jpg"
                  className=" aspect-[6/5] scale w-full md:max-w-lg rounded-2xl object-cover object-right lg:max-w-none xl:row-span-2 xl:row-end-2 border border-neutral-300"
                />
              </div>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-md border border-neutral-300/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-36">
              <div className="mx-auto max-w-6xl lg:mx-0">
                <p className="text-lg font-semibold text-sky-600 mb-2">The Team</p>
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Our Co-Founders
                </h2>
                <p className="mt-6 text-lg/8 text-gray-600">
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
          <div className="overflow-hidden bg-white/50 backdrop-blur-md border border-neutral-300/50 mt-24 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                  <div className="lg:max-w-2xl">
                    <p className="text-lg font-semibold text-sky-600 mb-2">
                      Research and Collaboration
                    </p>
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Our Way Forward
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Driven by a commitment to collaborative science, we advance open-source
                      research in language technologies while building practical, engaging
                      solutions. This dedication stems from a core belief: transformative innovation
                      builds upon collective knowledge.
                    </p>

                    <p className="mt-6 text-lg/8 text-gray-600">
                      Through open-source contributions, our organization accelerates progress in
                      linguistic technology, shaping a future where language learning knows no
                      bounds.
                    </p>

                    <p className="mt-6 text-lg/8 text-gray-600">
                      We work with linguists, natural-language processing researchers, and research
                      labs worldwide. If you're interested in our work, please contact us to explore
                      collaboration opportunities!
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-end lg:order-first sm:mr-8 mr-0">
                  <div className="w-full relative h-full bg-white/50 border border-neutral-200/50 rounded-3xl p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="415"
                      height="394"
                      fill="none"
                      className="absolute -right-[15%] lg:-top-[48%] scale-x-[-1] -z-10 size-[64rem] opacity-100 [mask-image:radial-gradient(closest-side,white,transparent)]"
                      viewBox="0 0 415 394"
                    >
                      <circle
                        cx="-17.089"
                        cy="210.388"
                        r="271.149"
                        fill="url(#paint0_radial_2207_218)"
                        fillOpacity="0.12"
                        transform="rotate(-28.073 -17.09 210.388)"
                      ></circle>
                      <circle
                        cx="-17.089"
                        cy="210.388"
                        r="270.649"
                        stroke="#0284C7"
                        strokeOpacity="0.1"
                        transform="rotate(-28.073 -17.09 210.388)"
                      ></circle>
                      <ellipse
                        cx="-16.646"
                        cy="210.15"
                        fill="url(#paint1_radial_2207_218)"
                        fillOpacity="0.12"
                        rx="319"
                        ry="318.5"
                        transform="rotate(-28.073 -16.646 210.15)"
                      ></ellipse>
                      <path
                        stroke="#0284C7"
                        strokeOpacity="0.1"
                        d="M264.382 60.265c82.649 154.963 23.83 347.692-131.378 430.472s-348.029 24.261-430.678-130.702-23.83-347.692 131.378-430.472c155.209-82.78 348.029-24.261 430.678 130.702Z"
                      ></path>
                      <circle
                        cx="-17.089"
                        cy="210.387"
                        r="221.872"
                        fill="url(#paint2_radial_2207_218)"
                        fillOpacity="0.12"
                        transform="rotate(-28.073 -17.09 210.387)"
                      ></circle>
                      <circle
                        cx="-17.089"
                        cy="210.387"
                        r="221.372"
                        stroke="#0284C7"
                        strokeOpacity="0.1"
                        transform="rotate(-28.073 -17.09 210.387)"
                      ></circle>
                      <circle
                        cx="-17.087"
                        cy="210.385"
                        r="164.5"
                        fill="url(#paint3_radial_2207_218)"
                        fillOpacity="0.12"
                        transform="rotate(-28.073 -17.087 210.385)"
                      ></circle>
                      <circle
                        cx="-17.087"
                        cy="210.385"
                        r="164"
                        stroke="#0284C7"
                        strokeOpacity="0.1"
                        transform="rotate(-28.073 -17.087 210.385)"
                      ></circle>
                      <circle
                        cx="-17.088"
                        cy="210.387"
                        r="104.5"
                        fill="url(#paint4_radial_2207_218)"
                        fillOpacity="0.12"
                        transform="rotate(-28.073 -17.088 210.387)"
                      ></circle>
                      <circle
                        cx="-17.088"
                        cy="210.387"
                        r="104"
                        stroke="#0284C7"
                        strokeOpacity="0.1"
                        transform="rotate(-28.073 -17.088 210.387)"
                      ></circle>
                      <circle
                        cx="-17.087"
                        cy="210.385"
                        r="41.5"
                        fill="url(#paint5_radial_2207_218)"
                        fillOpacity="0.12"
                        transform="rotate(-28.073 -17.087 210.385)"
                      ></circle>
                      <circle
                        cx="-17.087"
                        cy="210.385"
                        r="41"
                        stroke="#0284C7"
                        strokeOpacity="0.1"
                        transform="rotate(-28.073 -17.087 210.385)"
                      ></circle>
                      <defs>
                        <radialGradient
                          id="paint0_radial_2207_218"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="rotate(90 -113.739 96.65)scale(271.149)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#0284C7"></stop>
                          <stop offset="1" stopColor="#0284C7"></stop>
                        </radialGradient>
                        <radialGradient
                          id="paint1_radial_2207_218"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="matrix(0 318.5 -319 0 -16.646 210.15)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#0284C7"></stop>
                          <stop offset="1" stopColor="#0284C7"></stop>
                        </radialGradient>
                        <radialGradient
                          id="paint2_radial_2207_218"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="rotate(90 -113.738 96.649)scale(221.872)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#0284C7"></stop>
                          <stop offset="1" stopColor="#0284C7"></stop>
                        </radialGradient>
                        <radialGradient
                          id="paint3_radial_2207_218"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="rotate(90 -113.737 96.65)scale(164.5)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#0284C7"></stop>
                          <stop offset="1" stopColor="#0284C7"></stop>
                        </radialGradient>
                        <radialGradient
                          id="paint4_radial_2207_218"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="rotate(90 -113.737 96.65)scale(104.5)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#0284C7"></stop>
                          <stop offset="1" stopColor="#0284C7"></stop>
                        </radialGradient>
                        <radialGradient
                          id="paint5_radial_2207_218"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="rotate(90 -113.736 96.649)scale(41.5)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#0284C7"></stop>
                          <stop offset="1" stopColor="#0284C7"></stop>
                        </radialGradient>
                      </defs>
                    </svg>
                    <img
                      alt="A photo of the Koel Labs founders, Alexander Metzger, Aruna Srivastava, and Ruslan Mukhamedvaleev standing in front of the bay bridge in San Francisco."
                      src="/images/researchDriven.png"
                      className="w-full h-full rounded-2xl object-cover object-right lg:max-w-none xl:row-span-2 xl:row-end-2 border border-neutral-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTA hideBg />
      </div>
      <Footer />
    </div>
  );
}

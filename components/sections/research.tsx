import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';

export default function Research() {
  return (
    <div id="models" className="">
      <svg
        width="75"
        height="905"
        viewBox="0 0 75 905"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-4 left-0 z-[1] hidden 2xl:block"
      >
        <g clipPath="url(#clip0_3877_301)">
          <path
            d="M69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433C-69.6808 97.3525 69.9825 -0.460876 69.9963 96.9968C70.0013 132.346 70.0002 294.846 69.9986 452.469C70.0002 610.092 70.0014 772.592 69.9964 807.941Z"
            fill="#ffffff"
          />
          <path
            d="M69.9963 196.941C69.9963 360.607 70.0045 750.741 69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433M-69.8022 -0.0624878C-69.8022 -0.0201653 -69.8022 0.0220944 -69.8022 0.0643433M69.9964 707.997C69.9964 544.33 70.0044 154.197 69.9963 96.9968C69.9825 -0.460854 -69.6808 97.3525 -69.8022 0.0643433"
            stroke="#E5E5E5"
          />
        </g>
        <defs>
          <clipPath id="clip0_3877_301">
            <rect
              width="75.0001"
              height="905"
              fill="white"
              transform="translate(75 905) rotate(180)"
            />
          </clipPath>
        </defs>
      </svg>

      <svg
        width="75"
        height="905"
        viewBox="0 0 75 905"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-4 right-0 z-[1] rotate-180 hidden 2xl:block"
      >
        <g clipPath="url(#clip0_3877_301)">
          <path
            d="M69.9963 196.941C69.9963 360.607 70.0045 750.741 69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433M-69.8022 -0.0624878C-69.8022 -0.0201653 -69.8022 0.0220944 -69.8022 0.0643433M69.9964 707.997C69.9964 544.33 70.0044 154.197 69.9963 96.9968C69.9825 -0.460854 -69.6808 97.3525 -69.8022 0.0643433"
            stroke="#E5E5E5"
          />
        </g>
        <defs>
          <clipPath id="clip0_3877_301">
            <rect
              width="75.0001"
              height="905"
              fill="white"
              transform="translate(75 905) rotate(180)"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto">
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <section
          aria-labelledby="features-heading"
          className="mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 overflow-hidden"
        >
          <div
            data-cursor-opacity="0.8"
            data-cursor-size="240"
            data-cursor-color="#2A4BCC"
            className="bg-white py-24 sm:py-32"
          >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-[1000] relative">
              <p className="text-base/7 font-semibold text-blue-600 relative z-10">Research</p>
              <h2
                id="features-heading"
                className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10"
              >
                Our newest talks and presentations
              </h2>
              <ul
                role="list"
                className="mt-12 grid grid-cols-1 gap-10 sm:gap-20 lg:grid-cols-6 lg:grid-rows-1 sm:p-2 z-10 relative`"
              >
                <li className="relative lg:col-span-3 group">
                  <Link href="/research">
                    <article className="relative flex h-fit flex-col inset-px ring-1 ring-black/10 rounded-3xl bg-neutral-50 shadow-sm">
                      <div className="relative p-2 rounded-[32px] bg-white border scale-110 shadow-xs">
                        <img
                          alt="Screenshot showing the massive library of content available to practice with"
                          src="/images/interspeech.png"
                          className="h-full aspect-video object-cover object-top rounded-3xl border bg-white border-black/10"
                        />
                      </div>
                      <div className="p-5 pt-9">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-white border border-black/10 rounded-xl p-2 pr-3 w-fit pl-3 sm:pl-2">
                            <svg
                              width="86"
                              height="86"
                              viewBox="0 0 86 86"
                              fill="none"
                              className="size-3 text-sky-600 mx-0.5 mr-1 group-hover:rotate-180 transition-transform ease-in-out duration-450 hidden sm:block"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M41.4672 1.19822C41.7127 0.0255133 44.2873 0.0255196 44.5328 1.19822C46.3436 9.84995 50.0055 22.4562 56.7746 29.2254C63.5438 35.9945 76.1501 39.6564 84.8018 41.4672C85.9745 41.7127 85.9745 44.2873 84.8018 44.5328C76.1501 46.3436 63.5438 50.0055 56.7746 56.7746C50.0055 63.5438 46.3436 76.1501 44.5328 84.8018C44.2873 85.9745 41.7127 85.9745 41.4672 84.8018C39.6564 76.1501 35.9945 63.5438 29.2254 56.7746C22.4562 50.0055 9.84994 46.3436 1.19822 44.5328C0.0255133 44.2873 0.0255196 41.7127 1.19822 41.4672C9.84995 39.6564 22.4562 35.9945 29.2254 29.2254C35.9945 22.4562 39.6564 9.84994 41.4672 1.19822Z"
                                fill="oklch(0.588 0.158 241.966)"
                              />
                            </svg>

                            <h3 className="text-sm/4 font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-[#536AD4]">
                              Research Conference
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 bg-white border border-black/10 rounded-xl p-2 pr-3 w-fit group pl-3 sm:pl-2">
                            <svg
                              width="86"
                              height="86"
                              viewBox="0 0 86 86"
                              fill="none"
                              className="size-3 text-emerald-600 mx-0.5 mr-1 rotate-45 group-hover:rotate-270 transition-transform ease-in-out duration-450 hidden sm:block"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M41.4672 1.19822C41.7127 0.0255133 44.2873 0.0255196 44.5328 1.19822C46.3436 9.84995 50.0055 22.4562 56.7746 29.2254C63.5438 35.9945 76.1501 39.6564 84.8018 41.4672C85.9745 41.7127 85.9745 44.2873 84.8018 44.5328C76.1501 46.3436 63.5438 50.0055 56.7746 56.7746C50.0055 63.5438 46.3436 76.1501 44.5328 84.8018C44.2873 85.9745 41.7127 85.9745 41.4672 84.8018C39.6564 76.1501 35.9945 63.5438 29.2254 56.7746C22.4562 50.0055 9.84994 46.3436 1.19822 44.5328C0.0255133 44.2873 0.0255196 41.7127 1.19822 41.4672C9.84995 39.6564 22.4562 35.9945 29.2254 29.2254C35.9945 22.4562 39.6564 9.84994 41.4672 1.19822Z"
                                fill="oklch(0.609 0.126 221.723)"
                              />
                            </svg>

                            <h3 className="text-sm/4 font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-sky-800">
                              August 2025
                            </h3>
                          </div>
                        </div>
                        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                          Interspeech Conference Science Slam '25
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 text-pretty">
                          We presented our work on making speech pathology more accessible, insights
                          and statistics into our latest phonetic model, and a demo of our
                          work-in-progress pronunciation platform.
                        </p>
                      </div>
                    </article>
                  </Link>
                </li>
                <li className="relative lg:col-span-3 group">
                  <Link href="/research">
                    <article className="relative flex h-fit flex-col inset-px ring-1 ring-black/10 rounded-3xl bg-neutral-50 shadow-sm">
                      <div className="relative p-2 rounded-[32px] bg-white border scale-110 shadow-xs">
                        <img
                          alt="Screenshot showing the massive library of content available to practice with"
                          src="/images/UofW.png"
                          className="h-full aspect-video top-0 object-cover object-top rounded-3xl bg-white border border-black/10"
                        />
                      </div>
                      <div className="p-5 pt-9">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-white border border-black/10 rounded-xl p-2 pr-3 w-fit pl-3 sm:pl-2">
                            <div className="flex items-center gap-2">
                              <svg
                                width="86"
                                height="86"
                                viewBox="0 0 86 86"
                                fill="none"
                                className="size-3 text-sky-600 mx-0.5 mr-1 group-hover:rotate-180 transition-transform ease-in-out duration-450 hidden sm:block"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M41.4672 1.19822C41.7127 0.0255133 44.2873 0.0255196 44.5328 1.19822C46.3436 9.84995 50.0055 22.4562 56.7746 29.2254C63.5438 35.9945 76.1501 39.6564 84.8018 41.4672C85.9745 41.7127 85.9745 44.2873 84.8018 44.5328C76.1501 46.3436 63.5438 50.0055 56.7746 56.7746C50.0055 63.5438 46.3436 76.1501 44.5328 84.8018C44.2873 85.9745 41.7127 85.9745 41.4672 84.8018C39.6564 76.1501 35.9945 63.5438 29.2254 56.7746C22.4562 50.0055 9.84994 46.3436 1.19822 44.5328C0.0255133 44.2873 0.0255196 41.7127 1.19822 41.4672C9.84995 39.6564 22.4562 35.9945 29.2254 29.2254C35.9945 22.4562 39.6564 9.84994 41.4672 1.19822Z"
                                  fill="oklch(0.588 0.158 241.966)"
                                />
                              </svg>

                              <h3 className="text-sm/4 font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-[#536AD4]">
                                Research Symposium
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-white border border-black/10 rounded-xl p-2 pr-3 w-fit group pl-3 sm:pl-2">
                            <svg
                              width="86"
                              height="86"
                              viewBox="0 0 86 86"
                              fill="none"
                              className="size-3 text-emerald-600 mx-0.5 mr-1 rotate-45 group-hover:rotate-270 transition-transform ease-in-out duration-450 hidden sm:block"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M41.4672 1.19822C41.7127 0.0255133 44.2873 0.0255196 44.5328 1.19822C46.3436 9.84995 50.0055 22.4562 56.7746 29.2254C63.5438 35.9945 76.1501 39.6564 84.8018 41.4672C85.9745 41.7127 85.9745 44.2873 84.8018 44.5328C76.1501 46.3436 63.5438 50.0055 56.7746 56.7746C50.0055 63.5438 46.3436 76.1501 44.5328 84.8018C44.2873 85.9745 41.7127 85.9745 41.4672 84.8018C39.6564 76.1501 35.9945 63.5438 29.2254 56.7746C22.4562 50.0055 9.84994 46.3436 1.19822 44.5328C0.0255133 44.2873 0.0255196 41.7127 1.19822 41.4672C9.84995 39.6564 22.4562 35.9945 29.2254 29.2254C35.9945 22.4562 39.6564 9.84994 41.4672 1.19822Z"
                                fill="oklch(0.609 0.126 221.723)"
                              />
                            </svg>

                            <h3 className="text-sm/4 font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-sky-800">
                              May 2025
                            </h3>
                          </div>
                        </div>
                        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                          University of Washington Research Symposium '25
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 text-pretty">
                          We presented architectural challenges in building speech tools and models,
                          working with non-lab settings and real-time data, and our mission as a
                          research lab.
                        </p>
                      </div>
                    </article>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

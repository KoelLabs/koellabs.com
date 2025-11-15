import React from 'react';
import { Button } from '@/components/ui/base/button';
import Link from 'next/link';

export default function Models() {
  return (
    <div id="models" className="relative">
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
              <p className="text-base/7 font-semibold text-sky-600 relative z-10">Models</p>
              <h2
                id="features-heading"
                className="mt-2 text-balance text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10 sm:block hidden"
              >
                The latest and greatest in phonetic models
              </h2>
              <h2
                id="features-heading"
                className="mt-2 text-balance text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10 sm:hidden block"
              >
                The greatest in phonetic models
              </h2>
              <ul
                role="list"
                data-cursor-opacity="1"
                data-cursor-size="340"
                className="mt-12 grid lg:p-2 z-10 grid-cols-1 lg:grid-cols-2 relative gap-10 `"
              >
                <li className="relative group">
                  <Link href="/research">
                    <div className="relative p-2 aspect-square rounded-[32px] bg-white border overflow-hidden">
                      <img
                        alt="Screenshot showing the massive library of content available to practice with"
                        src="/images/models.webp"
                        className="h-full aspect-video object-cover object-top rounded-3xl border bg-white border-black/10 saturate-200"
                      />
                    </div>
                  </Link>
                </li>
                <li
                  data-cursor-opacity="0.5"
                  data-cursor-size="100"
                  data-cursor-collision="true"
                  className="px-2 md:px-6 lg:px-0 lg:pr-4 lg:pt-4"
                >
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <p className="lg:-mt-4 xl:mt-4 text-md/8 text-neutral-600 text-pretty">
                      We introduce a state-of-the-art phonetic transcription model, XLSR-English-01,
                      which transcribes both standard and non-standard English speech, achieving a
                      60% improvement in feature error rate over other phonetic models, including
                      Facebook's model, Facebook 60.
                    </p>
                    <p className="mt-6 text-md/8 text-neutral-600 text-pretty">
                      To develop truly inclusive speech technology, models should be able to
                      accurately transcribe diverse speaker profiles, from speech impediments to
                      non-native speech.
                    </p>
                    <p className="mt-6 text-md/8 text-neutral-600 text-pretty">
                      In light of this, we test our model on speech aphasia data (PSST) and
                      non-native speech spanning from Italian and German (ISLE) to Mandarin
                      (SpeechOcean) accented speech.
                    </p>
                    <p className="mt-6 text-md/8 text-neutral-600 text-pretty">
                      This model marks our second major update from our previous SoTA model
                      (Koel-Labs-B0), and we aim to continuously improve upon phonetic transcription
                      models in both their transcription quality and inference time.
                    </p>
                    <div className="mt-6 border rounded-[20px] p-2 w-full flex flex-col sm:flex-row gap-2">
                      <Link href="https://koellabs.com/blog#technical-reports" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full active:scale-[97%] transition-all duration-50 "
                        >
                          <p>View Technical Reports</p>
                        </Button>
                      </Link>
                      <Link
                        href="https://huggingface.co/KoelLabs/xlsr-english-01"
                        className="w-full"
                      >
                        <Button className="w-full active:scale-[97%] transition-all duration-50 ">
                          <p>View on Huggingface</p>
                        </Button>
                      </Link>
                    </div>
                    {/* <div className="mt-6 border rounded-3xl p-2 w-full flex flex-row gap-2">
                      <div className="size-24 rounded-2xl border"></div>
                    </div>
                    <div className="mt-6 border rounded-3xl p-2 w-full flex flex-row gap-2">
                      <div className="size-24 rounded-2xl border"></div>
                    </div>
                    <div className="mt-6 border rounded-3xl p-2 w-full flex flex-row gap-2">
                      <div className="size-24 rounded-2xl border"></div>
                    </div> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

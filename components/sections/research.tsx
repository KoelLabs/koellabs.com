import React from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/base/carousel';

const items = [
  {
    kind: 'paper',
    title: "IEEE Spoken Language Technology Workshop '26",
    venue: 'Accepted Paper',
    date: 'December 2026',
    href: 'https://arxiv.org/abs/2610.17761',
    image: '/images/paperSLT.png',
    pages: ['/images/paperSLT-p2.jpg', '/images/paperSLT-p3.jpg'],
    alt: 'First page of the IEEE SLT 2026 paper Connecting the Dots',
    description:
      'We show the speech recognition gap between Mainstream US English and minority accents is not closing as models scale.',
  },
  {
    kind: 'paper',
    title: "Interspeech Conference '26",
    venue: 'Accepted Paper',
    date: 'September 2026',
    href: 'https://arxiv.org/abs/2606.16019',
    image: '/images/paper.png',
    pages: ['/images/paper-p2.jpg', '/images/paper-p3.jpg'],
    alt: 'First page of the Interspeech 2026 paper Scaling Human and G2P Supervision for Robust Phonetic Transcription',
    description:
      'We show where G2P labels stop helping phonetic transcription, and cut weighted phone feature error rate by 2.3×.',
  },
  {
    kind: 'talk',
    title: "Interspeech Conference Science Slam '25",
    venue: 'Research Conference',
    date: 'August 2025',
    href: 'https://docs.google.com/presentation/d/1vC-smwntEnyBO1tNOdMEPg4y0lKs61Wp2Vyhswu2kwU/edit?usp=sharing',
    image: '/images/interspeech.png',
    alt: 'Title slide from our Interspeech 2025 Science Slam presentation',
    description:
      'We presented our work on making speech pathology more accessible and insights into our latest phonetic model.',
  },
  {
    kind: 'talk',
    title: "University of Washington Research Symposium '25",
    venue: 'Research Symposium',
    date: 'May 2025',
    href: 'https://docs.google.com/presentation/d/19v1o8X_8QxV-W1kG4dt7m1ltAXbYasK_f4srhnypF8E/edit?usp=sharing',
    image: '/images/UofW.png',
    alt: 'Title slide from our University of Washington Research Symposium 2025 presentation',
    description:
      'We presented the challenges of building speech tools and models with real-time data outside of lab settings.',
  },
];

const sparkle =
  'M41.4672 1.19822C41.7127 0.0255133 44.2873 0.0255196 44.5328 1.19822C46.3436 9.84995 50.0055 22.4562 56.7746 29.2254C63.5438 35.9945 76.1501 39.6564 84.8018 41.4672C85.9745 41.7127 85.9745 44.2873 84.8018 44.5328C76.1501 46.3436 63.5438 50.0055 56.7746 56.7746C50.0055 63.5438 46.3436 76.1501 44.5328 84.8018C44.2873 85.9745 41.7127 85.9745 41.4672 84.8018C39.6564 76.1501 35.9945 63.5438 29.2254 56.7746C22.4562 50.0055 9.84994 46.3436 1.19822 44.5328C0.0255133 44.2873 0.0255196 41.7127 1.19822 41.4672C9.84995 39.6564 22.4562 35.9945 29.2254 29.2254C35.9945 22.4562 39.6564 9.84994 41.4672 1.19822Z';

function Badge({
  children,
  secondary = false,
}: {
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <div className="flex items-center gap-1 bg-white border border-black/10 rounded-xl p-2 pr-3 w-fit pl-3 sm:pl-2">
      <svg
        width="86"
        height="86"
        viewBox="0 0 86 86"
        fill="none"
        className={`size-3 mx-0.5 mr-1 transition-transform ease-in-out duration-450 hidden sm:block ${
          secondary ? 'rotate-45 group-hover:rotate-270' : 'group-hover:rotate-180'
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={sparkle}
          fill={secondary ? 'oklch(0.609 0.126 221.723)' : 'oklch(0.588 0.158 241.966)'}
        />
      </svg>
      <h3
        className={`text-sm/4 font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
          secondary ? 'from-cyan-600 to-sky-800' : 'from-sky-600 to-[#536AD4]'
        }`}
      >
        {children}
      </h3>
    </div>
  );
}

export default function Research() {
  return (
    <div id="research" className="">
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
              <Carousel opts={{ align: 'start' }} className="relative z-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-base/7 font-semibold text-blue-600 relative z-10">
                      Research
                    </p>
                    <h2
                      id="features-heading"
                      className="mt-2 text-balance text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10"
                    >
                      Our latest publications and talks
                    </h2>
                  </div>
                  <div className="hidden sm:flex gap-2 shrink-0">
                    <CarouselPrevious className="static translate-y-0 size-10 rounded-xl" />
                    <CarouselNext className="static translate-y-0 size-10 rounded-xl" />
                  </div>
                </div>
                <CarouselContent overflowVisible className="mt-16 -ml-8 sm:-ml-16">
                  {items.map(item => (
                    <CarouselItem
                      key={item.title}
                      className="pl-8 sm:pl-16 basis-[88%] sm:basis-[62%] lg:basis-[46%] group"
                    >
                      <Link href={item.href} target="_blank" className="block h-full">
                        <article className="relative flex h-full flex-col inset-px ring-1 ring-black/10 rounded-3xl bg-neutral-50 shadow-sm">
                          <div className="relative p-2 rounded-[32px] bg-white border scale-110 shadow-xs">
                            {item.kind === 'paper' ? (
                              <div className="relative w-full aspect-video max-h-[318px] sm:max-h-[650px] rounded-3xl border border-black/10 bg-white overflow-hidden">
                                <div
                                  aria-hidden="true"
                                  className="absolute inset-0 -mt-0.5"
                                  style={{
                                    backgroundImage:
                                      'repeating-linear-gradient(135deg, #e5e5e5 0 1px, transparent 1px 4.7px)',
                                  }}
                                />
                                {item.pages?.map((page, i) => (
                                  <div
                                    key={page}
                                    aria-hidden="true"
                                    className={`absolute left-1/2 top-[15%] w-[62%] aspect-[14/19] p-2 rounded-[28px] bg-white border shadow-sm origin-bottom transition-transform duration-300 ease-out ${
                                      i === 0
                                        ? '-translate-x-[60%] -rotate-[6deg] group-hover:-translate-x-[64%] group-hover:-rotate-[8deg]'
                                        : '-translate-x-[40%] rotate-[6deg] group-hover:-translate-x-[36%] group-hover:rotate-[8deg]'
                                    }`}
                                  >
                                    <img
                                      alt=""
                                      src={page}
                                      className="h-full w-full object-cover object-top rounded-[20px] border bg-white border-black/10 opacity-60"
                                    />
                                  </div>
                                ))}
                                <div className="absolute left-1/2 -translate-x-1/2 top-[12%] w-[66%] aspect-[14/19] p-2 rounded-[28px] bg-white border shadow-md">
                                  <img
                                    alt={item.alt}
                                    src={item.image}
                                    className="h-full w-full object-cover object-top rounded-[20px] border bg-white border-black/10"
                                  />
                                </div>
                              </div>
                            ) : (
                              <img
                                alt={item.alt}
                                src={item.image}
                                className="w-full aspect-video max-h-[318px] sm:max-h-[650px] object-top rounded-3xl border bg-white border-black/10"
                              />
                            )}
                          </div>
                          <div className="p-5 pt-9">
                            <div className="flex items-center gap-2">
                              <Badge>{item.venue}</Badge>
                              <Badge secondary>{item.date}</Badge>
                            </div>
                            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 text-balance">
                              {item.title}
                            </p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 text-pretty">
                              {item.description}
                            </p>
                          </div>
                        </article>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

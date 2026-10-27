import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/base/button';

const collaborationAreas = [
  'Clinical & atypical speech',
  "Children's speech & early literacy",
  'Accent & dialect fairness',
  'Speech data & annotation',
];

export default function CTA({ hideBg = false }: { hideBg?: boolean }) {
  return (
    <div id="work-with-us" className={`relative overflow-hidden`}>
      <div className="mx-auto max-w-[1321px] sm:px-6 lg:px-[47.5px] relative">
        <svg
          width="1529"
          height="595"
          viewBox="0 0 1529 595"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-[118.1%] top-0"
        >
          <rect
            x="1508.57"
            y="571.575"
            width="1275.15"
            height="550.149"
            rx="21.6909"
            transform="rotate(-180 1508.57 571.575)"
            fill="white"
            stroke="#E5E5E5"
            strokeWidth="0.850625"
          />
        </svg>

        <svg
          width="1529"
          height="595"
          viewBox="0 0 1529 595"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-[118.1%] top-0"
        >
          <rect
            x="20.4253"
            y="23.4253"
            width="1275.15"
            height="550.149"
            rx="21.6909"
            fill="white"
            stroke="#E5E5E5"
            strokeWidth="0.850625"
          />
        </svg>

        <div className="absolute left-[-27px] top-0 h-full w-px bg-neutral-200"> </div>
        <div className="absolute right-[-27.5px] top-0 h-full w-px bg-neutral-200"> </div>

        <div className="absolute left-0 top-0 w-[43.5px] ml-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute -right-[0.25px] top-0 w-[44px] mr-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute left-0 bottom-0 w-[43.5px] ml-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute right-0 bottom-0 w-[43.5px] mr-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>
        <div className="absolute -right-[0.5px] top-0 w-[46px] h-full overflow-hidden items-start justify-center bg-neutral-50 border-x z-[1] hidden 2xl:flex">
          <div className="flex-col h-full items-start gap-[8px] -mt-px flex">
            {Array(63)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`right-${i}`}
                  className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
                ></div>
              ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 w-[45.5px] h-full overflow-hidden items-start justify-center bg-neutral-50 border-x z-[1] hidden 2xl:flex">
          <div className="flex-col h-full items-start gap-[8px] -mt-px flex">
            {Array(63)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`right-${i}`}
                  className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
                ></div>
              ))}
          </div>
        </div>
        <div className="sm:px-6 bg-white">
          <section
            aria-labelledby="cta-heading"
            className="relative isolate overflow-hidden bg-white bg-[url('/cta-bg.svg')] [background-size:300%] sm:[background-size:148%] bg-[50%_52.5%] px-6 py-16 sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-12 border-x"
          >
            <div className="absolute left-0 top-0 w-full h-full bg-radial from-transparent via-white/10 to-white"></div>
            <div
              className="mx-auto max-w-md text-center lg:flex-auto lg:my-16 lg:mt-16 lg:pb-18 lg:pt-14 z-10 relative"
              data-cursor-size="2"
              data-cursor-collision="true"
            >
              <p className="text-sm/4 font-semibold text-sky-800 mb-2">Work With Us</p>
              <h2
                id="cta-heading"
                className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl"
              >
                Let's Build It Together
              </h2>
              <p className="mt-6 text-pretty text-lg/8 text-neutral-700">
                We partner with researchers, clinicians, and educators on applied speech research,
                from new datasets to models built for the speakers technology leaves behind.
              </p>
              <ul role="list" className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {collaborationAreas.map(area => (
                  <li
                    key={area}
                    className="px-3 py-1.5 border border-neutral-200 bg-white/75 rounded-xl text-sm leading-4 font-medium tracking-tight text-neutral-800"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center justify-center">
                <Link href="/contact#contact-form" className="w-full sm:w-auto">
                  <Button className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto">
                    Get in touch <ArrowRightIcon className="w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

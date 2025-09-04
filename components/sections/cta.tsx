'use client';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/base/button';
import { useToast } from '@/hooks/use-toast';

export default function CTA({ hideBg = false }: { hideBg?: boolean }) {
  const { toast } = useToast();
  return (
    <div id="join-the-waitlist" className={`relative`}>
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="sm:p-6 sm:border sm:border-neutral-200 bg-white sm:rounded-[44px] shadow-xl">
          <section
            aria-labelledby="cta-heading"
            className="relative isolate overflow-hidden bg-white border border-neutral-200 backdrop-blur-md px-6 py-16 shadow-lg sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1176"
              height="594"
              fill="none"
              viewBox="0 0 1176 594"
              className="absolute object-cover inset-0 z-[-1]"
            >
              <g clipPath="url(#clip0_3911_341)">
                <path fill="#fff" d="M1176 594H0V0h1176z"></path>
                <path
                  stroke="#A9A9A9"
                  d="M1155.03-598.9 774.999 1206.516M1208.76-549.572 828.729 1255.844M862.506 1257.17 1159.21-152.398M940.314 1192.1 1237.02-217.469"
                ></path>
                <path
                  fill="#F5F5F5"
                  d="M1159.73-618.789 842.81 886.798l60.234 12.679 316.92-1505.587zM17.297-621l316.92 1505.586-60.234 12.68-316.92-1505.587z"
                ></path>
                <path
                  stroke="#A9A9A9"
                  d="M21.989-601.111 402.022 1204.3M-31.745-551.783 348.288 1253.63"
                ></path>
                <path fill="#F5F5F5" d="M1237.35 532.398H-301.23v-61.554h1538.58z"></path>
                <path
                  stroke="#A9A9A9"
                  d="M1216.69 532.539H-628.29M1180.98 470.5H-664.001M314.518 1254.96 17.808-154.609M236.71 1189.89-60-219.68M862.506 1257.17 1159.21-152.398M940.314 1192.1 1237.02-217.469"
                ></path>
                <g filter="url(#filter0_f_3911_341)" style={{ mixBlendMode: 'color' }}>
                  <path
                    fill="#0086FF"
                    d="M1446.07 30.016c0 471.099-381.9 853-853 853-471.099 0-853-381.901-853-853s381.901-853 853-853c226.6 0 358.249 142.858 511 287 164.82 155.528 342 321.501 342 566"
                  ></path>
                </g>
                <g filter="url(#filter1_f_3911_341)" style={{ mixBlendMode: 'color' }}>
                  <path
                    fill="#0086FF"
                    d="M454.07-451.984c0 471.099-381.901 853-853 853s-853-381.901-853-853 381.901-852.996 853-852.996c226.6 0 358.249 142.85 511 287 164.818 155.524 342 321.497 342 565.996"
                  ></path>
                </g>
                <g filter="url(#filter2_f_3911_341)" style={{ mixBlendMode: 'color' }}>
                  <path
                    fill="#0086FF"
                    d="M2396.07 1043.02c0 471.09-381.9 853-853 853s-853-381.91-853-853c0-471.103 381.9-853.004 853-853.004 226.6 0 358.25 142.858 511 287 164.82 155.528 342 321.501 342 566.004"
                  ></path>
                </g>
                <g filter="url(#filter3_f_3911_341)" style={{ mixBlendMode: 'color' }}>
                  <path
                    fill="#2A4BCC"
                    d="M1278.42 567.072c-407.983-235.55-547.768-757.236-312.219-1165.22C1201.75-1006.13 1723.44-1145.92 2131.42-910.367c407.98 235.549 547.77 757.236 312.22 1165.219-113.3 196.242-302.84 238.824-504.05 299.039-217.1 64.972-449.43 135.43-661.17 13.181"
                  ></path>
                </g>
                <g filter="url(#filter4_f_3911_341)" style={{ mixBlendMode: 'color' }}>
                  <path
                    fill="#2A4BCC"
                    d="M-987.282 1501.39C-1395.27 1265.84-1535.05 744.156-1299.5 336.172-1063.95-71.811-542.266-211.597-134.282 23.953 273.701 259.502 413.487 781.189 177.937 1189.17c-113.3 196.24-302.842 238.83-504.049 299.04-217.1 64.97-449.428 135.43-661.17 13.18"
                  ></path>
                </g>
                <g filter="url(#filter5_f_3911_341)" style={{ mixBlendMode: 'color' }}>
                  <path
                    fill="#002E72"
                    d="M1082.85-24.406C714.567 269.363 177.866 208.956-115.903-159.329S-349.265-1064.32 19.02-1358.08c368.285-293.77 904.986-233.37 1198.76 134.92 141.3 177.15 111.71 369.146 94.28 578.445-18.81 225.832-38.07 467.844-229.21 620.31"
                  ></path>
                </g>
                <g filter="url(#filter6_f_3911_341)" style={{ mixBlendMode: 'color' }}>
                  <path
                    fill="#002E72"
                    d="M1125.12 1965.1c-368.287 293.77-904.988 233.36-1198.757-134.92C-367.406 1461.89-307 925.193 61.286 631.424S966.272 398.062 1260.04 766.347c141.3 177.146 111.72 369.143 94.29 578.443-18.81 225.84-38.07 467.85-229.21 620.31"
                  ></path>
                </g>
                <path fill="#fff" d="M1074.53 552h-63l24-114 62 5zM103 552h63l-24-114-62 5z"></path>
              </g>
              <defs>
                <filter
                  id="filter0_f_3911_341"
                  width="2013.8"
                  height="2013.8"
                  x="-413.83"
                  y="-976.884"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_3911_341"
                    stdDeviation="76.95"
                  ></feGaussianBlur>
                </filter>
                <filter
                  id="filter1_f_3911_341"
                  width="2013.8"
                  height="2013.8"
                  x="-1405.83"
                  y="-1458.88"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_3911_341"
                    stdDeviation="76.95"
                  ></feGaussianBlur>
                </filter>
                <filter
                  id="filter2_f_3911_341"
                  width="2013.8"
                  height="2013.8"
                  x="536.17"
                  y="36.116"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_3911_341"
                    stdDeviation="76.95"
                  ></feGaussianBlur>
                </filter>
                <filter
                  id="filter3_f_3911_341"
                  width="2014.08"
                  height="1966.54"
                  x="697.881"
                  y="-1178.69"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_3911_341"
                    stdDeviation="76.95"
                  ></feGaussianBlur>
                </filter>
                <filter
                  id="filter4_f_3911_341"
                  width="2014.08"
                  height="1966.54"
                  x="-1567.82"
                  y="-244.369"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_3911_341"
                    stdDeviation="76.95"
                  ></feGaussianBlur>
                </filter>
                <filter
                  id="filter5_f_3911_341"
                  width="1937.05"
                  height="2013.86"
                  x="-455.994"
                  y="-1698.17"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_3911_341"
                    stdDeviation="76.95"
                  ></feGaussianBlur>
                </filter>
                <filter
                  id="filter6_f_3911_341"
                  width="1937.05"
                  height="2013.86"
                  x="-413.728"
                  y="291.334"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_3911_341"
                    stdDeviation="76.95"
                  ></feGaussianBlur>
                </filter>
                <clipPath id="clip0_3911_341">
                  <path fill="#fff" d="M1176 594H0V0h1176z"></path>
                </clipPath>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:flex-auto lg:py-32">
              <p className="text-sm/4 font-semibold text-sky-600 mb-2">Mailing List</p>
              <h2
                id="cta-heading"
                className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl"
              >
                Join Our Mailing List
              </h2>
              <p className="mt-6 text-pretty text-lg/8 text-neutral-700">
                We are gearing up for our closed beta launch in 2025. Join the waitlist to secure
                your spot.
              </p>
              <div className="mt-8 flex items-center justify-center gap-x-6">
                <div className="relative w-full lg:mx-4">
                  <form
                    action="https://docs.google.com/forms/d/e/1FAIpQLScYXfLnmvyRogKKffPJ1R0c_sYWpAsAk_8lYWqEGWWSZGHX3Q/formResponse"
                    method="POST"
                    onSubmit={e => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      fetch(e.currentTarget.action, {
                        method: 'POST',
                        body: formData,
                        mode: 'no-cors',
                      });
                      toast({
                        title: 'Submitted',
                        description: 'Thank you for joining the waitlist!',
                      });
                      e.currentTarget.reset();
                    }}
                  >
                    <label htmlFor="email-input" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      name="entry.358867278"
                      placeholder="Email address"
                      aria-label="Email address"
                      className="block w-full rounded-2xl border border-neutral-200 bg-white/75 py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-sky-950 focus:outline-hidden focus:ring-sky-950/5"
                      required
                    />
                    <div className="absolute inset-y-1 right-1 flex justify-end">
                      <button
                        type="submit"
                        aria-label="Submit email to join waitlist"
                        className="flex aspect-square h-full items-center justify-center rounded-xl bg-sky-700 text-white transition hover:bg-sky-800 bg-linear-to-b border border-double outline-white/50 outline-offset-[-2px] border-black from-sky-900 to-blue-950"
                      >
                        <ArrowRightIcon className="w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

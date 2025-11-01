'use client';
import { ArrowRightIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CTA({ hideBg = false }: { hideBg?: boolean }) {
  const { toast } = useToast();
  return (
    <div id="join-the-waitlist" className={`relative overflow-hidden`}>
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
              <p className="text-sm/4 font-semibold text-sky-800 mb-2">Early Access</p>
              <h2
                id="cta-heading"
                className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl"
              >
                Be First in Line
              </h2>
              <p className="mt-6 text-pretty text-lg/8 text-neutral-700">
                We’re inviting a small group for early access to our research previews. Reserve your
                spot today.
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
                        className="flex aspect-square h-full items-center justify-center rounded-xl text-white transition hover:bg-sky-800 bg-sky-950 cursor-pointer"
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

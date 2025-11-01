import React, { PropsWithChildren } from 'react';

export default function BlogBody({ children }: PropsWithChildren) {
  return (
    <div className="bg-white/50 py-24 sm:py-32 relative">
      <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1346px] justify-between z-[-1] h-[1300px] lg:flex hidden">
        <div className="h-full"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-400"></div>
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
        <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-400"></div>
        <div className="h-full"></div>
      </div>

      <div className="bg-white absolute h-full w-full mt-96 border-y border-neutral-200 lg:block hidden">
        <div className="absolute left-0 top-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute right-0 top-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute left-0 top-[225px] w-[49.3px] h-[48px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute right-0 top-[225px] w-[49.3px] h-[48px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-b absolute top-0 left-0 z-[1]">
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
        </div>
        <div className=" w-full h-[250px] overflow-hidden bg-neutral-50 absolute top-0 left-0"></div>
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y absolute top-56 left-0">
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
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 lg:max-w-6xl lg:px-8 z-10">{children}</div>
    </div>
  );
}

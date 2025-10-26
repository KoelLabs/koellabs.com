'use server';

import Header from '@/components/ui/header';
import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';
import PreviewsHero from '@/app/previews/sections-previews/previews-hero';
import PreviewsModels from './sections-previews/previews-models';

export default async function PreviewsPage() {
  return (
    <div className="flex-col flex w-screen relative scroll-smooth">
      <div
        data-cursor-opacity="0.3"
        data-cursor-size="240"
        className="z-100 sticky top-0 mx-auto w-full"
      >
        <Header />
      </div>
      <PreviewsHero />
      <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-t">
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
      <div
        data-cursor-opacity="0.8"
        data-cursor-size="240"
        data-cursor-color="#2A4BCC"
        className="z-0 relative"
      >
        <PreviewsModels />
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-b">
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

      <div className="w-full relative">
        <CTA />
      </div>
      <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
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

      <Footer />
    </div>
  );
}

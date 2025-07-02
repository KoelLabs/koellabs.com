'use client';

import GridBackground from '@/components/ui/onboarding/grid-background';
import { Toaster } from '@/components/ui/toaster';
import { OnboardingProvider } from '@/components/ui/onboarding/onboarding-provider';

export default function OnboardingLayout({ children }) {
  return (
    <OnboardingProvider>
      <div className="w-full min-h-screen bg-white dark:bg-neutral-950/[0.99] tracking-[-0.015em] relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.7)_0,rgba(0,163,255,0.7)_50%,rgba(0,163,255,0)_100%)] mix-blend-color pointer-events-none"></div>
        <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_100%,rgba(0,163,255,0.7)_0,rgba(0,163,255,0.7)_50%,rgba(0,163,255,0)_100%)] mix-blend-color pointer-events-none"></div>

        {/* Repeating line pattern - top */}
        <div className="absolute top-0 left-0 w-full h-[5vh] overflow-hidden flex items-end justify-center bg-neutral-50">
          <div className="flex h-full items-end gap-2">
            {Array(200)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`top-${i}`}
                  className="h-full w-px bg-neutral-200 dark:bg-neutral-800"
                ></div>
              ))}
          </div>
        </div>

        <div className="flex items-center justify-center my-12 relative w-full h-[90vh] bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 transform-gpu dark:border-neutral-800 z-20">
          {children}
        </div>

        {/* Repeating line pattern - bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[5vh] overflow-hidden flex items-start justify-center bg-neutral-50">
          <div className="flex h-full items-start gap-2">
            {Array(200)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-full w-px bg-neutral-200 dark:bg-neutral-800"
                ></div>
              ))}
          </div>
        </div>

        <Toaster />
      </div>
    </OnboardingProvider>
  );
}

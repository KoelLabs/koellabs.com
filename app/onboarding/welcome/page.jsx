'use client';

import { Button } from '@/components/ui/base/button';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/language');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden ">
      <div className="absolute h-full w-screen z-[-1] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="flex flex-col items-center justify-center py-8 px-4 text-center mx-4 border-neutral-200 dark:border-neutral-800 z-10  rounded-full">
        <div className="flex items-center tracking-tight w-full justify-between">
          <KoelBirdRounded className="w-[100px] h-fit mx-auto animate-in animate-in-1" />
        </div>
        <h3 className="text-2xl font-semibold tracking-[-0.04em] mb-2 z-10 animate-in animate-in-2">
          Welcome to Koel Labs
        </h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-4 max-w-md text-balance z-10 animate-in animate-in-3">
          Koel Labs helps you improve your language skills with personalized feedback and practice.
        </p>
        <Button
          variant="outline"
          className="flex items-center gap-2 z-10 animate-in animate-in-4"
          onClick={handleNext}
        >
          Start Learning
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="-rotate-90"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/base/card';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingCard({
  title,
  description,
  children,
  backHref,
  nextHref,
  nextLabel = 'Next',
  isNextDisabled = false,
  onNext,
  showBackButton = true,
  fullWidthButton = false,
}) {
  return (
    <Card className="w-[600px] p-0 rounded-2xl bg-white border border-neutral-200 z-11 relative">
      <CardHeader className="text-center bg-neutral-50 rounded-t-2xl py-9">
        <KoelBirdRounded className="w-16 h-16 mx-auto" />
        <CardTitle className="text-2xl tracking-tighter font-semibold">
          {title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-blue-700 dark:from-sky-400 dark:to-blue-600">
            Labs
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className="border-t border-neutral-200 mb-4"></div>
      <CardContent>{children}</CardContent>
      <div className="border-t border-neutral-200"></div>
      <CardFooter className="flex justify-between p-4 bg-neutral-50 rounded-b-2xl transition-none">
        {showBackButton ? (
          <>
            <Link href={backHref}>
              <Button
                className="rounded-lg outline outline-1 h-9 outline-offset-[-2px] outline-neutral-100 tracking-[-0.02em] pr-4"
                variant="outline"
              >
                <ChevronLeft className="w-4 h-4 inline-block -ml-2 mr-1" strokeWidth={2.5} />
                Back
              </Button>
            </Link>
            {nextHref ? (
              <Link href={nextHref}>
                <Button
                  className="rounded-lg outline outline-1 h-9 outline-offset-[-2px] outline-neutral-700 tracking-[-0.02em]"
                  disabled={isNextDisabled}
                  onClick={onNext}
                >
                  {nextLabel}
                  <ChevronRight
                    className="w-4 h-4 inline-block ml-1 -mr-1.5 mt-px"
                    strokeWidth={2.5}
                  />
                </Button>
              </Link>
            ) : (
              <Button
                className="rounded-lg outline outline-1 h-9 outline-offset-[-2px] outline-neutral-700 tracking-[-0.02em]"
                disabled={isNextDisabled}
                onClick={onNext}
              >
                {nextLabel}
                <ChevronRight
                  className="w-4 h-4 inline-block ml-1 -mr-1.5 mt-px"
                  strokeWidth={2.5}
                />
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className={`${
              fullWidthButton ? 'w-full' : ''
            } rounded-lg outline outline-1 outline-offset-[-2px] outline-neutral-700 tracking-[-0.02em]`}
          >
            {nextLabel} <ChevronRight className="w-4 h-4 inline-block ml-1 mt-px" strokeWidth={3} />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

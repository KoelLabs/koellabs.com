'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/base/label';
import { Button } from '@/components/ui/base/button';
import { Textarea } from '@/components/ui/base/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base/select';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import {
  DateField,
  DateInput,
  DateSegment,
  TimeField,
  dateInputStyle,
} from '@/components/ui/datefield-rac';
import { ArrowUpRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/base/tooltip';

export default function LanguageGoalsPage() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/speech-assessment');
  };

  const handleBack = () => {
    router.push('/onboarding/getting-to-know-you');
  };

  const isNextDisabled = !onboardingData.experienceLevel;

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col items-center justify-center w-full">
        <div className="absolute h-full w-screen z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="flex flex-col items-center justify-center py-8 px-6 text-center mx-4 rounded-xl z-40 bg-white/40 border-neutral-200 dark:border-neutral-800 max-w-2xl w-full">
          <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />

          <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Your Language Goals</h3>
          <p className="text-md text-neutral-500 dark:text-neutral-400 mb-6 max-w-md text-balance z-10">
            Help us understand your goals so we can support your learning journey
          </p>

          <div className="space-y-6 w-full">
            <div className="space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="targetLanguage" className="mb-2 flex justify-between">
                  <span>
                    What language do you want to learn?
                    <span className="text-sky-600 ml-1" aria-hidden="true">
                      *
                    </span>
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-neutral-500 hover:text-neutral-700 cursor-help ml-1" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <p className="text-muted-foreground" role="region" aria-live="polite">
                        We're currently building out support for English during our beta phase. In
                        the future, we plan to expand to other languages. Want to suggest what comes
                        next?{' '}
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSeKziYp-3pTI1Ptnk70RSZ1ryQSDJfUrZagrAuIsDSKr3YvWw/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 underline inline-block"
                        >
                          Submit a request here
                          <ArrowUpRight
                            aria-hidden="true"
                            className="w-4 h-4 inline-block -mt-0.5 "
                          />
                        </a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <div className="relative">
                  <Select
                    onValueChange={value => updateOnboardingData('targetLanguage', value)}
                    value={onboardingData.targetLanguage}
                  >
                    <SelectTrigger id="targetLanguage" className="h-10 mt-1 rounded-lg">
                      <SelectValue placeholder="English" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish" disabled>
                        Spanish (Coming soon)
                      </SelectItem>
                      <SelectItem value="german" disabled>
                        German (Coming soon)
                      </SelectItem>
                      <SelectItem value="russian" disabled>
                        Russian (Coming soon)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="experienceLevel" className="mb-2">
                  How many years have you studied this language?
                  <span className="text-sky-600 ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Select
                  onValueChange={value => updateOnboardingData('experienceLevel', value)}
                  value={onboardingData.experienceLevel}
                >
                  <SelectTrigger id="experienceLevel" className="h-10 mt-1 rounded-lg">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Complete Beginner (0 years)</SelectItem>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">More than 10 years</SelectItem>
                    <SelectItem value="native-level">Native/Near-native level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="challengingWords" className="mb-2">
                  Challenging Words
                  <span className="text-xs text-neutral-500 ml-1">(Optional)</span>
                </Label>
                <Textarea
                  id="challengingWords"
                  placeholder="Are there any specific words you find difficult or confusing? (for example, 'thorough', 'entrepreneur', 'rural')"
                  value={onboardingData.challengingWords}
                  onChange={e => updateOnboardingData('challengingWords', e.target.value)}
                  className="min-h-[100px] mt-1 rounded-lg resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-neutral-400 mt-1">
                  {onboardingData.challengingWords?.length || 0}/500 characters
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8 w-full justify-between">
            <Button variant="outline" onClick={handleBack} className="flex-1 gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="rotate-90"
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
              Back
            </Button>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 text-center px-2">
              Step 2 of 4
            </p>
            <Button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="flex items-center flex-1 gap-1"
            >
              Continue
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
      </div>
    </TooltipProvider>
  );
}

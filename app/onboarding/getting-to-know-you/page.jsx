'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/base/button';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import { useState } from 'react';
import DatePickerComponent from '@/components/ui/base/date';
import { parseDate } from '@internationalized/date';

// Import shared form components
import LanguageSelector from '@/components/forms/language-selector';
import CountrySelector from '@/components/forms/country-selector';

export default function GettingToKnowYouPage() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const safeParseBirthday = dateString => {
    if (!dateString || typeof dateString !== 'string') return null;
    try {
      // Ensure the string is in YYYY-MM-DD format
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return parseDate(dateString);
      }
      return null;
    } catch (error) {
      console.warn('Failed to parse birthday:', dateString, error);
      return null;
    }
  };

  const handleNext = () => {
    setIsLoading(true);
    router.push('/onboarding/language-goals');
  };

  const handleBack = () => {
    router.push('/onboarding/welcome');
  };

  const isNextDisabled = !onboardingData.nativeLanguage || !onboardingData.placeOfBirth;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center p-8 text-center mx-4  z-40 max-w-2xl w-full ">
        <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />

        <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Getting to Know You</h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-10 max-w-md text-balance z-10">
          Please share a few details to help us personalize your experience
        </p>

        <div className="space-y-6 w-full">
          <div className="space-y-4">
            <LanguageSelector
              label="What's your native language?"
              value={onboardingData.nativeLanguage}
              onChange={value => updateOnboardingData('nativeLanguage', value)}
              required={true}
              placeholder="Select your native language"
              showEnglishName={false}
            />

            <CountrySelector
              label="What's your place of birth?"
              value={onboardingData.placeOfBirth}
              onChange={value => updateOnboardingData('placeOfBirth', value)}
              required={true}
              placeholder="Select your place of birth"
            />

            <DatePickerComponent
              label="What's your birthday?"
              optional={true}
              value={safeParseBirthday(onboardingData.birthday)}
              onChange={value => updateOnboardingData('birthday', value ? value.toString() : '')}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-12 w-full justify-between">
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
            Step 1 of 3
          </p>
          <Button
            onClick={handleNext}
            disabled={isNextDisabled || isLoading}
            className="flex items-center flex-1 gap-1"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>
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
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

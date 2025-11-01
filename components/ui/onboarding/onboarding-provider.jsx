'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';

const OnboardingContext = createContext(null);

const OnboardingCompletionLoader = () => {
  return (
    <div className="inset-0 bg-white dark:bg-neutral-950 z-50 flex items-center justify-center h-screen relative">
      <div className="absolute top-0 left-0 w-full h-[5vh] overflow-hidden flex items-end justify-center bg-neutral-50 z-90">
        <div className="flex h-full items-end gap-2 border-b ">
          {Array(500)
            .fill(0)
            .map((_, i) => (
              <div
                key={`top-${i}`}
                className="h-full w-px bg-neutral-200 dark:bg-neutral-800"
              ></div>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-center my-12 relative w-full h-full bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 transform-gpu dark:border-neutral-800 z-20">
        <div className="flex flex-col items-center justify-center text-center z-10">
          <div className="mb-6">
            <KoelBirdRounded className="w-[100px] h-fit mx-auto" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
              Customizing your experience
            </h2>
            <p className="text-md text-neutral-500 dark:text-neutral-400 max-w-md text-balance">
              We're setting up your personalized learning journey based on your preferences
            </p>
          </div>

          <div className="mt-6 w-48 h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 rounded-full animate-[loadingBar_0.5s_linear_infinite]"
              style={{ width: '40%' }}
            ></div>
            <style jsx>{`
              @keyframes loadingBar {
                0% {
                  transform: translateX(-100%);
                  width: 50%;
                }
                100% {
                  transform: translateX(100%);
                  width: 100%;
                }
                200% {
                  transform: translateX(-100%);
                  width: 50%;
                }
              }
            `}</style>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[5vh] overflow-hidden flex items-start justify-center bg-neutral-50">
          <div className="flex h-full items-start gap-2 border-t border-neutral-200 dark:border-neutral-800">
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
    </div>
  );
};

export function OnboardingProvider({ children }) {
  const [onboardingData, setOnboardingData] = useState({
    // Getting to Know You (Page 1)
    nativeLanguage: '',
    nativeLanguageCountry: '',
    birthday: '',

    // Language Goals (Page 2)
    targetLanguage: 'english',
    experienceLevel: '',
    learningCity: '',
    challengingWords: '',
  });

  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  const updateOnboardingData = (key, value) => {
    setOnboardingData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const completeOnboarding = async () => {
    setIsCompleting(true);

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nativeLanguage: onboardingData.nativeLanguage,
          nativeLanguageCountry: onboardingData.nativeLanguageCountry,
          birthday: onboardingData.birthday,
          targetLanguage: onboardingData.targetLanguage,
          experienceLevel: onboardingData.experienceLevel,
          learningCity: onboardingData.learningCity,
          challengingWords: onboardingData.challengingWords,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      console.log('Onboarding completed with data:', onboardingData);

      router.push('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setIsCompleting(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateOnboardingData,
        completeOnboarding,
        isCompleting,
      }}
    >
      {!isCompleting && children}
      {isCompleting && <OnboardingCompletionLoader />}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';

const OnboardingContext = createContext(null);

// Loading screen component
const OnboardingCompletionLoader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-neutral-950 z-50 flex items-center justify-center">
      <div className="absolute h-full w-screen z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="flex flex-col items-center justify-center text-center z-10">
        <div className="mb-6">
          <KoelBirdRounded className="w-[100px] h-fit mx-auto animate-pulse" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
            Customizing your experience
          </h2>
          <p className="text-md text-neutral-500 dark:text-neutral-400 max-w-md">
            We're setting up your personalized learning journey based on your preferences
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export function OnboardingProvider({ children }) {
  const [onboardingData, setOnboardingData] = useState({
    // Getting to Know You (Page 1)
    nativeLanguage: '',
    placeOfBirth: '',
    birthday: '',

    // Language Goals (Page 2)
    targetLanguage: 'english', // Default to English as mentioned
    experienceLevel: '',
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
      // Send the data to backend
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nativeLanguage: onboardingData.nativeLanguage,
          placeOfBirth: onboardingData.placeOfBirth,
          birthday: onboardingData.birthday,
          targetLanguage: onboardingData.targetLanguage,
          experienceLevel: onboardingData.experienceLevel,
          challengingWords: onboardingData.challengingWords,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      console.log('Onboarding completed with data:', onboardingData);

      // Add a brief delay to show the customization message
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to dashboard after successful completion
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
      {children}
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

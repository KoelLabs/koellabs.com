'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [onboardingData, setOnboardingData] = useState({
    targetLanguage: '',
    targetDialect: '',
    nativeLanguage: '',
    nativeDialect: '',
    consent: false,
    privacyPolicy: false,
    termsOfService: false,
  });

  const router = useRouter();

  const updateOnboardingData = (key, value) => {
    setOnboardingData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const completeOnboarding = async () => {
    try {
      // [TODO] Send the data to backend
      console.log('Onboarding completed with data:', onboardingData);

      // Navigate to dashboard after successful completion
      router.push('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateOnboardingData,
        completeOnboarding,
      }}
    >
      {children}
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

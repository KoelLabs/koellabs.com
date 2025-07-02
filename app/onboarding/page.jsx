'use client';

import { useRouter } from 'next/navigation';

export default function OnboardingRedirect() {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.replace('/onboarding/welcome');
  }
  return null;
}

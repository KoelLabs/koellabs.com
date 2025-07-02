'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/base/label';
import { Checkbox } from '@/components/ui/base/checkbox';
import { Button } from '@/components/ui/base/button';
import { ArrowUpRight, Verified } from 'lucide-react';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import { useEffect } from 'react';

export default function ConsentPage() {
  const { onboardingData, updateOnboardingData, completeOnboarding } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  const handleSubmit = () => {
    completeOnboarding();
  };

  const handleBack = () => {
    router.push('/onboarding/language');
  };

  const isNextDisabled = !(
    onboardingData.consent &&
    onboardingData.privacyPolicy &&
    onboardingData.termsOfService
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="absolute h-full w-screen z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="flex flex-col items-center justify-center py-8 px-6 text-center mx-4 rounded-xl z-40 bg-white/40 max-w-2xl w-full">
        <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />
        <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Final Steps</h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-6 max-w-md text-balance z-10">
          Step 3 of 3
        </p>

        <div className="space-y-6 w-full">
          <div className="flex flex-col gap-4">
            <div className="relative flex w-full items-start mt-3 gap-2 rounded-xl border border-input p-4 shadow-black/5 has-data-[state=checked]:border-ring text-left bg-white">
              <Checkbox
                id="consent"
                checked={onboardingData.consent}
                onCheckedChange={checked => updateOnboardingData('consent', !!checked)}
                className="order-1 after:absolute after:inset-0"
                aria-describedby="checkbox-consent-description"
              />
              <div className="flex grow items-start gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="consent">
                    User Research Consent{' '}
                    <span className="text-xs font-normal leading-[inherit] text-sky-600">*</span>
                  </Label>
                  <p
                    id="checkbox-consent-description"
                    className="text-xs text-muted-foreground leading-relaxed"
                  >
                    I agree to let anonymized recordings of my voice be used to support and improve
                    both my own and others&apos; language learning experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex w-full items-start gap-2 rounded-xl border border-input p-4 shadow-black/5 has-data-[state=checked]:border-ring text-left">
              <Checkbox
                id="privacy"
                checked={onboardingData.privacyPolicy}
                onCheckedChange={checked => updateOnboardingData('privacyPolicy', !!checked)}
                className="order-1 after:absolute after:inset-0"
                aria-describedby="checkbox-privacy-description"
              />
              <div className="flex grow items-start gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="privacy">
                    Privacy Policy{' '}
                    <span className="text-xs font-normal leading-[inherit] text-sky-600">*</span>
                  </Label>
                  <p id="checkbox-privacy-description" className="text-xs text-muted-foreground">
                    I have read and agree to the{' '}
                    <a
                      href="/privacy"
                      className="text-sky-600 hover:underline inline-flex items-center z-10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex w-full items-start gap-2 rounded-xl border border-input p-4 shadow-black/5 has-data-[state=checked]:border-ring text-left">
              <Checkbox
                id="terms"
                checked={onboardingData.termsOfService}
                onCheckedChange={checked => updateOnboardingData('termsOfService', !!checked)}
                className="order-1 after:absolute after:inset-0"
                aria-describedby="checkbox-terms-description"
              />
              <div className="flex grow items-start gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="terms">
                    Terms of Service{' '}
                    <span className="text-xs font-normal leading-[inherit] text-sky-600">*</span>
                  </Label>
                  <p id="checkbox-terms-description" className="text-xs text-muted-foreground">
                    I have read and agree to the{' '}
                    <a
                      href="/terms"
                      className="text-sky-600 hover:underline inline-flex items-center z-10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isNextDisabled && (
            <p className="text-xs text-muted-foreground text-center mt-4">
              Please agree to all terms to continue
            </p>
          )}

          {!isNextDisabled && (
            <div className="text-xs text-foreground text-center mt-2 inline-flex items-center gap-1 ">
              <Verified className="w-4 h-4" />
              <span>All set! Click submit to complete your setup.</span>
            </div>
          )}
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
          <Button
            onClick={handleSubmit}
            disabled={isNextDisabled}
            className="flex items-center flex-1 gap-1"
          >
            Submit
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
  );
}

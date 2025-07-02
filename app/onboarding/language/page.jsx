'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/base/label';
import { Button } from '@/components/ui/base/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base/select';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';

export default function LanguagePage() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/consent');
  };

  const handleBack = () => {
    router.push('/onboarding/welcome');
  };

  const getDialects = language => {
    switch (language) {
      case 'english':
        return ['American', 'British', 'Australian', 'Canadian', 'Irish', 'Scottish', 'Other'];
      case 'spanish':
        return ['Castilian', 'Latin American', 'Other'];
      case 'french':
        return ['Metropolitan French', 'Canadian French', 'Other'];
      case 'german':
        return ['Standard German', 'Swiss German', 'Austrian German', 'Other'];
      default:
        return [];
    }
  };

  const MandatoryStar = () => (
    <span className="text-sky-600" aria-hidden="true">
      *
    </span>
  );

  const isNextDisabled = !onboardingData.targetLanguage || !onboardingData.nativeLanguage;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="absolute h-full w-screen z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="flex flex-col items-center justify-center py-8 px-6 text-center mx-4 rounded-xl z-40 bg-white/40 border-neutral-200 dark:border-neutral-800 max-w-2xl w-full">
        <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />
        <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Language Preferences</h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-6 max-w-md text-balance z-10">
          Step 2 of 3
        </p>

        <div className="space-y-6 w-full">
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="targetLanguage" className="mb-2">
                Target Language <MandatoryStar />
              </Label>
              <Select
                onValueChange={value => {
                  updateOnboardingData('targetLanguage', value);
                  updateOnboardingData('targetDialect', '');
                }}
                value={onboardingData.targetLanguage}
              >
                <SelectTrigger id="targetLanguage" className="h-10 mt-1 rounded-lg">
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish" disabled className="text-neutral-400">
                    Spanish (Coming Soon)
                  </SelectItem>
                  <SelectItem value="french" disabled className="text-neutral-400">
                    French (Coming Soon)
                  </SelectItem>
                  <SelectItem value="german" disabled className="text-neutral-400">
                    German (Coming Soon)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {onboardingData.targetLanguage && (
              <div className="space-y-2 text-left">
                <Label htmlFor="targetDialect">Target Dialect (Optional)</Label>
                <Select
                  onValueChange={value => updateOnboardingData('targetDialect', value)}
                  value={onboardingData.targetDialect}
                >
                  <SelectTrigger id="targetDialect" className="h-10 mt-1 rounded-lg">
                    <SelectValue placeholder="Select target dialect" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDialects(onboardingData.targetLanguage).map(dialect => (
                      <SelectItem key={dialect} value={dialect.toLowerCase()}>
                        {dialect}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="nativeLanguage">
                Native Language <MandatoryStar />
              </Label>
              <Select
                onValueChange={value => {
                  updateOnboardingData('nativeLanguage', value);
                  updateOnboardingData('nativeDialect', '');
                }}
                value={onboardingData.nativeLanguage}
              >
                <SelectTrigger id="nativeLanguage" className="h-10 mt-1 rounded-lg">
                  <SelectValue placeholder="Select native language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {onboardingData.nativeLanguage && (
              <div className="space-y-2 text-left">
                <Label htmlFor="nativeDialect">Native Dialect (Optional)</Label>
                <Select
                  onValueChange={value => updateOnboardingData('nativeDialect', value)}
                  value={onboardingData.nativeDialect}
                >
                  <SelectTrigger id="nativeDialect" className="h-10 mt-1 rounded-lg">
                    <SelectValue placeholder="Select native dialect" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDialects(onboardingData.nativeLanguage).map(dialect => (
                      <SelectItem key={dialect} value={dialect.toLowerCase()}>
                        {dialect}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/base/card';
import { Label } from '@/components/ui/base/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base/select';
import { Checkbox } from '@/components/ui/base/checkbox';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Verified } from 'lucide-react';
import KoelBird from '@/components/ui/base/koel-labs-bird';

export default function OnboardingFlow({ user }: { user: string }) {
  const [step, setStep] = useState(1);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [targetDialect, setTargetDialect] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [nativeDialect, setNativeDialect] = useState('');
  const [consent, setConsent] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [termsOfService, setTermsOfService] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    switch (step) {
      case 1:
        setIsNextDisabled(false);
        break;
      case 2:
        setIsNextDisabled(!targetLanguage);
        break;
      case 3:
        setIsNextDisabled(!nativeLanguage);
        break;
      case 4:
        setIsNextDisabled(!(consent && privacyPolicy && termsOfService));
        break;
      default:
        setIsNextDisabled(false);
    }
  }, [step, targetLanguage, nativeLanguage, consent, privacyPolicy, termsOfService]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Onboarding data:', {
      targetLanguage,
      targetDialect,
      nativeLanguage,
      nativeDialect,
      consent,
      privacyPolicy,
      termsOfService,
    });
    // Here you would typically send this data to your backend
  };

  const MandatoryStar = () => (
    <span className="text-[#317EC5]" aria-hidden="true">
      *
    </span>
  );

  const getDialects = (language: string) => {
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

  return (
    <div className="flex justify-center items-center h-full bg-muted relative rounded-xl m-4 overflow-hidden dark:bg-neutral-900/[0.25] border border-neutral-200">
      <div className="mx-auto absolute top-0 left-0 right-0 bottom-0 h-full flex justify-between z-0 rotate-45 scale-[1.95]">
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 "></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 "></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 "></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 "></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 "></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 "></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 "></div>
        <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
      </div>

      <Card className="w-[600px] p-0 rounded-2xl bg-white border border-neutral-200 z-11 relative">
        <CardHeader className="text-center bg-neutral-50 rounded-t-2xl py-9">
          <KoelBird className="w-16 h-16 mx-auto" />
          <CardTitle className="text-2xl tracking-tighter font-semibold">
            Welcome to Koel{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-br from-black via-sky-950 to-sky-600 dark:from-white dark:via-white dark:to-white">
              Labs!
            </span>
          </CardTitle>
          <CardDescription>Step {step} of 4</CardDescription>
        </CardHeader>
        <div className="border-t border-neutral-200 mb-4"></div>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 px-2">
                <div className="space-y-3 pb-2 pt-4">
                  <h3 className="text-md font-semibold tracking-tight">Dear {user.normalize()},</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We're thrilled to have you join our community of pronunciation learners!
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut imperdiet erat platea ultricies
                    consectetur natoque posuere ornare habitasse parturient lobortis.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nulla nulla id vel etiam; maximus id ipsum feugiat netus. Metus ultricies in
                    nisi praesent montes nam orci praesent sed. Elit adipiscing tellus dapibus fames
                    dapibus; ridiculus suspendisse semper. Consectetur commodo lacinia.
                  </p>

                  <p className="text-xs text-muted-foreground pt-1 mx-auto">
                    <img
                      src="/images/koelLabsSig.png"
                      alt="koel labs signature"
                      className="h-10 mt-2 mb-2 ml-0"
                    />
                    - Koel Labs Team
                  </p>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetLanguage">
                    Target Language <MandatoryStar />
                  </Label>
                  <Select
                    onValueChange={value => {
                      setTargetLanguage(value);
                      setTargetDialect('');
                    }}
                    value={targetLanguage}
                  >
                    <SelectTrigger id="targetLanguage">
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
                {targetLanguage && (
                  <div className="space-y-2">
                    <Label htmlFor="targetDialect">Target Dialect (Optional)</Label>
                    <Select onValueChange={setTargetDialect} value={targetDialect}>
                      <SelectTrigger id="targetDialect">
                        <SelectValue placeholder="Select target dialect" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDialects(targetLanguage).map(dialect => (
                          <SelectItem key={dialect} value={dialect.toLowerCase()}>
                            {dialect}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nativeLanguage">
                    Native Language <MandatoryStar />
                  </Label>
                  <Select
                    onValueChange={value => {
                      setNativeLanguage(value);
                      setNativeDialect('');
                    }}
                    value={nativeLanguage}
                  >
                    <SelectTrigger id="nativeLanguage">
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
                {nativeLanguage && (
                  <div className="space-y-2">
                    <Label htmlFor="nativeDialect">Native Dialect (Optional)</Label>
                    <Select onValueChange={setNativeDialect} value={nativeDialect}>
                      <SelectTrigger id="nativeDialect">
                        <SelectValue placeholder="Select native dialect" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDialects(nativeLanguage).map(dialect => (
                          <SelectItem key={dialect} value={dialect.toLowerCase()}>
                            {dialect}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="relative flex w-full items-start mt-3 gap-2 rounded-lg border border-input p-4 shadow-xs shadow-black/5 has-data-[state=checked]:border-ring">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={checked => setConsent(checked as boolean)}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby="checkbox-consent-description"
                    />
                    <div className="flex grow items-start gap-3">
                      <div className="grid gap-2">
                        <Label htmlFor="consent">
                          User Research Consent{' '}
                          <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                            <MandatoryStar />
                          </span>
                        </Label>
                        <p
                          id="checkbox-consent-description"
                          className="text-xs text-muted-foreground"
                        >
                          I consent to have recordings of my voice stored and analyzed for improving
                          my language learning experience.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-xs shadow-black/5 has-data-[state=checked]:border-ring">
                    <Checkbox
                      id="privacy"
                      checked={privacyPolicy}
                      onCheckedChange={checked => setPrivacyPolicy(checked as boolean)}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby="checkbox-privacy-description"
                    />
                    <div className="flex grow items-start gap-3">
                      <div className="grid gap-2">
                        <Label htmlFor="privacy">
                          Privacy Policy{' '}
                          <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                            <MandatoryStar />
                          </span>
                        </Label>
                        <p
                          id="checkbox-privacy-description"
                          className="text-xs text-muted-foreground"
                        >
                          I have read and agree to the{' '}
                          <a
                            href="/privacy"
                            className="text-[#317EC5] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Privacy Policy
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-xs shadow-black/5 has-data-[state=checked]:border-ring">
                    <Checkbox
                      id="terms"
                      checked={termsOfService}
                      onCheckedChange={checked => setTermsOfService(checked as boolean)}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby="checkbox-terms-description"
                    />
                    <div className="flex grow items-start gap-3">
                      <div className="grid gap-2">
                        <Label htmlFor="terms">
                          Terms of Service{' '}
                          <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                            <MandatoryStar />
                          </span>
                        </Label>
                        <p
                          id="checkbox-terms-description"
                          className="text-xs text-muted-foreground"
                        >
                          I have read and agree to the{' '}
                          <a
                            href="/terms"
                            className="text-[#317EC5] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terms of Service
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <div className="border-t border-neutral-200"></div>
        <CardFooter className="flex justify-between p-4 bg-neutral-50 rounded-b-2xl transition-none">
          {step > 1 ? (
            <>
              <Button
                className="rounded-lg outline outline-1 h-9 outline-offset-[-2px] outline-neutral-100 tracking-[-0.02em] pr-4"
                variant="outline"
                onClick={handleBack}
              >
                <ChevronLeft className="w-4 h-4 inline-block -ml-2 mr-1" strokeWidth={2.5} />
                Back
              </Button>
              {step < 4 ? (
                <Button
                  className="rounded-lg outline outline-1 h-9 outline-offset-[-2px] outline-neutral-700 tracking-[-0.02em]"
                  onClick={handleNext}
                  disabled={isNextDisabled}
                >
                  Next
                  <ChevronRight
                    className="w-4 h-4 inline-block ml-1 -mr-1.5 mt-px"
                    strokeWidth={2.5}
                  />
                </Button>
              ) : (
                <Button
                  className="rounded-lg outline outline-1 h-9 outline-offset-[-2px] outline-neutral-700 tracking-[-0.02em]"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isNextDisabled}
                >
                  Submit
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="w-full rounded-lg outline outline-1 outline-offset-[-2px] outline-neutral-700 tracking-[-0.02em]"
            >
              Start Your Journey{' '}
              <ChevronRight className="w-4 h-4 inline-block ml-1 mt-px" strokeWidth={3} />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

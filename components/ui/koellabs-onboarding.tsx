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
import { Verified } from 'lucide-react';
import KoelBird from '@/components/ui/base/koel-labs-bird';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [targetDialect, setTargetDialect] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [nativeDialect, setNativeDialect] = useState('');
  const [consent, setConsent] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    switch (step) {
      case 1:
        setIsNextDisabled(!targetLanguage);
        break;
      case 2:
        setIsNextDisabled(!nativeLanguage);
        break;
      case 3:
        setIsNextDisabled(!consent);
        break;
      default:
        setIsNextDisabled(false);
    }
  }, [step, targetLanguage, nativeLanguage, consent]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
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
      <div className="mx-auto absolute top-0 left-0 right-0 bottom-0 h-full flex justify-between z-[0] rotate-45 scale-[1.95]">
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

      <Card className="w-[600px] p-3 rounded-xl border border-neutral-200 z-[11] relative">
        <CardHeader className="text-center">
          <KoelBird className="w-16 h-16 mx-auto" />
          <CardTitle className="text-2xl tracking-tighter font-semibold">
            Welcome to Koel{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-black via-sky-950 to-sky-600 dark:from-white dark:via-white dark:to-white">
              Labs!
            </span>
          </CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
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
            {step === 2 && (
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
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={checked => setConsent(checked as boolean)}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby="checkbox-14-description"
                    />
                    <div className="flex grow items-start gap-3">
                      <div className="grid gap-2">
                        <Label htmlFor="checkbox-14">
                          User Consent{' '}
                          <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                            <MandatoryStar />
                          </span>
                        </Label>
                        <p id="checkbox-14-description" className="text-xs text-muted-foreground">
                          I consent to have recordings of my voice stored and analyzed for improving
                          my language learning experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext} disabled={isNextDisabled}>
                  Next
                </Button>
              ) : (
                <Button type="submit" onClick={handleSubmit} disabled={isNextDisabled}>
                  Submit
                </Button>
              )}
            </>
          ) : (
            <Button onClick={handleNext} disabled={isNextDisabled} className="w-full">
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

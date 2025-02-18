'use client';

import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';
import Header from '@/components/ui/1 - header';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Label } from '@/components/ui/base/label';
import { Textarea } from '@/components/ui/base/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCharacterLimit } from '@/lib/use-character-limit';
import { ArrowRightIcon, AtSign, BookDashed, MailIcon, User } from 'lucide-react';
import { useState, useCallback } from 'react';

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function ContactForm() {
  const { toast } = useToast();

  const maxLength = 500;
  const [value, setValue] = useState('');
  const { characterCount, handleChange, maxLength: limit } = useCharacterLimit({ maxLength });

  // setup reCaptcha v3 (background score)
  const { executeRecaptcha } = useGoogleReCaptcha();
  // event handler for reCaptcha verification on form submission
  const submitFormWithReCaptchaVerification = useCallback(
    async (formData: FormData) => {
      if (!executeRecaptcha) {
        toast({
          title: 'Error',
          description:
            'ReCAPTCHA not yet loaded. Cannot verify that you are a human, please wait a bit and try again. Double check you are not using a VPN or adblocker if the problem persists and, if all else fails, reach out via email.',
          status: 'error',
        });
        return;
      }

      const token = await executeRecaptcha('contactFormSubmit');
      const res = await fetch(
        `/api/submitGoogleFormWithReCaptcha?formName=contact&token=${token}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (res.ok) {
        toast({
          title: 'Submitted',
          description: 'Thank you for contacting us!',
        });
        return true;
      } else {
        res.text().then(console.error);
        toast({
          title: 'Error',
          description:
            'Failed to verify your humanity. Make sure to disable VPNs and adblockers, double check you are not a robot, and email us if the issue persists.',
          status: 'error',
        });
        return false;
      }
    },
    [executeRecaptcha],
  );

  return (
    <div className="mx-auto max-w-md text-center lg:flex-auto lg:py-32">
      <p className="text-sm/4 font-semibold text-sky-600 mb-2">Contact Form</p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl">
        {/* Ready to start learning? */}
        Let's get in touch
      </h2>
      <p className="text-lg/8 text-neutral-700 mt-4">
        We're here to help you with any questions, concerns, or feedback you may have.
      </p>
      <form
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          const target = e.currentTarget;
          const formData = new FormData(target);
          submitFormWithReCaptchaVerification(formData).then(success => {
            if (success) {
              setValue('');
              target.reset();
            }
          });
        }}
        className="space-y-2"
      >
        <div className="space-y-2  text-left mt-4">
          <Label htmlFor="input-name">Name</Label>
          <div className="relative">
            <Input
              id="input-name"
              required
              autoComplete="name nickname given-name"
              name="entry.358867278"
              className="peer ps-9 rounded-xl"
              placeholder="Name"
              type="text"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <User size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="space-y-2  text-left mt-3">
          <Label htmlFor="input-email">Email</Label>
          <div className="relative">
            <Input
              id="input-email"
              required
              name="entry.65859822"
              className="peer ps-9 rounded-xl"
              placeholder="Email"
              type="email"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <AtSign size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="space-y-2  text-left mt-3">
          <Label htmlFor="input-topic">Topic</Label>
          <div className="relative">
            <Input
              id="input-topic"
              required
              name="entry.1735979938"
              className="peer ps-9 rounded-xl"
              placeholder="Topic"
              type="text"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <BookDashed size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="space-y-2 text-left mt-3">
          <Label htmlFor="textarea-message">Message</Label>
          <Textarea
            id="textarea-message"
            name="entry.1856129796"
            required
            value={value}
            maxLength={maxLength}
            placeholder="Message"
            onChange={e => {
              setValue(e.target.value);
              handleChange(e);
            }}
            aria-describedby="characters-left-textarea"
          />
          <p
            id="characters-left-textarea"
            className="mt-2 text-right text-xs text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            <span className="tabular-nums">{limit - characterCount}</span> characters left
          </p>
        </div>
        <Button
          type="submit"
          className="mt-3 rounded-lg bg-gradient-to-b border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950 w-full"
        >
          Submit
        </Button>
        <p className="text-xs text-neutral-500 mt-2 pt-2">
          This form is protected by reCAPTCHA and the Google{' '}
          <a className="underline" href="https://policies.google.com/privacy">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a className="underline" href="https://policies.google.com/terms">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </form>
    </div>
  );
}

export default function Contact() {
  return (
    <div className={`min-h-screen`}>
      <div className="z-[2] sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <div className="color-bg h-[80%] w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] transform-gpu opacity-10 top-48"></div>
      <div
        className={`mx-auto absolute top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] h-full flex justify-between z-[-1]`}
      >
        <div className="h-full"></div>
        <div className="w-[1px] h-full bg-neutral-200 drops"></div>
        <div className="w-[1px] h-full bg-neutral-200 drops2"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="w-[1px] h-full bg-neutral-200 drops3"></div>
        <div className="w-[1px] h-full bg-neutral-200 drops4"></div>
        <div className="h-full"></div>
      </div>

      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="sm:p-4 sm:border sm:border-neutral-200 bg-white/50 backdrop-blur-sm sm:rounded-[36px]">
          <div className="relative isolate overflow-hidden bg-white/50 backdrop-blur-md border border-neutral-200 px-6 py-16 shadow-sm sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="415"
              height="394"
              fill="none"
              className="absolute right-1/2 top-1/4 -z-10 size-[64rem] opacity-100 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-[100%] lg:translate-y-0"
              viewBox="0 0 415 394"
            >
              <circle
                cx="-17.089"
                cy="210.388"
                r="271.149"
                fill="url(#paint0_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.09 210.388)"
              ></circle>
              <circle
                cx="-17.089"
                cy="210.388"
                r="270.649"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.09 210.388)"
              ></circle>
              <ellipse
                cx="-16.646"
                cy="210.15"
                fill="url(#paint1_radial_2207_218)"
                fillOpacity="0.12"
                rx="319"
                ry="318.5"
                transform="rotate(-28.073 -16.646 210.15)"
              ></ellipse>
              <path
                stroke="#0284C7"
                strokeOpacity="0.1"
                d="M264.382 60.265c82.649 154.963 23.83 347.692-131.378 430.472s-348.029 24.261-430.678-130.702-23.83-347.692 131.378-430.472c155.209-82.78 348.029-24.261 430.678 130.702Z"
              ></path>
              <circle
                cx="-17.089"
                cy="210.387"
                r="221.872"
                fill="url(#paint2_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.09 210.387)"
              ></circle>
              <circle
                cx="-17.089"
                cy="210.387"
                r="221.372"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.09 210.387)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="164.5"
                fill="url(#paint3_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="164"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <circle
                cx="-17.088"
                cy="210.387"
                r="104.5"
                fill="url(#paint4_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.088 210.387)"
              ></circle>
              <circle
                cx="-17.088"
                cy="210.387"
                r="104"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.088 210.387)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="41.5"
                fill="url(#paint5_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="41"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <defs>
                <radialGradient
                  id="paint0_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.739 96.65)scale(271.149)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint1_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(0 318.5 -319 0 -16.646 210.15)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint2_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.738 96.649)scale(221.872)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint3_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.737 96.65)scale(164.5)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint4_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.737 96.65)scale(104.5)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint5_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.736 96.649)scale(41.5)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="415"
              height="394"
              fill="none"
              className="absolute right-1/2 top-1/4 scale-x-[-1] -z-10 size-[64rem] opacity-100 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-[0%] lg:translate-y-0"
              viewBox="0 0 415 394"
            >
              <circle
                cx="-17.089"
                cy="210.388"
                r="271.149"
                fill="url(#paint0_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.09 210.388)"
              ></circle>
              <circle
                cx="-17.089"
                cy="210.388"
                r="270.649"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.09 210.388)"
              ></circle>
              <ellipse
                cx="-16.646"
                cy="210.15"
                fill="url(#paint1_radial_2207_218)"
                fillOpacity="0.12"
                rx="319"
                ry="318.5"
                transform="rotate(-28.073 -16.646 210.15)"
              ></ellipse>
              <path
                stroke="#0284C7"
                strokeOpacity="0.1"
                d="M264.382 60.265c82.649 154.963 23.83 347.692-131.378 430.472s-348.029 24.261-430.678-130.702-23.83-347.692 131.378-430.472c155.209-82.78 348.029-24.261 430.678 130.702Z"
              ></path>
              <circle
                cx="-17.089"
                cy="210.387"
                r="221.872"
                fill="url(#paint2_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.09 210.387)"
              ></circle>
              <circle
                cx="-17.089"
                cy="210.387"
                r="221.372"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.09 210.387)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="164.5"
                fill="url(#paint3_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="164"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <circle
                cx="-17.088"
                cy="210.387"
                r="104.5"
                fill="url(#paint4_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.088 210.387)"
              ></circle>
              <circle
                cx="-17.088"
                cy="210.387"
                r="104"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.088 210.387)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="41.5"
                fill="url(#paint5_radial_2207_218)"
                fillOpacity="0.12"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <circle
                cx="-17.087"
                cy="210.385"
                r="41"
                stroke="#0284C7"
                strokeOpacity="0.1"
                transform="rotate(-28.073 -17.087 210.385)"
              ></circle>
              <defs>
                <radialGradient
                  id="paint0_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.739 96.65)scale(271.149)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint1_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(0 318.5 -319 0 -16.646 210.15)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint2_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.738 96.649)scale(221.872)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint3_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.737 96.65)scale(164.5)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint4_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.737 96.65)scale(104.5)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
                <radialGradient
                  id="paint5_radial_2207_218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(90 -113.736 96.649)scale(41.5)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284C7"></stop>
                  <stop offset="1" stopColor="#0284C7"></stop>
                </radialGradient>
              </defs>
            </svg>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
              <ContactForm />
            </GoogleReCaptchaProvider>
          </div>
        </div>
      </div>
      <div className="bg-white/50 backdrop-blur-md mb-10 border-y border-neutral-200">
        <CTA hideBg />
      </div>
      <Footer />
    </div>
  );
}

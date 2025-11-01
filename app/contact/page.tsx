'use client';

import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Label } from '@/components/ui/base/label';
import { Textarea } from '@/components/ui/base/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCharacterLimit } from '@/lib/use-character-limit';
import { AtSign, BookDashed, User } from 'lucide-react';
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
      <p className="text-sm/4 font-semibold text-sky-800 mb-2">Contact Form</p>
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
        <Button type="submit" className="mt-3 bg-linear-to-b border-black bg-sky-950 w-full">
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
      <div className="z-10 sticky top-0 mx-auto w-full">
        <Header />
      </div>

      {/* <div className="absolute right-0 -top-20 w-full h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color pointer-events-none"></div> */}
      {/* <div className="absolute left-0 -top-20 w-[60px] h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color"></div> */}

      <div className="mx-auto py-24 sm:py-32 sm:pt-0 sm:-mt-px  z-[8] relative">
        <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
          <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
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
        <div className="max-w-[908px] mx-auto relative overflow-x-hidden lg:overflow-x-visible">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1234"
            height="1815"
            fill="none"
            viewBox="0 0 1234 1815"
            className="absolute -top-104 -left-[960px] scale-50 md:block hidden"
          >
            <g stroke="#E5E5E5" strokeWidth="2" clipPath="url(#clip0_4363_485)">
              <path d="M505.393 957.159c-21.522-31.138-21.522-72.348 0-103.486L1088.81 9.566c50.75-73.424 165.87-37.511 165.87 51.743V1749.52c0 89.26-115.12 125.17-165.87 51.75z"></path>
              <rect
                width="1813"
                height="1231.7"
                x="1232.7"
                y="1"
                rx="33"
                transform="rotate(90 1232.7 1)"
              ></rect>
            </g>
            <defs>
              <clipPath id="clip0_4363_485">
                <rect
                  width="1815"
                  height="1233.7"
                  x="1233.7"
                  fill="#fff"
                  rx="30"
                  transform="rotate(90 1233.7 0)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1234"
            height="1815"
            fill="none"
            viewBox="0 0 1234 1815"
            className="absolute -top-104 -right-[960px] scale-50 rotate-y-180 md:block hidden"
          >
            <g stroke="#E5E5E5" strokeWidth="2" clipPath="url(#clip0_4363_485)">
              <path d="M505.393 957.159c-21.522-31.138-21.522-72.348 0-103.486L1088.81 9.566c50.75-73.424 165.87-37.511 165.87 51.743V1749.52c0 89.26-115.12 125.17-165.87 51.75z"></path>
              <rect
                width="1813"
                height="1231.7"
                x="1232.7"
                y="1"
                rx="33"
                transform="rotate(90 1232.7 1)"
              ></rect>
            </g>
            <defs>
              <clipPath id="clip0_4363_485">
                <rect
                  width="1815"
                  height="1233.7"
                  x="1233.7"
                  fill="#fff"
                  rx="30"
                  transform="rotate(90 1233.7 0)"
                ></rect>
              </clipPath>
            </defs>
          </svg>

          <div className="absolute left-0 top-0 w-[43.5px] ml-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
            <div className="rounded-full w-full h-full border bg-white"></div>
          </div>

          <div className="absolute -right-[0.25px] top-0 w-[44px] mr-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
            <div className="rounded-full w-full h-full border bg-white"></div>
          </div>

          <div className="absolute left-0 bottom-0 w-[43.5px] ml-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
            <div className="rounded-full w-full h-full border bg-white"></div>
          </div>

          <div className="absolute right-0 bottom-0 w-[43.5px] mr-px h-[43.5px] bg-neutral-50 p-1 z-[2] hidden 2xl:block">
            <div className="rounded-full w-full h-full border bg-white"></div>
          </div>
          <div className="absolute -right-[0.5px] top-0 w-[46px] h-full overflow-hidden items-start justify-center bg-neutral-50 border-x z-[1] hidden 2xl:flex">
            <div className="flex-col h-full items-start gap-[8px] -mt-px flex">
              {Array(109)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`right-${i}`}
                    className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
                  ></div>
                ))}
            </div>
          </div>
          <div className="absolute left-0 top-0 w-[45.5px] h-full overflow-hidden items-start justify-center bg-neutral-50 border-x z-[1] hidden 2xl:flex">
            <div className="flex-col h-full items-start gap-[8px] -mt-px flex">
              {Array(109)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`right-${i}`}
                    className="h-px w-[50.5px] bg-neutral-200 dark:bg-neutral-800"
                  ></div>
                ))}
            </div>
          </div>
          <div className="backdrop-opacity-35 bg-cover bg-center relative isolate overflow-hidden border-x px-6 py-16 shadow-xs sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
              <ContactForm />
            </GoogleReCaptchaProvider>
          </div>
        </div>
        <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
          <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
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
      <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
        <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
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
      <CTA />
      <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
        <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
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
      <Footer />
    </div>
  );
}

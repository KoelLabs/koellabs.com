'use client';

import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Label } from '@/components/ui/base/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import React from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Search, Mail, Lock } from 'lucide-react';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';

const ONBOARDING_URL = '/dashboard'; // TODO: make onboarding, for now just dashboard
const RETURNING_USER_URL = '/dashboard';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        toast({
          title: 'Authentication failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success!',
          description: "You've been signed in successfully",
        });
        router.push(RETURNING_USER_URL);
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address first',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: email,
        redirectTo: '/reset-password',
      });

      if (error) {
        toast({
          title: 'Reset failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Email sent',
          description: 'Check your inbox for password reset instructions',
        });
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async provider => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: RETURNING_USER_URL,
        newUserCallbackURL: ONBOARDING_URL,
      });

      if (error) {
        toast({
          title: 'Authentication failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-950/[0.99] tracking-[-0.015em] relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 opacity-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] bg-sky-500/20 dark:bg-sky-600/20 rounded-full blur-[100px] animate-blob opacity-75"></div>
        <div className="absolute top-[25%] -left-[15%] w-[40%] h-[30%] bg-sky-300/20 dark:bg-sky-400/20 rounded-full blur-[100px] animate-blob animation-delay-4000 opacity-75"></div>

        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 opacity-75"></div>
        <div className="absolute top-[25%] -right-[15%] w-[40%] h-[30%] bg-sky-300/20 dark:bg-sky-400/20 rounded-full blur-[100px] animate-blob animation-delay-4000 opacity-75"></div>
      </div>

      {/* Repeating line pattern - top */}
      <div className="absolute top-0 left-0 w-full h-[5vh] overflow-hidden flex items-end justify-center">
        <div className="flex h-full items-end gap-2">
          {Array(200)
            .fill(0)
            .map((_, i) => (
              <div
                key={`top-${i}`}
                className="h-full w-px bg-neutral-200 dark:bg-neutral-800"
              ></div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-center my-12 relative w-full h-[90vh] bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 transform-gpu dark:border-neutral-800 ">
        <div className="mx-auto grid w-full px-6 sm:w-[420px] gap-8 relative z-10">
          <div className="grid gap-2 text-center">
            <KoelBirdRounded className="w-12 h-12 mx-auto" />
            <h1 className="text-2xl font-semibold tracking-tighter text-black dark:text-white">
              <span className="relative">Welcome Back!</span>
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSignIn} className="grid gap-5">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium ml-1">
                  Email
                </Label>
                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground z-20">
                    <Mail size={16} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    className="pl-10 h-10 rounded-full focus-visible:ring-neutral-500 focus-visible:ring-1 border-neutral-200 bg-white/80 backdrop-blur-sm"
                    placeholder="name@example.com"
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium ml-1">
                    Password
                  </Label>
                  <Button
                    type="button"
                    variant="link"
                    className="text-xs font-medium text-sky-600 hover:text-sky-700 p-0 h-auto"
                    onClick={handlePasswordReset}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground z-20">
                    <Lock size={16} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 h-10 rounded-full focus-visible:ring-neutral-500 focus-visible:ring-1 border-neutral-200 bg-white/80 backdrop-blur-sm"
                    required
                    placeholder="••••••••••••••"
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full h-10 rounded-full font-medium bg-black hover:bg-neutral-800 text-white dark:bg-sky-600 dark:hover:bg-sky-700"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                or continue with
              </span>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-full border-neutral-200 hover:bg-neutral-50 text-sm bg-white/80 backdrop-blur-sm"
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 mr-2"
                  width="754"
                  height="768"
                  viewBox="0 0 754 768"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M753.32 392.727C753.32 365.498 750.876 339.316 746.338 314.182H384.68V462.895H591.342C582.266 510.72 555.036 551.215 514.193 578.444V675.142H638.818C711.429 608.116 753.32 509.673 753.32 392.727Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M384.68 768C488.36 768 575.284 733.789 638.818 675.142L514.193 578.444C479.982 601.484 436.346 615.447 384.68 615.447C284.84 615.447 200.011 548.073 169.64 457.309H41.8728V556.451C105.058 681.775 234.571 768 384.68 768Z"
                    fill="#34A853"
                  />
                  <path
                    d="M169.64 456.96C161.96 433.92 157.422 409.484 157.422 384C157.422 358.516 161.96 334.08 169.64 311.04V211.898H41.8728C15.691 263.564 0.680054 321.862 0.680054 384C0.680054 446.138 15.691 504.436 41.8728 556.102L141.364 478.604L169.64 456.96Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M384.68 152.902C441.233 152.902 491.502 172.451 531.647 210.153L641.611 100.189C574.935 38.0509 488.36 0 384.68 0C234.571 0 105.058 86.2255 41.8728 211.898L169.64 311.04C200.011 220.276 284.84 152.902 384.68 152.902Z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-full border-neutral-200 hover:bg-neutral-50 text-sm bg-white/80 backdrop-blur-sm"
                onClick={() => handleSocialSignIn('wechat')}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 800 800"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3668_300)">
                    <path
                      fill="#2DC100"
                      d="M800 680c0 66.277-53.725 120-120 120H120C53.723 800 0 746.277 0 680V120C0 53.725 53.725 0 120 0h560c66.275 0 120 53.725 120 120z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M535.476 298.345c-64.568 3.373-120.715 22.946-166.299 67.167-46.056 44.678-67.08 99.425-61.333 167.291-25.238-3.125-48.224-6.565-71.342-8.512-7.984-.672-17.458.283-24.221 4.099-22.448 12.667-43.968 26.968-69.475 42.912 4.68-21.168 7.71-39.704 13.072-57.533 3.944-13.104 2.118-20.398-9.954-28.931-77.51-54.723-110.182-136.619-85.731-220.933 22.621-78 78.173-125.304 153.656-149.963 103.027-33.653 218.811.675 281.459 82.472 22.626 29.547 36.501 62.709 40.168 101.931M238.31 272.073c.595-15.422-12.768-29.315-28.64-29.779-16.25-.477-29.616 11.941-30.09 27.955-.48 16.229 11.933 29.234 28.301 29.65 16.227.411 29.829-12.024 30.429-27.826m155.043-29.79c-15.931.294-29.392 13.862-29.109 29.344.29 16.048 13.496 28.603 29.877 28.406 16.424-.198 28.88-12.886 28.725-29.272-.136-16.086-13.282-28.774-29.493-28.478"
                    ></path>
                    <path
                      fill="#fff"
                      d="M680.538 700.878c-20.446-9.104-39.2-22.762-59.168-24.848-19.891-2.077-40.8 9.398-61.611 11.526-63.389 6.485-120.179-11.182-167.005-54.486-89.059-82.373-76.334-208.677 26.704-276.181 91.576-59.995 225.877-39.995 290.442 43.251 56.344 72.64 49.723 169.066-19.061 230.09-19.904 17.662-27.067 32.195-14.296 55.478 2.357 4.298 2.627 9.741 3.995 15.17m-232.731-225.33c13.016.013 23.733-10.174 24.227-23.03.52-13.61-10.427-25.026-24.056-25.082-13.494-.062-24.798 11.514-24.328 24.922.442 12.811 11.234 23.174 24.157 23.19m150.029-48.059c-12.629-.088-23.36 10.251-23.874 23.011-.547 13.645 10.058 24.85 23.562 24.885 13.062.043 23.382-9.835 23.856-22.832.507-13.677-10.104-24.971-23.544-25.064"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_3668_300">
                      <path fill="#fff" d="M0 0h800v800H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
                WeChat
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-full border-neutral-200 hover:bg-neutral-50 text-sm bg-white/80 backdrop-blur-sm"
                onClick={() => handleSocialSignIn('facebook')}
                disabled={isLoading}
              >
                <svg
                  className="h-6 w-6 mr-1.5"
                  width="934"
                  height="934"
                  viewBox="0 0 934 934"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_1728_218"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="934"
                    height="934"
                  >
                    <path d="M0 0.000706673H933.333V933.334H0V0.000706673Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1728_218)">
                    <path
                      d="M800 466.669C800 282.574 650.761 133.335 466.666 133.335C282.572 133.335 133.333 282.574 133.333 466.669C133.333 622.995 240.953 754.165 386.141 790.186V568.53H317.405V466.669H386.141V422.777C386.141 309.321 437.485 256.734 548.872 256.734C569.989 256.734 606.428 260.874 621.334 265.015V357.354C613.466 356.526 599.802 356.111 582.825 356.111C528.168 356.111 507.049 376.815 507.049 430.645V466.669H615.928L597.224 568.53H507.049V797.561C672.097 777.626 800 637.093 800 466.669Z"
                      fill="#0866FF"
                    />
                    <path
                      d="M597.223 568.53L615.928 466.669H507.05V430.643C507.05 376.814 528.167 356.111 582.824 356.111C599.802 356.111 613.466 356.525 621.334 357.353V265.015C606.427 260.874 569.988 256.733 548.871 256.733C437.486 256.733 386.14 309.321 386.14 422.777V466.669H317.404V568.53H386.14V790.186C411.931 796.583 438.898 800.002 466.666 800.002C480.338 800.002 493.81 799.159 507.05 797.561V568.53H597.223Z"
                      fill="white"
                    />
                  </g>
                </svg>
                Facebook
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-full border-neutral-200 hover:bg-neutral-50 text-sm bg-white/80 backdrop-blur-sm"
                onClick={() => handleSocialSignIn('microsoft')}
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 mr-2"
                  width="171"
                  height="172"
                  viewBox="0 0 171 172"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M81.1557 81.7631H0V0.607422H81.1557V81.7631Z" fill="#F1511B" />
                  <path d="M170.761 81.7631H89.6064V0.607422H170.761V81.7631Z" fill="#80CC28" />
                  <path d="M81.1534 171.399H0V90.2441H81.1534V171.399Z" fill="#00ADEF" />
                  <path d="M170.761 171.399H89.6064V90.2441H170.761V171.399Z" fill="#FBBC09" />
                </svg>
                Microsoft
              </Button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Repeating line pattern - bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[5vh] overflow-hidden flex items-start justify-center">
        <div className="flex h-full items-start gap-2">
          {Array(200)
            .fill(0)
            .map((_, i) => (
              <div
                key={`bottom-${i}`}
                className="h-full w-px bg-neutral-200 dark:bg-neutral-800"
              ></div>
            ))}
        </div>
      </div>

      <Toaster />
    </div>
  );
}

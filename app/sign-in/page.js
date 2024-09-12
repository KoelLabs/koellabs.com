'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import React from 'react';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen dark:bg-neutral-950/[0.99] ">
      <div className="flex items-center justify-center py-12 dark:bg-neutral-950/[0.99]">
        <div className="mx-auto grid w-full p-4 sm:w-[405px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight ">
              <span className="relative mr-1 ml-6 text-transparent bg-clip-text bg-gradient-to-br from-black via-black to-sky-600 dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-100">
                {' '}
                <svg
                  className="h-10 w-10 absolute -left-10 -mt-1 hidden dark:inline"
                  width="870"
                  height="870"
                  viewBox="0 0 870 870"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {' '}
                  <rect
                    x="671.179"
                    y="403"
                    width="214"
                    height="429"
                    rx="107"
                    transform="rotate(90 671.179 403)"
                    fill="url(#paint0_linear_1720_505)"
                    fillOpacity="0.6"
                  />{' '}
                  <rect
                    x="652.67"
                    y="662.406"
                    width="214"
                    height="429"
                    rx="107"
                    transform="rotate(135 652.67 662.406)"
                    fill="url(#paint1_linear_1720_505)"
                    fillOpacity="0.6"
                  />{' '}
                  <rect
                    x="671.179"
                    y="403"
                    width="214"
                    height="429"
                    rx="107"
                    transform="rotate(90 671.179 403)"
                    fill="url(#paint2_linear_1720_505)"
                    fillOpacity="0.6"
                  />{' '}
                  <rect
                    x="652.67"
                    y="662.406"
                    width="214"
                    height="429"
                    rx="107"
                    transform="rotate(135 652.67 662.406)"
                    fill="url(#paint3_linear_1720_505)"
                    fillOpacity="0.6"
                  />{' '}
                  <rect
                    x="671.179"
                    y="403"
                    width="214"
                    height="429"
                    rx="107"
                    transform="rotate(90 671.179 403)"
                    fill="url(#paint4_linear_1720_505)"
                    fillOpacity="0.6"
                  />{' '}
                  <rect
                    x="652.67"
                    y="662.406"
                    width="214"
                    height="429"
                    rx="107"
                    transform="rotate(135 652.67 662.406)"
                    fill="url(#paint5_linear_1720_505)"
                    fillOpacity="0.6"
                  />{' '}
                  <path
                    d="M283.332 374.002C227.928 353.446 177.024 227.365 179.285 221.271C181.546 215.177 302.368 152.81 357.772 173.366C413.176 193.922 441.426 255.5 420.87 310.904C400.314 366.308 338.736 394.558 283.332 374.002Z"
                    fill="white"
                  />{' '}
                  <defs>
                    {' '}
                    <linearGradient
                      id="paint0_linear_1720_505"
                      x1="778.179"
                      y1="403"
                      x2="778.179"
                      y2="832"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5" /> <stop offset="1" stopColor="white" />{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint1_linear_1720_505"
                      x1="759.67"
                      y1="662.406"
                      x2="759.67"
                      y2="1091.41"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5" /> <stop offset="1" stopColor="white" />{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint2_linear_1720_505"
                      x1="778.179"
                      y1="403"
                      x2="778.179"
                      y2="832"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5" /> <stop offset="1" stopColor="white" />{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint3_linear_1720_505"
                      x1="759.67"
                      y1="662.406"
                      x2="759.67"
                      y2="1091.41"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5" /> <stop offset="1" stopColor="white" />{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint4_linear_1720_505"
                      x1="778.179"
                      y1="403"
                      x2="778.179"
                      y2="832"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5" /> <stop offset="1" stopColor="white" />{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint5_linear_1720_505"
                      x1="759.67"
                      y1="662.406"
                      x2="759.67"
                      y2="1091.41"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5" /> <stop offset="1" stopColor="white" />{' '}
                    </linearGradient>{' '}
                  </defs>{' '}
                </svg>{' '}
                <svg
                  className="h-10 w-10 absolute -left-10 -mt-1 dark:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  width="870"
                  height="870"
                  fill="none"
                  viewBox="0 0 870 870"
                >
                  {' '}
                  <rect
                    width="214"
                    height="429"
                    x="671.179"
                    y="403"
                    fill="url(#paint0_linear_1691_806)"
                    fillOpacity="0.6"
                    rx="107"
                    transform="rotate(90 671.179 403)"
                  ></rect>{' '}
                  <rect
                    width="214"
                    height="429"
                    x="652.67"
                    y="662.406"
                    fill="url(#paint1_linear_1691_806)"
                    fillOpacity="0.6"
                    rx="107"
                    transform="rotate(135 652.67 662.406)"
                  ></rect>{' '}
                  <rect
                    width="214"
                    height="429"
                    x="671.179"
                    y="403"
                    fill="url(#paint2_linear_1691_806)"
                    fillOpacity="0.6"
                    rx="107"
                    transform="rotate(90 671.179 403)"
                  ></rect>{' '}
                  <rect
                    width="214"
                    height="429"
                    x="652.67"
                    y="662.406"
                    fill="url(#paint3_linear_1691_806)"
                    fillOpacity="0.6"
                    rx="107"
                    transform="rotate(135 652.67 662.406)"
                  ></rect>{' '}
                  <rect
                    width="214"
                    height="429"
                    x="671.179"
                    y="403"
                    fill="url(#paint4_linear_1691_806)"
                    fillOpacity="0.6"
                    rx="107"
                    transform="rotate(90 671.179 403)"
                  ></rect>{' '}
                  <rect
                    width="214"
                    height="429"
                    x="652.67"
                    y="662.406"
                    fill="url(#paint5_linear_1691_806)"
                    fillOpacity="0.6"
                    rx="107"
                    transform="rotate(135 652.67 662.406)"
                  ></rect>{' '}
                  <path
                    fill="#000"
                    d="M283.332 374.002c-55.404-20.556-106.308-146.637-104.047-152.731 2.261-6.094 123.083-68.461 178.487-47.905 55.404 20.556 83.654 82.134 63.098 137.538-20.556 55.404-82.134 83.654-137.538 63.098z"
                  ></path>{' '}
                  <defs>
                    {' '}
                    <linearGradient
                      id="paint0_linear_1691_806"
                      x1="778.179"
                      x2="778.179"
                      y1="403"
                      y2="832"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5"></stop> <stop offset="1"></stop>{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint1_linear_1691_806"
                      x1="759.67"
                      x2="759.67"
                      y1="662.406"
                      y2="1091.41"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5"></stop> <stop offset="1"></stop>{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint2_linear_1691_806"
                      x1="778.179"
                      x2="778.179"
                      y1="403"
                      y2="832"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5"></stop> <stop offset="1"></stop>{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint3_linear_1691_806"
                      x1="759.67"
                      x2="759.67"
                      y1="662.406"
                      y2="1091.41"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5"></stop> <stop offset="1"></stop>{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint4_linear_1691_806"
                      x1="778.179"
                      x2="778.179"
                      y1="403"
                      y2="832"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5"></stop> <stop offset="1"></stop>{' '}
                    </linearGradient>{' '}
                    <linearGradient
                      id="paint5_linear_1691_806"
                      x1="759.67"
                      x2="759.67"
                      y1="662.406"
                      y2="1091.41"
                      gradientUnits="userSpaceOnUse"
                    >
                      {' '}
                      <stop stopColor="#317EC5"></stop> <stop offset="1"></stop>{' '}
                    </linearGradient>{' '}
                  </defs>{' '}
                </svg>
                Koel Login
              </span>
            </h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                className="dark:text-white"
                placeholder="diana@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center dark:text-white">
                <Label htmlFor="password" className="dark:text-white">
                  Password
                </Label>
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                className="dark:text-white"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full dark:text-white bg-gradient-to-br py-0 border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-800 to-blue-950 dark:outline-black/50 dark:from-sky-600 dark:to-blue-800"
              type="submit"
            >
              Login
            </Button>
            <div className="flex flex-row gap-2 items-center">
              <div className="h-0.5 bg-neutral-200 dark:bg-neutral-800 w-full"></div>
              <p className="xss:w-[338px] text-sm text-neutral-500 dark:text-neutral-300">
                <span className="">Or</span>
                <span className="hidden xss:inline"> continue with</span>
              </p>
              <div className="h-0.5 bg-neutral-200 dark:bg-neutral-800 w-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Button className="w-full bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white">
                <svg
                  className="h-5 w-5 mr-1.5"
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
              <Button className="w-full bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white">
                <svg
                  className="h-8 w-8 mr-0.5"
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

              <Button className="w-full bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white">
                <svg
                  className="h-5 w-5 mr-2"
                  width="171"
                  height="172"
                  viewBox="0 0 171 172"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {' '}
                  <path d="M81.1557 81.7631H0V0.607422H81.1557V81.7631Z" fill="#F1511B" />{' '}
                  <path d="M170.761 81.7631H89.6064V0.607422H170.761V81.7631Z" fill="#80CC28" />{' '}
                  <path d="M81.1534 171.399H0V90.2441H81.1534V171.399Z" fill="#00ADEF" />{' '}
                  <path d="M170.761 171.399H89.6064V90.2441H170.761V171.399Z" fill="#FBBC09" />{' '}
                </svg>
                Microsoft
              </Button>

              <Button className="w-full bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="814"
                  height="1000"
                  fill="none"
                  className="h-5 w-5 mr-1.5 -mt-1"
                  viewBox="0 0 814 1000"
                >
                  {' '}
                  <g clipPath="url(#clip0_1755_216)">
                    {' '}
                    <path
                      fill="#000"
                      d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
                    ></path>{' '}
                  </g>{' '}
                  <defs>
                    {' '}
                    <clipPath id="clip0_1755_216">
                      {' '}
                      <path fill="#fff" d="M0 0H814V1000H0z"></path>{' '}
                    </clipPath>{' '}
                  </defs>{' '}
                </svg>
                Apple
              </Button>
            </div>
          </div>
          <div className="mt- text-center text-sm dark:text-white">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative rounded-xl m-4 overflow-hidden dark:bg-neutral-900/[0.25]">
        <div className="mx-auto absolute top-0 left-0 right-0 bottom-0 h-full flex justify-between z-[10] rotate-45 scale-[1.35]">
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops2"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-900 drops4"></div>
        </div>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import MobileDrawer from './1 - mobile-drawer.jsx';
import { Button } from '@/components/ui/base/button';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/base/context-menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Dialog, DialogPanel } from '@headlessui/react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  // { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  var path = usePathname();

  var firstPath = '/' + (path?.split('/')?.[1] || '');

  if (firstPath === '/') {
    firstPath = '/';
    path = '/';
  }

  return (
    <header className="overflow-hidden h-fit w-full text-black bg-neutral-100/90 backdrop-blur-md border border-neutral-200">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-6xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="text-2xl font-semibold  tracking-[-0.04em] flex justify-center">
            <svg
              className="h-10 w-10 -mt-1.5"
              xmlns="http://www.w3.org/2000/svg"
              width="870"
              height="870"
              fill="none"
              viewBox="0 0 870 870"
            >
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint0_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint1_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint2_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint3_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint4_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint5_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <path
                fill="#000"
                d="M283.332 374.002c-55.404-20.556-106.308-146.637-104.047-152.731 2.261-6.094 123.083-68.461 178.487-47.905 55.404 20.556 83.654 82.134 63.098 137.538-20.556 55.404-82.134 83.654-137.538 63.098z"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint4_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint5_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
            Koel{' '}
            <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-br from-black via-sky-950 to-sky-500">
              Labs
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <ul className="flex items-center gap-x-5">
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <a
                  className={
                    firstPath.toLowerCase() === href.toLowerCase()
                      ? 'text-black'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }
                  href={href}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <Button variant="outline" className="">
            <Link href="sign-in">Sign In</Link>
            <kbd className="-me-1 ms-3 inline-flex w-5 justify-center h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70 -ml-1">
              L
            </kbd>
          </Button> */}
          <Link href="#join-the-waitlist">
            <Button className=" bg-gradient-to-b py-0 px-6 rounded-lg border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
              Join the Waitlist
            </Button>
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-semibold  tracking-[-0.04em] flex justify-center">
              <svg
                className="h-10 w-10 -mt-1.5"
                xmlns="http://www.w3.org/2000/svg"
                width="870"
                height="870"
                fill="none"
                viewBox="0 0 870 870"
              >
                <rect
                  width="214"
                  height="429"
                  x="671.179"
                  y="403"
                  fill="url(#paint0_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(90 671.179 403)"
                ></rect>
                <rect
                  width="214"
                  height="429"
                  x="652.67"
                  y="662.406"
                  fill="url(#paint1_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(135 652.67 662.406)"
                ></rect>
                <rect
                  width="214"
                  height="429"
                  x="671.179"
                  y="403"
                  fill="url(#paint2_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(90 671.179 403)"
                ></rect>
                <rect
                  width="214"
                  height="429"
                  x="652.67"
                  y="662.406"
                  fill="url(#paint3_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(135 652.67 662.406)"
                ></rect>
                <rect
                  width="214"
                  height="429"
                  x="671.179"
                  y="403"
                  fill="url(#paint4_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(90 671.179 403)"
                ></rect>
                <rect
                  width="214"
                  height="429"
                  x="652.67"
                  y="662.406"
                  fill="url(#paint5_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(135 652.67 662.406)"
                ></rect>
                <path
                  fill="#000"
                  d="M283.332 374.002c-55.404-20.556-106.308-146.637-104.047-152.731 2.261-6.094 123.083-68.461 178.487-47.905 55.404 20.556 83.654 82.134 63.098 137.538-20.556 55.404-82.134 83.654-137.538 63.098z"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_1691_806"
                    x1="778.179"
                    x2="778.179"
                    y1="403"
                    y2="832"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1691_806"
                    x1="759.67"
                    x2="759.67"
                    y1="662.406"
                    y2="1091.41"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_1691_806"
                    x1="778.179"
                    x2="778.179"
                    y1="403"
                    y2="832"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_1691_806"
                    x1="759.67"
                    x2="759.67"
                    y1="662.406"
                    y2="1091.41"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_1691_806"
                    x1="778.179"
                    x2="778.179"
                    y1="403"
                    y2="832"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_1691_806"
                    x1="759.67"
                    x2="759.67"
                    y1="662.406"
                    y2="1091.41"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                </defs>
              </svg>
              Koel{' '}
              <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-br from-black via-sky-950 to-sky-500">
                Labs
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <ul className="flex flex-col gap-y-2">
                  {links.map(({ href, label }) => (
                    <a
                      className={
                        firstPath.toLowerCase() === href.toLowerCase()
                          ? 'text-black'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }
                      href={href}
                      key={`${href}${label}`}
                    >
                      <li className="w-full p-2 rounded-lg hover:bg-neutral-100">{label}</li>
                    </a>
                  ))}
                </ul>
              </div>
              <div className="py-6">
                {/* <Button variant="outline" className="">
            <Link href="sign-in">Sign In</Link>
            <kbd className="-me-1 ms-3 inline-flex w-5 justify-center h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70 -ml-1">
              L
            </kbd>
          </Button> */}
                <Link href="#join-the-waitlist">
                  <Button className="w-full bg-gradient-to-b py-0 px-6 rounded-lg border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
                    Join the Waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

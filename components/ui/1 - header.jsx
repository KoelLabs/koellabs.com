'use client';
import React from 'react';
import { ContactDialog } from './1 - contact-dialog.jsx';
import MobileDrawer from './1 - mobile-drawer.jsx';
import { Button } from '@/components/ui/base/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from '@/components/ui/base/context-menu';
import { Code, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  // { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  var path = usePathname();

  var firstPath = '/' + (path?.split('/')?.[1] || null);

  if (path === '') {
    path = 'home';
  }

  return (
    <header className="overflow-hidden h-fit w-full text-black bg-neutral-100/90 backdrop-blur-md border border-neutral-200">
      <nav className="flex justify-between items-center max-w-[1090px] px-8 w-full py-6 mx-auto">
        <ContextMenu>
          <ContextMenuTrigger>
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
          </ContextMenuTrigger>
          {/* <ContextMenuContent className="w-full p-1 flex flex-col">
            <button onClick={handleClickLogo}>
              <ContextMenuItem className="text-neutral-900 tracking-tight text-sm font-medium">
                <Copy className="mr-3 h-5 w-5" />
                Copy Logo as SVG
              </ContextMenuItem>
            </button>
            <button onClick={handleClickBrandmark}>
              <ContextMenuItem className="text-neutral-900 tracking-tight text-sm font-medium">
                {' '}
                <svg
                  className="mr-2 h-6 w-6"
                  width="493"
                  height="601"
                  viewBox="0 0 493 601"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {' '}
                  <rect
                    x="479.179"
                    y="247"
                    width="188"
                    height="403"
                    rx="94.0001"
                    transform="rotate(90 479.179 247)"
                    stroke="black"
                    stroke-width="40"
                  />{' '}
                  <rect
                    x="455.285"
                    y="493.406"
                    width="188"
                    height="403"
                    rx="94.0001"
                    transform="rotate(135 455.285 493.406)"
                    stroke="black"
                    stroke-width="40"
                  />{' '}
                  <path
                    d="M108.854 192.813C98.1134 188.828 86.3026 179.102 74.3071 164.925C62.5107 150.984 51.4888 133.887 42.0472 116.898C32.6292 99.9516 24.9668 83.4451 19.8286 70.8909C17.6616 65.5965 15.9875 61.1119 14.8314 57.6678C17.9542 55.8112 22.1483 53.5038 27.2441 50.904C39.3274 44.7394 55.902 37.2253 74.094 30.523C92.3318 23.8038 111.838 18.0333 129.873 15.1601C148.212 12.2384 163.509 12.5691 174.25 16.5541C222.923 34.6126 247.74 88.709 229.682 137.382C211.623 186.054 157.527 210.872 108.854 192.813Z"
                    stroke="black"
                    stroke-width="40"
                  />{' '}
                </svg>
                Copy Brandmark as SVG
              </ContextMenuItem>
            </button>
          </ContextMenuContent> */}
        </ContextMenu>

        <ul className="md:flex justify-between items-center gap-6 hidden -pr-12">
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
        <div className="md:hidden">
          <MobileDrawer className="" />
        </div>
        <div className="md:flex gap-2 hidden">
          {/* <Button variant="outline" className="">
            <Link href="sign-in">Sign In</Link>
            <kbd className="-me-1 ms-3 inline-flex w-5 justify-center h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70 -ml-1">
              L
            </kbd>
          </Button> */}
          <Button className=" bg-gradient-to-b py-0 px-6 rounded-lg border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
            Join the Waitlist
          </Button>
        </div>
      </nav>
    </header>
  );
}

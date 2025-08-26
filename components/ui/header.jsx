'use client';

import React, { createContext, useId, useState } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { useScroll } from '@/lib/hooks/use-scroll';
import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper';
import { Button } from '@/components/ui/base/button';

export const NavContext = createContext({ theme: 'light' });

const navItems = [
  {
    name: 'Home',
    href: '/',
    segments: ['/'],
  },
  {
    name: 'About',
    href: '/about',
    segments: ['/about'],
  },
  {
    name: 'Blog',
    href: '/blog',
    segments: ['/blog'],
  },
  {
    name: 'Contact',
    href: '/contact',
    segments: ['/contact'],
  },
];

const navItemClassName = cn(
  'relative group/item flex items-center rounded-md px-4 py-2 text-sm rounded-lg font-medium text-neutral-700 hover:text-neutral-900 transition-colors',
  'hover:bg-neutral-900/5 dark:hover:bg-white/10',
  'data-[active=true]:bg-neutral-900/5 dark:data-[active=true]:bg-white/10',
  'group-has-[:hover]:data-[active=true]:[&:not(:hover)]:bg-transparent',
);

function LogoComponent() {
  return (
    <Link href="/" className="text-2xl font-semibold tracking-[-0.04em] flex justify-center">
      <svg
        width="770"
        height="859"
        viewBox="0 0 770 859"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mr-1 -mt-px inline-block"
      >
        <rect
          x="686.844"
          y="353.266"
          width="263.361"
          height="527.953"
          rx="131.681"
          transform="rotate(90 686.844 353.266)"
          fill="#154063"
        />
        <rect
          x="664.07"
          y="672.516"
          width="263.361"
          height="527.953"
          rx="131.681"
          transform="rotate(135 664.07 672.516)"
          fill="#3779B5"
        />
        <mask
          id="mask0_3106_273"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="158"
          y="353"
          width="529"
          height="264"
        >
          <rect
            x="686.844"
            y="353.266"
            width="263.361"
            height="527.953"
            rx="131.681"
            transform="rotate(90 686.844 353.266)"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_3106_273)">
          <rect
            x="664.07"
            y="672.516"
            width="263.361"
            height="527.953"
            rx="131.681"
            transform="rotate(135 664.07 672.516)"
            fill="#122438"
          />
        </g>
        <path
          d="M209.534 317.593C141.351 292.296 78.7053 137.133 81.4879 129.634C84.2704 122.134 232.961 45.3817 301.145 70.6792C369.328 95.9767 404.094 171.758 378.796 239.941C353.499 308.125 277.718 342.891 209.534 317.593Z"
          fill="black"
        />
      </svg>
      Koel Labs
    </Link>
  );
}

export default function Header({ theme = 'light' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const layoutGroupId = useId();
  const scrolled = useScroll(40);
  const pathname = usePathname();
  const currentPath = pathname === '/' ? '/' : `/${pathname?.split('/')?.[1] || ''}`;

  return (
    <NavContext.Provider value={{ theme }}>
      <LayoutGroup id={layoutGroupId}>
        <div
          className={cn(
            'sticky inset-x-0 top-0 z-30 w-full transition-all',
            theme === 'dark' && 'dark',
          )}
        >
          <div
            className={cn(
              'absolute inset-0 block border-b border-transparent transition-all duration-300',
              scrolled &&
                'border-neutral-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/80',
            )}
          />
          <MaxWidthWrapper className="relative">
            <div className="flex h-20 items-center justify-between">
              <div className="grow basis-0">
                <div className="block w-fit py-2 pr-2">
                  <LogoComponent />
                </div>
              </div>

              <NavigationMenuPrimitive.Root
                delayDuration={150}
                className="relative hidden lg:block"
              >
                <NavigationMenuPrimitive.List className="group relative z-0 flex">
                  {navItems.map(({ name, href, segments }) => {
                    const isActive = segments.some(segment => currentPath === segment);

                    return (
                      <NavigationMenuPrimitive.Item key={name}>
                        <Link href={href} className={navItemClassName} data-active={isActive}>
                          {name}
                        </Link>
                      </NavigationMenuPrimitive.Item>
                    );
                  })}
                </NavigationMenuPrimitive.List>
              </NavigationMenuPrimitive.Root>

              <div className="hidden grow basis-0 justify-end gap-2 lg:flex">
                <Link href="#join-the-waitlist">
                  <Button className="bg-gradient-to-b py-0 px-6 rounded-lg border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
                    Join the Waitlist
                  </Button>
                </Link>
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
            </div>
          </MaxWidthWrapper>
        </div>
      </LayoutGroup>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-semibold tracking-[-0.04em] flex justify-center"
            >
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
                />
                <rect
                  width="214"
                  height="429"
                  x="652.67"
                  y="662.406"
                  fill="url(#paint1_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(135 652.67 662.406)"
                />
                <rect
                  width="214"
                  height="429"
                  x="671.179"
                  y="403"
                  fill="url(#paint2_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(90 671.179 403)"
                />
                <rect
                  width="214"
                  height="429"
                  x="652.67"
                  y="662.406"
                  fill="url(#paint3_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(135 652.67 662.406)"
                />
                <rect
                  width="214"
                  height="429"
                  x="671.179"
                  y="403"
                  fill="url(#paint4_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(90 671.179 403)"
                />
                <rect
                  width="214"
                  height="429"
                  x="652.67"
                  y="662.406"
                  fill="url(#paint5_linear_1691_806)"
                  fillOpacity="0.6"
                  rx="107"
                  transform="rotate(135 652.67 662.406)"
                />
                <path
                  fill="#000"
                  d="M283.332 374.002c-55.404-20.556-106.308-146.637-104.047-152.731 2.261-6.094 123.083-68.461 178.487-47.905 55.404 20.556 83.654 82.134 63.098 137.538-20.556 55.404-82.134 83.654-137.538 63.098z"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1691_806"
                    x1="778.179"
                    x2="778.179"
                    y1="403"
                    y2="832"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5" />
                    <stop offset="1" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1691_806"
                    x1="759.67"
                    x2="759.67"
                    y1="662.406"
                    y2="1091.41"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5" />
                    <stop offset="1" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_1691_806"
                    x1="778.179"
                    x2="778.179"
                    y1="403"
                    y2="832"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5" />
                    <stop offset="1" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_1691_806"
                    x1="759.67"
                    x2="759.67"
                    y1="662.406"
                    y2="1091.41"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5" />
                    <stop offset="1" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_1691_806"
                    x1="778.179"
                    x2="778.179"
                    y1="403"
                    y2="832"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5" />
                    <stop offset="1" />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_1691_806"
                    x1="759.67"
                    x2="759.67"
                    y1="662.406"
                    y2="1091.41"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#317EC5" />
                    <stop offset="1" />
                  </linearGradient>
                </defs>
              </svg>
              Koel{' '}
              <span className="ml-1 text-transparent bg-clip-text bg-linear-to-br from-black via-sky-950 to-sky-500">
                Labs
              </span>
            </Link>
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
                  {navItems.map(({ href, name }) => (
                    <Link
                      className={
                        currentPath === href
                          ? 'text-black'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }
                      href={href}
                      key={`${href}${name}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <li className="w-full p-2 rounded-2xl tracking-tight hover:bg-neutral-100">
                        {name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="py-6">
                <Link href="#join-the-waitlist" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-b py-0 px-6 rounded-lg border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
                    Join the Waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </NavContext.Provider>
  );
}

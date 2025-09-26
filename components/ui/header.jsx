'use client';

import React, { createContext, useId, useState } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { LayoutGroup, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, SquareChevronRight, SquareLibrary, SquareUserRound, X } from 'lucide-react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { cn } from '@/lib/styles';
import { useScroll } from '@/lib/hooks/use-scroll';
import { Button } from '@/components/ui/base/button';

export const NavContext = createContext({ theme: 'light' });

function AboutContent() {
  return (
    <div className="w-[400px] transform-gpu bg-neutral-100 ring-1">
      <div className="-space-y-0.5 p-2 bg-white rounded-xl border-b">
        <Link
          href="/about"
          prefetch={true}
          className="group rounded-xl transition-colors p-2 hover:bg-neutral-50 flex items-center gap-2"
        >
          <div className="flex items-center gap-2 border p-3 rounded-lg text-neutral-600 justify-center size-12 bg-white">
            <SquareUserRound className="size-8" />
          </div>
          <div className="flex flex-col ml-1.5">
            <div className="font-medium text-sm text-neutral-900">Team</div>
            <div className="text-sm text-neutral-500 mt-0.5">Our mission, team, and values</div>
          </div>
        </Link>
        <Link
          href="/blog"
          prefetch={true}
          className="group rounded-xl transition-colors p-2 hover:bg-neutral-50 flex items-center gap-2"
        >
          <div className="flex items-center gap-2 border p-3 rounded-lg text-neutral-600 size-12 bg-white">
            <SquareLibrary className="size-8" />
          </div>
          <div className="flex flex-col ml-1.5">
            <div className="font-medium text-sm text-neutral-900">Blog</div>
            <div className="text-sm text-neutral-500 mt-0.5">Latest insights and updates</div>
          </div>
        </Link>
        <Link
          href="/contact"
          prefetch={true}
          className="group rounded-xl transition-colors p-2 hover:bg-neutral-50 flex items-center gap-2"
        >
          <div className="flex items-center gap-2 border p-3 rounded-lg text-neutral-600 size-12 bg-white">
            <SquareChevronRight className="size-8" />
          </div>
          <div className="flex flex-col ml-1.5">
            <div className="font-medium text-sm text-neutral-900">Contact</div>
            <div className="text-sm text-neutral-500 mt-0.5">Get in touch with our team</div>
          </div>
        </Link>
      </div>
      {/* <div className="h-fit w-full bg-neutral-100">
        <Link
          href="/blog"
          className="group rounded-xl transition-colors p-2 hover:bg-neutral-50 flex items-center gap-2"
        >
          <div className="flex items-center gap-2 border p-3 rounded-2xl text-neutral-600 w-full h-12 mb-0.5 bg-white">
            <p className="text-xs font-medium">We are building a pronunciation platform</p>
          </div>
        </Link>
      </div> */}
    </div>
  );
}

function AnimatedChevron(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="9"
      fill="none"
      viewBox="0 0 9 9"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.278 3.389 4.5 6.167 1.722 3.389"
        className="transition-transform duration-150 [transform-box:view-box] [transform-origin:center] [vector-effect:non-scaling-stroke] group-data-[state=open]/item:-scale-y-100"
      />
    </svg>
  );
}

function WithTrigger({ trigger, children }) {
  return trigger ? (
    <NavigationMenuPrimitive.Trigger asChild>{children}</NavigationMenuPrimitive.Trigger>
  ) : (
    children
  );
}

const navItems = [
  {
    name: 'Home',
    href: '/',
    segments: ['/'],
  },
  {
    name: 'Previews',
    href: '/previews',
    segments: ['/previews'],
  },
  {
    name: 'Research',
    href: '/research',
    segments: ['/research'],
  },
  {
    name: 'About',
    content: AboutContent,
    segments: ['/about', '/blog', '/contact'],
  },
];

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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [previousHoveredItem, setPreviousHoveredItem] = useState(null);
  const layoutGroupId = useId();
  const scrolled = useScroll(20);
  const pathname = usePathname();
  const currentPath = pathname === '/' ? '/' : `/${pathname?.split('/')?.[1] || ''}`;

  const activeItem = navItems.find(({ segments }) =>
    segments.some(segment => currentPath === segment),
  );

  const handleItemHover = itemName => {
    setPreviousHoveredItem(hoveredItem || activeItem?.name);
    setHoveredItem(itemName);
  };

  const handleItemLeave = () => {
    setPreviousHoveredItem(hoveredItem);
    setHoveredItem(null);
  };

  const backgroundItem = hoveredItem || activeItem?.name;

  return (
    <NavContext.Provider value={{ theme }}>
      <LayoutGroup id={layoutGroupId}>
        <div
          className={cn(
            'sticky inset-x-0 top-0 z-[60] w-full transition-all',
            theme === 'dark' && 'dark',
          )}
        >
          <div
            className={cn(
              'absolute inset-0 block border-b border-transparent transition-all duration-300 z-[50]',
              scrolled &&
                'border-neutral-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/80',
            )}
          />
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 relative z-[50]">
            <div className="flex h-20 items-center justify-between z-[50] relative">
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
                  {navItems.map(({ name, href, segments, content: Content }, index) => {
                    const isActive = segments.some(segment => currentPath === segment);
                    const isHovered = hoveredItem === name;
                    const hasBackground = backgroundItem === name;
                    const currentIndex = index;
                    const previousIndex = previousHoveredItem
                      ? navItems.findIndex(item => item.name === previousHoveredItem)
                      : activeItem
                        ? navItems.findIndex(item => item.name === activeItem.name)
                        : currentIndex;

                    return (
                      <NavigationMenuPrimitive.Item
                        key={name}
                        className="relative active:scale-[97%]"
                      >
                        {hasBackground && (
                          <motion.div
                            layoutId="nav-bg"
                            className={cn(
                              'absolute inset-0 rounded-xl bg-neutral-200/30 opacity-50 ',
                            )}
                            initial={{
                              opacity: 1,
                              scale: 1,
                              x:
                                previousIndex !== currentIndex
                                  ? previousIndex > currentIndex
                                    ? 16
                                    : -16
                                  : 0,
                              y: isHovered ? -2 : 0,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              x: 0,
                              y: 0,
                            }}
                            exit={{
                              x:
                                previousIndex !== currentIndex
                                  ? previousIndex < currentIndex
                                    ? 16
                                    : -16
                                  : 0,
                              y: 2,
                            }}
                            transition={{
                              type: 'spring',
                              bounce: 0.15,
                              duration: 0.5,
                            }}
                          />
                        )}

                        <WithTrigger trigger={!!Content}>
                          {href !== undefined ? (
                            <Link
                              href={href}
                              className="relative z-10 group/item flex items-center px-4 py-2 text-sm rounded-xl font-base"
                              onMouseEnter={() => handleItemHover(name)}
                              onMouseLeave={handleItemLeave}
                            >
                              {name}
                            </Link>
                          ) : (
                            <button
                              className="relative z-10 group/item flex items-center px-4 py-2 text-sm rounded-xl font-base"
                              onMouseEnter={() => handleItemHover(name)}
                              onMouseLeave={handleItemLeave}
                            >
                              {name}
                              <AnimatedChevron className="ml-1.5 size-2.5 text-neutral-700" />
                            </button>
                          )}
                        </WithTrigger>

                        {Content && (
                          <NavigationMenuPrimitive.Content className="data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right absolute left-0 top-0">
                            <Content />
                          </NavigationMenuPrimitive.Content>
                        )}
                      </NavigationMenuPrimitive.Item>
                    );
                  })}
                </NavigationMenuPrimitive.List>

                <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2">
                  <NavigationMenuPrimitive.Viewport
                    className={cn(
                      'nav-viewport relative flex justify-start overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-lg dark:border-white/[0.15] dark:bg-black',
                      'transform-gpu will-change-[transform,width,height]',
                      'data-[state=closed]:animate-scale-out-content data-[state=open]:animate-scale-in-content',
                      'transition-[width,height] duration-300',
                      'h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]',
                    )}
                  />
                </div>
              </NavigationMenuPrimitive.Root>

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
          </div>
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
                  {navItems.map(({ href, name, content, segments }) => {
                    if (content) {
                      return (
                        <div key={name}>
                          <Link
                            className={
                              segments.some(segment => currentPath === segment)
                                ? 'text-black'
                                : 'text-neutral-500 hover:text-neutral-700'
                            }
                            href="/about"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <li className="w-full p-2 rounded-2xl tracking-tight hover:bg-neutral-100">
                              About Us
                            </li>
                          </Link>
                          <Link
                            className={
                              currentPath === '/blog'
                                ? 'text-black'
                                : 'text-neutral-500 hover:text-neutral-700'
                            }
                            href="/blog"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <li className="w-full p-2 pl-6 rounded-2xl tracking-tight hover:bg-neutral-100">
                              Blog
                            </li>
                          </Link>
                          <Link
                            className={
                              currentPath === '/contact'
                                ? 'text-black'
                                : 'text-neutral-500 hover:text-neutral-700'
                            }
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <li className="w-full p-2 pl-6 rounded-2xl tracking-tight hover:bg-neutral-100">
                              Contact
                            </li>
                          </Link>
                        </div>
                      );
                    }

                    return (
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
                    );
                  })}
                </ul>
              </div>
              <div className="py-6">
                <Link href="#join-the-waitlist" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-b py-0 px-6 rounded-lg border border-double outline-white/50 outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
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

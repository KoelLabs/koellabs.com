'use client';

import Hero from '@/components/sections/1 - Hero.jsx';
import Bento from '@/components/sections/2 - Bento';
import Header from '@/components/ui/header';
import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';
import HeroNew from '@/components/sections/hero';
import Research from '@/components/sections/research';
import { useEffect, useRef } from 'react';
import Models from '@/components/sections/models';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/base/carousel';

const sliderImages = [
  '/images/one.jpg',
  '/images/frontpage/9.jpg',
  '/images/frontpage/10.jpg',
  '/images/three.jpg',
  '/images/frontpage/2.jpg',
  '/images/frontpage/3.jpg',
];

export default function Home() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const lastXRef = useRef(null);
  const lastYRef = useRef(null);

  // this is the moving around magic highlighter that follows the cursor around the page

  const isMobilePointer = () =>
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
    (typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches);

  const DEFAULTS = {
    size: 400,
    color: '#0086FF',
    opacity: 1,
  };

  const readAttrsFromElement = el => {
    if (!el || !el.getAttribute) return DEFAULTS;
    const sizeAttr = el.getAttribute('data-cursor-size');
    const opacityAttr = el.getAttribute('data-cursor-opacity');
    const colorAttr = el.getAttribute('data-cursor-color');
    return {
      size: Number.parseInt(sizeAttr || `${DEFAULTS.size}`, 10) || DEFAULTS.size,
      opacity: Number.isNaN(Number.parseFloat(opacityAttr))
        ? DEFAULTS.opacity
        : Math.max(0, Math.min(1, Number.parseFloat(opacityAttr))),
      color: colorAttr || DEFAULTS.color,
    };
  };

  const findAttrsForTarget = target => {
    if (target && target.closest) {
      const el = target.closest('[data-cursor-size],[data-cursor-opacity],[data-cursor-color]');
      if (el) return readAttrsFromElement(el);
    }
    return DEFAULTS;
  };

  const updateCursorFromPoint = (clientX, clientY, attrs) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.backgroundColor = attrs.color;
    cursor.style.width = `${attrs.size}px`;
    cursor.style.height = `${attrs.size}px`;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = cursor.offsetWidth || attrs.size;
    const height = cursor.offsetHeight || attrs.size;
    const halfW = width / 2;
    const halfH = height / 2;
    const cx = Math.min(Math.max(clientX, halfW), vw - halfW);
    const cy = Math.min(Math.max(clientY, halfH), vh - halfH);
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    cursor.style.opacity = `${attrs.opacity}`;
  };

  const handleMouseMove = e => {
    if (isMobilePointer()) return;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    const attrs = findAttrsForTarget(e.target);
    updateCursorFromPoint(e.clientX, e.clientY, attrs);
  };

  const handleMouseLeave = () => {
    if (isMobilePointer()) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.opacity = '0';
  };

  useEffect(() => {
    if (isMobilePointer()) {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.display = 'none';
      return;
    }
    const handleScrollOrResize = () => {
      const x = lastXRef.current;
      const y = lastYRef.current;
      if (x == null || y == null) return;
      const el = document.elementFromPoint(x, y);
      const attrs = findAttrsForTarget(el);
      updateCursorFromPoint(x, y, attrs);
    };
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-col flex w-screen relative scroll-smooth"
    >
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 w-[400px] h-[400px] rounded-2xl bg-[#0086FF] mix-blend-color blur-3xl opacity-0 transition-opacity duration-150 z-[70] will-change-transform hidden md:block transition-colors"
      />
      <div className="z-100 sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <HeroNew />
      <div data-cursor-size="100" className="z-0 relative">
        <Research />
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-b">
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
      <div
        data-cursor-size="100"
        className="mx-auto md:px-6 lg:px-8 py-16 w-full bg-white z-[0] relative overflow-hidden flex items-center justify-center"
      >
        {Array(90)
          .fill(0)
          .map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="h-px w-full absolute top-3 left-0 bg-neutral-400 z-[-1] animate-pulse infinite duration-1500"
              style={{
                transform: `translateY(${i * 10}px)`,
                animationDelay: `${i * 500}ms`,
              }}
            ></div>
          ))}

        <div className="w-full h-full bg-radial from-transparent to-white via-white via-63% z-[0] absolute top-0 left-0 pointer-events-none"></div>
        <div
          data-cursor-size="100"
          className="mx-auto max-w-5xl w-full p-2 border rounded-3xl bg-white z-[5] relative min-w-[500px] "
        >
          <Carousel
            opts={{ loop: true, align: 'start' }}
            className="overflow-hidden rounded-2xl"
            plugins={[Autoplay({ delay: 5000 })]}
          >
            <CarouselContent>
              {sliderImages.map((src, i) => (
                <CarouselItem key={i}>
                  <div className="relative aspect-video w-full overflow-hidden border rounded-2xl bg-white">
                    <Image
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      className="object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-150"
                      data-cursor-size="1"
                      sizes="(min-width: 1024px) 768px, 100vw"
                      priority={i === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div data-cursor-size="100" className="z-0 relative">
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-t">
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
        <Models />
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50">
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
      {/* <CTA />
      <Footer /> */}
    </div>
  );
}

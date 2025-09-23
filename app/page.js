'use client';

import Hero from '@/components/sections/1 - Hero.jsx';
import Bento from '@/components/sections/2 - Bento';
import Header from '@/components/ui/header';
import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';
import HeroNew from '@/components/sections/hero';
import Research from '@/components/sections/research';
import { useEffect, useRef, useState } from 'react';
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
import Previews from '@/components/sections/previews';

const sliderImages = [
  '/images/frontpage/9.jpg',
  '/images/one.jpg',
  '/images/frontpage/10.jpg',
  '/images/frontpage/2.jpg',
  '/images/three.jpg',
  '/images/frontpage/3.jpg',
];

export default function Home() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const lastXRef = useRef(null);
  const lastYRef = useRef(null);
  const collisionElementsRef = useRef(null);
  const [emblaApi, setEmblaApi] = useState(null);
  const [selectedSnap, setSelectedSnap] = useState(0);

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
    // clamp to viewport first (same behavior as edges)
    let cx = Math.min(Math.max(clientX, halfW), vw - halfW);
    let cy = Math.min(Math.max(clientY, halfH), vh - halfH);

    // lazily cache elements that request collision
    if (collisionElementsRef.current == null) {
      collisionElementsRef.current = Array.from(
        document.querySelectorAll('[data-cursor-collision="true"]'),
      );
    }

    const elements = collisionElementsRef.current || [];
    if (elements.length) {
      let adjusted = true;
      let safety = 0;
      while (adjusted && safety < 4) {
        adjusted = false;
        safety += 1;
        for (let i = 0; i < elements.length; i += 1) {
          const el = elements[i];
          if (!el || !el.getBoundingClientRect) continue;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;
          const overlapsX = cx + halfW > rect.left && cx - halfW < rect.right;
          const overlapsY = cy + halfH > rect.top && cy - halfH < rect.bottom;
          if (overlapsX && overlapsY) {
            const pushLeft = cx + halfW - rect.left; // move left by this
            const pushRight = rect.right - (cx - halfW); // move right by this
            const pushUp = cy + halfH - rect.top; // move up by this
            const pushDown = rect.bottom - (cy - halfH); // move down by this

            // choose the smallest push to exit rect
            const minPush = Math.min(pushLeft, pushRight, pushUp, pushDown);
            if (minPush === pushLeft) {
              cx = rect.left - halfW - 0.5;
            } else if (minPush === pushRight) {
              cx = rect.right + halfW + 0.5;
            } else if (minPush === pushUp) {
              cy = rect.top - halfH - 0.5;
            } else {
              cy = rect.bottom + halfH + 0.5;
            }

            // keep within viewport after adjustment
            cx = Math.min(Math.max(cx, halfW), vw - halfW);
            cy = Math.min(Math.max(cy, halfH), vh - halfH);
            adjusted = true;
          }
        }
      }
    }

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
    // reset cached collision elements on DOM changes that commonly affect layout
    const handleScrollOrResize = () => {
      const x = lastXRef.current;
      const y = lastYRef.current;
      if (x == null || y == null) return;
      const el = document.elementFromPoint(x, y);
      const attrs = findAttrsForTarget(el);
      updateCursorFromPoint(x, y, attrs);
      // viewport/layout changes may add/remove collision nodes
      collisionElementsRef.current = null;
    };
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedSnap(emblaApi.selectedScrollSnap());
    };
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);
  const centerIndex = (selectedSnap + 1) % sliderImages.length;
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
      <div
        data-cursor-opacity="0.3"
        data-cursor-size="240"
        className="z-100 sticky top-0 mx-auto w-full"
      >
        <Header />
      </div>
      <HeroNew />
      <div
        data-cursor-opacity="0.8"
        data-cursor-size="240"
        data-cursor-color="#2A4BCC"
        className="z-0 relative"
      >
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
        data-cursor-opacity="0.8"
        data-cursor-size="240"
        data-cursor-color="#2A4BCC"
        className="mx-auto md:px-6 lg:px-8 py-12 w-full bg-white z-[0] relative overflow-hidden flex items-center justify-center"
      >
        <div className="w-full h-full bg-radial from-transparent to-white via-white via-63% z-[0] absolute top-0 left-0 pointer-events-none"></div>
        <div
          data-cursor-opacity="0.8"
          data-cursor-size="240"
          data-cursor-color="#2A4BCC"
          className="mx-auto w-full scale-110 lg:scale-105 flex justify-center items-center rounded-3xl bg-white z-[5] relative min-w-[500px] "
        >
          <Carousel
            opts={{ loop: true, align: 'start' }}
            className="overflow-visible rounded-2xl w-full"
            plugins={[Autoplay({ delay: 5000 })]}
            setApi={setEmblaApi}
          >
            <CarouselContent className="overflow-visible" overflowVisible>
              {sliderImages.map((src, i) => (
                <CarouselItem key={i} className="lg:basis-1/3 p-[8px] border ml-2 rounded-[20px]">
                  <div className="relative aspect-video w-full overflow-hidden ring-1 ring-neutral-200 rounded-[12px] bg-white">
                    <Image
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      width={700}
                      height={600}
                      quality={25}
                      className="object-cover rounded-lg object-right-bottom grayscale transition-all duration-150"
                      priority={i === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div
        data-cursor-opacity="0.8"
        data-cursor-size="240"
        data-cursor-color="#2A4BCC"
        className="z-0 relative"
      >
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
      </div>
      <div
        data-cursor-opacity="0.8"
        data-cursor-size="240"
        data-cursor-color="#2A4BCC"
        className="z-0 relative"
      >
        <Previews />
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
      <div className="w-full relative">
        <CTA />
      </div>
      <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
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

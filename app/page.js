'use client';

import Hero from '@/components/sections/1 - Hero.jsx';
import Bento from '@/components/sections/2 - Bento';
import Header from '@/components/ui/header';
import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';
import HeroNew from '@/components/sections/hero';
import Models from '@/components/sections/models';
import { useEffect, useRef } from 'react';

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
        className="pointer-events-none fixed left-0 top-0 w-[400px] h-[400px] rounded-2xl bg-[#0086FF] mix-blend-color blur-3xl opacity-0 transition-opacity duration-150 z-[70] will-change-transform hidden md:block"
      />
      <div className="z-100 sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <HeroNew />
      <div className="z-0 relative">
        <Models />
      </div>
      {/* <CTA />
      <Footer /> */}
    </div>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';

type MagicHighlighterProps = {
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
};

const DEFAULTS = {
  size: 400,
  color: '#0086FF',
  opacity: 1,
};

function isMobilePointer(): boolean {
  if (typeof navigator !== 'undefined' && (navigator as any).maxTouchPoints > 0) return true;
  if (
    typeof window !== 'undefined' &&
    (window as any).matchMedia &&
    (window as any).matchMedia('(pointer: coarse)').matches
  )
    return true;
  return false;
}

function readAttrsFromElement(el: Element | null) {
  if (!el || !(el as HTMLElement).getAttribute) return DEFAULTS;
  const sizeAttr = (el as HTMLElement).getAttribute('data-cursor-size');
  const opacityAttr = (el as HTMLElement).getAttribute('data-cursor-opacity');
  const colorAttr = (el as HTMLElement).getAttribute('data-cursor-color');
  return {
    size: Number.parseInt(sizeAttr || `${DEFAULTS.size}`, 10) || DEFAULTS.size,
    opacity: Number.isNaN(Number.parseFloat(opacityAttr || ''))
      ? DEFAULTS.opacity
      : Math.max(0, Math.min(1, Number.parseFloat(opacityAttr || ''))),
    color: colorAttr || DEFAULTS.color,
  };
}

function findAttrsForTarget(target: EventTarget | null) {
  const node = target as HTMLElement | null;
  if (node && node.closest) {
    const el = node.closest('[data-cursor-size],[data-cursor-opacity],[data-cursor-color]');
    if (el) return readAttrsFromElement(el);
  }
  return DEFAULTS;
}

export default function MagicHighlighter({ containerRef, className }: MagicHighlighterProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const lastXRef = useRef<number | null>(null);
  const lastYRef = useRef<number | null>(null);
  const collisionElementsRef = useRef<HTMLElement[] | null>(null);

  const updateCursorFromPoint = (clientX: number, clientY: number, attrs: typeof DEFAULTS) => {
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
    let clampedX = Math.min(Math.max(clientX, halfW), vw - halfW);
    let clampedY = Math.min(Math.max(clientY, halfH), vh - halfH);

    if (collisionElementsRef.current == null) {
      collisionElementsRef.current = Array.from(
        document.querySelectorAll('[data-cursor-collision="true"]'),
      ) as HTMLElement[];
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
          const overlapsX = clampedX + halfW > rect.left && clampedX - halfW < rect.right;
          const overlapsY = clampedY + halfH > rect.top && clampedY - halfH < rect.bottom;
          if (overlapsX && overlapsY) {
            const pushLeft = clampedX + halfW - rect.left;
            const pushRight = rect.right - (clampedX - halfW);
            const pushUp = clampedY + halfH - rect.top;
            const pushDown = rect.bottom - (clampedY - halfH);
            const minPush = Math.min(pushLeft, pushRight, pushUp, pushDown);
            if (minPush === pushLeft) clampedX = rect.left - halfW - 0.5;
            else if (minPush === pushRight) clampedX = rect.right + halfW + 0.5;
            else if (minPush === pushUp) clampedY = rect.top - halfH - 0.5;
            else clampedY = rect.bottom + halfH + 0.5;

            clampedX = Math.min(Math.max(clampedX, halfW), vw - halfW);
            clampedY = Math.min(Math.max(clampedY, halfH), vh - halfH);
            adjusted = true;
          }
        }
      }
    }

    cursor.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) translate(-50%, -50%)`;
    cursor.style.opacity = `${attrs.opacity}`;
  };

  useEffect(() => {
    if (isMobilePointer()) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    const targetEl: HTMLElement | Document = containerRef?.current || document;

    const handleMouseMove = (e: MouseEvent) => {
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

    const handleScrollOrResize = () => {
      const x = lastXRef.current;
      const y = lastYRef.current;
      if (x == null || y == null) return;
      const el = document.elementFromPoint(x, y);
      const attrs = findAttrsForTarget(el);
      updateCursorFromPoint(x, y, attrs);
      collisionElementsRef.current = null;
    };

    // @ts-ignore addEventListener exists on both Document and HTMLElement
    targetEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    // @ts-ignore
    targetEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      // @ts-ignore
      targetEl.removeEventListener('mousemove', handleMouseMove);
      // @ts-ignore
      targetEl.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [containerRef]);

  const baseClass =
    'pointer-events-none fixed left-0 top-0 w-[400px] h-[400px] rounded-2xl bg-[#0086FF] mix-blend-color blur-3xl opacity-0 transition-opacity duration-150 z-[70] will-change-transform hidden md:block transition-colors';

  return <div ref={cursorRef} className={className ? `${baseClass} ${className}` : baseClass} />;
}

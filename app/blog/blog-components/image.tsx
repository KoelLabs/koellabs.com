import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/styles';

export default function BlogImage({
  src,
  alt,
  width,
  height,
  expanded = false,
  sizes,
  className,
  link,
  linkSide,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  expanded: boolean;
  sizes?: string;
  className: string;
  link?: string;
  linkSide?: 'left' | 'right';
}) {
  return (
    <div
      className={cn(
        'w-full border p-2 rounded-3xl overflow-hidden',
        className,
        expanded && 'scale-150 my-36 border-[0.75px] p-1.5',
      )}
    >
      {link && (
        <a href={link} target="_blank" className="relative group/item overflow-hidden bg-white">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            quality={100}
            className={cn(
              'w-full h-auto border rounded-[16px]',
              expanded && 'border-[0.75px] rounded-[19px]',
            )}
          />

          {/* {linkSide === 'left' && (
            <span className="transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
              <div className={`h-2 w-2 rounded-full relative transition-all mr-1`}></div>
              From: {link}
            </span>
          )}
          {linkSide === 'right' && (
            <span className="pointer-events-none group-hover/item:scale-100 scale-0 group-hover/item:blur-none group-hover/item:translate-x-0 translate-x-60 group-hover/item:translate-y-0 translate-y-20 blur-2xl absolute bottom-2 right-2 bg-white font-sans transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
              <div className={`h-2 w-2 rounded-full relative transition-all mr-1 bg-sky-700`}></div>
              From: {link}
            </span>
          )} */}
        </a>
      )}
      {!link && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={100}
          className={cn(
            'w-full h-auto border rounded-[16px]',
            expanded && 'border-[0.75px] rounded-[19px]',
          )}
        />
      )}
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/styles';

export default function BlogImage({
  src,
  alt,
  width,
  height,
  expanded = false,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  expanded: boolean;
  className: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'p-1.5 bg-neutral-50 border-[0.75px] rounded-2xl',
        className,
        expanded && 'scale-150',
      )}
    />
  );
}

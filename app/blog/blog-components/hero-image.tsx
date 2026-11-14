import SiteImage from '@/components/site-image';
import React from 'react';

export type BlogHeroImageProps = {
  src: string;
  alt: string;
  // Intrinsic size, so the frame reserves its aspect ratio before the image loads.
  width: number;
  height: number;
};

export default function BlogHeroImage({ src, alt, width, height }: BlogHeroImageProps) {
  return (
    <div className="p-2 mt-16 relative z-10 rounded-3xl border overflow-hidden bg-neutral-50">
      <SiteImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        priority
        sizes="(max-width: 768px) calc(100vw - 64px), 1136px"
        className="w-full h-auto rounded-2xl z-10 relative border bg-white"
      />
    </div>
  );
}

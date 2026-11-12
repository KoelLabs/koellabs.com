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
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        fetchPriority="high"
        className="w-full h-auto rounded-2xl z-10 relative border bg-white"
      />
    </div>
  );
}

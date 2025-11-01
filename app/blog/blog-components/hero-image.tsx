import React from 'react';

export type BlogHeroImageProps = {
  src: string;
  alt: string;
};

export default function BlogHeroImage({ src, alt }: BlogHeroImageProps) {
  return (
    <div className="p-2 mt-16 relative z-10 rounded-3xl border overflow-hidden bg-neutral-50">
      <img src={src} alt={alt} className="w-full h-auto rounded-2xl z-10 relative border" />
    </div>
  );
}

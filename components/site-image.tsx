import type { ImgHTMLAttributes } from 'react';
import imageManifest from '@/lib/generated/images.json';

type Asset = {
  width: number;
  height: number;
  variants: { width: number; src: string; bytes: number }[];
};
const images = imageManifest as Record<string, Asset>;

type SiteImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  src: string;
  alt: string;
  priority?: boolean;
  profile?: 'content' | 'avatar';
};

// Known local assets use prebuilt, fingerprinted variants, with no runtime image-optimizer hop.
// Dynamic URLs and genuine SVGs retain their original URL and normal browser caching behavior.
export default function SiteImage({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 1152px',
  priority = false,
  profile = 'content',
  loading,
  fetchPriority,
  decoding = 'async',
  width,
  height,
  ...props
}: SiteImageProps) {
  const asset = images[src];
  const variants = asset?.variants.filter(variant => profile !== 'avatar' || variant.width <= 72);
  const fallback = variants?.find(variant => variant.width >= 1200) ?? variants?.at(-1);
  const responsive = variants && variants.length > 1;
  return (
    <img
      {...props}
      alt={alt}
      src={fallback?.src ?? src}
      srcSet={
        responsive
          ? variants.map(variant => `${variant.src} ${variant.width}w`).join(', ')
          : undefined
      }
      sizes={responsive ? sizes : undefined}
      width={width ?? asset?.width}
      height={height ?? asset?.height}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority ?? (priority ? 'high' : undefined)}
      decoding={decoding}
    />
  );
}

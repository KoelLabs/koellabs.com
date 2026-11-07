import Image from 'next/image';

export default function BlogFigure({
  src,
  alt,
  width,
  height,
  children,
  narrow = false,
  scrollOnMobile = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: React.ReactNode;
  narrow?: boolean;
  scrollOnMobile?: boolean;
}) {
  return (
    <figure className={`my-8 ${narrow ? 'max-w-sm mx-auto' : ''}`}>
      <div
        className={
          scrollOnMobile ? 'overflow-x-auto rounded-2xl border border-neutral-200' : undefined
        }
      >
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open figure: ${alt}`}
          className={scrollOnMobile ? 'block min-w-[640px]' : undefined}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            sizes={narrow ? '(max-width: 420px) 100vw, 384px' : '(max-width: 768px) 100vw, 768px'}
            className={`h-auto w-full ${scrollOnMobile ? '' : 'rounded-2xl border border-neutral-200'}`}
          />
        </a>
      </div>
      <figcaption className="mt-3 text-sm/6 text-neutral-500 font-sans">
        {children}
        {scrollOnMobile && (
          <span className="mt-1 block sm:hidden">
            Scroll across the chart or tap it to open the full figure.
          </span>
        )}
      </figcaption>
    </figure>
  );
}

'use client';

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
import MagicHighlighter from '@/components/magic-highlighter';

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
  const [emblaApi, setEmblaApi] = useState(null);
  const [selectedSnap, setSelectedSnap] = useState(0);
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
    <div ref={containerRef} className="flex-col flex w-screen relative scroll-smooth">
      <MagicHighlighter containerRef={containerRef} />
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
                      quality={50}
                      className="object-cover rounded-lg object-right-bottom grays cale transition-all duration-150"
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

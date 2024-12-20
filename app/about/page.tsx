import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/1 - header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';
import HeroVideoDialog from '@/components/ui/magicui/hero-video-dialog';
import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';

export default function About() {
  return (
    <div className="relative">
      <div className="z-[2] sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <div className="color-bg h-[80%] w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] opacity-10 top-48"></div>
      <div className="mx-auto md:px-6 pt-0 lg:px-8 py-32 relative">
        <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] h-full flex justify-between z-[-1]">
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops2"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops4"></div>
          <div className="h-full"></div>
        </div>
      </div>
      <CTA />
      <Footer />
    </div>
  );
}

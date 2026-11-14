'use server';

import StripePattern from '@/components/stripe-pattern';

import Header from '@/components/ui/header';
import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';
import PreviewsHero from '@/app/previews/sections-previews/previews-hero';
import Leaderboard from '@/app/previews/sections-previews/leaderboard';

export default async function PreviewsPage() {
  return (
    <div className="flex-col flex w-screen relative scroll-smooth">
      <div
        data-cursor-opacity="0.3"
        data-cursor-size="240"
        className="z-9999 sticky top-0 mx-auto w-full"
      >
        <Header />
      </div>
      <PreviewsHero />
      <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-t">
        <StripePattern />
      </div>
      <div
        data-cursor-opacity="0.8"
        data-cursor-size="240"
        data-cursor-color="#2A4BCC"
        className="z-0 relative"
      >
        <Leaderboard />
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-b">
          <StripePattern />
        </div>
      </div>

      <div className="w-full relative">
        <CTA />
      </div>
      <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
        <StripePattern />
      </div>

      <Footer />
    </div>
  );
}

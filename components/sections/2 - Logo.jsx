import React from 'react';
import { Button } from '@/components/ui/base/button';
import Header from '@/components/ui/1 - header';
import { ChevronRight, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/base/card';

export default function Logos() {
  return (
    <div className="min-h-screen relative">
      <div className="color-bg h-full w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] opacity-10 top-48"></div>
      <div className="mx-auto relative">
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <div className="mx-auto w-full h-screen bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200"></div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Button } from '@/components/ui/base/button';
import { BookCheck, BookText, Video, X, XCircle } from 'lucide-react';

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn how to get started with our platform',
    link: '/getting-started',
    icon: BookCheck,
  },
  {
    title: 'Watch a Video',
    description: 'Watch a video to learn how to use our platform',
    link: '/watch-video',
    icon: Video,
  },
  {
    title: 'FAQs',
    description: 'Frequently asked questions',
    link: '/faqs',
    icon: BookText,
  },
];

export default function HelpCenter() {
  return (
    <div className="w-full">
      <div className="p-4">
        <div className="flex flex-col border border-neutral-200 bg-[#317EC5] p-4 dark:border-neutral-700 rounded-xl overflow-hidden bg-cover bg-left-top h-[200px] bg-[url('/images/dashboard/clouds.png')] dark:bg-blend-soft-light dark:bg-neutral-900">
          <div className="flex justify-between w-full h-fit">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Home</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

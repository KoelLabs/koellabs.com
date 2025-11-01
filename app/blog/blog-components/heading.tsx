import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type MaxWidthOption = '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | number | undefined;

export type BlogHeadingProps = {
  category: string;
  categoryColorClass?: string; // e.g. 'text-sky-600' | 'text-purple-600'
  title: string;
  dateISO: string;
  byline?: string; // defaults to 'By Koel Labs'
  maxWidth?: MaxWidthOption; // default lg:max-w-4xl
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function resolveMaxWidthClass(maxWidth: MaxWidthOption): string {
  switch (maxWidth) {
    case '5xl':
      return 'lg:max-w-5xl';
    case '3xl':
      return 'lg:max-w-3xl';
    case 'xl':
      return 'lg:max-w-xl';
    case '2xl':
      return 'lg:max-w-2xl';
    case '4xl':
    default:
      return 'lg:max-w-4xl';
  }
}

export default function BlogHeading({
  category,
  categoryColorClass = 'text-sky-600',
  title,
  dateISO,
  byline = 'By Koel Labs',
  maxWidth,
}: BlogHeadingProps) {
  const wrapperMax = resolveMaxWidthClass(maxWidth);
  return (
    <div
      className={`relative ${wrapperMax} mx-auto`}
      style={typeof maxWidth === 'number' ? { maxWidth: maxWidth } : undefined}
    >
      <Link href="/blog" className="flex justify-center relative z-10 max-w-sm mx-auto mb-6">
        <div className="relative rounded-full px-2 py-0.5 pr-4.5 text-sm/6 text-gray-600 border-y border-l rounded-r-none">
          <ArrowLeft className="w-3 h-3 inline-block -ml-0.5 mb-px mr-1" strokeWidth={2} />
          Back to Blog
        </div>
        <h2
          className={`text-sm tracking-tight font-semibold ${categoryColorClass} text-center border border-neutral-200 rounded-full w-fit -ml-3 px-3 py-1`}
        >
          {category}
        </h2>
      </Link>
      <h1 className="mt-2 text-pretty text-3xl sm:text-4xl font-semibold tracking-tighter text-neutral-950 md:text-5xl text-center">
        {title}
      </h1>
      <div className="flex justify-center mt-7 items-center gap-1">
        <div className="text-neutral-600 flex items-center gap-1.5">
          {/* {formatDate(dateISO)} 
          {byline ? ` • ${byline}` : ''} */}
          <div className=" -space-x-1 overflow-hidden inline-block">
            <img
              alt="A photo of Alexander Metzger"
              src="/images/mini-alex.png"
              className="inline-block size-6 rounded-full outline outline-1 -outline-offset-1 outline-black/5 ring-2 ring-white"
            />
            <img
              alt="A photo of Aruna Srivastava"
              src="/images/mini-aruna.png"
              className="inline-block size-6 rounded-full outline outline-1 -outline-offset-1 outline-black/5 ring-2 ring-white"
            />
            <img
              alt="A photo of Ruslan Mukhamedvaleev"
              src="/images/mini-ruslan.png"
              className="inline-block size-6 rounded-full outline outline-1 -outline-offset-1 outline-black/5 ring-2 ring-white"
            />
          </div>
          By Koel Labs ·
        </div>
        <time dateTime={dateISO} className="text-neutral-600">
          {formatDate(dateISO)}
        </time>
      </div>
    </div>
  );
}

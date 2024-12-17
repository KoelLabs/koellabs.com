// Template for blog posts. It has published set to false so it won't show up in the UI.
// It should contain example usage of all relevant components and utilities.

// This is the individual blog post page content. It is rendered insides [slug]/page.tsx.
// The metadata object is used to display the blog post on the main blog page (app/blog/page.tsx).
// It will also be used to set meta tags for SEO once I get around to adding that.

import type { Metadata } from '../posts';

export const metadata: Metadata = {
  title: 'Title for display on the blog page',
  slug: 'this is used in the url',
  date: '2024-12-16',
  published: false,
  image: 'shown on the blog page',
  summary: 'shown on the blog page',
  category: 'Announcement',
  tags: [],
};

export default function PostBody() {
  return (
    <div className="bg-white/50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
        <h2 className="text-base/7 font-semibold text-sky-600">
          {metadata.category}, {metadata.date}
        </h2>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl">
          {metadata.title}
        </h1>
        <br></br>
        <div className="relative lg:col-span-3">
          <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          <div
            style={{ padding: '2em' }}
            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]"
          >
            <p>{metadata.summary}</p>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
        </div>
      </div>
    </div>
  );
}

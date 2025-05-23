// Component to display the lists of blog posts by category.

import React from 'react';
import { getPosts } from './posts';
import type { Post } from './posts';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';

export const metadata = {
  title: 'Blog | Koel Labs Research and Updates',
  description:
    'Stay up to date with the latest research, technical reports, and announcements from Koel Labs about pronunciation learning and speech technology.',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="relative">
      <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
        <img
          alt={`Cover image for blog post: ${post.title}`}
          src={post.image}
          className="h-80 top-0 object-cover object-bottom"
        />
        <div className="pt-4 mb-8">
          <div className="px-8 pb-1">
            <div className="flex flex-row gap-2">
              <span className="text-sm/4 font-semibold text-sky-600 border border-neutral-200 tracking-tight rounded-full w-fit px-2 py-1">
                {post.category}
              </span>
            </div>
            <h2 className="mt-2 text-xl sm:text-xl lg:text-2xl max-w-md text-pretty font-medium tracking-tight text-neutral-950">
              {post.title}
            </h2>
            <div className="flex flex-col sm:flex-row gap-1 my-4">
              <time dateTime={post.date} className="text-sm/4 text-neutral-800">
                {formatDate(post.date)}
              </time>
              <span className="text-sm/4 text-neutral-800 hidden sm:block" aria-hidden="true">
                •
              </span>
              <p className="text-sm/4 text-neutral-800">
                <span className="inline sm:hidden">By</span> Koel Labs
              </p>
            </div>
          </div>
          <div className="h-px bg-neutral-200 my-4" role="separator"></div>
          <div className="px-8 pb-8 pt-1">
            <p className="mt-2 max-w-lg text-sm/6 text-neutral-600">
              {post.summary.slice(0, 350)}
              <span className="text-sky-600">{post.summary.length > 350 && '... Read More'}</span>
            </p>
          </div>
          <div className="h-px bg-neutral-200 mb-8" role="separator"></div>
        </div>
        <div className="absolute bottom-0 right-0 flex justify-end p-4 gap-2 z-[1] mt-4">
          {post.tags.map(tag => (
            <Link
              key={tag.text}
              target="_blank"
              rel="noopener noreferrer"
              href={tag.url}
              className="px-2 py-1 text-xs/6 text-neutral-600 border border-neutral-200 rounded-md hover:bg-neutral-50"
              aria-label={`View ${tag.text} related to this post`}
            >
              {tag.text}
              <ArrowUpRightIcon className="w-4 h-4 mb-px inline-block" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px shadow ring-1 ring-black/5 rounded-[calc(theme(borderRadius.lg)+1px)]" />
      <Link
        href={`/blog/${post.slug}`}
        className="absolute bottom-0 left-0 h-full w-full"
        aria-label={`Read full article: ${post.title}`}
      ></Link>
    </article>
  );
}

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div className="relative">
      <div className="color-bg h-[80%] w-11/12 left-0 right-0 mx-auto absolute z-[-2] blur-[64px] transform-gpu opacity-10 top-48"></div>
      <main className="mx-auto relative">
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <div
          aria-hidden="true"
          className="mx-auto absolute top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] h-full flex justify-between z-[0] opacity-25 sm:opacity-100"
        >
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops2"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops3"></div>
          <div className="w-[1px] h-full bg-neutral-200 drops4"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
        </div>

        <div className="mx-auto w-full h-fit relative overflow-hidden">
          <section aria-labelledby="recent-posts-heading" className="py-24">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
              <p className="text-base/7 font-semibold text-sky-600">The Newsroom</p>
              <h1
                id="recent-posts-heading"
                className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-neutral-950 sm:text-5xl"
              >
                Most Recent
              </h1>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-2">
                {posts
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, Math.min(2, posts.length))
                  .map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
              </div>
            </div>
          </section>

          <section
            aria-labelledby="announcements-heading"
            className="bg-white/50 backdrop-blur-md py-24 sm:py-32"
          >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
              <h2
                id="announcements-heading"
                className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-neutral-950 sm:text-5xl"
              >
                Announcements
              </h2>
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mt-16">
                {posts
                  .filter(post => post.category === 'Announcement')
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, Math.min(2, posts.length))
                  .map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
              </div>
            </div>
          </section>

          <section
            aria-labelledby="technical-reports-heading"
            className="py-24 sm:py-32 pb-0 sm:pb-0"
          >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
              <h2
                id="technical-reports-heading"
                className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-neutral-950 sm:text-5xl"
              >
                Technical Reports
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-2">
                {posts
                  .filter(post => post.category === 'Technical Report')
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
              </div>
            </div>
          </section>
          <CTA hideBg={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

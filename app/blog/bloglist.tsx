// Component to display the lists of blog posts by category.

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/base/card';
import HeroVideoDialog from '@/components/ui/magicui/hero-video-dialog';
import Link from 'next/link';
import { getPosts } from './posts';
import type { Post } from './posts';
import { ArrowUpRightIcon } from 'lucide-react';
import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';

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
    <article className="relative border p-2 rounded-3xl rounded-b-2xl bg-white font-sans shadow-xs flex flex-col justify-between">
      <div>
        <div className="relative flex h-fit flex-col overflow-hidden rounded-2xl border">
          <img
            alt={`Cover image for blog post: ${post.title}`}
            src={post.image}
            className="max-h-80 top-0 object-cover object-bottom aspect-video"
          />
        </div>
        <div className="relative flex flex-col justify-between  overflow-hidden rounded-2xl border mt-2">
          <div className="p-6 text-left">
            <h2 className="text-xl sm:text-xl lg:text-2xl max-w-full text-balance font-medium tracking-tight text-neutral-950">
              {post.title}
            </h2>

            <div className="flex flex-col sm:flex-row gap-1 justify-between mt-3">
              <div className="flex justify-center align-baseline sm:items-center gap-1 grayscale flex-col sm:flex-row text-left">
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
                  By Koel Labs <span className="hidden sm:inline">·</span>
                </div>
                <time dateTime={post.date} className="text-neutral-600">
                  {formatDate(post.date)}
                </time>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 -mt-2 pt-1 h-full text-left">
            <p className="mt-2 max-w-lg text-sm/6 text-neutral-600">
              {post.summary.slice(0, 350)}
              {post.summary.length > 350 && '...'}
              <span className="text-sky-600">{post.summary.length > 350 && ' Read More →'}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-row gap-2 w-full">
        {/* <div className="flex flex-row gap-2 mt-2 min-w-fit">
          <span className="transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
            <div
              className={`h-2 w-2 rounded-full relative transition-all mr-1`}
              style={{
                backgroundColor: post.category === 'Technical Report' ? '#3779B5' : '#154063',
              }}
            ></div>
            {post.category}
          </span>
        </div> */}
        <div className="flex-row gap-2 mt-2 w-full hidden lg:flex">
          <span className="transition-all inline-flex items-center overflow-hidden w-full border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 flex-row justify-between hover:shadow-sm group gap-px">
            {Array(90)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-[200%] w-px bg-neutral-200 dark:bg-neutral-800 -ml-1 -mr-1 rotate-45"
                ></div>
              ))}
          </span>
        </div>

        <div className="flex-row gap-2 mt-2 w-full hidden md:flex lg:hidden">
          <span className="transition-all inline-flex items-center overflow-hidden w-full border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 flex-row justify-between hover:shadow-sm group gap-px">
            {Array(70)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-[200%] w-px bg-neutral-200 dark:bg-neutral-800 -ml-1 -mr-1 rotate-45"
                ></div>
              ))}
          </span>
        </div>

        <div className="flex-row gap-2 mt-2 w-full flex md:hidden">
          <span className="transition-all inline-flex items-center overflow-hidden w-full border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 flex-row justify-between hover:shadow-sm group gap-px">
            {Array(40)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-[200%] w-px bg-neutral-200 dark:bg-neutral-800 -ml-1 -mr-1 rotate-45"
                ></div>
              ))}
          </span>
        </div>

        <div className="flex flex-row gap-2 mt-2 min-w-fit">
          <span className="transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
            <div
              className={`h-2 w-2 rounded-full relative transition-all mr-1`}
              style={{
                backgroundColor: post.category === 'Technical Report' ? '#3779B5' : '#154063',
              }}
            ></div>
            {post.category}
          </span>
        </div>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="absolute bottom-0 left-0 h-full w-full"
        aria-label={`Read full article: ${post.title}`}
      ></Link>
    </article>
  );
}

function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="relative min-h-[900px] h-full">
      <div className="absolute right-0 -top-20 w-full h-[500px] bg-gradient-to-b from-white via-10% via-white to-transparent z-[0]"></div>

      <div className="absolute left-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[200] hidden 2xl:block border-b">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>

      <div className="absolute right-0 bottom-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[200] hidden 2xl:block border-y">
        <div className="rounded-full w-full h-full border bg-white"></div>
      </div>
      {/* <div className="absolute right-0 -top-20 w-full h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color pointer-events-none"></div> */}
      {/* <div className="absolute left-0 -top-20 w-[60px] h-[110%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[2] mix-blend-color"></div> */}

      <div className="mx-auto pt-0 lg:px-0 py-32 pb-0">
        <div className="mx-auto p-4 max-w-7xl py-32 z-[90] relative">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-6xl lg:px-8 z-10 mb-20 -mt-12">
            <div className="px-2.5 py-0.5 border rounded-xl w-fit mb-3">
              <p className="text-base/7 font-semibold text-sky-600">Most Recent</p>
            </div>
            <h1
              id="recent-posts-heading"
              className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-neutral-950 sm:text-5xl"
            >
              Newsroom
            </h1>
          </div>
          <section
            aria-labelledby="hero-heading"
            className="text-center relative grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* <div className="flex flex-row justify-center items-center my-8"></div> */}
            {posts
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .splice(0, 2)
              .map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
          </section>
        </div>

        {/* <div className="absolute -bottom-2  h-[65px] w-[90%] bg-gradient-to-b from-[#0086FF] to-[#2A4BCC] z-[3] mix-blend-color"></div> */}

        {/* <div className="absolute bottom-0 left-0 w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-t">
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
        </div> */}
        <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1264px] flex justify-between z-[-1]">
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-200 translate-x-[7px]"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-200 -translate-x-1"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-200 translate-x-1"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-200 -translate-x-[7px]"></div>
          <div className="h-full"></div>
        </div>
        <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="141"
          height="906"
          fill="none"
          className="absolute -bottom-28 xl:-right-px hidden 2xl:block z-[-3]"
          viewBox="0 0 141 906"
        >
          <path
            stroke="#E5E5E5"
            d="M140.505 0C140.505 97.5.721-.44.707 97.06c-.008 57.199 0 447.333 0 610.999m139.798 197.003c0-97.5-139.784.441-139.798-97.059-.008-57.2 0-447.333 0-611"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="141"
          height="906"
          fill="none"
          className="absolute rotate-180 -bottom-28 xl:left-0 hidden 2xl:block z-[-3]"
          viewBox="0 0 141 906"
        >
          <path
            stroke="#E5E5E5"
            d="M140.505 0C140.505 97.5.721-.44.707 97.06c-.008 57.199 0 447.333 0 610.999m139.798 197.003c0-97.5-139.784.441-139.798-97.059-.008-57.2 0-447.333 0-611"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default async function BlogListWrapper() {
  const posts = await getPosts();

  return (
    <div className="flex-col flex w-screen relative scroll-smooth z-0">
      <BlogList posts={posts} />

      <div id="technical-reports" className="relative">
        <div className="mx-auto p-4 max-w-7xl py-32 z-[0]">
          <div className="absolute left-0 -bottom-12.5 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[200] hidden 2xl:block border-b">
            <div className="rounded-full w-full h-full border bg-white"></div>
          </div>

          <div className="absolute right-0 -bottom-12.5 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[200] hidden 2xl:block border-b">
            <div className="rounded-full w-full h-full border bg-white"></div>
          </div>

          <div className="mx-auto max-w-2xl px-6 lg:max-w-6xl lg:px-8 z-10 mb-20 -mt-12">
            <h1
              id="recent-posts-heading"
              className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-neutral-950 sm:text-5xl"
            >
              Technical Reports
            </h1>
          </div>
          <section
            aria-labelledby="hero-heading"
            className="text-center relative grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* <div className="flex flex-row justify-center items-center my-8"></div> */}
            {posts
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .filter(post => post.category === 'Technical Report')
              .map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
          </section>
        </div>
      </div>
      <div className="z-[3] bg-white">
        <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
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
        <div className="relative">
          <div id="announcements" className="mx-auto p-4 max-w-7xl py-32 z-[0]">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-6xl lg:px-8 z-10 mb-20 -mt-12">
              <h1
                id="recent-posts-heading"
                className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-neutral-950 sm:text-5xl"
              >
                Announcements
              </h1>
            </div>
            <section
              aria-labelledby="hero-heading"
              className="text-center relative grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* <div className="flex flex-row justify-center items-center my-8"></div> */}
              {posts
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .filter(post => post.category === 'Announcement')
                .map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
            </section>
          </div>
        </div>
        <div className="w-full h-[46px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y mt-[4.5px]">
          <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
            {Array(500)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-full w-px bg-neutral-200 dark:bg-neutral-800"
                ></div>
              ))}
          </div>
        </div>
        <CTA />
        <div className="w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y">
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
      <Footer />
    </div>
  );
}

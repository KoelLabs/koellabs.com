// Component to display the lists of blog posts by category.

import React from 'react';
import { getPosts } from './posts';
import type { Post } from './posts';
import Link from 'next/link';

function PostCard({ post }: { post: Post }) {
  return (
    <div className="relative lg:col-span-3">
      <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
        <img alt="" src={post.image} className="h-80 top-0 object-cover object-top" />
        <div className="p-10 pt-4">
          <h3 className="text-sm/4 font-semibold text-sky-600">{post.date}</h3>
          <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">{post.title}</p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600">{post.summary}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
    </div>
  );
}

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div className="relative">
      <div className="color-bg h-full w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] opacity-10 top-48"></div>
      <div className="mx-auto relative">
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <div className="mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 relative overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2450px"
            height="100%"
            fill="none"
            className="absolute -left-1/2 scale-150 -right-1/2 block mx-auto opacity-10"
          >
            <path
              stroke="#E5E5E5"
              d="M0 10c635.705 0 771.729 573 1245.5 573S1883.06 10 2491 10"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 25c635.705 0 771.729 573 1245.5 573S1883.06 25 2491 25"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 40c635.705 0 771.729 573 1245.5 573S1883.06 40 2491 40"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 55c635.705 0 771.729 573 1245.5 573S1883.06 55 2491 55"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 71c635.705 0 771.729 572 1245.5 572S1883.06 71 2491 71"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 86c635.705 0 771.729 573 1245.5 573S1883.06 86 2491 86"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 101c635.705 0 771.729 573 1245.5 573S1883.06 101 2491 101"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 116c635.705 0 771.729 573 1245.5 573S1883.06 116 2491 116"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 131c635.705 0 771.729 573 1245.5 573S1883.06 131 2491 131"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 146c635.705 0 771.729 573 1245.5 573S1883.06 146 2491 146"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 162c635.705 0 771.729 572 1245.5 572S1883.06 162 2491 162"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 177c635.705 0 771.729 573 1245.5 573S1883.06 177 2491 177"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 192c635.705 0 771.729 573 1245.5 573S1883.06 192 2491 192"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 207c635.705 0 771.729 573 1245.5 573S1883.06 207 2491 207"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 222c635.705 0 771.729 573 1245.5 573S1883.06 222 2491 222"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 237c635.705 0 771.729 573 1245.5 573S1883.06 237 2491 237"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 253c635.705 0 771.729 572 1245.5 572S1883.06 253 2491 253"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 268c635.705 0 771.729 573 1245.5 573S1883.06 268 2491 268"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 283c635.705 0 771.729 573 1245.5 573S1883.06 283 2491 283"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 298c635.705 0 771.729 573 1245.5 573S1883.06 298 2491 298"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 313c635.705 0 771.729 573 1245.5 573S1883.06 313 2491 313"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 328c635.705 0 771.729 573 1245.5 573S1883.06 328 2491 328"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 344c635.705 0 771.729 572 1245.5 572S1883.06 344 2491 344"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 359c635.705 0 771.729 573 1245.5 573S1883.06 359 2491 359"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 374c635.705 0 771.729 573 1245.5 573S1883.06 374 2491 374"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 389c635.705 0 771.729 573 1245.5 573S1883.06 389 2491 389"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 404c635.705 0 771.729 573 1245.5 573S1883.06 404 2491 404"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2450px"
            height="100%"
            fill="none"
            className="absolute -left-1/2 scale-150 -bottom-48 -right-1/2 block mx-auto opacity-25"
          >
            <path
              stroke="#E5E5E5"
              d="M0 10c635.705 0 771.729 573 1245.5 573S1883.06 10 2491 10"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 25c635.705 0 771.729 573 1245.5 573S1883.06 25 2491 25"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 40c635.705 0 771.729 573 1245.5 573S1883.06 40 2491 40"
            ></path>

            <path
              stroke="#0284C7"
              className="path8 path"
              d="M0 55c635.705 0 771.729 573 1245.5 573S1883.06 55 2491 55"
            ></path>

            <path
              stroke="#E5E5E5"
              d="M0 71c635.705 0 771.729 572 1245.5 572S1883.06 71 2491 71"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 86c635.705 0 771.729 573 1245.5 573S1883.06 86 2491 86"
            ></path>
            <path
              className="path2 path"
              stroke="#0166FF"
              d="M0 101c635.705 0 771.729 573 1245.5 573S1883.06 101 2491 101"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 116c635.705 0 771.729 573 1245.5 573S1883.06 116 2491 116"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 131c635.705 0 771.729 573 1245.5 573S1883.06 131 2491 131"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 146c635.705 0 771.729 573 1245.5 573S1883.06 146 2491 146"
            ></path>
            <path
              className="path4 path"
              stroke="#0085FF"
              d="M0 162c635.705 0 771.729 572 1245.5 572S1883.06 162 2491 162"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 177c635.705 0 771.729 573 1245.5 573S1883.06 177 2491 177"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 192c635.705 0 771.729 573 1245.5 573S1883.06 192 2491 192"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 207c635.705 0 771.729 573 1245.5 573S1883.06 207 2491 207"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 222c635.705 0 771.729 573 1245.5 573S1883.06 222 2491 222"
            ></path>
            <path
              stroke="#0284C7"
              d="M0 237c635.705 0 771.729 573 1245.5 573S1883.06 237 2491 237"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 253c635.705 0 771.729 572 1245.5 572S1883.06 253 2491 253"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 268c635.705 0 771.729 573 1245.5 573S1883.06 268 2491 268"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 283c635.705 0 771.729 573 1245.5 573S1883.06 283 2491 283"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 298c635.705 0 771.729 573 1245.5 573S1883.06 298 2491 298"
            ></path>
            <path
              stroke="#0085FF"
              className="path2 path"
              d="M0 313c635.705 0 771.729 573 1245.5 573S1883.06 313 2491 313"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 328c635.705 0 771.729 573 1245.5 573S1883.06 328 2491 328"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 344c635.705 0 771.729 572 1245.5 572S1883.06 344 2491 344"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 359c635.705 0 771.729 573 1245.5 573S1883.06 359 2491 359"
            ></path>
            <path
              stroke="#0166FF"
              className="path0 path"
              d="M0 374c635.705 0 771.729 573 1245.5 573S1883.06 374 2491 374"
            ></path>
            <path
              stroke="#E5E5E5"
              d="M0 389c635.705 0 771.729 573 1245.5 573S1883.06 389 2491 389"
            ></path>
            <path
              stroke="#0085FF"
              className="path6 path"
              d="M0 404c635.705 0 771.729 573 1245.5 573S1883.06 404 2491 404"
            ></path>
          </svg>
          <div className="bg-white/50 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
              <h1 className="text-base/7 font-semibold text-sky-600">Koel Labs Blog</h1>
              <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl">
                Announcements
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                {posts
                  .filter(post => post.category === 'Announcement')
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 3)
                  .map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <PostCard key={post.slug} post={post} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="bg-white/50 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
              <h1 className="text-base/7 font-semibold text-sky-600">Koel Labs Blog</h1>
              <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl">
                Most recent posts
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                {posts
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 3)
                  .map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <PostCard key={post.slug} post={post} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="bg-white/50 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
              <h1 className="text-base/7 font-semibold text-sky-600">Koel Labs Blog</h1>
              <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl">
                Technical Reports
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                {posts
                  .filter(post => post.category === 'Technical Report')
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <PostCard key={post.slug} post={post} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

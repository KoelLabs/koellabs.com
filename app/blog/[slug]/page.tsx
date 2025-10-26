// General layout that is shared between all blog posts goes here (e.g. footer, header, display author, etc).
// The posts are defined in app/blog/posts/*.tsx.

import { getPost } from '../posts';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/header';
import CTA from '@/components/sections/cta';
import Footer from '@/components/sections/footer';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Koel Labs Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: ['Koel Labs', 'Alexander Metzger', 'Aruna Srivastava', 'Ruslan Mukhamedvaleev'],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  return (
    <div className="flex-col flex w-screen relative scroll-smooth">
      <div className="z-2 sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <div className="relative">
        <div className="color-bg h-[80%] w-11/12 left-0 right-0 mx-auto absolute z-0 blur-[64px] transform-gpu opacity-10 top-48"></div>
        <main className="mx-auto relative">
          <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

          <article className="mx-auto w-full h-fit bg-neutral-50/20 border-b border-neutral-200 backdrop-blur-md relative overflow-hidden">
            <post.content />
            <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-t absolute bottom-0 left-0 mt-12">
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
          </article>
          <CTA />
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
        </main>
      </div>
    </div>
  );
}

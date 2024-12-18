// General layout that is shared between all blog posts goes here (e.g. footer, header, display author, etc).
// The posts are defined in app/blog/posts/*.tsx.

import { getPost } from '../posts';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/1 - header';
import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';

export default async function PostPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <div className="flex-col flex w-screen relative scroll-smooth">
      <div className="z-[2] sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <div className="relative">
        <div className="color-bg h-[80%] w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] opacity-10 top-48"></div>
        <div className="mx-auto relative">
          <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

          <div className="mx-auto w-full h-fit bg-neutral-50/20 border-b border-neutral-200 backdrop-blur-md  relative overflow-hidden">
            <post.content />
          </div>
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}

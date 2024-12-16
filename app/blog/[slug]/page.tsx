// General layout that is shared between all blog posts goes here (e.g. footer, header, display author, etc).

import { getPost } from '../posts';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/1 - header';

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
      <post.content />
    </div>
  );
}

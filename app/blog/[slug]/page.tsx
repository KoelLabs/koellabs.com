// General layout that is shared between all blog posts goes here (e.g. footer, header, display author, etc).
// The posts are defined in app/blog/posts/*.tsx.

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
            <post.content />
          </div>
        </div>
      </div>
    </div>
  );
}

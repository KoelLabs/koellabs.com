// This is the individual blog post page content. It is rendered insides [slug]/page.tsx.
// The metadata object is used to display the blog post on the main blog page (app/blog/page.tsx).
// It will also be used to set meta tags for SEO once I get around to adding that.

import type { Metadata } from '../posts';
import { Source_Serif_4 } from 'next/font/google';
import BlogBody from '../blog-components/body';
import BlogHeading from '../blog-components/heading';
import BlogHeroImage from '../blog-components/hero-image';
import BlogSubheading from '../blog-components/subheading';
import BlogImage from '../blog-components/image';
import BlogDecorations from '../blog-components/decorations';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'A New Look for Koel Labs',
  slug: 'new-look-for-koel-labs',
  date: '2025-11-02',
  published: true,
  image: '/images/blog/new-look/blogNewLook.png',
  summary:
    'You might have noticed that we’ve given Koel Labs a fresh new look. This change is intended to better align us with our mission of pioneering inclusive speech technology, with our goals as a research-focused startup, and with our belief in openly sharing our work.',
  category: 'Announcement',
  tags: [
    {
      text: 'Website',
      url: 'https://koellabs.com',
    },
  ],
};

export default function PostBody() {
  return (
    <BlogBody>
      <div className="">
        <BlogHeading
          category={metadata.category}
          categoryColorClass="text-sky-600"
          title={metadata.title}
          dateISO={metadata.date}
          maxWidth={600}
        />
        <BlogHeroImage src="/images/blog/new-look/5.jpeg" alt="A New Look for Koel Labs" />
        <br></br>
        <div className="relative lg:col-span-3 max-w-3xl mx-auto mt-12">
          <BlogDecorations />
          <div
            className={`relative flex h-full flex-col tracking-[-0.010em] text-lg ${sourceSerif.className}`}
          >
            <BlogSubheading>A Fresh New Look</BlogSubheading>
            <p className="mb-4">
              You might have noticed that we’ve given Koel Labs a fresh new look. This change is
              intended to better align us with our mission of pioneering inclusive speech
              technology, with our goals as a research-focused startup, and with our belief in
              openly sharing our work.
            </p>
            <p className="mb-4">
              Over the last few months, we’ve built a new state-of-the-art model for phonetic
              transcription, published multiple datasets, and developed internal exploratory tools,
              all while writing papers and showcasing our research.
            </p>
            <p className="mb-10">
              Explore our website and sign up for the waitlist to be the first to experience our
              previews!
            </p>

            <div className="grid gap-6">
              <BlogImage
                src="/images/blog/new-look/2.jpeg"
                alt="New Look preview 2"
                width={1200}
                height={800}
                expanded={false}
                sizes="(max-width: 640px) 100vw, 50vw"
                className=""
              />
              <BlogImage
                src="/images/blog/new-look/3.jpeg"
                alt="New Look preview 3"
                width={1200}
                height={800}
                expanded={false}
                sizes="(max-width: 640px) 100vw, 50vw"
                className=""
              />
              <BlogImage
                src="/images/blog/new-look/4.jpeg"
                alt="New Look preview 4"
                width={1200}
                height={800}
                expanded={false}
                sizes="(max-width: 640px) 100vw, 50vw"
                className=""
              />
              <BlogImage
                src="/images/blog/new-look/5.jpeg"
                alt="New Look preview 5"
                width={1200}
                height={800}
                expanded={false}
                sizes="(max-width: 640px) 100vw, 50vw"
                className=""
              />
              <BlogImage
                src="/images/blog/new-look/6.jpeg"
                alt="New Look preview 6"
                width={1200}
                height={800}
                expanded={false}
                sizes="(max-width: 640px) 100vw, 50vw"
                className=""
              />
              <BlogImage
                src="/images/blog/new-look/7.jpeg"
                alt="New Look preview 7"
                width={1200}
                height={800}
                expanded={false}
                sizes="(max-width: 640px) 100vw, 50vw"
                className=""
              />
              <BlogImage
                src="/images/blog/new-look/8.jpeg"
                alt="New Look preview 8"
                width={1200}
                height={800}
                expanded={false}
                sizes="(max-width: 640px) 100vw, 50vw"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </BlogBody>
  );
}

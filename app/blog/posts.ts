import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export type Metadata = {
  title: string;
  slug: string;
  date: string;
  published: boolean;
  image: string;
  summary: string;
  category: 'Technical Report' | 'Announcement' | 'Tutorial' | 'Language Learning' | 'Other';
};

export type Post = Metadata & {
  content: () => JSX.Element;
};

export const getPosts = cache(async () => {
  const files = await fs.readdir('./app/blog/posts/');

  const posts = await Promise.all(
    files
      .filter(file => path.extname(file) === '.tsx')
      .map(async file => {
        const post = await import(`./posts/${file}`);
        const metadata = post.metadata;

        if (!metadata.published) {
          return null;
        }

        const content = post.default;
        return { ...metadata, content } as Post;
      }),
  );

  return posts.filter(p => p !== null);
});

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}

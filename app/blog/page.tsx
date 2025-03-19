// The main blog page where the user can see all the blog posts.
// Checkout posts.ts for general utility functions, post loading/caching, and post type definitions.
// Checkout [slug]/page.tsx for the individual blog post page (this is the general layout for all blog posts).
// Checkout posts/*.tsx for individual blog post content.

import Header from '@/components/ui/1 - header';
import BlogList from './bloglist';

export default function BlogPage() {
  return (
    <div className="flex-col flex w-screen relative scroll-smooth">
      <div className="z-2 sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <BlogList />
    </div>
  );
}

import Markdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/ui/header';
import Footer from '@/components/sections/footer';
import styles from './legal-document.module.css';

const rawBase = 'https://raw.githubusercontent.com/KoelLabs/.github/refs/heads/main/';
const sourceBase = 'https://github.com/KoelLabs/.github/blob/main/';

function resolveUrl(value: string, key: string) {
  const safeUrl = defaultUrlTransform(value);
  if (!safeUrl || safeUrl.startsWith('#')) return safeUrl;

  const url = new URL(safeUrl, key === 'src' ? rawBase : sourceBase);
  if (key === 'href' && url.origin === 'https://github.com') {
    if (url.pathname === '/KoelLabs/.github/blob/main/PRIVACY.md') {
      return `/privacy${url.search}${url.hash}`;
    }
    if (url.pathname === '/KoelLabs/.github/blob/main/TERMS.md') {
      return `/terms${url.search}${url.hash}`;
    }
  }
  return url.href;
}

export default async function LegalDocument({
  document,
  title,
}: {
  document: 'PRIVACY' | 'TERMS';
  title: string;
}) {
  let markdown: string | null = null;
  try {
    const response = await fetch(`${rawBase}${document}.md`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) markdown = await response.text();
  } catch {
    // Keep the source document accessible if GitHub cannot be reached.
  }

  return (
    <div className="relative bg-white text-neutral-900">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <article className={styles.document}>
          {markdown ? (
            <Markdown remarkPlugins={[remarkGfm]} urlTransform={resolveUrl}>
              {markdown}
            </Markdown>
          ) : (
            <>
              <h1>{title}</h1>
              <p role="alert">
                This document could not be loaded. Please read it on GitHub using the link below.
              </p>
            </>
          )}
        </article>
        <p className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <a
            href={`${sourceBase}${document}.md`}
            className="underline underline-offset-4 hover:text-sky-700"
          >
            View on GitHub
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
}

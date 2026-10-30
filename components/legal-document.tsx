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
      {/* Same line framing as the research page: vertical guides on the container edges, full-width
          rules around the document, and white fades so the lines trail off at the top and sides */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-0 z-[2] h-36 w-full bg-gradient-to-b from-white via-white via-10% to-transparent"></div>
        <div className="pointer-events-none absolute top-0 left-0 z-[2] hidden h-full w-36 bg-gradient-to-r from-white via-white via-10% to-transparent 2xl:block"></div>
        <div className="pointer-events-none absolute top-0 right-0 z-[2] hidden h-full w-36 bg-gradient-to-l from-white via-white via-10% to-transparent 2xl:block"></div>

        <div className="mx-auto h-20 w-full max-w-4xl border-x sm:h-32"></div>
        <div className="relative border-y">
          <main className="mx-auto max-w-4xl border-x px-6 py-12 sm:px-12 sm:py-16">
            <article className={styles.document}>
              {markdown ? (
                <Markdown remarkPlugins={[remarkGfm]} urlTransform={resolveUrl}>
                  {markdown}
                </Markdown>
              ) : (
                <>
                  <h1>{title}</h1>
                  <p role="alert">
                    This document could not be loaded. Please read it on GitHub using the link
                    below.
                  </p>
                </>
              )}
            </article>
          </main>
        </div>
        <div className="mx-auto h-12 w-full max-w-4xl border-x"></div>
        <div className="relative border-y">
          <p className="mx-auto max-w-4xl border-x px-6 py-5 text-sm text-neutral-500 sm:px-12">
            <a
              href={`${sourceBase}${document}.md`}
              className="underline underline-offset-4 hover:text-sky-700"
            >
              View on GitHub
            </a>
          </p>
        </div>
        <div className="mx-auto h-20 w-full max-w-4xl border-x sm:h-32"></div>
      </div>
      <Footer />
    </div>
  );
}

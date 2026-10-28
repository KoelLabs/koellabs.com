import localFont from 'next/font/local';

// Self-hosted (latin subset from Google Fonts) so builds don't depend on fetching fonts.googleapis.com
export const inter = localFont({
  src: './Inter-latin.woff2',
  weight: '100 900',
});

export const sourceSerif = localFont({
  src: './SourceSerif4-latin.woff2',
  weight: '400 700',
});

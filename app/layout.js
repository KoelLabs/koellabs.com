import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://koellabs.com'),
  title: 'Koel Labs',
  description:
    'Your new favorite tool for pronunciation learning. Other methods for pronunciation learning are often outdated, lack accessibility, and are ultimately boring. Large classrooms and most language apps fail to provide personalized feedback, leaving already struggling learners to self-evaluate, which is often ineffective. Language learners, like us and our families, desperately need a change—and we aim to be just that.',
  openGraph: {
    title: 'Koel Labs',
    description:
      'Your new favorite tool for pronunciation learning. Other methods for pronunciation learning are often outdated, lack accessibility, and are ultimately boring. Large classrooms and most language apps fail to provide personalized feedback, leaving already struggling learners to self-evaluate, which is often ineffective. Language learners, like us and our families, desperately need a change—and we aim to be just that.',
    url: 'https://www.koellabs.com',
    siteName: 'Koel Labs',
    images: [
      {
        url: '/openGraph.png',
        width: 1600,
        height: 900,
        alt: 'An image with Koel Labs written on it.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

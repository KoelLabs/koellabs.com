import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/animations.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { ReactScan } from '@/components/react-scan';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  themeColor: 'white',
};

export const metadata = {
  metadataBase: new URL('https://koellabs.com'),
  title: {
    template: '%s | Koel Labs',
    default: 'Koel Labs - Speech research for every accent, dialect, and speaker',
  },
  description:
    'Koel Labs is a speech research lab building open models, benchmarks, and datasets so that speech technology works for every accent, dialect, and speaker.',
  keywords: [
    'speech research',
    'phonetic transcription',
    'speech recognition',
    'accent and dialect fairness',
    'atypical speech',
    'speech datasets',
  ],
  openGraph: {
    title: 'Koel Labs',
    description:
      'Koel Labs is a speech research lab building open models, benchmarks, and datasets so that speech technology works for every accent, dialect, and speaker.',
    url: 'https://koellabs.com',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Koel Labs',
    card: 'summary_large_image',
    description:
      'Koel Labs is a speech research lab building open models, benchmarks, and datasets so that speech technology works for every accent, dialect, and speaker.',
    images: ['/openGraph.png'],
  },
  alternates: {
    canonical: 'https://koellabs.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <ReactScan />
      <head>
        <Script id="org-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Koel Labs",
              "alternateName": ["KoelLabs", "Koel"],
              "url": "https://koellabs.com",
              "logo": "https://koellabs.com/logo.png",
              "sameAs": [
                "https://twitter.com/koellabs",
                "https://github.com/koellabs",
                "https://huggingface.co/KoelLabs",
                "https://www.linkedin.com/company/koel-labs/"
              ],
              "description": "Koel Labs is a speech research lab building open models, benchmarks, and datasets so that speech technology works for every accent, dialect, and speaker.",
              "foundingDate": "2024",
              "knowsAbout": [
                "Speech Technology",
                "Phonetic Transcription",
                "Automatic Speech Recognition",
                "Natural Language Processing",
                "Artificial Intelligence"
              ],
              "areaServed": "Worldwide",
              "email": "info@koellabs.com",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Alexander Metzger",
                  "jobTitle": "Chief Executive Officer",
                  "image": "https://koellabs.com/images/alexShot.jpg",
                  "sameAs": "https://www.linkedin.com/in/alexander-le-metzger/"
                },
                {
                  "@type": "Person",
                  "name": "Aruna Srivastava",
                  "jobTitle": "Chief Technology Officer",
                  "image": "https://koellabs.com/images/arunaShot.jpg",
                  "sameAs": "https://www.linkedin.com/in/arunasr/"
                },
                {
                  "@type": "Person",
                  "name": "Ruslan Mukhamedvaleev",
                  "jobTitle": "Chief Product Officer",
                  "image": "https://koellabs.com/images/ruslanShot.jpg",
                  "sameAs": [
                    "https://github.com/digitalRM",
                    "https://www.linkedin.com/in/ruslan-muk/", 
                    "https://www.instagram.com/ruslan_mk11/",
                    "https://www.ruslan.in",
                    "https://builders.mozilla.org/profile/ruslan-mukhamedvaleev/"
                  ]
                }
              ]
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className} dark:bg-black`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

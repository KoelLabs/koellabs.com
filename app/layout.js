import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  themeColor: 'white',
};

export const metadata = {
  metadataBase: new URL('https://koellabs.com'),
  title: {
    template: '%s | Koel Labs',
    default: 'Koel Labs - Your new favorite tool for pronunciation learning',
  },
  description:
    'Your new favorite tool for pronunciation learning. Other methods for pronunciation learning are often outdated, lack accessibility, and are ultimately boring. Language learners, like us and our families, desperately need a change—and we aim to be just that.',
  keywords: [
    'pronunciation learning',
    'AI language learning',
    'speech technology',
    'language education',
    'pronunciation assessment',
  ],
  openGraph: {
    title: 'Koel Labs',
    description:
      'Your new favorite tool for pronunciation learning. Other methods for pronunciation learning are often outdated, lack accessibility, and are ultimately boring. Language learners, like us and our families, desperately need a change—and we aim to be just that.',
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
    description: 'Pioneering AI-powered pronunciation learning platform',
    images: ['/openGraph.png'],
  },
  alternates: {
    canonical: 'https://koellabs.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
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
                "https://www.linkedin.com/company/koellabs"
              ],
              "description": "Koel Labs is your new favorite tool for pronunciation learning. Other methods for pronunciation learning are often outdated, lack accessibility, and are ultimately boring. Language learners, like us and our families, desperately need a change—and we aim to be just that.",
              "foundingDate": "2024",
              "knowsAbout": [
                "Pronunciation Learning",
                "Speech Technology",
                "Artificial Intelligence",
                "Language Education",
                "Educational Technology"
              ],
              "areaServed": "Worldwide",
              "email": "info@koellabs.com",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Alexander Metzger",
                  "jobTitle": "Chief Executive Officer",
                  "image": "https://koellabs.com/images/alexShot.png",
                  "sameAs": "https://www.linkedin.com/in/alexander-le-metzger/"
                },
                {
                  "@type": "Person",
                  "name": "Aruna Srivastava",
                  "jobTitle": "Chief Technology Officer",
                  "image": "https://koellabs.com/images/arunaShot.png",
                  "sameAs": "https://www.linkedin.com/in/arunasr/"
                },
                {
                  "@type": "Person",
                  "name": "Ruslan Mukhamedvaleev",
                  "jobTitle": "Chief Product Officer",
                  "image": "https://koellabs.com/images/ruslanShot.png",
                  "sameAs": [
                    "https://github.com/digitalRM",
                    "https://www.linkedin.com/in/ruslan-muk/", 
                    "https://www.instagram.com/ruslan_mk11/",
                    "https://builders.mozilla.org/profile/ruslan-mukhamedvaleev/"
                  ]
                }
              ]
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

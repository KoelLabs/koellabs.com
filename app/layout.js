import { Inter } from "next/font/google";
import "./globals.css";

// This is the banner for the FOYM website. Delete this before deploying!
import Banner from "@/components/sections/999 - banner";

const inter = Inter({ subsets: ["latin"] });

// This is the metadata for the website. Change the values to match your website. Upload the openGraph.png to your public folder
export const metadata = {
  metadataBase: new URL('https://www.foym.org/'),
  title: " - An FOYM Template",
  description: "",
  openGraph: {
    title: " - An FOYM Template",
    description: "",
    url: '',
    siteName: ' - An FOYM Template',
    // images: [
    //   {
    //     url: '/openGraph.png',
    //     width: 1600,
    //     height: 900,
    //     alt: 'An image of the website\s name "Template - An FOYM Template" and star like characters in the background pointing at the name',
    //   },
    // ], 
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* This is the banner for the FOYM website. Feel free to delete this! */}
        <Banner />
        
        {children}</body>
    </html>
  );
}

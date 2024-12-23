import Hero from '@/components/sections/1 - Hero.jsx';
import Bento from '@/components/sections/2 - Bento';
import Header from '@/components/ui/1 - header';
import CTA from '@/components/sections/3 - CTA';
import Footer from '@/components/sections/4 - Footer';
export default function Home() {
  return (
    <div className="flex-col flex w-screen relative scroll-smooth">
      <div className="z-[1] sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <Hero />
      <Bento />
      <CTA />
      <Footer />
    </div>
  );
}

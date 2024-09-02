import Hero from '@/components/sections/1 - Hero';
import Logos from '@/components/sections/2 - Logo';
import Header from '@/components/ui/1 - header';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex-col flex w-screen relative scroll-smooth">
            <div className="z-10 sticky top-0 mx-auto w-full">
                <Header />
            </div>
            <Hero />
            <Logos />
        </div>
    );
}

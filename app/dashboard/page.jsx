'use server';
import RecommendedClips from '@/components/ui/dashboard/RecommendedClips';
import RevisitClips from '@/components/ui/dashboard/RevisitClips';
import ImportVideos from '@/components/ui/dashboard/ImportVideos';
import HelpCenter from '@/components/ui/dashboard/HelpCenter';

const clips = [
  {
    title: 'Friends - Funny Moments From Season 8',
    duration: '8:46',
    thumbnail: '/images/thumbnails/friends-season-8.webp',
    url: '#',
  },
  {
    title: "Schitt's Creek - Birthday Plans",
    duration: '2:08',
    thumbnail: '/images/thumbnails/schitts-creek-birthday-plans.jpg',
    url: '#',
  },
  {
    title: 'The Office US - Michael is a Terrible Secret Keeper',
    duration: '4:29',
    thumbnail: '/images/thumbnails/the-office-michael-secret-keeper.jpg',
    url: '#',
  },
];

export default async function Page() {
  return (
    <div className="h-full rounded-md relative">
      <HelpCenter />
      <ImportVideos />
      <RevisitClips clips={clips} />
      <RecommendedClips clips={clips} />
    </div>
  );
}

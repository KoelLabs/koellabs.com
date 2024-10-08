'use server';
import RecommendedClips from '@/components/ui/dashboard/RecommendedClips';
import RevisitClips from '@/components/ui/dashboard/RevisitClips';
import ImportVideos from '@/components/ui/dashboard/ImportVideos';
import HelpCenter from '@/components/ui/dashboard/HelpCenter';

const clips = [
  {
    title: 'Friends Season 1 - Clip Joey and Chandler',
    duration: '1:26',
    url: '#',
  },
  {
    title: 'Schitts Creek Season 3 - Clip David and Alexis',
    duration: '2:32',
    url: '#',
  },
  {
    title: 'The Office Season 1 - Clip Jim and Dwight',
    duration: '1:12',
    url: '#',
  },
];

export default async function Page() {
  return (
    <div className="h-full rounded-md relative">
      <HelpCenter />
      <ImportVideos />
      <RecommendedClips />
      <RevisitClips clips={clips} />
      {/* <div className="p-4">
            <div className="flex items-center justify-center gap-2 aspect-video border-2 border-dashed border-accent rounded-2xl bg-neutral-200/50 border-neutral-300 w-full"></div>
          </div> */}
    </div>
  );
}

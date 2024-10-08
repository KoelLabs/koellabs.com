'use server';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarLayout, SidebarTrigger } from '@/components/ui/sidebar';
import RecommendedClips from '@/components/ui/dashboard/RecommendedClips';
import RevisitClips from '@/components/ui/dashboard/RevisitClips';
import ImportVideos from '@/components/ui/dashboard/ImportVideos';
import HelpCenter from '@/components/ui/dashboard/HelpCenter';
import { ThemeProvider } from '@/components/ui/base/theme-provider';

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
  const { cookies } = await import('next/headers');
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarLayout defaultOpen={cookies().get('sidebar:state')?.value === 'true'}>
        <AppSidebar />
        <main className="flex flex-1 flex-col p-0 transition-all duration-150 ease-in-out w-full">
          <div className="h-full rounded-md relative">
            <HelpCenter />
            <ImportVideos />
            <RecommendedClips />
            <RevisitClips clips={clips} />
            {/* <div className="p-4">
            <div className="flex items-center justify-center gap-2 aspect-video border-2 border-dashed border-accent rounded-2xl bg-neutral-200/50 border-neutral-300 w-full"></div>
          </div> */}
          </div>
        </main>
      </SidebarLayout>
    </ThemeProvider>
  );
}

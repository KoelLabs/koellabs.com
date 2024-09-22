'use server';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarLayout, SidebarTrigger } from '@/components/ui/sidebar';

export default async function Page() {
  const { cookies } = await import('next/headers');
  return (
    <SidebarLayout defaultOpen={cookies().get('sidebar:state')?.value === 'true'}>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-150 ease-in-out">
        <div className="h-full rounded-md p-1.5 relative">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 pb-4">
            <div className="flex items-center justify-center gap-2 aspect-video border-2 border-dashed border-accent rounded-2xl bg-neutral-200/50 border-neutral-300 w-full"></div>
            <div className="flex items-center justify-center gap-2 aspect-video border-2 border-dashed border-accent rounded-2xl bg-neutral-200/50 border-neutral-300 w-full"></div>
            <div className="flex items-center justify-center gap-2 aspect-video border-2 border-dashed border-accent rounded-2xl bg-neutral-200/50 border-neutral-300 w-full"></div>
            <div className="flex items-center justify-center gap-2 aspect-video border-2 border-dashed border-accent rounded-2xl bg-neutral-200/50 border-neutral-300 w-full"></div>
          </div>
          <div className="flex items-center justify-center gap-2 aspect-video border-2 border-dashed border-accent rounded-2xl bg-neutral-200/50 border-neutral-300 w-full"></div>
        </div>
      </main>
    </SidebarLayout>
  );
}

'use server';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarLayout, SidebarTrigger } from '@/components/ui/sidebar';
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

export default async function DashboardLayout({ children }) {
  const { cookies } = await import('next/headers');
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarLayout defaultOpen={cookies().get('sidebar:state')?.value === 'true'}>
        <AppSidebar />
        <main className="flex flex-1 flex-col p-0 transition-all duration-150 ease-in-out w-full">
          {children}
        </main>
      </SidebarLayout>
    </ThemeProvider>
  );
}

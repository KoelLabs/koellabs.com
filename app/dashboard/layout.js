'use server';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarLayout, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/ui/base/theme-provider';

export default async function DashboardLayout({ children }) {
  const { cookies } = await import('next/headers');
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <SidebarLayout defaultOpen={cookies().get('sidebar:state')?.value === 'true'}>
        <AppSidebar />
        <main className="flex flex-1 flex-col p-0 transition-all duration-150 ease-in-out w-full dark:bg-black">
          {children}
        </main>
      </SidebarLayout>
    </ThemeProvider>
  );
}

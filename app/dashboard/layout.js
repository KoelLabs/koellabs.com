'use server';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarLayout } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/ui/base/theme-provider';
import { cookies } from 'next/headers';

export default async function DashboardLayout({ children }) {
  const cook = await cookies();
  const sidebarCookie = cook.get('sidebar:state');
  const defaultOpen = sidebarCookie?.value !== 'false';

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <SidebarLayout defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="flex flex-1 flex-col transition-all duration-150 ease-in-out w-full bg-neutral-50 dark:bg-neutral-900">
          <div className="mt-4 ml-4 rounded-tl-xl rounded-br-xl border-t border-l bg-white/90 backdrop-blur-md  dark:bg-black border-neutral-200 dark:border-neutral-800 h-full relative z-[1]">
            {children}
          </div>
        </main>
      </SidebarLayout>
    </ThemeProvider>
  );
}

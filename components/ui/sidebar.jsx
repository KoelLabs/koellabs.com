'use client';
import * as React from 'react';
import { PanelLeft } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/styles';
import { Button } from '@/components/ui/base/button';
import { Sheet, SheetContent } from '@/components/ui/base/sheet';
import { useReducedMotion } from 'framer-motion';

export const SIDEBAR_STATE_COOKIE = 'sidebar:state';

const SidebarContext = React.createContext({
  state: 'open',
  open: true,
  onOpenChange: () => {},
});

function useSidebar() {
  return React.useContext(SidebarContext);
}

const SidebarLayout = React.forwardRef(({ defaultOpen, className, ...props }, ref) => {
  const [open, setOpen] = React.useState(defaultOpen !== false);

  const onOpenChange = React.useCallback(open => {
    setOpen(open);
    document.cookie = `${SIDEBAR_STATE_COOKIE}=${open}; path=/; max-age=${60 * 60 * 24 * 7}`;
  }, []);

  const state = open ? 'open' : 'closed';

  return (
    <SidebarContext.Provider value={{ state, open, onOpenChange }}>
      <div
        ref={ref}
        data-sidebar={state}
        style={{
          '--sidebar-width': open ? '16rem' : '4rem',
        }}
        className={cn(
          'flex min-h-screen bg-accent/50 pl-0 transition-all duration-150 ease-in-out  special:pl-(--sidebar-width)',
          className,
        )}
        {...props}
      />
    </SidebarContext.Provider>
  );
});
SidebarLayout.displayName = 'SidebarLayout';

const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { open, onOpenChange } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn('h-8 w-8', className, { 'fixed bottom-2 left-2': !open })}
      onClick={() => onOpenChange(!open)}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const Sidebar = React.forwardRef(({ className, children }, ref) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { open, onOpenChange } = useSidebar();

  const sidebar = (
    <div
      ref={ref}
      className={cn(
        'flex h-full flex-col border-r bg-background',
        prefersReducedMotion ? '' : 'transition-all duration-150 ease-in-out',
        open ? 'w-64' : 'w-16',

        className,
      )}
    >
      {children}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          className="w-[260px] p-0 md:w-(--sidebar-width) [&>button]:hidden"
          side="left"
        >
          {sidebar}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-10 hidden md:block',
        prefersReducedMotion ? '' : 'transition-all duration-150 ease-in-out',
        open ? 'w-64' : 'w-16',
      )}
    >
      {sidebar}
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex items-center border-b px-2.5 py-2', className)} {...props} />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex items-center border-t px-2.5 py-2', className)} {...props} />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-1 flex-col gap-5 overflow-auto py-4', className)}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('grid gap-2 px-2.5', className)} {...props} />;
});
SidebarItem.displayName = 'SidebarItem';

const SidebarLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-1.5 text-xs font-medium text-muted-foreground', className)}
      {...props}
    />
  );
});
SidebarLabel.displayName = 'SidebarLabel';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarLayout,
  SidebarTrigger,
  useSidebar,
};

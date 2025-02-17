import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/base/tooltip';

const NavItem = memo(({ item, isCollapsed, isActive }) => (
  <li>
    {isCollapsed ? (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.url}
              className={cn(
                'flex h-8 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2',
                isActive ? 'bg-accent text-accent-foreground' : '',
                isCollapsed ? 'justify-center h-10 w-full px-0' : '',
              )}
            >
              <item.icon className={`h-4 w-4 shrink-0${isCollapsed ? '' : ''}`} />
              {!isCollapsed && <div className="line-clamp-1">{item.title}</div>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Link
        href={item.url}
        className={cn(
          'flex h-8 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2',
          isActive ? 'bg-accent text-accent-foreground' : '',
        )}
      >
        <item.icon className={`h-4 w-4 shrink-0${isCollapsed ? '' : ''}`} />
        {!isCollapsed && <div className="line-clamp-1">{item.title}</div>}
      </Link>
    )}
  </li>
));

export const NavMain = memo(({ className, items, isCollapsed }) => {
  const url = usePathname();

  return (
    <ul className={cn('grid gap-0.5', isCollapsed ? '-mt-4' : '', className)}>
      {items.map(item => (
        <NavItem
          key={item.title}
          item={item}
          isCollapsed={isCollapsed}
          isActive={item.url === url}
        />
      ))}
    </ul>
  );
});

NavMain.displayName = 'NavMain';
NavItem.displayName = 'NavItem';

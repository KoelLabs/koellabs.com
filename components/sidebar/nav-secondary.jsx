import Link from 'next/link';
import { cn } from '@/lib/styles';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/base/tooltip';

export function NavSecondary({ className, items, isCollapsed }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className={cn('grid gap-0.5', className)}>
      {items.map(item => (
        <li key={item.title}>
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.url}
                    className={cn(
                      'flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2',
                      'justify-center h-10',
                    )}
                  >
                    <item.icon className={cn('h-4 w-4 shrink-0 text-muted-foreground')} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              href={item.url}
              className={cn(
                'flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2',
              )}
            >
              <item.icon className={cn('h-4 w-4 shrink-0 translate-x-0.5 text-muted-foreground')} />
              <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium text-muted-foreground">
                {item.title}
              </div>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

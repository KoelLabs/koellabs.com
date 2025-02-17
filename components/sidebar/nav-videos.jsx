import Link from 'next/link';
import { MoreHorizontal, PlusSquare, PencilLine, Trash2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/base/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/base/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/base/tooltip';
import { usePathname } from 'next/navigation';

export function NavVideos({ videos, className, isCollapsed }) {
  const url = usePathname();
  return (
    <ul className={cn('grid gap-0.5', isCollapsed ? '-mt-3' : '', className)}>
      {videos.map(item => (
        <li
          key={item.name}
          className="has-[[data-state=open]]:bg-accent has-[[data-state=open]]:text-accent-foreground group relative rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    prefetch
                    href={'/dashboard/' + item.id}
                    className={cn(
                      'flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2',
                      'justify-center h-10',
                      url.includes(item.id) ? 'bg-accent text-accent-foreground' : '',
                    )}
                  >
                    <item.icon className={cn('shrink-0 text-muted-foreground h-4 w-4')} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Link
                prefetch
                href={'/dashboard/' + item.id}
                className={cn(
                  'flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2',
                  url.includes(item.id) ? 'bg-accent text-accent-foreground' : '',
                )}
              >
                <item.icon
                  className={cn(
                    'shrink-0 text-muted-foreground h-4 w-4',
                    'translate-x-0.5 h-4 w-4',
                  )}
                />
                <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium">
                  {item.name}
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="peer absolute right-1 top-0.5 h-6 w-6 shrink-0 rounded-md bg-accent p-0 text-accent-foreground opacity-0 ring-ring transition-all focus-visible:ring-2 group-focus-within:opacity-100 group-hover:opacity-100 data-[state=open]:bg-accent data-[state=open]:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className=" rounded-lg w-44">
                  <DropdownMenuItem>
                    <div className="flex items-center justify-center mr-2" aria-hidden="true">
                      <PencilLine size={16} strokeWidth={2} className="opacity-60" />
                    </div>
                    <div className="mr-1">
                      <div className="text-sm font-normal text-foreground/90">Change Icon</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex items-center justify-center mr-2 group" aria-hidden="true">
                      <RotateCcw size={16} strokeWidth={2.2} className="text-red-500" />
                    </div>
                    <div>
                      <div className="text-sm font-normal text-red-500">Reset Progress</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center justify-center mr-2" aria-hidden="true">
                      <Trash2 size={16} strokeWidth={2} className=" text-red-500" />
                    </div>
                    <div>
                      <div className="text-sm font-normal text-red-500">Delete Clip</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

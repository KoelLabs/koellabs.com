import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function NavMain({ className, items, isCollapsed }) {
  const url = usePathname();

  return (
    <ul className={cn('grid gap-0.5', className)}>
      {items.map(item => (
        <li key={item.title}>
          <Link
            href={item.url}
            className={cn(
              'flex h-8 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2',
              item.url === url ? 'bg-accent text-accent-foreground' : '',
              isCollapsed ? 'justify-center h-10 w-full border px-0' : '',
            )}
          >
            <item.icon className={`h-4 w-4 shrink-0` + (isCollapsed ? '' : '')} />
            {!isCollapsed && <div className="line-clamp-1">{item.title}</div>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

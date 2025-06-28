import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  Laptop,
  LogOut,
  Moon,
  PanelsTopLeft,
  Sun,
  Trash2,
  RefreshCcw,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/base/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/base/dropdown-menu';
import { signOut } from '@/utils/authClient';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/base/skeleton';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function NavUser({ user, isCollapsed, isLoading }) {
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  const resetUserVideos = async () => {
    if (
      window.confirm(
        'Are you sure you want to reset your video history? This action cannot be undone.',
      )
    ) {
      try {
        setIsResetting(true);

        const response = await fetch('/api/resetUserVideos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Your video history has been reset.',
            variant: 'default',
          });

          // Dispatch event to update UI components
          window.dispatchEvent(
            new CustomEvent('koellabs:userVideosUpdated', {
              detail: { action: 'reset', timestamp: Date.now() },
              bubbles: true,
            }),
          );

          // Force page refresh to update UI
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          const error = await response.json();
          toast({
            title: 'Error',
            description: error.message || 'Failed to reset video history.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error resetting video history:', error);
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsResetting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Skeleton className="h-7 w-7 rounded-md" />
        {!isCollapsed && (
          <div className="flex-1">
            <Skeleton className="h-3.5 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
        )}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md outline-hidden ring-ring hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
          <Avatar className="h-7 w-7 rounded-md border">
            <AvatarImage
              src={user.picture}
              alt={user.name}
              className="animate-in fade-in-50 zoom-in-90"
            />
            <AvatarFallback className="rounded-sm ">{user.name[0] + user.name[1]}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <>
              <div className="grid flex-1 leading-none">
                <div className="font-medium line-clamp-1">
                  {user.name.length > 15 ? `${user.name.substring(0, 18)}...` : user.name}
                </div>
                <div className="overflow-hidden text-xs text-muted-foreground">
                  <div className="line-clamp-1">{user.email}</div>
                </div>
              </div>
              <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-muted-foreground/50" />
            </>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 w-full" align="end" side="right" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
            <Avatar className="h-7 w-7 rounded-md">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback className="bg-sky-400">{user.name[0] + user.name[1]}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1">
              <div className="font-medium">{user.name}</div>
              <div className="overflow-hidden text-xs text-muted-foreground">
                <div className="line-clamp-1">{user.email}</div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <PanelsTopLeft className="h-4 w-4 text-muted-foreground" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('system')} className="gap-2">
                  <Laptop className="h-4 w-4 text-muted-foreground" />
                  System
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('light')} className="gap-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="gap-2">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  Dark
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem className="gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 text-amber-600 hover:text-amber-700"
          onClick={resetUserVideos}
          disabled={isResetting}
        >
          {isResetting ? (
            <RefreshCcw className="h-4 w-4 text-amber-600 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 text-amber-600" />
          )}
          {isResetting ? 'Resetting...' : 'Reset Video History'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-red-600 hover:text-red-600" onClick={signOut}>
          <LogOut className="h-4 w-4 text-muted-foreground text-red-600" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

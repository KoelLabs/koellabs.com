'use client';

import * as React from 'react';

export function useSidebar() {
  const [open, setOpen] = React.useState(true);

  const onOpenChange = React.useCallback(value => {
    setOpen(value);

    // Set cookie to maintain state across page loads
    document.cookie = `sidebar_state=${value ? 'open' : 'closed'}; path=/; max-age=${60 * 60 * 24 * 7}`;
  }, []);

  // Toggle function for convenience
  const toggleSidebar = React.useCallback(() => {
    onOpenChange(!open);
  }, [open, onOpenChange]);

  // Read cookie on initial render
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    const sidebarCookie = cookies.find(cookie => cookie.trim().startsWith('sidebar_state='));
    if (sidebarCookie) {
      const value = sidebarCookie.split('=')[1].trim();
      setOpen(value === 'open');
    }
  }, []);

  return {
    open,
    onOpenChange,
    toggleSidebar,
    state: open ? 'expanded' : 'collapsed',
  };
}

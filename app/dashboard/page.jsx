'use client';

import SearchCenter from '@/components/ui/dashboard/SearchCenter';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Dispatch event to refresh sidebar when dashboard page is loaded
    const refreshEvent = new CustomEvent('koellabs:forceRefresh', {
      detail: { source: 'dashboard', timestamp: Date.now() },
      bubbles: true,
    });
    window.dispatchEvent(refreshEvent);

    // Also refresh when the page gets focus
    const handleFocus = () => {
      console.log('Dashboard page focused, refreshing sidebar');
      const focusEvent = new CustomEvent('koellabs:forceRefresh', {
        detail: { source: 'dashboard-focus', timestamp: Date.now() },
        bubbles: true,
      });
      window.dispatchEvent(focusEvent);
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div className="h-full rounded-md relative">
      <SearchCenter />
    </div>
  );
}

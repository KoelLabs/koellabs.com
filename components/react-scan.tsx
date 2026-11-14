'use client';

import { useEffect } from 'react';

export function ReactScan() {
  useEffect(() => {
    // The import is eliminated entirely from production builds.
    if (process.env.NODE_ENV === 'development') {
      void import('react-scan').then(({ scan }) => scan({ enabled: true }));
    }
  }, []);
  return null;
}

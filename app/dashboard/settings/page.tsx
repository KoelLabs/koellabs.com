'use client';

import React from 'react';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Label } from '@/components/ui/base/label';
import { Card, CardContent } from '@/components/ui/base/card';
import { Badge } from '@/components/ui/base/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base/select';

export default function SettingsPage() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center w-full gap-2 border-b border-dashed pb-2.5 border-neutral-300 dark:border-neutral-700">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tighter px-4 text-neutral-900 dark:text-neutral-100">
            Settings
          </h1>
        </div>
      </div>
    </div>
  );
}

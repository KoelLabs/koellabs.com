'use client';

import { Label } from '@/components/ui/base/label';
import { Textarea } from '@/components/ui/base/textarea';
import { Skeleton } from '@/components/ui/base/skeleton';

export default function ChallengingWordsSelector({
  label = 'Challenging Words',
  value,
  onChange,
  required = false,
  className = '',
  placeholder = "Words you find difficult or confusing (e.g., 'thorough', 'entrepreneur', 'rural')",
  maxLength = 500,
  isPending = false,
  optional = false,
}) {
  const handleChange = e => {
    onChange(e.target.value);
  };

  if (isPending) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label className="text-sm font-medium ml-0.5">{label}</Label>
        <Skeleton className="h-20 w-full rounded-xl mt-1" />
        <Skeleton className="h-4 w-26 rounded-lg mt-1" />
      </div>
    );
  }

  return (
    <div className={`space-y-2 text-left ${className}`}>
      <Label htmlFor="challengingWords" className="mb-2">
        {label}
        {required && (
          <span className="text-sky-600 ml-1" aria-hidden="true">
            *
          </span>
        )}
        {optional && <span className="text-xs text-neutral-500 ml-1">(Optional)</span>}
      </Label>
      <Textarea
        id="challengingWords"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="min-h-[100px] mt-1 rounded-xl resize-none p-3"
        maxLength={maxLength}
      />
      {maxLength && (
        <p className="text-xs text-neutral-400 mt-1">
          {value?.length || 0}/{maxLength} characters
        </p>
      )}
    </div>
  );
}

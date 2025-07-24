'use client';

import { Label } from '@/components/ui/base/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base/select';

const experienceLevels = [
  { value: '0', emoji: '🌱', name: 'Complete Beginner (0 years)' },
  { value: '0-1', emoji: '🌿', name: 'Less than 1 year' },
  { value: '1-2', emoji: '🌳', name: '1-2 years' },
  { value: '2-5', emoji: '🎯', name: '2-5 years' },
  { value: '5-10', emoji: '🚀', name: '5-10 years' },
  { value: '10+', emoji: '⭐', name: 'More than 10 years' },
  { value: 'native-level', emoji: '👑', name: 'Native/Near-native level' },
];

export default function ExperienceLevelSelector({
  label,
  value,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select experience level',
}) {
  const MandatoryStar = () => (
    <span className="text-sky-600" aria-hidden="true">
      *
    </span>
  );

  return (
    <div className={`space-y-2 text-left ${className}`}>
      <Label className="mb-2">
        {label} {required && <MandatoryStar />}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-xl mt-1">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {experienceLevels.map(level => (
            <SelectItem key={level.value} value={level.value}>
              <span className="flex items-center gap-2">
                <span>{level.emoji}</span>
                <span>{level.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Export experience levels for other components that might need the data
export { experienceLevels };

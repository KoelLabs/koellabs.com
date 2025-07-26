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

export default function BetaExperienceLevelSelector({
  label = 'How many years have you studied this language?',
  value,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select your experience level',
}) {
  const selectedExperience = experienceLevels.find(level => level.value === value);

  return (
    <div className={`space-y-2 text-left ${className}`}>
      <Label htmlFor="experienceLevel" className="mb-2">
        {label}
        {required && (
          <span className="text-sky-600 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          id="experienceLevel"
          className="h-10 mt-1 rounded-xl focus:ring-0 focus:ring-offset-0"
        >
          {selectedExperience ? (
            <SelectValue className="pl-2">
              <span className="flex items-center">
                <span className="mr-2">{selectedExperience.emoji}</span>
                <span>{selectedExperience.name}</span>
              </span>
            </SelectValue>
          ) : (
            <p className="text-muted-foreground">{placeholder}</p>
          )}
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {experienceLevels.map(level => (
            <SelectItem
              className="pl-2 rounded-lg"
              key={level.value}
              value={level.value}
              rightCheck={true}
            >
              <span className="flex items-center">
                <span className="mr-2">{level.emoji}</span>
                <span>{level.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Export experience levels for other components
export { experienceLevels };

'use client';

import { Label } from '@/components/ui/base/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base/select';
import { ArrowUpRight } from 'lucide-react';

const languages = [
  { value: 'english', flag: '🇺🇸', name: 'English' },
  { value: 'spanish', flag: '🇪🇸', name: 'Spanish (Coming soon)', disabled: true },
  { value: 'german', flag: '🇩🇪', name: 'German (Coming soon)', disabled: true },
  { value: 'russian', flag: '🇷🇺', name: 'Russian (Coming soon)', disabled: true },
];

export default function TargetLanguageSelector({
  label = 'What language do you want to learn?',
  value,
  onChange,
  required = false,
  className = '',
}) {
  const selectedLanguage = languages.find(lang => lang.value === value);

  return (
    <div className={`space-y-2 text-left ${className}`}>
      <Label htmlFor="targetLanguage" className="mb-2">
        {label}
        {required && (
          <span className="text-sky-600 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      <div className="relative">
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger
            id="targetLanguage"
            className="h-10 mt-1 rounded-xl focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue>
              {selectedLanguage ? (
                <span className="flex items-center">
                  <span className="mr-2">{selectedLanguage.flag}</span>
                  <span>{selectedLanguage.name}</span>
                </span>
              ) : (
                <span className="text-muted-foreground flex items-center">
                  <span className="mr-2">🇺🇸</span>
                  <span>English</span>
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-neutral-100 dark:bg-neutral-900" noPadding={true}>
            <div className="p-1 rounded-xl border-b bg-white">
              {languages.map(language => (
                <SelectItem
                  className="pl-2 rounded-lg"
                  key={language.value}
                  value={language.value}
                  disabled={language.disabled}
                  noCheck={true}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{language.flag}</span>
                    <span>{language.name}</span>
                  </span>
                </SelectItem>
              ))}
            </div>
            <div className="p-3 max-w-[608px] bg-neutral-100 dark:bg-neutral-900 text-balance">
              <p className="text-sm text-neutral-500 tracking-tight">
                During the beta phase, we're focusing on English. In the future, we plan to expand
                to other languages. Want to suggest what comes next?{' '}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeKziYp-3pTI1Ptnk70RSZ1ryQSDJfUrZagrAuIsDSKr3YvWw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline inline-block"
                >
                  Submit a request here
                  <ArrowUpRight
                    aria-hidden="true"
                    className="w-4 h-4 inline-block -mt-0.5 ml-0.5"
                  />
                </a>
              </p>
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Export languages for other components
export { languages };

'use client';

import { useState, useId, Fragment } from 'react';
import { Button } from '@/components/ui/base/button';
import { Label } from '@/components/ui/base/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/base/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/base/popover';
import { ArrowUpRight, CheckIcon, ChevronDownIcon } from 'lucide-react';

const languageGroups = [
  {
    group: 'Most Common',
    languages: [
      {
        Code: 'en',
        NativeName: 'English (American)',
        Flag: '🇺🇸',
        EnglishName: 'English (American)',
      },
      { Code: 'es', NativeName: 'Español (España)', EnglishName: 'Spanish (Spain)', Flag: '🇪🇸' },
      { Code: 'zh', NativeName: '中文（简体）', EnglishName: 'Chinese (Simplified)', Flag: '🇨🇳' },
      { Code: 'hi', NativeName: 'हिन्दी', Flag: '🇮🇳', EnglishName: 'Hindi' },
      { Code: 'ar', NativeName: 'العربية', Flag: '🇸🇦', EnglishName: 'Arabic' },
      {
        Code: 'pt-PT',
        NativeName: 'Português (Portugal)',
        Flag: '🇵🇹',
        EnglishName: 'Portuguese (Portugal)',
      },
      { Code: 'ru', NativeName: 'Русский', Flag: '🇷🇺', EnglishName: 'Russian' },
      { Code: 'ja', NativeName: '日本語', Flag: '🇯🇵', EnglishName: 'Japanese' },
      { Code: 'de', NativeName: 'Deutsch', Flag: '🇩🇪', EnglishName: 'German' },
      { Code: 'fr-FR', NativeName: 'Français (France)', Flag: '🇫🇷', EnglishName: 'French' },
    ],
  },
  {
    group: 'Germanic Languages',
    languages: [
      {
        Code: 'en-AU',
        NativeName: 'English (Australia)',
        Flag: '🇦🇺',
        EnglishName: 'English (Australia)',
      },
      {
        Code: 'en-CA',
        NativeName: 'English (Canada)',
        Flag: '🇨🇦',
        EnglishName: 'English (Canada)',
      },
      {
        Code: 'en-GB',
        NativeName: 'English (United Kingdom)',
        Flag: '🇬🇧',
        EnglishName: 'English (UK)',
      },
      { Code: 'nl', NativeName: 'Nederlands', Flag: '🇳🇱', EnglishName: 'Dutch' },
      { Code: 'da', NativeName: 'Dansk', Flag: '🇩🇰', EnglishName: 'Danish' },
      { Code: 'no', NativeName: 'Norsk', Flag: '🇳🇴', EnglishName: 'Norwegian' },
      { Code: 'sv', NativeName: 'Svenska', EnglishName: 'Swedish', Flag: '🇸🇪' },
      { Code: 'is', NativeName: 'Íslenska', Flag: '🇮🇸', EnglishName: 'Icelandic' },
      { Code: 'af', NativeName: 'Afrikaans', Flag: '🇿🇦', EnglishName: 'Afrikaans' },
    ],
  },
  {
    group: 'Romance Languages',
    languages: [
      {
        Code: 'es-419',
        NativeName: 'Español (Latinoamérica)',
        EnglishName: 'Spanish (Latin America)',
        Flag: '🌎',
      },
      {
        Code: 'es-US',
        NativeName: 'Español (Estados Unidos)',
        EnglishName: 'Spanish (United States)',
        Flag: '🇺🇸',
      },
      {
        Code: 'fr-CA',
        NativeName: 'Français (Canada)',
        Flag: '🇨🇦',
        EnglishName: 'French (Canada)',
      },
      {
        Code: 'pt-BR',
        NativeName: 'Português (Brasil)',
        Flag: '🇧🇷',
        EnglishName: 'Portuguese (Brazil)',
      },
      { Code: 'it', NativeName: 'Italiano', Flag: '🇮🇹', EnglishName: 'Italian' },
      { Code: 'ro', NativeName: 'Română', Flag: '🇷🇴', EnglishName: 'Romanian' },
      { Code: 'ca', NativeName: 'Català', Flag: '🇪🇸', EnglishName: 'Catalan' },
      { Code: 'gl', NativeName: 'Galego', Flag: '🇪🇸', EnglishName: 'Galician' },
      { Code: 'rm', NativeName: 'Rumantsch', Flag: '🇨🇭', EnglishName: 'Romansh' },
    ],
  },
  {
    group: 'Slavic Languages',
    languages: [
      { Code: 'pl', NativeName: 'Polski', Flag: '🇵🇱', EnglishName: 'Polish' },
      { Code: 'uk', NativeName: 'Українська', Flag: '🇺🇦', EnglishName: 'Ukrainian' },
      { Code: 'cs', NativeName: 'Čeština', Flag: '🇨🇿', EnglishName: 'Czech' },
      { Code: 'sk', NativeName: 'Slovenčina', Flag: '🇸🇰', EnglishName: 'Slovak' },
      { Code: 'hr', NativeName: 'Hrvatski', Flag: '🇭🇷', EnglishName: 'Croatian' },
      { Code: 'sr', NativeName: 'Српски', Flag: '🇷🇸', EnglishName: 'Serbian' },
      { Code: 'sl', NativeName: 'Slovenščina', Flag: '🇸🇮', EnglishName: 'Slovenian' },
      { Code: 'bg', NativeName: 'Български', Flag: '🇧🇬', EnglishName: 'Bulgarian' },
      { Code: 'mk', NativeName: 'Македонски', Flag: '🇲🇰', EnglishName: 'Macedonian' },
      { Code: 'be', NativeName: 'Беларуская', Flag: '🇧🇾', EnglishName: 'Belarusian' },
    ],
  },
  {
    group: 'Asian Languages',
    languages: [
      {
        Code: 'zh-HK',
        NativeName: '中文（香港）',
        EnglishName: 'Chinese (Hong Kong)',
        Flag: '🇭🇰',
      },
      {
        Code: 'zh-TW',
        NativeName: '中文（繁體）',
        EnglishName: 'Chinese (Traditional)',
        Flag: '🇹🇼',
      },
      { Code: 'ko', NativeName: '한국어', Flag: '🇰🇷', EnglishName: 'Korean' },
      { Code: 'th', NativeName: 'ไทย', Flag: '🇹🇭', EnglishName: 'Thai' },
      { Code: 'vi', NativeName: 'Tiếng Việt', Flag: '🇻🇳', EnglishName: 'Vietnamese' },
      { Code: 'id', NativeName: 'Indonesia', Flag: '🇮🇩', EnglishName: 'Indonesian' },
      { Code: 'ms', NativeName: 'Bahasa Melayu', Flag: '🇲🇾', EnglishName: 'Malay' },
      {
        Code: 'ms-MY',
        NativeName: 'Bahasa Melayu (Malaysia)',
        Flag: '🇲🇾',
        EnglishName: 'Malay (Malaysia)',
      },
      { Code: 'tl', NativeName: 'Filipino', Flag: '🇵🇭', EnglishName: 'Filipino' },
      { Code: 'my', NativeName: 'ဗမာ', Flag: '🇲🇲', EnglishName: 'Burmese' },
      { Code: 'km', NativeName: 'ខ្មែរ', Flag: '🇰🇭', EnglishName: 'Khmer' },
      { Code: 'lo', NativeName: 'ລາວ', Flag: '🇱🇦', EnglishName: 'Lao' },
      { Code: 'mn', NativeName: 'Монгол', Flag: '🇲🇳', EnglishName: 'Mongolian' },
    ],
  },
  {
    group: 'Indian Languages',
    languages: [
      { Code: 'bn', NativeName: 'বাংলা', Flag: '🇧🇩', EnglishName: 'Bengali' },
      { Code: 'gu', NativeName: 'ગુજરાતી', Flag: '🇮🇳', EnglishName: 'Gujarati' },
      { Code: 'kn', NativeName: 'ಕನ್ನಡ', Flag: '🇮🇳', EnglishName: 'Kannada' },
      { Code: 'ml', NativeName: 'മലയാളം', Flag: '🇮🇳', EnglishName: 'Malayalam' },
      { Code: 'mr', NativeName: 'मराठी', Flag: '🇮🇳', EnglishName: 'Marathi' },
      { Code: 'pa', NativeName: 'ਪੰਜਾਬੀ', Flag: '🇮🇳', EnglishName: 'Punjabi' },
      { Code: 'ta', NativeName: 'தமிழ்', Flag: '🇮🇳', EnglishName: 'Tamil' },
      { Code: 'te', NativeName: 'తెలుగు', Flag: '🇮🇳', EnglishName: 'Telugu' },
      { Code: 'ne', NativeName: 'नेपाली', Flag: '🇳🇵', EnglishName: 'Nepali' },
      { Code: 'si', NativeName: 'සිංහල', Flag: '🇱🇰', EnglishName: 'Sinhala' },
      { Code: 'ur', NativeName: 'اردو', Flag: '🇵🇰', EnglishName: 'Urdu' },
    ],
  },
  {
    group: 'Other Languages',
    languages: [
      { Code: 'sq', NativeName: 'Shqip', Flag: '🇦🇱', EnglishName: 'Albanian' },
      { Code: 'am', NativeName: 'አማርኛ', Flag: '🇪🇹', EnglishName: 'Amharic' },
      { Code: 'hy', NativeName: 'Հայերեն', Flag: '🇦🇲', EnglishName: 'Armenian' },
      { Code: 'az', NativeName: 'Azərbaycan dili', Flag: '🇦🇿', EnglishName: 'Azerbaijani' },
      { Code: 'eu', NativeName: 'Euskara', Flag: '🇪🇸', EnglishName: 'Basque' },
      { Code: 'et', NativeName: 'Eesti', Flag: '🇪🇪', EnglishName: 'Estonian' },
      { Code: 'fi', NativeName: 'Suomi', Flag: '🇫🇮', EnglishName: 'Finnish' },
      { Code: 'ka', NativeName: 'ქართული', Flag: '🇬🇪', EnglishName: 'Georgian' },
      { Code: 'el', NativeName: 'Ελληνικά', EnglishName: 'Greek', Flag: '🇬🇷' },
      { Code: 'he', NativeName: 'עברית', Flag: '🇮🇱', EnglishName: 'Hebrew' },
      { Code: 'hu', NativeName: 'Magyar', Flag: '🇭🇺', EnglishName: 'Hungarian' },
      { Code: 'kk', NativeName: 'Қазақ тілі', Flag: '🇰🇿', EnglishName: 'Kazakh' },
      { Code: 'ky', NativeName: 'Кыргызча', Flag: '🇰🇬', EnglishName: 'Kyrgyz' },
      { Code: 'lt', NativeName: 'Lietuvių', Flag: '🇱🇹', EnglishName: 'Lithuanian' },
      { Code: 'lv', NativeName: 'Latviešu', Flag: '🇱🇻', EnglishName: 'Latvian' },
      { Code: 'fa', NativeName: 'فارسی', Flag: '🇮🇷', EnglishName: 'Persian' },
      { Code: 'sw', NativeName: 'Kiswahili', Flag: '🇹🇿', EnglishName: 'Swahili' },
      { Code: 'tr', NativeName: 'Türkçe', Flag: '🇹🇷', EnglishName: 'Turkish' },
      { Code: 'zu', NativeName: 'Zulu', Flag: '🇿🇦', EnglishName: 'Zulu' },
    ],
  },
];

export default function LanguageSelector({
  label,
  value,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select language',
  showEnglishName = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = useId();

  const selectedLanguage = languageGroups
    .flatMap(group => group.languages)
    .find(lang => lang.Code === value);

  const MandatoryStar = () => (
    <span className="text-sky-600" aria-hidden="true">
      *
    </span>
  );

  return (
    <div className={`space-y-2 text-left ${className}`}>
      <Label htmlFor={selectId} className="mb-2">
        {label} {required && <MandatoryStar />}
      </Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={selectId}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] h-10 mt-1 rounded-xl"
          >
            {selectedLanguage ? (
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-lg leading-none">{selectedLanguage.Flag}</span>
                <span className="truncate">
                  {showEnglishName ? selectedLanguage.EnglishName : selectedLanguage.NativeName}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0 -mr-0.5"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border w-full min-w-[var(--radix-popper-anchor-width)] p-0 rounded-xl"
          align="start"
        >
          <Command className="rounded-xl relative">
            <CommandInput placeholder="Search language..." />
            <CommandList className="rounded-xl overflow-y-auto">
              <CommandEmpty>No language found.</CommandEmpty>
              <div className="p-3 w-full max-w-[608px] text-balance">
                <div className="border border-dashed rounded-xl p-3 ">
                  <span className="text-sm text-neutral-500 tracking-tight leading-[0.2]">
                    We are currently using the ISO 639-1 language code, with flag emojis from a
                    dataset. What are your thoughts about flags associated with languages?
                  </span>{' '}
                  <a
                    href="hhttps://docs.google.com/forms/d/e/1FAIpQLScGr_SkBidld82ghxYKvZeLnsbQI2j75-1wmLpDCwd32BAn2g/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:underline inline-block text-sm items-center gap-1"
                  >
                    Submit feedback here!
                  </a>
                </div>
              </div>
              {languageGroups.map(group => (
                <Fragment key={group.group}>
                  <CommandGroup heading={group.group}>
                    {group.languages.map(language => (
                      <CommandItem
                        key={language.Code}
                        value={`${language.NativeName} ${language.EnglishName}`}
                        onSelect={() => {
                          onChange(language.Code);
                          setIsOpen(false);
                        }}
                      >
                        <span className="text-lg leading-none">{language.Flag}</span>{' '}
                        {showEnglishName ? language.EnglishName : language.NativeName}
                        {value === language.Code && <CheckIcon size={16} className="ml-auto" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Export language groups for other components that might need the data
export { languageGroups };

'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/base/label';
import { Button } from '@/components/ui/base/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/base/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/base/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/base/popover';
import { CheckIcon, ChevronDownIcon, CalendarIcon } from 'lucide-react';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import { useState, useId, Fragment } from 'react';
import DatePickerComponent from '@/components/ui/base/date';
import { parseDate } from '@internationalized/date';

export default function GettingToKnowYouPage() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [placeOfBirthOpen, setPlaceOfBirthOpen] = useState(false);
  const languageSelectId = useId();
  const placeOfBirthSelectId = useId();

  const safeParseBirthday = dateString => {
    if (!dateString || typeof dateString !== 'string') return null;
    try {
      // Ensure the string is in YYYY-MM-DD format
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return parseDate(dateString);
      }
      return null;
    } catch (error) {
      console.warn('Failed to parse birthday:', dateString, error);
      return null;
    }
  };

  const handleNext = () => {
    router.push('/onboarding/language-goals');
  };

  const handleBack = () => {
    router.push('/onboarding/welcome');
  };

  const getDialectsByCountry = countryCode => {
    const dialectMap = {
      US: ['General American', 'Southern American', 'New York', 'California', 'Texas', 'Boston'],
      GB: ['Received Pronunciation', 'Cockney', 'Scottish', 'Welsh', 'Northern'],
      ENGLAND: ['Received Pronunciation', 'Cockney', 'London', 'Yorkshire', 'Midlands'],
      SCOTLAND: ['Scottish Standard English', 'Highland', 'Lowland', 'Glasgow', 'Edinburgh'],
      WALES: ['Welsh English', 'North Welsh', 'South Welsh'],
      CA: ['General Canadian', 'Quebec French influenced', 'Maritime'],
      AU: ['General Australian', 'Broad Australian', 'Cultivated Australian'],
      IE: ['Dublin', 'Cork', 'Ulster'],
      ES: ['Castilian', 'Andalusian', 'Catalan influenced'],
      MX: ['Central Mexican', 'Northern Mexican', 'Yucatecan'],
      FR: ['Parisian', 'Southern French', 'Northern French'],
      DE: ['High German', 'Low German', 'Bavarian', 'Saxon'],
      IN: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
      ZA: ['General South African', 'Cape Town', 'Johannesburg', 'Durban'],
      NZ: ['General New Zealand', 'South Island', 'North Island'],
    };
    return dialectMap[countryCode] || ['Regional', 'Standard', 'Other'];
  };

  const languageGroups = [
    {
      group: 'Most Common',
      languages: [
        { Code: 'en', NativeName: 'English', Flag: '🇺🇸', EnglishName: 'English' },
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

  const countries = [
    {
      name: 'Ascension Island',
      code: 'AC',
      emoji: '🇦🇨',
    },
    {
      name: 'Andorra',
      code: 'AD',
      emoji: '🇦🇩',
    },
    {
      name: 'United Arab Emirates',
      code: 'AE',
      emoji: '🇦🇪',
    },
    {
      name: 'Afghanistan',
      code: 'AF',
      emoji: '🇦🇫',
    },
    {
      name: 'Antigua & Barbuda',
      code: 'AG',
      emoji: '🇦🇬',
    },
    {
      name: 'Anguilla',
      code: 'AI',
      emoji: '🇦🇮',
    },
    {
      name: 'Albania',
      code: 'AL',
      emoji: '🇦🇱',
    },
    {
      name: 'Armenia',
      code: 'AM',
      emoji: '🇦🇲',
    },
    {
      name: 'Angola',
      code: 'AO',
      emoji: '🇦🇴',
    },
    {
      name: 'Antarctica',
      code: 'AQ',
      emoji: '🇦🇶',
    },
    {
      name: 'Argentina',
      code: 'AR',
      emoji: '🇦🇷',
    },
    {
      name: 'American Samoa',
      code: 'AS',
      emoji: '🇦🇸',
    },
    {
      name: 'Austria',
      code: 'AT',
      emoji: '🇦🇹',
    },
    {
      name: 'Australia',
      code: 'AU',
      emoji: '🇦🇺',
    },
    {
      name: 'Aruba',
      code: 'AW',
      emoji: '🇦🇼',
    },
    {
      name: 'Åland Islands',
      code: 'AX',
      emoji: '🇦🇽',
    },
    {
      name: 'Azerbaijan',
      code: 'AZ',
      emoji: '🇦🇿',
    },
    {
      name: 'Bosnia & Herzegovina',
      code: 'BA',
      emoji: '🇧🇦',
    },
    {
      name: 'Barbados',
      code: 'BB',
      emoji: '🇧🇧',
    },
    {
      name: 'Bangladesh',
      code: 'BD',
      emoji: '🇧🇩',
    },
    {
      name: 'Belgium',
      code: 'BE',
      emoji: '🇧🇪',
    },
    {
      name: 'Burkina Faso',
      code: 'BF',
      emoji: '🇧🇫',
    },
    {
      name: 'Bulgaria',
      code: 'BG',
      emoji: '🇧🇬',
    },
    {
      name: 'Bahrain',
      code: 'BH',
      emoji: '🇧🇭',
    },
    {
      name: 'Burundi',
      code: 'BI',
      emoji: '🇧🇮',
    },
    {
      name: 'Benin',
      code: 'BJ',
      emoji: '🇧🇯',
    },
    {
      name: 'St. Barthélemy',
      code: 'BL',
      emoji: '🇧🇱',
    },
    {
      name: 'Bermuda',
      code: 'BM',
      emoji: '🇧🇲',
    },
    {
      name: 'Brunei',
      code: 'BN',
      emoji: '🇧🇳',
    },
    {
      name: 'Bolivia',
      code: 'BO',
      emoji: '🇧🇴',
    },
    {
      name: 'Caribbean Netherlands',
      code: 'BQ',
      emoji: '🇧🇶',
    },
    {
      name: 'Brazil',
      code: 'BR',
      emoji: '🇧🇷',
    },
    {
      name: 'Bahamas',
      code: 'BS',
      emoji: '🇧🇸',
    },
    {
      name: 'Bhutan',
      code: 'BT',
      emoji: '🇧🇹',
    },
    {
      name: 'Bouvet Island',
      code: 'BV',
      emoji: '🇧🇻',
    },
    {
      name: 'Botswana',
      code: 'BW',
      emoji: '🇧🇼',
    },
    {
      name: 'Belarus',
      code: 'BY',
      emoji: '🇧🇾',
    },
    {
      name: 'Belize',
      code: 'BZ',
      emoji: '🇧🇿',
    },
    {
      name: 'Canada',
      code: 'CA',
      emoji: '🇨🇦',
    },
    {
      name: 'Cocos (Keeling) Islands',
      code: 'CC',
      emoji: '🇨🇨',
    },
    {
      name: 'Congo - Kinshasa',
      code: 'CD',
      emoji: '🇨🇩',
    },
    {
      name: 'Central African Republic',
      code: 'CF',
      emoji: '🇨🇫',
    },
    {
      name: 'Congo - Brazzaville',
      code: 'CG',
      emoji: '🇨🇬',
    },
    {
      name: 'Switzerland',
      code: 'CH',
      emoji: '🇨🇭',
    },
    {
      name: 'Côte d’Ivoire',
      code: 'CI',
      emoji: '🇨🇮',
    },
    {
      name: 'Cook Islands',
      code: 'CK',
      emoji: '🇨🇰',
    },
    {
      name: 'Chile',
      code: 'CL',
      emoji: '🇨🇱',
    },
    {
      name: 'Cameroon',
      code: 'CM',
      emoji: '🇨🇲',
    },
    {
      name: 'China',
      code: 'CN',
      emoji: '🇨🇳',
    },
    {
      name: 'Colombia',
      code: 'CO',
      emoji: '🇨🇴',
    },
    {
      name: 'Clipperton Island',
      code: 'CP',
      emoji: '🇨🇵',
    },
    {
      name: 'Costa Rica',
      code: 'CR',
      emoji: '🇨🇷',
    },
    {
      name: 'Cuba',
      code: 'CU',
      emoji: '🇨🇺',
    },
    {
      name: 'Cape Verde',
      code: 'CV',
      emoji: '🇨🇻',
    },
    {
      name: 'Curaçao',
      code: 'CW',
      emoji: '🇨🇼',
    },
    {
      name: 'Christmas Island',
      code: 'CX',
      emoji: '🇨🇽',
    },
    {
      name: 'Cyprus',
      code: 'CY',
      emoji: '🇨🇾',
    },
    {
      name: 'Czechia',
      code: 'CZ',
      emoji: '🇨🇿',
    },
    {
      name: 'Germany',
      code: 'DE',
      emoji: '🇩🇪',
    },
    {
      name: 'Diego Garcia',
      code: 'DG',
      emoji: '🇩🇬',
    },
    {
      name: 'Djibouti',
      code: 'DJ',
      emoji: '🇩🇯',
    },
    {
      name: 'Denmark',
      code: 'DK',
      emoji: '🇩🇰',
    },
    {
      name: 'Dominica',
      code: 'DM',
      emoji: '🇩🇲',
    },
    {
      name: 'Dominican Republic',
      code: 'DO',
      emoji: '🇩🇴',
    },
    {
      name: 'Algeria',
      code: 'DZ',
      emoji: '🇩🇿',
    },
    {
      name: 'Ceuta & Melilla',
      code: 'EA',
      emoji: '🇪🇦',
    },
    {
      name: 'Ecuador',
      code: 'EC',
      emoji: '🇪🇨',
    },
    {
      name: 'Estonia',
      code: 'EE',
      emoji: '🇪🇪',
    },
    {
      name: 'Egypt',
      code: 'EG',
      emoji: '🇪🇬',
    },
    {
      name: 'Western Sahara',
      code: 'EH',
      emoji: '🇪🇭',
    },
    {
      name: 'Eritrea',
      code: 'ER',
      emoji: '🇪🇷',
    },
    {
      name: 'Spain',
      code: 'ES',
      emoji: '🇪🇸',
    },
    {
      name: 'Ethiopia',
      code: 'ET',
      emoji: '🇪🇹',
    },
    {
      name: 'European Union',
      code: 'EU',
      emoji: '🇪🇺',
    },
    {
      name: 'Finland',
      code: 'FI',
      emoji: '🇫🇮',
    },
    {
      name: 'Fiji',
      code: 'FJ',
      emoji: '🇫🇯',
    },
    {
      name: 'Falkland Islands',
      code: 'FK',
      emoji: '🇫🇰',
    },
    {
      name: 'Micronesia',
      code: 'FM',
      emoji: '🇫🇲',
    },
    {
      name: 'Faroe Islands',
      code: 'FO',
      emoji: '🇫🇴',
    },
    {
      name: 'France',
      code: 'FR',
      emoji: '🇫🇷',
    },
    {
      name: 'Gabon',
      code: 'GA',
      emoji: '🇬🇦',
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      emoji: '🇬🇧',
    },
    {
      name: 'Grenada',
      code: 'GD',
      emoji: '🇬🇩',
    },
    {
      name: 'Georgia',
      code: 'GE',
      emoji: '🇬🇪',
    },
    {
      name: 'French Guiana',
      code: 'GF',
      emoji: '🇬🇫',
    },
    {
      name: 'Guernsey',
      code: 'GG',
      emoji: '🇬🇬',
    },
    {
      name: 'Ghana',
      code: 'GH',
      emoji: '🇬🇭',
    },
    {
      name: 'Gibraltar',
      code: 'GI',
      emoji: '🇬🇮',
    },
    {
      name: 'Greenland',
      code: 'GL',
      emoji: '🇬🇱',
    },
    {
      name: 'Gambia',
      code: 'GM',
      emoji: '🇬🇲',
    },
    {
      name: 'Guinea',
      code: 'GN',
      emoji: '🇬🇳',
    },
    {
      name: 'Guadeloupe',
      code: 'GP',
      emoji: '🇬🇵',
    },
    {
      name: 'Equatorial Guinea',
      code: 'GQ',
      emoji: '🇬🇶',
    },
    {
      name: 'Greece',
      code: 'GR',
      emoji: '🇬🇷',
    },
    {
      name: 'South Georgia & South Sandwich Islands',
      code: 'GS',
      emoji: '🇬🇸',
    },
    {
      name: 'Guatemala',
      code: 'GT',
      emoji: '🇬🇹',
    },
    {
      name: 'Guam',
      code: 'GU',
      emoji: '🇬🇺',
    },
    {
      name: 'Guinea-Bissau',
      code: 'GW',
      emoji: '🇬🇼',
    },
    {
      name: 'Guyana',
      code: 'GY',
      emoji: '🇬🇾',
    },
    {
      name: 'Hong Kong SAR China',
      code: 'HK',
      emoji: '🇭🇰',
    },
    {
      name: 'Heard & McDonald Islands',
      code: 'HM',
      emoji: '🇭🇲',
    },
    {
      name: 'Honduras',
      code: 'HN',
      emoji: '🇭🇳',
    },
    {
      name: 'Croatia',
      code: 'HR',
      emoji: '🇭🇷',
    },
    {
      name: 'Haiti',
      code: 'HT',
      emoji: '🇭🇹',
    },
    {
      name: 'Hungary',
      code: 'HU',
      emoji: '🇭🇺',
    },
    {
      name: 'Canary Islands',
      code: 'IC',
      emoji: '🇮🇨',
    },
    {
      name: 'Indonesia',
      code: 'ID',
      emoji: '🇮🇩',
    },
    {
      name: 'Ireland',
      code: 'IE',
      emoji: '🇮🇪',
    },
    {
      name: 'Israel',
      code: 'IL',
      emoji: '🇮🇱',
    },
    {
      name: 'Isle of Man',
      code: 'IM',
      emoji: '🇮🇲',
    },
    {
      name: 'India',
      code: 'IN',
      emoji: '🇮🇳',
    },
    {
      name: 'British Indian Ocean Territory',
      code: 'IO',
      emoji: '🇮🇴',
    },
    {
      name: 'Iraq',
      code: 'IQ',
      emoji: '🇮🇶',
    },
    {
      name: 'Iran',
      code: 'IR',
      emoji: '🇮🇷',
    },
    {
      name: 'Iceland',
      code: 'IS',
      emoji: '🇮🇸',
    },
    {
      name: 'Italy',
      code: 'IT',
      emoji: '🇮🇹',
    },
    {
      name: 'Jersey',
      code: 'JE',
      emoji: '🇯🇪',
    },
    {
      name: 'Jamaica',
      code: 'JM',
      emoji: '🇯🇲',
    },
    {
      name: 'Jordan',
      code: 'JO',
      emoji: '🇯🇴',
    },
    {
      name: 'Japan',
      code: 'JP',
      emoji: '🇯🇵',
    },
    {
      name: 'Kenya',
      code: 'KE',
      emoji: '🇰🇪',
    },
    {
      name: 'Kyrgyzstan',
      code: 'KG',
      emoji: '🇰🇬',
    },
    {
      name: 'Cambodia',
      code: 'KH',
      emoji: '🇰🇭',
    },
    {
      name: 'Kiribati',
      code: 'KI',
      emoji: '🇰🇮',
    },
    {
      name: 'Comoros',
      code: 'KM',
      emoji: '🇰🇲',
    },
    {
      name: 'St. Kitts & Nevis',
      code: 'KN',
      emoji: '🇰🇳',
    },
    {
      name: 'North Korea',
      code: 'KP',
      emoji: '🇰🇵',
    },
    {
      name: 'South Korea',
      code: 'KR',
      emoji: '🇰🇷',
    },
    {
      name: 'Kuwait',
      code: 'KW',
      emoji: '🇰🇼',
    },
    {
      name: 'Cayman Islands',
      code: 'KY',
      emoji: '🇰🇾',
    },
    {
      name: 'Kazakhstan',
      code: 'KZ',
      emoji: '🇰🇿',
    },
    {
      name: 'Laos',
      code: 'LA',
      emoji: '🇱🇦',
    },
    {
      name: 'Lebanon',
      code: 'LB',
      emoji: '🇱🇧',
    },
    {
      name: 'St. Lucia',
      code: 'LC',
      emoji: '🇱🇨',
    },
    {
      name: 'Liechtenstein',
      code: 'LI',
      emoji: '🇱🇮',
    },
    {
      name: 'Sri Lanka',
      code: 'LK',
      emoji: '🇱🇰',
    },
    {
      name: 'Liberia',
      code: 'LR',
      emoji: '🇱🇷',
    },
    {
      name: 'Lesotho',
      code: 'LS',
      emoji: '🇱🇸',
    },
    {
      name: 'Lithuania',
      code: 'LT',
      emoji: '🇱🇹',
    },
    {
      name: 'Luxembourg',
      code: 'LU',
      emoji: '🇱🇺',
    },
    {
      name: 'Latvia',
      code: 'LV',
      emoji: '🇱🇻',
    },
    {
      name: 'Libya',
      code: 'LY',
      emoji: '🇱🇾',
    },
    {
      name: 'Morocco',
      code: 'MA',
      emoji: '🇲🇦',
    },
    {
      name: 'Monaco',
      code: 'MC',
      emoji: '🇲🇨',
    },
    {
      name: 'Moldova',
      code: 'MD',
      emoji: '🇲🇩',
    },
    {
      name: 'Montenegro',
      code: 'ME',
      emoji: '🇲🇪',
    },
    {
      name: 'St. Martin',
      code: 'MF',
      emoji: '🇲🇫',
    },
    {
      name: 'Madagascar',
      code: 'MG',
      emoji: '🇲🇬',
    },
    {
      name: 'Marshall Islands',
      code: 'MH',
      emoji: '🇲🇭',
    },
    {
      name: 'North Macedonia',
      code: 'MK',
      emoji: '🇲🇰',
    },
    {
      name: 'Mali',
      code: 'ML',
      emoji: '🇲🇱',
    },
    {
      name: 'Myanmar (Burma)',
      code: 'MM',
      emoji: '🇲🇲',
    },
    {
      name: 'Mongolia',
      code: 'MN',
      emoji: '🇲🇳',
    },
    {
      name: 'Macao SAR China',
      code: 'MO',
      emoji: '🇲🇴',
    },
    {
      name: 'Northern Mariana Islands',
      code: 'MP',
      emoji: '🇲🇵',
    },
    {
      name: 'Martinique',
      code: 'MQ',
      emoji: '🇲🇶',
    },
    {
      name: 'Mauritania',
      code: 'MR',
      emoji: '🇲🇷',
    },
    {
      name: 'Montserrat',
      code: 'MS',
      emoji: '🇲🇸',
    },
    {
      name: 'Malta',
      code: 'MT',
      emoji: '🇲🇹',
    },
    {
      name: 'Mauritius',
      code: 'MU',
      emoji: '🇲🇺',
    },
    {
      name: 'Maldives',
      code: 'MV',
      emoji: '🇲🇻',
    },
    {
      name: 'Malawi',
      code: 'MW',
      emoji: '🇲🇼',
    },
    {
      name: 'Mexico',
      code: 'MX',
      emoji: '🇲🇽',
    },
    {
      name: 'Malaysia',
      code: 'MY',
      emoji: '🇲🇾',
    },
    {
      name: 'Mozambique',
      code: 'MZ',
      emoji: '🇲🇿',
    },
    {
      name: 'Namibia',
      code: 'NA',
      emoji: '🇳🇦',
    },
    {
      name: 'New Caledonia',
      code: 'NC',
      emoji: '🇳🇨',
    },
    {
      name: 'Niger',
      code: 'NE',
      emoji: '🇳🇪',
    },
    {
      name: 'Norfolk Island',
      code: 'NF',
      emoji: '🇳🇫',
    },
    {
      name: 'Nigeria',
      code: 'NG',
      emoji: '🇳🇬',
    },
    {
      name: 'Nicaragua',
      code: 'NI',
      emoji: '🇳🇮',
    },
    {
      name: 'Netherlands',
      code: 'NL',
      emoji: '🇳🇱',
    },
    {
      name: 'Norway',
      code: 'NO',
      emoji: '🇳🇴',
    },
    {
      name: 'Nepal',
      code: 'NP',
      emoji: '🇳🇵',
    },
    {
      name: 'Nauru',
      code: 'NR',
      emoji: '🇳🇷',
    },
    {
      name: 'Niue',
      code: 'NU',
      emoji: '🇳🇺',
    },
    {
      name: 'New Zealand',
      code: 'NZ',
      emoji: '🇳🇿',
    },
    {
      name: 'Oman',
      code: 'OM',
      emoji: '🇴🇲',
    },
    {
      name: 'Panama',
      code: 'PA',
      emoji: '🇵🇦',
    },
    {
      name: 'Peru',
      code: 'PE',
      emoji: '🇵🇪',
    },
    {
      name: 'French Polynesia',
      code: 'PF',
      emoji: '🇵🇫',
    },
    {
      name: 'Papua New Guinea',
      code: 'PG',
      emoji: '🇵🇬',
    },
    {
      name: 'Philippines',
      code: 'PH',
      emoji: '🇵🇭',
    },
    {
      name: 'Pakistan',
      code: 'PK',
      emoji: '🇵🇰',
    },
    {
      name: 'Poland',
      code: 'PL',
      emoji: '🇵🇱',
    },
    {
      name: 'St. Pierre & Miquelon',
      code: 'PM',
      emoji: '🇵🇲',
    },
    {
      name: 'Pitcairn Islands',
      code: 'PN',
      emoji: '🇵🇳',
    },
    {
      name: 'Puerto Rico',
      code: 'PR',
      emoji: '🇵🇷',
    },
    {
      name: 'Palestinian Territories',
      code: 'PS',
      emoji: '🇵🇸',
    },
    {
      name: 'Portugal',
      code: 'PT',
      emoji: '🇵🇹',
    },
    {
      name: 'Palau',
      code: 'PW',
      emoji: '🇵🇼',
    },
    {
      name: 'Paraguay',
      code: 'PY',
      emoji: '🇵🇾',
    },
    {
      name: 'Qatar',
      code: 'QA',
      emoji: '🇶🇦',
    },
    {
      name: 'Réunion',
      code: 'RE',
      emoji: '🇷🇪',
    },
    {
      name: 'Romania',
      code: 'RO',
      emoji: '🇷🇴',
    },
    {
      name: 'Serbia',
      code: 'RS',
      emoji: '🇷🇸',
    },
    {
      name: 'Russia',
      code: 'RU',
      emoji: '🇷🇺',
    },
    {
      name: 'Rwanda',
      code: 'RW',
      emoji: '🇷🇼',
    },
    {
      name: 'Saudi Arabia',
      code: 'SA',
      emoji: '🇸🇦',
    },
    {
      name: 'Solomon Islands',
      code: 'SB',
      emoji: '🇸🇧',
    },
    {
      name: 'Seychelles',
      code: 'SC',
      emoji: '🇸🇨',
    },
    {
      name: 'Sudan',
      code: 'SD',
      emoji: '🇸🇩',
    },
    {
      name: 'Sweden',
      code: 'SE',
      emoji: '🇸🇪',
    },
    {
      name: 'Singapore',
      code: 'SG',
      emoji: '🇸🇬',
    },
    {
      name: 'St. Helena',
      code: 'SH',
      emoji: '🇸🇭',
    },
    {
      name: 'Slovenia',
      code: 'SI',
      emoji: '🇸🇮',
    },
    {
      name: 'Svalbard & Jan Mayen',
      code: 'SJ',
      emoji: '🇸🇯',
    },
    {
      name: 'Slovakia',
      code: 'SK',
      emoji: '🇸🇰',
    },
    {
      name: 'Sierra Leone',
      code: 'SL',
      emoji: '🇸🇱',
    },
    {
      name: 'San Marino',
      code: 'SM',
      emoji: '🇸🇲',
    },
    {
      name: 'Senegal',
      code: 'SN',
      emoji: '🇸🇳',
    },
    {
      name: 'Somalia',
      code: 'SO',
      emoji: '🇸🇴',
    },
    {
      name: 'Suriname',
      code: 'SR',
      emoji: '🇸🇷',
    },
    {
      name: 'South Sudan',
      code: 'SS',
      emoji: '🇸🇸',
    },
    {
      name: 'São Tomé & Príncipe',
      code: 'ST',
      emoji: '🇸🇹',
    },
    {
      name: 'El Salvador',
      code: 'SV',
      emoji: '🇸🇻',
    },
    {
      name: 'Sint Maarten',
      code: 'SX',
      emoji: '🇸🇽',
    },
    {
      name: 'Syria',
      code: 'SY',
      emoji: '🇸🇾',
    },
    {
      name: 'Eswatini',
      code: 'SZ',
      emoji: '🇸🇿',
    },
    {
      name: 'Tristan da Cunha',
      code: 'TA',
      emoji: '🇹🇦',
    },
    {
      name: 'Turks & Caicos Islands',
      code: 'TC',
      emoji: '🇹🇨',
    },
    {
      name: 'Chad',
      code: 'TD',
      emoji: '🇹🇩',
    },
    {
      name: 'French Southern Territories',
      code: 'TF',
      emoji: '🇹🇫',
    },
    {
      name: 'Togo',
      code: 'TG',
      emoji: '🇹🇬',
    },
    {
      name: 'Thailand',
      code: 'TH',
      emoji: '🇹🇭',
    },
    {
      name: 'Tajikistan',
      code: 'TJ',
      emoji: '🇹🇯',
    },
    {
      name: 'Tokelau',
      code: 'TK',
      emoji: '🇹🇰',
    },
    {
      name: 'Timor-Leste',
      code: 'TL',
      emoji: '🇹🇱',
    },
    {
      name: 'Turkmenistan',
      code: 'TM',
      emoji: '🇹🇲',
    },
    {
      name: 'Tunisia',
      code: 'TN',
      emoji: '🇹🇳',
    },
    {
      name: 'Tonga',
      code: 'TO',
      emoji: '🇹🇴',
    },
    {
      name: 'Turkey',
      code: 'TR',
      emoji: '🇹🇷',
    },
    {
      name: 'Trinidad & Tobago',
      code: 'TT',
      emoji: '🇹🇹',
    },
    {
      name: 'Tuvalu',
      code: 'TV',
      emoji: '🇹🇻',
    },
    {
      name: 'Taiwan',
      code: 'TW',
      emoji: '🇹🇼',
    },
    {
      name: 'Tanzania',
      code: 'TZ',
      emoji: '🇹🇿',
    },
    {
      name: 'Ukraine',
      code: 'UA',
      emoji: '🇺🇦',
    },
    {
      name: 'Uganda',
      code: 'UG',
      emoji: '🇺🇬',
    },
    {
      name: 'U.S. Outlying Islands',
      code: 'UM',
      emoji: '🇺🇲',
    },
    {
      name: 'United Nations',
      code: 'UN',
      emoji: '🇺🇳',
    },
    {
      name: 'United States',
      code: 'US',
      emoji: '🇺🇸',
    },
    {
      name: 'Uruguay',
      code: 'UY',
      emoji: '🇺🇾',
    },
    {
      name: 'Uzbekistan',
      code: 'UZ',
      emoji: '🇺🇿',
    },
    {
      name: 'Vatican City',
      code: 'VA',
      emoji: '🇻🇦',
    },
    {
      name: 'St. Vincent & Grenadines',
      code: 'VC',
      emoji: '🇻🇨',
    },
    {
      name: 'Venezuela',
      code: 'VE',
      emoji: '🇻🇪',
    },
    {
      name: 'British Virgin Islands',
      code: 'VG',
      emoji: '🇻🇬',
    },
    {
      name: 'U.S. Virgin Islands',
      code: 'VI',
      emoji: '🇻🇮',
    },
    {
      name: 'Vietnam',
      code: 'VN',
      emoji: '🇻🇳',
    },
    {
      name: 'Vanuatu',
      code: 'VU',
      emoji: '🇻🇺',
    },
    {
      name: 'Wallis & Futuna',
      code: 'WF',
      emoji: '🇼🇫',
    },
    {
      name: 'Samoa',
      code: 'WS',
      emoji: '🇼🇸',
    },
    {
      name: 'Kosovo',
      code: 'XK',
      emoji: '🇽🇰',
    },
    {
      name: 'Yemen',
      code: 'YE',
      emoji: '🇾🇪',
    },
    {
      name: 'Mayotte',
      code: 'YT',
      emoji: '🇾🇹',
    },
    {
      name: 'South Africa',
      code: 'ZA',
      emoji: '🇿🇦',
    },
    {
      name: 'Zambia',
      code: 'ZM',
      emoji: '🇿🇲',
    },
    {
      name: 'Zimbabwe',
      code: 'ZW',
      emoji: '🇿🇼',
    },
    {
      name: 'England',
      code: 'ENGLAND',
      emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      unicode: 'U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F',
      image: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg',
    },
    {
      name: 'Scotland',
      code: 'SCOTLAND',
      emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      unicode: 'U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F',
      image: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SCOTLAND.svg',
    },
    {
      name: 'Wales',
      code: 'WALES',
      emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
      unicode: 'U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F',
      image: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WALES.svg',
    },
  ];

  const countriesByContinent = [
    {
      continent: 'North America',
      countries: countries.filter(c => ['US', 'CA', 'MX', 'GL', 'PM', 'BM'].includes(c.code)),
    },
    {
      continent: 'South America',
      countries: countries.filter(c =>
        ['BR', 'AR', 'CL', 'PE', 'CO', 'VE', 'EC', 'BO', 'PY', 'UY', 'GY', 'SR', 'GF'].includes(
          c.code,
        ),
      ),
    },
    {
      continent: 'Europe',
      countries: countries.filter(c =>
        [
          'GB',
          'FR',
          'DE',
          'IT',
          'ES',
          'NL',
          'BE',
          'CH',
          'AT',
          'PT',
          'SE',
          'NO',
          'DK',
          'FI',
          'IE',
          'PL',
          'CZ',
          'HU',
          'RO',
          'BG',
          'HR',
          'SI',
          'SK',
          'LT',
          'LV',
          'EE',
          'GR',
          'CY',
          'MT',
          'LU',
          'IS',
          'LI',
          'MC',
          'SM',
          'VA',
          'MD',
          'UA',
          'BY',
          'RU',
          'RS',
          'ME',
          'MK',
          'AL',
          'BA',
          'XK',
          'ENGLAND',
          'SCOTLAND',
          'WALES',
        ].includes(c.code),
      ),
    },
    {
      continent: 'Asia',
      countries: countries.filter(c =>
        [
          'CN',
          'IN',
          'JP',
          'KR',
          'TH',
          'VN',
          'ID',
          'MY',
          'PH',
          'SG',
          'TW',
          'HK',
          'MO',
          'KZ',
          'UZ',
          'KG',
          'TJ',
          'TM',
          'MN',
          'AF',
          'PK',
          'BD',
          'LK',
          'NP',
          'BT',
          'MM',
          'LA',
          'KH',
          'BN',
          'TL',
          'IR',
          'IQ',
          'SA',
          'AE',
          'QA',
          'KW',
          'BH',
          'OM',
          'YE',
          'JO',
          'LB',
          'SY',
          'IL',
          'PS',
          'TR',
          'GE',
          'AM',
          'AZ',
        ].includes(c.code),
      ),
    },
    {
      continent: 'Africa',
      countries: countries.filter(c =>
        [
          'NG',
          'ZA',
          'EG',
          'MA',
          'KE',
          'ET',
          'GH',
          'TN',
          'DZ',
          'LY',
          'SD',
          'SS',
          'TZ',
          'UG',
          'MZ',
          'MW',
          'ZM',
          'ZW',
          'BW',
          'NA',
          'SZ',
          'LS',
          'AO',
          'CM',
          'CI',
          'BF',
          'ML',
          'NE',
          'TD',
          'CF',
          'CG',
          'CD',
          'GA',
          'GQ',
          'ST',
          'CV',
          'GM',
          'GN',
          'GW',
          'SL',
          'LR',
          'SN',
          'MR',
          'DJ',
          'SO',
          'ER',
          'RW',
          'BI',
          'KM',
          'MU',
          'SC',
          'MG',
          'RE',
          'YT',
        ].includes(c.code),
      ),
    },
    {
      continent: 'Oceania',
      countries: countries.filter(c =>
        [
          'AU',
          'NZ',
          'FJ',
          'PG',
          'NC',
          'SB',
          'VU',
          'PF',
          'WS',
          'TO',
          'TV',
          'NR',
          'PW',
          'MH',
          'FM',
          'KI',
          'CK',
          'NU',
          'TK',
          'WF',
          'PN',
          'NF',
        ].includes(c.code),
      ),
    },
    {
      continent: 'Other',
      countries: countries.filter(
        c =>
          ![
            'US',
            'CA',
            'MX',
            'GL',
            'PM',
            'BM',
            'BR',
            'AR',
            'CL',
            'PE',
            'CO',
            'VE',
            'EC',
            'BO',
            'PY',
            'UY',
            'GY',
            'SR',
            'GF',
            'GB',
            'FR',
            'DE',
            'IT',
            'ES',
            'NL',
            'BE',
            'CH',
            'AT',
            'PT',
            'SE',
            'NO',
            'DK',
            'FI',
            'IE',
            'PL',
            'CZ',
            'HU',
            'RO',
            'BG',
            'HR',
            'SI',
            'SK',
            'LT',
            'LV',
            'EE',
            'GR',
            'CY',
            'MT',
            'LU',
            'IS',
            'LI',
            'MC',
            'SM',
            'VA',
            'MD',
            'UA',
            'BY',
            'RU',
            'RS',
            'ME',
            'MK',
            'AL',
            'BA',
            'XK',
            'ENGLAND',
            'SCOTLAND',
            'WALES',
            'CN',
            'IN',
            'JP',
            'KR',
            'TH',
            'VN',
            'ID',
            'MY',
            'PH',
            'SG',
            'TW',
            'HK',
            'MO',
            'KZ',
            'UZ',
            'KG',
            'TJ',
            'TM',
            'MN',
            'AF',
            'PK',
            'BD',
            'LK',
            'NP',
            'BT',
            'MM',
            'LA',
            'KH',
            'BN',
            'TL',
            'IR',
            'IQ',
            'SA',
            'AE',
            'QA',
            'KW',
            'BH',
            'OM',
            'YE',
            'JO',
            'LB',
            'SY',
            'IL',
            'PS',
            'TR',
            'GE',
            'AM',
            'AZ',
            'NG',
            'ZA',
            'EG',
            'MA',
            'KE',
            'ET',
            'GH',
            'TN',
            'DZ',
            'LY',
            'SD',
            'SS',
            'TZ',
            'UG',
            'MZ',
            'MW',
            'ZM',
            'ZW',
            'BW',
            'NA',
            'SZ',
            'LS',
            'AO',
            'CM',
            'CI',
            'BF',
            'ML',
            'NE',
            'TD',
            'CF',
            'CG',
            'CD',
            'GA',
            'GQ',
            'ST',
            'CV',
            'GM',
            'GN',
            'GW',
            'SL',
            'LR',
            'SN',
            'MR',
            'DJ',
            'SO',
            'ER',
            'RW',
            'BI',
            'KM',
            'MU',
            'SC',
            'MG',
            'RE',
            'YT',
            'AU',
            'NZ',
            'FJ',
            'PG',
            'NC',
            'SB',
            'VU',
            'PF',
            'WS',
            'TO',
            'TV',
            'NR',
            'PW',
            'MH',
            'FM',
            'KI',
            'CK',
            'NU',
            'TK',
            'WF',
            'PN',
            'NF',
          ].includes(c.code),
      ),
    },
  ].filter(group => group.countries.length > 0);

  const MandatoryStar = () => (
    <span className="text-sky-600" aria-hidden="true">
      *
    </span>
  );

  const isNextDisabled = !onboardingData.nativeLanguage || !onboardingData.placeOfBirth;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="absolute h-full w-screen z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="flex flex-col items-center justify-center py-8 px-6 text-center mx-4 rounded-xl z-40 bg-white/40 border-neutral-200 dark:border-neutral-800 max-w-2xl w-full">
        <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />

        <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Getting to Know You</h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-10 max-w-md text-balance z-10">
          Please share a few details to help us personalize your experience
        </p>

        <div className="space-y-6 w-full">
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor={languageSelectId} className="mb-2">
                What's your native language? <MandatoryStar />
              </Label>
              <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id={languageSelectId}
                    variant="outline"
                    role="combobox"
                    aria-expanded={languageOpen}
                    className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] h-10 mt-1 rounded-lg"
                  >
                    {onboardingData.nativeLanguage ? (
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="text-lg leading-none">
                          {
                            languageGroups
                              .map(group =>
                                group.languages.find(
                                  lang => lang.Code === onboardingData.nativeLanguage,
                                ),
                              )
                              .filter(Boolean)[0]?.Flag
                          }
                        </span>
                        <span className="truncate">
                          {
                            languageGroups
                              .map(group =>
                                group.languages.find(
                                  lang => lang.Code === onboardingData.nativeLanguage,
                                ),
                              )
                              .filter(Boolean)[0]?.NativeName
                          }
                        </span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Select your native language</span>
                    )}
                    <ChevronDownIcon
                      size={16}
                      className="text-muted-foreground/80 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      {languageGroups.map(group => (
                        <Fragment key={group.group}>
                          <CommandGroup heading={group.group}>
                            {group.languages.map(language => (
                              <CommandItem
                                key={language.Code}
                                value={`${language.NativeName} ${language.EnglishName}`}
                                onSelect={() => {
                                  updateOnboardingData('nativeLanguage', language.Code);
                                  updateOnboardingData('nativeDialect', '');
                                  setSelectedCountry('');
                                  setLanguageOpen(false);
                                }}
                              >
                                <span className="text-lg leading-none">{language.Flag}</span>{' '}
                                {language.EnglishName}
                                {onboardingData.nativeLanguage === language.Code && (
                                  <CheckIcon size={16} className="ml-auto" />
                                )}
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

            <div className="space-y-2 text-left">
              <Label htmlFor={placeOfBirthSelectId} className="mb-2">
                What's your place of birth? <MandatoryStar />
              </Label>
              <Popover open={placeOfBirthOpen} onOpenChange={setPlaceOfBirthOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id={placeOfBirthSelectId}
                    variant="outline"
                    role="combobox"
                    aria-expanded={placeOfBirthOpen}
                    className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] h-10 mt-1 rounded-lg"
                  >
                    {onboardingData.placeOfBirth ? (
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="text-lg leading-none">
                          {
                            countries.find(country => country.code === onboardingData.placeOfBirth)
                              ?.emoji
                          }
                        </span>
                        <span className="truncate">
                          {
                            countries.find(country => country.code === onboardingData.placeOfBirth)
                              ?.name
                          }
                        </span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Select your place of birth</span>
                    )}
                    <ChevronDownIcon
                      size={16}
                      className="text-muted-foreground/80 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0 max-h-60"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      {countries.map(country => (
                        <CommandItem
                          key={country.code}
                          value={country.name}
                          onSelect={() => {
                            updateOnboardingData('placeOfBirth', country.code);
                            setSelectedCountry(country.code);
                            updateOnboardingData('nativeDialect', '');
                            setPlaceOfBirthOpen(false);
                          }}
                        >
                          <span className="text-lg leading-none">{country.emoji}</span>{' '}
                          {country.name}
                          {onboardingData.placeOfBirth === country.code && (
                            <CheckIcon size={16} className="ml-auto" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {selectedCountry && (
              <div className="space-y-2 text-left">
                <Label htmlFor="nativeDialect">
                  Native Dialect
                  <span className="text-xs text-neutral-500 ml-1">
                    (Where you learned the language)
                  </span>
                </Label>
                <Select
                  onValueChange={value => updateOnboardingData('nativeDialect', value)}
                  value={onboardingData.nativeDialect}
                >
                  <SelectTrigger id="nativeDialect" className="h-10 mt-1 rounded-lg">
                    <SelectValue placeholder="Select your dialect/accent" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDialectsByCountry(selectedCountry).map(dialect => (
                      <SelectItem key={dialect} value={dialect.toLowerCase()}>
                        {dialect}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2 text-left">
              <DatePickerComponent
                label="What's your birthday? (Optional)"
                value={safeParseBirthday(onboardingData.birthday)}
                onChange={value => updateOnboardingData('birthday', value ? value.toString() : '')}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 w-full justify-between">
          <Button variant="outline" onClick={handleBack} className="flex-1 gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="rotate-90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Button>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 text-center px-2">
            Step 1 of 4
          </p>
          <Button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="flex items-center flex-1 gap-1"
          >
            Continue
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="-rotate-90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

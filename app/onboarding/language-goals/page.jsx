'use client';

import { useOnboarding } from '@/components/ui/onboarding/onboarding-provider';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/base/label';
import { Button } from '@/components/ui/base/button';
import { Textarea } from '@/components/ui/base/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import KoelBirdRounded from '@/components/ui/base/koel-bird-rounded';
import {
  DateField,
  DateInput,
  DateSegment,
  TimeField,
  dateInputStyle,
} from '@/components/ui/datefield-rac';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useId, useMemo } from 'react';
import TargetLanguageSelector from '@/components/forms/target-language-selector';
import ExperienceLevelSelector from '@/components/forms/experience-level-selector';
import ChallengingWordsSelector from '@/components/forms/challenging-words-selector';
import CitySelector from '@/components/forms/city-selector';

export default function LanguageGoalsPage() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const router = useRouter();
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [citiesError, setCitiesError] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const citySelectId = useId();

  useEffect(() => {
    const loadCities = async () => {
      try {
        setCitiesLoading(true);
        setCitiesError(false);
        const response = await fetch(
          '/world_cities_15000_(including_all_states_and_counties).json',
        );
        if (!response.ok) throw new Error('Failed to load cities');
        const citiesData = await response.json();
        setCities(citiesData);
      } catch (error) {
        console.error('Failed to load cities:', error);
        setCitiesError(true);
      } finally {
        setCitiesLoading(false);
      }
    };

    loadCities();
  }, []);

  const handleNext = () => {
    setIsLoading(true);
    router.push('/onboarding/speech-assessment');
  };

  const handleBack = () => {
    router.push('/onboarding/getting-to-know-you');
  };

  const isNextDisabled = !onboardingData.experienceLevel;

  const languages = [
    { value: 'english', flag: '🇺🇸', name: 'English' },
    { value: 'spanish', flag: '🇪🇸', name: 'Spanish (Coming Soon)', disabled: true },
    { value: 'german', flag: '🇩🇪', name: 'German (Coming Soon)', disabled: true },
    { value: 'russian', flag: '🇷🇺', name: 'Russian (Coming Soon)', disabled: true },
  ];

  const selectedLanguage = languages.find(lang => lang.value === onboardingData.targetLanguage);

  const selectedCity = cities.find(city => {
    if (typeof onboardingData.learningCity === 'string') {
      return city.name === onboardingData.learningCity;
    }
    if (onboardingData.learningCity?.name) {
      return (
        city.name === onboardingData.learningCity.name &&
        city.state === onboardingData.learningCity.state &&
        city.country === onboardingData.learningCity.country
      );
    }
    return false;
  });

  const formatCountry = countryCode => {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(countryCode.toUpperCase());
  };

  const formatCityDisplay = city => {
    let display = city.name;
    if (city.state && city.state !== city.name) {
      display += `, ${city.state}`;
    }
    if (city.country) {
      display += `, ${formatCountry(city.country)}`;
    }
    return display;
  };

  const filteredCities = useMemo(() => {
    if (!citySearchTerm || citySearchTerm.length < 2) {
      return [];
    }

    const searchLower = citySearchTerm.toLowerCase();
    const results = cities
      .filter(city => {
        const cityName = city.name.toLowerCase();
        const stateName = city.state ? city.state.toLowerCase() : '';
        const countryCode = city.country ? city.country.toLowerCase() : '';

        return (
          cityName.includes(searchLower) ||
          stateName.includes(searchLower) ||
          countryCode.includes(searchLower)
        );
      })
      .sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const aStartsWith = aName.startsWith(searchLower);
        const bStartsWith = bName.startsWith(searchLower);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        return aName.localeCompare(bName);
      })
      .slice(0, 30);

    return results;
  }, [cities, citySearchTerm]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center p-8 text-center mx-4 rounded-xl z-40 bg-white/40 border-neutral-200 dark:border-neutral-800 max-w-2xl w-full">
        <KoelBirdRounded className="w-[70px] mb-3 h-fit mx-auto" />

        <h3 className="text-2xl font-semibold tracking-tighter mb-2 z-10">Your Language Goals</h3>
        <p className="text-md text-neutral-500 dark:text-neutral-400 mb-10 max-w-md text-balance z-10">
          Help us understand your goals so we can support your learning journey
        </p>

        <div className="space-y-6 w-full">
          <div className="space-y-4">
            <TargetLanguageSelector
              label="What language do you want to learn?"
              value={onboardingData.targetLanguage}
              onChange={value => updateOnboardingData('targetLanguage', value)}
              required={true}
              placeholder="Select your target language"
            />

            <ExperienceLevelSelector
              label="How many years have you studied this language?"
              value={onboardingData.experienceLevel}
              onChange={value => updateOnboardingData('experienceLevel', value)}
              required={true}
              placeholder="Select your experience level"
            />

            <CitySelector
              label="Where did you spend the longest time learning this language?"
              value={onboardingData.learningCity}
              onChange={value => updateOnboardingData('learningCity', value)}
              required={false}
              placeholder="Select a city"
            />

            <ChallengingWordsSelector
              label="Challenging Words"
              value={onboardingData.challengingWords}
              onChange={value => updateOnboardingData('challengingWords', value)}
              optional={true}
              placeholder="Are there any specific words you find difficult or confusing? (for example, 'thorough', 'entrepreneur', 'rural')"
              maxLength={500}
            />
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
            Step 2 of 3
          </p>
          <Button
            onClick={handleNext}
            disabled={isNextDisabled || isLoading}
            className="flex items-center flex-1 gap-1"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>
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
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

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

export default function LanguageGoalsPage() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const router = useRouter();
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [citiesError, setCitiesError] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');
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
    router.push('/onboarding/speech-assessment');
  };

  const handleBack = () => {
    router.push('/onboarding/getting-to-know-you');
  };

  const isNextDisabled = !onboardingData.experienceLevel;

  const languages = [
    { value: 'english', flag: '🇺🇸', name: 'English' },
    { value: 'spanish', flag: '🇪🇸', name: 'Spanish (Coming soon)', disabled: true },
    { value: 'german', flag: '🇩🇪', name: 'German (Coming soon)', disabled: true },
    { value: 'russian', flag: '🇷🇺', name: 'Russian (Coming soon)', disabled: true },
  ];

  const experienceLevels = [
    { value: '0', emoji: '🌱', name: 'Complete Beginner (0 years)' },
    { value: '0-1', emoji: '🌿', name: 'Less than 1 year' },
    { value: '1-2', emoji: '🌳', name: '1-2 years' },
    { value: '2-5', emoji: '🎯', name: '2-5 years' },
    { value: '5-10', emoji: '🚀', name: '5-10 years' },
    { value: '10+', emoji: '⭐', name: 'More than 10 years' },
    { value: 'native-level', emoji: '👑', name: 'Native/Near-native level' },
  ];

  const selectedLanguage = languages.find(lang => lang.value === onboardingData.targetLanguage);
  const selectedExperience = experienceLevels.find(
    level => level.value === onboardingData.experienceLevel,
  );

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
            <div className="space-y-2 text-left">
              <Label htmlFor="targetLanguage" className="mb-2">
                What language do you want to learn?
                <span className="text-sky-600 ml-1" aria-hidden="true">
                  *
                </span>
              </Label>
              <div className="relative">
                <Select
                  onValueChange={value => updateOnboardingData('targetLanguage', value)}
                  value={onboardingData.targetLanguage}
                >
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
                  <SelectContent
                    className="rounded-xl bg-neutral-100 dark:bg-neutral-900"
                    noPadding={true}
                  >
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
                        During the beta phase, we're focusing on English. In the future, we plan to
                        expand to other languages. Want to suggest what comes next?{' '}
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

            <div className="space-y-2 text-left">
              <Label htmlFor="experienceLevel" className="mb-2">
                How many years have you studied this language?
                <span className="text-sky-600 ml-1" aria-hidden="true">
                  *
                </span>
              </Label>
              <Select
                onValueChange={value => updateOnboardingData('experienceLevel', value)}
                value={onboardingData.experienceLevel}
              >
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
                    <p className="text-muted-foreground">Select your experience level</p>
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

            <div className="space-y-2 text-left">
              <Label htmlFor={citySelectId} className="mb-2">
                Where did you spend the longest time learning this language?
                <span className="text-xs text-neutral-500 ml-1">(Optional)</span>
              </Label>
              <Popover open={cityOpen} onOpenChange={setCityOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id={citySelectId}
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityOpen}
                    disabled={citiesError}
                    className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] h-10 mt-1 rounded-xl disabled:opacity-50"
                  >
                    {citiesLoading ? (
                      <span className="text-muted-foreground">Loading cities...</span>
                    ) : citiesError ? (
                      <span className="text-muted-foreground">
                        Information not needed at this time
                      </span>
                    ) : selectedCity ? (
                      <span className="flex min-w-0 items-center">
                        <span className="truncate">{formatCityDisplay(selectedCity)}</span>
                      </span>
                    ) : onboardingData.learningCity &&
                      typeof onboardingData.learningCity === 'string' ? (
                      <span className="flex min-w-0 items-center">
                        <span className="truncate">{onboardingData.learningCity}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Select a city</span>
                    )}
                    <ChevronDownIcon
                      size={16}
                      className="text-muted-foreground/80 shrink-0 -mr-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0 rounded-xl"
                  align="start"
                >
                  <Command className="rounded-xl" shouldFilter={false}>
                    <CommandInput
                      placeholder="Search for a city..."
                      value={citySearchTerm}
                      onValueChange={setCitySearchTerm}
                    />
                    <CommandList className="p-1 max-h-[200px]">
                      {!citySearchTerm || citySearchTerm.length < 2 ? (
                        <CommandEmpty>Type at least 2 characters to search...</CommandEmpty>
                      ) : filteredCities.length === 0 ? (
                        <CommandEmpty>No cities found.</CommandEmpty>
                      ) : (
                        <CommandGroup className="p-0">
                          {filteredCities.map((city, index) => (
                            <CommandItem
                              key={`${city.country}-${city.state}-${city.name}-${index}`}
                              value={city.name}
                              className="rounded-lg"
                              onSelect={() => {
                                updateOnboardingData('learningCity', {
                                  name: city.name,
                                  state: city.state,
                                  country: city.country,
                                });
                                setCityOpen(false);
                                setCitySearchTerm('');
                              }}
                            >
                              {formatCityDisplay(city)}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="challengingWords" className="mb-2">
                Challenging Words
                <span className="text-xs text-neutral-500 ml-1">(Optional)</span>
              </Label>
              <Textarea
                id="challengingWords"
                placeholder="Are there any specific words you find difficult or confusing? (for example, 'thorough', 'entrepreneur', 'rural')"
                value={onboardingData.challengingWords}
                onChange={e => updateOnboardingData('challengingWords', e.target.value)}
                className="min-h-[100px] mt-1 rounded-xl resize-none p-3"
                maxLength={500}
              />
              <p className="text-xs text-neutral-400 mt-1">
                {onboardingData.challengingWords?.length || 0}/500 characters
              </p>
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
            Step 2 of 3
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

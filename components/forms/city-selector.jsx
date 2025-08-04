'use client';

import { Label } from '@/components/ui/base/label';
import { Button } from '@/components/ui/base/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/base/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/base/popover';
import { ChevronDownIcon } from 'lucide-react';
import { useState, useEffect, useId, useMemo } from 'react';

export default function CitySelector({
  label = 'Where did you spend the longest time learning this language?',
  value,
  onChange,
  required = false,
  optional = true,
  className = '',
  placeholder = 'Select a city',
}) {
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

  const selectedCity = cities.find(city => {
    if (typeof value === 'string') {
      return city.name === value;
    }
    if (value?.name) {
      return (
        city.name === value.name && city.state === value.state && city.country === value.country
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
    <div className={`space-y-2 text-left ${className}`}>
      <Label htmlFor={citySelectId} className="mb-2">
        {label}
        {required && (
          <span className="text-sky-600 ml-1" aria-hidden="true">
            *
          </span>
        )}
        {optional && <span className="text-xs text-neutral-500 ml-1">(Optional)</span>}
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
              <span className="text-muted-foreground">Information not needed at this time</span>
            ) : selectedCity ? (
              <span className="flex min-w-0 items-center">
                <span className="truncate">{formatCityDisplay(selectedCity)}</span>
              </span>
            ) : value && typeof value === 'string' ? (
              <span className="flex min-w-0 items-center">
                <span className="truncate">{value}</span>
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
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0 rounded-xl"
          align="start"
        >
          <Command className="rounded-xl" shouldFilter={false}>
            <CommandInput
              placeholder="Search city..."
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
                      key={`${city.country}-${city.state}-${index}`}
                      value={city.country + ' ' + city.state + ' ' + city.name + ' ' + index}
                      className="rounded-lg"
                      onSelect={() => {
                        onChange({
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
  );
}

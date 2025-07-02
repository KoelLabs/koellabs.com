'use client';

import React, { useId, useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Label } from '@/components/ui/base/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/base/card';
import { ScrollArea, ScrollBar } from '@/components/ui/base/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/base/tabs';
import { Lock, User2, Check, Minus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/base/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base/select';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/base/skeleton';

const themeItems = [
  { value: 'light', label: 'Light', image: '/images/light.png' },
  { value: 'dark', label: 'Dark', image: '/images/dark.png' },
  { value: 'system', label: 'System', image: '/images/system.png' },
];

// Memoized input field component
const FormInput = memo(({ label, id, name, value, onChange, isPending }) => {
  const handleChange = useCallback(
    e => {
      onChange(name, e.target.value);
    },
    [name, onChange],
  );

  if (isPending) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-normal ml-0.5">
          {label}
        </Label>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-normal ml-0.5">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        className="text-sm rounded-lg"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
});
FormInput.displayName = 'FormInput';

// Memoized select field component
const FormSelect = memo(({ label, id, value, options, onChange, isPending }) => {
  const handleChange = useCallback(
    value => {
      onChange(id, value);
    },
    [id, onChange],
  );

  if (isPending) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-normal ml-0.5">
          {label}
        </Label>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-normal ml-0.5">
        {label}
      </Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id={id} className="text-sm rounded-lg">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={option.disabled ? 'text-neutral-400' : ''}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
FormSelect.displayName = 'FormSelect';

// Memoized appearance section
const AppearanceSection = memo(({ theme, setTheme }) => {
  const id = useId();

  return (
    <Card className="rounded-xl">
      <CardHeader className="p-5 border-b border-neutral-200 dark:border-neutral-800 rounded-t-xl bg-neutral-50 dark:bg-neutral-900">
        <div>
          <h2 className="text-lg font-medium tracking-[-0.04em]">Appearance</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize how the app looks and feels.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        <div className="space-y-4">
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium leading-none text-foreground">
              Choose a theme
            </legend>
            <RadioGroup className="flex gap-3" value={theme} onValueChange={setTheme}>
              {themeItems.map(item => (
                <label key={`${id}-${item.value}`}>
                  <RadioGroupItem
                    id={`${id}-${item.value}`}
                    value={item.value}
                    className="peer sr-only after:absolute after:inset-0"
                  />
                  <img
                    src={item.image}
                    alt={item.label}
                    width={90}
                    height={90}
                    className="relative object-cover cursor-pointer overflow-hidden rounded-lg border border-input shadow-xs shadow-black/5 outline-offset-2 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-ring/70 peer-data-disabled:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-disabled:opacity-50"
                  />
                  <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="in-[.group]:peer-data-[state=unchecked]:hidden"
                      aria-hidden="true"
                    />
                    <Minus
                      size={16}
                      strokeWidth={2}
                      className="in-[.group]:peer-data-[state=checked]:hidden"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium">{item.label}</span>
                  </span>
                </label>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
      </CardContent>
    </Card>
  );
});
AppearanceSection.displayName = 'AppearanceSection';

// Memoized security section
const SecuritySection = memo(() => {
  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="p-5 border-b border-neutral-200 dark:border-neutral-800 rounded-t-xl bg-neutral-50 dark:bg-neutral-900">
          <div>
            <h2 className="text-lg font-medium tracking-[-0.04em]">Change Password</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Update your password associated with your account.
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-sm font-normal ml-0.5">
                Current Password
              </Label>
              <Input
                id="current-password"
                name="current_password"
                type="password"
                className="text-sm rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-normal ml-0.5">
                New Password
              </Label>
              <Input
                id="new-password"
                name="new_password"
                type="password"
                className="text-sm rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-normal ml-0.5">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                name="confirm_password"
                type="password"
                className="text-sm rounded-lg"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-neutral-50 dark:bg-neutral-900 rounded-b-xl border-t border-neutral-200 dark:border-neutral-800 p-4">
          <Button size="settings">Update Password</Button>
        </CardFooter>
      </Card>

      <Card className="rounded-xl">
        <CardHeader className="p-5 border-b border-neutral-200 dark:border-neutral-800 rounded-t-xl bg-neutral-50 dark:bg-neutral-900">
          <div>
            <h2 className="text-lg font-medium tracking-[-0.04em] text-destructive">
              Delete Account
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              No longer want to use our service? You can delete your account here. This action is
              not reversible. All information related to this account will be deleted permanently.
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-8">
          <div>
            <Button size="settings" variant="destructive">
              Yes, Delete My Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
});
SecuritySection.displayName = 'SecuritySection';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const { data: session, isPending, refetch } = authClient.useSession();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    targetLanguage: '',
    targetDialect: '',
    nativeLanguage: '',
    nativeDialect: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      // Parse the user's name into first and last name
      const nameParts = session.user.name?.split(' ') || ['', ''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Parse metadata if it exists
      let userPreferences = {};
      if (session.user.metadata) {
        try {
          userPreferences =
            typeof session.user.metadata === 'string'
              ? JSON.parse(session.user.metadata)
              : session.user.metadata;
        } catch (error) {
          console.error('Error parsing user metadata:', error);
        }
      }

      setFormData({
        firstName,
        lastName,
        targetLanguage: userPreferences.targetLanguage || '',
        targetDialect: userPreferences.targetDialect || '',
        nativeLanguage: userPreferences.nativeLanguage || '',
        nativeDialect: userPreferences.nativeDialect || '',
      });
    }
  }, [session]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const saveInformation = useCallback(async () => {
    if (!session?.user) return;

    setIsSaving(true);

    try {
      // First update name if changed
      if (session.user.name !== `${formData.firstName} ${formData.lastName}`.trim()) {
        const nameUpdateResponse = await fetch('/api/auth/update-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
          }),
        });

        if (!nameUpdateResponse.ok) {
          throw new Error('Failed to update name');
        }
      }

      // Update user preferences
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetLanguage: formData.targetLanguage,
          targetDialect: formData.targetDialect,
          nativeLanguage: formData.nativeLanguage,
          nativeDialect: formData.nativeDialect,
          hasConsented: true, // Assuming they've already consented during onboarding
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      toast({
        title: 'Settings saved',
        description: 'Your preferences have been updated successfully.',
      });

      // Refresh the session to get updated user data
      refetch();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error saving settings',
        description: 'There was a problem saving your preferences.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }, [formData, session, toast, refetch]);

  // Memoize select options to prevent re-renders
  const languageOptions = useMemo(
    () => [
      { value: 'english', label: 'English' },
      { value: 'spanish', label: 'Spanish (Coming Soon)', disabled: true },
      { value: 'french', label: 'French (Coming Soon)', disabled: true },
      { value: 'german', label: 'German (Coming Soon)', disabled: true },
    ],
    [],
  );

  const nativeLanguageOptions = useMemo(
    () => [
      { value: 'english', label: 'English' },
      { value: 'spanish', label: 'Spanish' },
      { value: 'french', label: 'French' },
      { value: 'german', label: 'German' },
    ],
    [],
  );

  const dialectOptions = useMemo(
    () => [
      { value: 'american', label: 'American' },
      { value: 'british', label: 'British' },
      { value: 'australian', label: 'Australian' },
      { value: 'canadian', label: 'Canadian' },
      { value: 'irish', label: 'Irish' },
      { value: 'scottish', label: 'Scottish' },
      { value: 'other', label: 'Other' },
    ],
    [],
  );

  // Memoize the user avatar to prevent re-renders
  const userAvatar = useMemo(() => {
    if (isPending) {
      return <Skeleton className="h-24 w-24 rounded-full" />;
    }
    return (
      <img
        alt=""
        src={session?.user?.image || 'https://www.ruslan.in/grad.png'}
        className="h-24 w-24 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover"
      />
    );
  }, [isPending, session?.user?.image]);

  return (
    <div className="w-full bg-white rounded-xl dark:bg-black">
      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center w-full gap-2 border-dashed border-neutral-300 dark:border-neutral-700">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tighter px-4.5 pt-0.5 text-neutral-900 dark:text-neutral-100">
            Settings
          </h1>
        </div>
      </div>

      <div className="w-full p-4">
        <Tabs defaultValue="personal">
          <TabsList className="grid w-fit grid-cols-2 border rounded-full bg-neutral-200/50 border-neutral-300 dark:bg-neutral-800/50 ">
            <TabsTrigger value="personal" className="font-normal rounded-full cursor-pointer">
              <span className="flex items-center gap-2">
                <User2 className="h-4 w-4" />
                Personal
              </span>
            </TabsTrigger>
            <TabsTrigger value="security" className="font-normal rounded-full cursor-pointer">
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Security
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-4 space-y-6">
            <Card className="rounded-xl">
              <CardHeader className="p-5 border-b border-neutral-200 dark:border-neutral-800 rounded-t-xl bg-neutral-50 dark:bg-neutral-900">
                <div>
                  <h2 className="text-lg font-medium tracking-[-0.04em]">Personal Information</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Change your personal information that's used across the app.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    {userAvatar}
                    <div>
                      <Button variant="outline" className="text-sm">
                        Change Avatar
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="First Name"
                      id="first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      isPending={isPending}
                    />

                    <FormInput
                      label="Last Name"
                      id="last-name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      isPending={isPending}
                    />

                    <FormSelect
                      label="Target Language"
                      id="targetLanguage"
                      value={formData.targetLanguage}
                      options={languageOptions}
                      onChange={handleInputChange}
                      isPending={isPending}
                    />

                    <FormSelect
                      label="Target Dialect"
                      id="targetDialect"
                      value={formData.targetDialect}
                      options={dialectOptions}
                      onChange={handleInputChange}
                      isPending={isPending}
                    />

                    <FormSelect
                      label="Native Language"
                      id="nativeLanguage"
                      value={formData.nativeLanguage}
                      options={nativeLanguageOptions}
                      onChange={handleInputChange}
                      isPending={isPending}
                    />

                    <FormSelect
                      label="Native Dialect"
                      id="nativeDialect"
                      value={formData.nativeDialect}
                      options={dialectOptions}
                      onChange={handleInputChange}
                      isPending={isPending}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-neutral-50 dark:bg-neutral-900 rounded-b-xl border-t border-neutral-200 dark:border-neutral-800 p-4">
                <Button size="settings" onClick={saveInformation} disabled={isSaving || isPending}>
                  {isSaving ? 'Saving...' : 'Save Information'}
                </Button>
              </CardFooter>
            </Card>

            <AppearanceSection theme={theme} setTheme={setTheme} />
          </TabsContent>

          <TabsContent value="security" className="mt-4 space-y-6">
            <SecuritySection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

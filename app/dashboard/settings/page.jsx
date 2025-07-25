'use client';

import React, { useId, useState, useEffect, useMemo, useCallback, memo, useRef } from 'react';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Label } from '@/components/ui/base/label';
import { Textarea } from '@/components/ui/base/textarea';
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

// Import shared form components
import LanguageSelector from '@/components/forms/language-selector';
import CountrySelector from '@/components/forms/country-selector';
import TargetLanguageSelector from '@/components/forms/target-language-selector';
import BetaExperienceLevelSelector from '@/components/forms/beta-experience-level-selector';
import CitySelector from '@/components/forms/city-selector';
import DatePickerComponent from '@/components/ui/base/date';
import { parseDate } from '@internationalized/date';

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
      <Label htmlFor={id} className="text-sm font-medium ml-0.5">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        className="text-sm rounded-xl mt-1"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
});
FormInput.displayName = 'FormInput';

// Memoized textarea field component
const FormTextarea = memo(
  ({ label, id, name, value, onChange, isPending, placeholder, maxLength }) => {
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
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium ml-0.5">
          {label}
        </Label>
        <Textarea
          id={id}
          name={name}
          className="min-h-[80px] rounded-xl resize-none mt-1"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
        {maxLength && (
          <p className="text-xs text-muted-foreground">
            {value?.length || 0}/{maxLength} characters
          </p>
        )}
      </div>
    );
  },
);
FormTextarea.displayName = 'FormTextarea';

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
                  <span className="mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                    {theme === item.value ? (
                      <Check size={16} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Minus size={16} strokeWidth={2} aria-hidden="true" />
                    )}
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
                className="text-sm rounded-lg mt-1"
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
                className="text-sm rounded-lg mt-1"
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
                className="text-sm rounded-lg mt-1"
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
            <h2 className="text-lg font-medium tracking-[-0.04em] text-destructive dark:text-red-500">
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
  const fileInputRef = useRef(null);

  const { data: session, isPending, refetch } = authClient.useSession();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    targetLanguage: '',
    nativeLanguage: '',
    placeOfBirth: '',
    birthday: '',
    learningCity: '',
    experienceLevel: '',
    challengingWords: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState('');

  useEffect(() => {
    if (session?.user) {
      const nameParts = session.user.name?.split(' ') || ['', ''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

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
        nativeLanguage: userPreferences.nativeLanguage || '',
        placeOfBirth: userPreferences.placeOfBirth || '',
        birthday: userPreferences.birthday || '',
        learningCity: userPreferences.learningCity || '',
        experienceLevel: userPreferences.experienceLevel || '',
        challengingWords: userPreferences.challengingWords || '',
      });

      setPreviewAvatar(session.user.image || '');
    }
  }, [session]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleAvatarChange = useCallback(
    e => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Avatar image must be less than 1MB',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = event => {
        const base64Image = event.target.result;
        setPreviewAvatar(base64Image);
      };
      reader.readAsDataURL(file);
    },
    [toast],
  );

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

      if (previewAvatar && previewAvatar !== session.user.image) {
        const avatarUpdateResponse = await fetch('/api/auth/update-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: previewAvatar,
          }),
        });

        if (!avatarUpdateResponse.ok) {
          throw new Error('Failed to update avatar');
        }
      }

      const preferences = {
        targetLanguage: formData.targetLanguage,
        nativeLanguage: formData.nativeLanguage,
        placeOfBirth: formData.placeOfBirth,
        birthday: formData.birthday,
        learningCity: formData.learningCity,
        experienceLevel: formData.experienceLevel,
        challengingWords: formData.challengingWords,
      };

      const preferencesResponse = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!preferencesResponse.ok) {
        throw new Error('Failed to update preferences');
      }

      await refetch();

      toast({
        title: 'Settings updated',
        description: 'Your preferences have been saved successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error saving information:', error);
      toast({
        title: 'Update failed',
        description: 'There was a problem saving your preferences.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }, [formData, session, toast, refetch, previewAvatar]);

  const safeParseBirthday = useCallback(dateString => {
    if (!dateString || typeof dateString !== 'string') return null;
    try {
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return parseDate(dateString);
      }
      return null;
    } catch (error) {
      console.warn('Failed to parse birthday:', dateString, error);
      return null;
    }
  }, []);

  const userAvatar = useMemo(() => {
    if (isPending) {
      return <Skeleton className="h-24 w-24 rounded-full" />;
    }
    return (
      <img
        alt="User avatar"
        src={previewAvatar || session?.user?.image || 'https://www.ruslan.in/grad.png'}
        className="h-24 w-24 rounded-full border outline-neutral-300 object-fill"
      />
    );
  }, [isPending, session?.user?.image, previewAvatar]);

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
          <TabsList className="grid w-fit grid-cols-2 border rounded-[15px] ">
            <TabsTrigger
              value="personal"
              className="font-normal rounded-xl cursor-pointer outline-offset-[-0.75px] data-[state=active]:outline-[0.75px] outline-neutral-300 dark:outline-neutral-800"
            >
              <span className="flex items-center gap-2 tracking-tight">
                <User2 className="h-4 w-4" />
                Personal
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="font-normal rounded-xl cursor-pointer outline-offset-[-0.75px] data-[state=active]:outline-[0.75px] outline-neutral-300 dark:outline-neutral-800"
            >
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
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleAvatarChange}
                      />
                      <Button variant="outline" className="text-sm" onClick={handleAvatarClick}>
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

                    {isPending ? (
                      <div className="space-y-2">
                        <Label className="text-sm font-normal ml-0.5">Target Language</Label>
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <TargetLanguageSelector
                        label="Target Language"
                        value={formData.targetLanguage}
                        onChange={value => handleInputChange('targetLanguage', value)}
                      />
                    )}

                    {isPending ? (
                      <div className="space-y-2">
                        <Label className="text-sm font-normal ml-0.5">Native Language</Label>
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <LanguageSelector
                        label="Native Language"
                        value={formData.nativeLanguage}
                        onChange={value => handleInputChange('nativeLanguage', value)}
                        placeholder="Select your native language"
                        showEnglishName={true}
                      />
                    )}

                    {isPending ? (
                      <div className="space-y-2">
                        <Label className="text-sm font-normal ml-0.5">Place of Birth</Label>
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <CountrySelector
                        label="Place of Birth"
                        value={formData.placeOfBirth}
                        onChange={value => handleInputChange('placeOfBirth', value)}
                        placeholder="Select your place of birth"
                      />
                    )}

                    {isPending ? (
                      <div className="space-y-2">
                        <Label className="text-sm font-normal ml-0.5">Learning City</Label>
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <CitySelector
                        label="Learning City"
                        value={formData.learningCity}
                        onChange={value => handleInputChange('learningCity', value)}
                        optional={false}
                        placeholder="Select a city"
                      />
                    )}

                    {isPending ? (
                      <div className="space-y-2">
                        <Label className="text-sm font-normal ml-0.5">Birthday</Label>
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <DatePickerComponent
                        label="Birthday"
                        optional={true}
                        value={safeParseBirthday(formData.birthday)}
                        onChange={value =>
                          handleInputChange('birthday', value ? value.toString() : '')
                        }
                      />
                    )}

                    <div className="">
                      {isPending ? (
                        <div className="space-y-2">
                          <Label className="text-sm font-normal ml-0.5">Experience Level</Label>
                          <Skeleton className="h-10 w-full" />
                        </div>
                      ) : (
                        <BetaExperienceLevelSelector
                          label="Experience Level"
                          value={formData.experienceLevel}
                          onChange={value => handleInputChange('experienceLevel', value)}
                          placeholder="Select your experience level"
                        />
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <FormTextarea
                        label="Challenging Words"
                        id="challenging-words"
                        name="challengingWords"
                        value={formData.challengingWords}
                        onChange={handleInputChange}
                        isPending={isPending}
                        placeholder="Words you find difficult or confusing (e.g., 'thorough', 'entrepreneur', 'rural')"
                        maxLength={500}
                        className="rounded-2xl"
                      />
                    </div>
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

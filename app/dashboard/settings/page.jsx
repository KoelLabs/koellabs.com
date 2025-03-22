'use client';

import React, { useId } from 'react';
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
const themeItems = [
  { value: 'light', label: 'Light', image: '/images/light.png' },
  { value: 'dark', label: 'Dark', image: '/images/dark.png' },
  { value: 'system', label: 'System', image: '/images/system.png' },
];

export default function SettingsPage() {
  const id = useId();

  const { theme, setTheme } = useTheme();
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
                    <img
                      alt=""
                      src="https://www.ruslan.in/grad.png"
                      className="h-24 w-24 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover"
                    />
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
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-sm font-normal ml-0.5">
                        First Name
                      </Label>
                      <Input id="first-name" name="first-name" className="text-sm rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-sm font-normal ml-0.5">
                        Last Name
                      </Label>
                      <Input id="last-name" name="last-name" className="text-sm rounded-lg" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetLanguage" className="text-sm font-normal ml-0.5">
                        Target Language
                      </Label>
                      <Select>
                        <SelectTrigger id="targetLanguage" className="text-sm rounded-lg">
                          <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish" className="text-neutral-400">
                            Spanish (Coming Soon)
                          </SelectItem>
                          <SelectItem value="french" className="text-neutral-400">
                            French (Coming Soon)
                          </SelectItem>
                          <SelectItem value="german" className="text-neutral-400">
                            German (Coming Soon)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetDialect" className="text-sm font-normal ml-0.5">
                        Target Dialect
                      </Label>
                      <Select>
                        <SelectTrigger id="targetDialect" className="text-sm rounded-lg">
                          <SelectValue placeholder="Select target dialect" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="american">American</SelectItem>
                          <SelectItem value="british">British</SelectItem>
                          <SelectItem value="australian">Australian</SelectItem>
                          <SelectItem value="canadian">Canadian</SelectItem>
                          <SelectItem value="irish">Irish</SelectItem>
                          <SelectItem value="scottish">Scottish</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nativeLanguage" className="text-sm font-normal ml-0.5">
                        Native Language
                      </Label>
                      <Select>
                        <SelectTrigger id="nativeLanguage" className="text-sm rounded-lg">
                          <SelectValue placeholder="Select native language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nativeDialect" className="text-sm font-normal ml-0.5">
                        Native Dialect
                      </Label>
                      <Select>
                        <SelectTrigger id="nativeDialect" className="text-sm rounded-lg">
                          <SelectValue placeholder="Select native dialect" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="american">American</SelectItem>
                          <SelectItem value="british">British</SelectItem>
                          <SelectItem value="australian">Australian</SelectItem>
                          <SelectItem value="canadian">Canadian</SelectItem>
                          <SelectItem value="irish">Irish</SelectItem>
                          <SelectItem value="scottish">Scottish</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-neutral-50 dark:bg-neutral-900 rounded-b-xl border-t border-neutral-200 dark:border-neutral-800 p-4">
                <Button size="settings">Save Information</Button>
              </CardFooter>
            </Card>

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
          </TabsContent>

          <TabsContent value="security" className="mt-4 space-y-6">
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
                    No longer want to use our service? You can delete your account here. This action
                    is not reversible. All information related to this account will be deleted
                    permanently.
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

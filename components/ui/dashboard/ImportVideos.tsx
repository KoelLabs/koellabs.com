'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Label } from '@/components/ui/base/label';
import { validateAndSubmitYoutubeUrl } from '@/components/actions/youtube-video-validate';
import { useFormState, useFormStatus } from 'react-dom';
import { HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/base/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/base/drawer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/base/tooltip';
import { Card, CardContent } from '@/components/ui/base/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/base/carousel';
import { useMediaQuery } from '@custom-react-hooks/use-media-query';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="tracking-tight" disabled={pending}>
      {pending ? 'Submitting...' : 'Import Video'}
    </Button>
  );
}

function YouTubeUrlHelpContent() {
  const steps = [
    { title: 'Find the Video', content: 'Go to YouTube and find the video you want to import.' },
    { title: 'Click Share', content: "Click on the 'Share' button below the video." },
    { title: 'Copy URL', content: "In the 'Share' popup, copy the URL provided." },
    { title: 'Paste URL', content: "Paste the copied URL into the 'YouTube URL' input field." },
    { title: 'Example', content: 'Example URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ];

  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {steps.map((step, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-center">{step.content}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function YouTubeUrlHelpModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">How to get YouTube URL</span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click for help on getting a YouTube URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How to get a YouTube URL</DialogTitle>
            <DialogDescription>Follow these steps to get a YouTube video URL:</DialogDescription>
          </DialogHeader>
          <YouTubeUrlHelpContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">How to get YouTube URL</span>
              </Button>
            </DrawerTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click for help on getting a YouTube URL</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>How to get a YouTube URL</DrawerTitle>
          <DrawerDescription>Follow these steps to get a YouTube video URL:</DrawerDescription>
        </DrawerHeader>
        <YouTubeUrlHelpContent />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function ImportVideos() {
  const [state, formAction] = useFormState(validateAndSubmitYoutubeUrl, {
    message: '',
    success: false,
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center pt-4 px-4">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
          Import Videos
        </h1>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
          <div className="text-left w-full p-4">
            <form action={formAction} className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 just">
                <div className="space-y-2 w-full">
                  <Input
                    id="youtubeUrl"
                    name="youtubeUrl"
                    className="w-full"
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  />
                </div>
                <SubmitButton />
              </div>
              {state.message && (
                <p className={`text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>
                  {state.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

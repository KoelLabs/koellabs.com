'use client';
import * as React from 'react';

import { cn } from '@/utils/styles';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useMediaQuery from '@custom-react-hooks/use-media-query';

export function ContactDialog({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 968px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="tracking-tight text-neutral-700 font-medium cursor-pointer"
          {...props}
        >
          Contact
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1055px] w-full bg-white">
          <DialogHeader>
            <DialogTitle>
              <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-indigo-700 tracking-tighter">
                Contact Us
              </span>
            </DialogTitle>
            <DialogDescription className="mt-4 text-md text-black">
              <span>
                Have a question or want to get in touch? Fill out the form below and we&apos;ll get
                back to you as soon as possible.
              </span>
            </DialogDescription>
          </DialogHeader>
          <form className="grid grid-cols-1 gap-y-6" method="Post">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-indigo-950">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  className="block w-full focus:outline-none shadow-sm focus:ring-2 sm:text-sm focus:ring-indigo-600 bg-neutral-100 rounded-md h-12 p-4"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-indigo-950">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full focus:outline-none shadow-sm focus:ring-2 sm:text-sm focus:ring-indigo-600 bg-neutral-100 rounded-md h-12 p-4"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-indigo-950">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  rows={4}
                  className="block max-h-36 w-full focus:outline-none shadow-sm focus:ring-2 sm:text-sm focus:ring-indigo-600 bg-neutral-100 rounded-md p-4"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-600/80 focus:outline-none focus:ring-2  transition-all focus:ring-offset-2 focus:ring-indigo-700"
              >
                Send
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className="tracking-tight text-neutral-700 font-medium cursor-pointer"
        {...props}
      >
        Contact
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>
            <span className="text-xl font-semibold text-black">Contact Us</span>
          </DrawerTitle>
          <DrawerDescription className="mt-4 text-md text-black">
            <span>
              Have a question or want to get in touch? Fill out the form below and we&apos;ll get
              back to you as soon as possible.
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <form className="grid grid-cols-1 gap-y-6 px-4" method="Post">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                autoComplete="name"
                className="block w-full focus:outline-none shadow-sm focus:ring-2 sm:text-sm focus:ring-indigo-600 bg-neutral-100 rounded-md h-12 p-4"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-indigo-950">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full focus:outline-none shadow-sm focus:ring-2 sm:text-sm focus:ring-indigo-600 bg-neutral-100 rounded-md h-12 p-4"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-indigo-950">
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                rows={4}
                className="block max-h-36 w-full focus:outline-none shadow-sm focus:ring-2 sm:text-sm focus:ring-indigo-600 bg-neutral-100 rounded-md p-4"
                defaultValue={''}
              />
            </div>
          </div>
          <div className="sm:col-span-2 sm:flex sm:justify-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-600/80 focus:outline-none focus:ring-2  transition-all focus:ring-offset-2 focus:ring-indigo-700"
            >
              Send
            </button>
          </div>
        </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

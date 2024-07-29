import React from 'react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu, X } from 'lucide-react'
import { Button } from './button'
import { ContactDialog } from './1 - contact-dialog'


export default function MobileDrawer({ ...props }) {
  return (
    <Drawer className="" {...props}>
      <DrawerTrigger className='mt-2'>
        <Menu size={24} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerClose>
              <X className="opacity-50" size={24} />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <a href="/" className="text-black">
            <Button variant='outline' className="w-full">Visit Home</Button>
          </a>
          <a href="https://www.foym.org" className="text-black">
            <Button variant='outline' className="w-full">Apply Now</Button>
          </a>
          <Button variant='outline' className="w-full">
            <ContactDialog className="mr-1" />   Us
          </Button>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}

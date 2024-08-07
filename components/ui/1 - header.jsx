import React from 'react'
import { ContactDialog } from './1 - contact-dialog.jsx'
import MobileDrawer from './1 - mobile-drawer.jsx'

const links = [
  { href: '/', label: 'Home' },
]

export default function Header() {
  return (
    <header className=" overflow-hidden h-fit w-full text-black sticky bg-neutral-100/50 backdrop-blur-md border border-neutral-200">
      <nav className="flex justify-between items-center max-w-[1055px] px-8 w-full py-6 mx-auto">
        <a href="/" className="text-2xl font-semibold  tracking-[-0.04em]">Koel.ai</a>
        <ul className="md:flex justify-between items-center gap-6 hidden">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a className='tracking-tight text-neutral-600 font-medium' href={href}>{label}</a>
            </li>
          ))}
          <ContactDialog />
        </ul>
        <div className='md:hidden'>
          <MobileDrawer className="" />
        </div>
      </nav>
    </header>
    
  )
}

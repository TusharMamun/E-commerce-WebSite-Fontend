"use client"

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState, useEffect } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation } from '@/Constent'

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-gray-600 hover:text-themeColor hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <RiMenu3Fill className="text-2xl" />
      </button>

      {/* Mobile Menu Dialog */}
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        className="relative z-50 md:hidden"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        {/* Slide panel */}
        <div className="fixed inset-0 flex items-start justify-end">
          <DialogPanel
            transition
            className="w-full max-w-sm h-full bg-white shadow-xl transform transition-all duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Menu
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* ONLY NAVIGATION MENU - No footer links */}
            <nav className="p-4">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-4 py-3 rounded-lg transition-colors text-base font-medium
                          ${isActive 
                            ? 'bg-themeColor text-white' 
                            : 'text-gray-700 hover:text-themeColor hover:bg-gray-50'
                          }
                        `}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            
            {/* NO FOOTER SECTION - Completely removed */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default MobileNavigation
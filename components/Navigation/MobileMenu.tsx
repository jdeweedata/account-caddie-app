'use client'

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Navigation } from './Navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed inset-y-0 right-0 w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              className="text-te-papa-green p-2 hover:text-chelsea-cucumber transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col items-start space-y-4 p-4">
            <Navigation isMobile onNavClick={onClose} />
            <Link href="/contact" passHref className="w-full mt-4">
              <Button 
                className="w-full bg-chelsea-cucumber text-white hover:bg-te-papa-green transition-colors" 
                onClick={onClose}
              >
                Contact Us
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
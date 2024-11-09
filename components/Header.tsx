'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Navigation } from './Navigation/Navigation'
import { MobileMenu } from './Navigation/MobileMenu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto'
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-[8rem] h-[2.8rem] sm:w-[10rem] sm:h-[3.5rem] md:w-[12rem] md:h-[4.2rem] lg:w-[14rem] lg:h-[4.9rem]">
              <Image
                src="https://res.cloudinary.com/drnjxfm8t/image/upload/v1729255155/Account_Caddie_Email_Logo_114_x_40_px_bjbewa.png"
                alt="Account Caddie Logo"
                fill
                style={{ objectFit: 'contain' }}
                className="logo-image"
                priority
              />
            </div>
          </Link>

          {!isMobile && (
            <>
              <nav className="hidden lg:flex space-x-6">
                <Navigation />
              </nav>
              <Link href="/contact" passHref>
                <Button className="hidden lg:block bg-[#069949] text-white hover:bg-te-papa-green">
                  Contact Us
                </Button>
              </Link>
            </>
          )}

          <button
            className="lg:hidden text-te-papa-green p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} />
          </button>
        </div>

        <MobileMenu isOpen={isMenuOpen && isMobile} onClose={closeMenu} />
      </div>
    </header>
  )
}
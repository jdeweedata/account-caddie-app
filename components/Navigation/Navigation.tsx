'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavigationProps {
  isMobile?: boolean
  onNavClick?: () => void
}

const services = [
  {
    name: "Accounting & Reporting",
    path: "/services/accounting-reporting"
  },
  {
    name: "Tax Services",
    path: "/services/tax-services"
  },
  {
    name: "Financial Planning",
    path: "/services/financial-planning"
  },
  {
    name: "Risk & Compliance",
    path: "/services/risk-compliance"
  },
  {
    name: "Strategic Services",
    path: "/services/strategic-services"
  },
  {
    name: "Debtors Management",
    path: "/services/debtors-management"
  },
  {
    name: "Payroll Assistance",
    path: "/services/payroll-assistance"
  },
  {
    name: "Caddie Support",
    path: "/services/caddie-support"
  }
]

export function Navigation({ isMobile, onNavClick }: NavigationProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <Link 
          href="/" 
          className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2 w-full" 
          onClick={onNavClick}
        >
          Home
        </Link>
        
        <div className="w-full">
          <button
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            className="flex items-center justify-between text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2 w-full"
          >
            <span>Services</span>
            {isServicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {isServicesOpen && (
            <div className="pl-4 space-y-2 mt-2">
              {services.map((service) => (
                <Link
                  key={service.path}
                  href={service.path}
                  className="block text-gray-700 hover:text-chelsea-cucumber transition-colors py-1"
                  onClick={onNavClick}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link 
          href="/about" 
          className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2 w-full"
          onClick={onNavClick}
        >
          About
        </Link>
        
        <Link 
          href="/pricing" 
          className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2 w-full"
          onClick={onNavClick}
        >
          Pricing
        </Link>
        
        <Link 
          href="/faq" 
          className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2 w-full"
          onClick={onNavClick}
        >
          FAQ
        </Link>
      </>
    )
  }

  return (
    <>
      <Link 
        href="/" 
        className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2" 
        onClick={onNavClick}
      >
        Home
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2 flex items-center">
          Services <ChevronDown className="inline-block ml-1" size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-md min-w-[200px]">
          {services.map((service) => (
            <DropdownMenuItem key={service.path} className="focus:bg-gray-100">
              <Link 
                href={service.path} 
                className="w-full block py-2 px-2 text-gray-700 hover:text-chelsea-cucumber transition-colors"
                onClick={onNavClick}
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Link 
        href="/about" 
        className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2"
        onClick={onNavClick}
      >
        About
      </Link>
      
      <Link 
        href="/pricing" 
        className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2"
        onClick={onNavClick}
      >
        Pricing
      </Link>
      
      <Link 
        href="/faq" 
        className="text-te-papa-green hover:text-chelsea-cucumber transition-colors py-2"
        onClick={onNavClick}
      >
        FAQ
      </Link>
    </>
  )
}
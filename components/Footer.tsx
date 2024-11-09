'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Linkedin, Instagram } from "lucide-react"

// Custom X (formerly Twitter) icon component
const XIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-te-papa-green text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold mb-4">Account Caddie</h3>
            <p className="text-gray-300 mb-6">Expert financial guidance for your business success.</p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/accountcaddie"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#069949] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/company/accountcaddie/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#069949] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.instagram.com/accountcaddie/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#069949] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://x.com/AccountCaddie"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#069949] transition-colors duration-200"
                aria-label="X (formerly Twitter)"
              >
                <XIcon size={24} />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/accounting-reporting" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Accounting & Reporting
                </Link>
              </li>
              <li>
                <Link href="/services/tax-services" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Tax Services
                </Link>
              </li>
              <li>
                <Link href="/services/debtors-management" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Debtors Management
                </Link>
              </li>
              <li>
                <Link href="/services/payroll-assistance" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Payroll Assistance
                </Link>
              </li>
              <li>
                <Link href="/services/financial-planning" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Financial Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/terms-of-service" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/popia-compliance" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  POPIA Compliance
                </Link>
              </li>
              <li>
                <Link href="/legal/complaints-procedure" className="text-gray-300 hover:text-[#069949] transition-colors duration-200">
                  Complaints Procedure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>7 Autumn Road</p>
              <p>West House, Devcon Park</p>
              <p>Rivonia, Johannesburg</p>
              <p>2128</p>
              <p className="mt-4">
                <a href="mailto:info@accountcaddie.co.za" className="hover:text-[#069949] transition-colors duration-200">
                  info@accountcaddie.co.za
                </a>
              </p>
              <p>
                <a href="tel:0870876304" className="hover:text-[#069949] transition-colors duration-200">
                  087 087 6304
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Account Caddie. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/sitemap" className="text-gray-300 text-sm hover:text-[#069949] transition-colors duration-200">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-300 text-sm hover:text-[#069949] transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
'use client'

import React from 'react'
import PricingHeroSection from '@/components/pricing/PricingHeroSection'
import AccountingPackages from '@/components/pricing/AccountingPackages'
import DebtorsManagementPackages from '@/components/pricing/DebtorsManagementPackages'
import PayrollAssistancePackages from '@/components/pricing/PayrollAssistancePackages'
import { CTAWrapper } from '@/components/CTAWrapper'

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PricingHeroSection />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-24 lg:space-y-32 py-12 sm:py-16 lg:py-20">
          {/* Accounting Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F2EF] to-transparent -z-10" />
            <AccountingPackages />
          </div>

          {/* Debtors Management Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8F5F0] to-transparent -z-10" />
            <DebtorsManagementPackages />
          </div>

          {/* Payroll Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F2EF] to-transparent -z-10" />
            <PayrollAssistancePackages />
          </div>
        </div>
      </div>

      <CTAWrapper />
    </div>
  )
}
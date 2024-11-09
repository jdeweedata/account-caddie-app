'use client'

import React, { useState } from 'react'
import { ArrowRight, Users, FileText, Mail, FileX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CTAWrapper } from '@/components/CTAWrapper'
import OnboardingWizard from '@/components/OnboardingWizard'

const packages = [
  {
    name: "Standard Package",
    price: "R3750",
    features: [
      "Once a month follow up: Send statements to clients and one personalised email about outstanding accounts. (Capped to 50 clients)",
      "Customised feedback report (Once a month)",
      "Send Acknowledgement of debt letter (Capped to 2 letters)"
    ]
  },
  {
    name: "Premium Package",
    price: "R10500",
    features: [
      "Twice a month follow up: Send statements to clients and one personalised email about outstanding accounts. (Capped to 80 clients)",
      "Issue of sales invoices (Capped to 200 invoices) ONLY once a month (Includes recons)",
      "Receipts capturing in Xero ONLY twice a month before each follow up"
    ]
  },
  {
    name: "Established Package",
    price: "R16500",
    features: [
      "Weekly follow up: Send statements to clients and one personalised email about outstanding accounts. (Capped to 150 clients)",
      "Receipts capturing in Xero Once a week before each follow up",
      "Run debit orders - Capped to 200 clients"
    ]
  }
]

const includedFeatures = [
  "Liaise with legal department via our integrated customer support channel",
  "Send Acknowledgement of debt letter (Exceeding the number included in package)",
  "Send Final Demand letter (Exceeding the number included in package)",
  "Excludes: Quotes, daily issuing of receivables invoices, legal action, and weekly meetings"
]

export default function DebtorsManagementPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('')

  const handleGetStarted = (packageName: string) => {
    setSelectedPackage(packageName)
    setIsWizardOpen(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="py-12 bg-pampas flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-4xl font-extrabold sm:text-5xl tracking-tight">
              <span className="text-[#069949]">Debtors management</span>
              <br />
              <span className="text-te-papa-green">standalone packages</span>
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-xanadu lg:mx-auto">
              Choose the package that suits your business needs
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.name} className="flex flex-col justify-between bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-te-papa-green">{pkg.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-4 flex items-baseline text-5xl font-extrabold text-[#069949]">
                      {pkg.price}
                      <span className="ml-1 text-xl font-medium text-xanadu">/month</span>
                    </div>
                    <p className="mt-1 text-sm text-xanadu">Excluding VAT</p>
                    <ul className="mt-6 space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-[#069949]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-xanadu">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full flex items-center justify-center bg-[#069949] hover:bg-te-papa-green text-white" 
                      onClick={() => handleGetStarted(pkg.name)}
                    >
                      Start Here
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-xanadu pt-10">
            <h3 className="text-sm font-medium text-te-papa-green">Included in all packages</h3>
            <ul className="mt-4 space-y-4">
              {includedFeatures.map((feature, index) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    {index === 0 && <Users className="h-6 w-6 text-[#069949]" />}
                    {index === 1 && <FileText className="h-6 w-6 text-[#069949]" />}
                    {index === 2 && <Mail className="h-6 w-6 text-[#069949]" />}
                    {index === 3 && <FileX className="h-6 w-6 text-[#069949]" />}
                  </div>
                  <p className="ml-3 text-sm text-xanadu">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CTAWrapper />

      {isWizardOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <OnboardingWizard 
              planName={selectedPackage}
              onClose={() => setIsWizardOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
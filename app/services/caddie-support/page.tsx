'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { User } from 'lucide-react'
import { CTAWrapper } from '@/components/CTAWrapper'
import OnboardingWizard from '@/components/OnboardingWizard'

export default function CaddieSupportPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [selectedCaddie, setSelectedCaddie] = useState('')

  const caddies = [
    {
      name: "Junior Caddie",
      description: "Ideal for startups and small businesses with basic financial needs. Our Junior Caddie provides essential accounting and tax support to keep your finances on track as you grow.",
      features: [
        "Monthly bookkeeping",
        "Basic financial statements",
        "Annual tax returns",
        "Quarterly check-ins"
      ],
      icon: User
    },
    {
      name: "Senior Caddie",
      description: "Perfect for established small to medium-sized businesses requiring more comprehensive financial guidance. Our Senior Caddie offers advanced support to help you make informed financial decisions.",
      features: [
        "Everything in Junior Caddie, plus:",
        "Advanced financial reporting",
        "Cash flow management",
        "Budgeting and forecasting",
        "Monthly strategy sessions"
      ],
      icon: User
    },
    {
      name: "Master Caddie",
      description: "Designed for complex businesses with sophisticated financial needs. Our Master Caddie provides top-tier strategic financial planning and analysis to drive your business growth.",
      features: [
        "Everything in Senior Caddie, plus:",
        "CFO-level strategic planning",
        "Risk management",
        "M&A support",
        "Weekly financial consultations"
      ],
      icon: User
    },
  ]

  const handleSelectCaddie = (caddieName: string) => {
    setSelectedCaddie(caddieName)
    setIsWizardOpen(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-pampas py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-te-papa-green mb-8">Choose Your Caddie</h1>
          <p className="text-xl text-center text-gray-600 mb-12">Select the level of support that best fits your business needs</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caddies.map((caddie, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-te-papa-green">
                    <caddie.icon className="w-6 h-6 mr-2 text-chelsea-cucumber" />
                    {caddie.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{caddie.description}</p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {caddie.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-chelsea-cucumber text-white hover:bg-te-papa-green"
                    onClick={() => handleSelectCaddie(caddie.name)}
                  >
                    Select {caddie.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTAWrapper />

      {isWizardOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <OnboardingWizard 
              planName={selectedCaddie}
              onClose={() => setIsWizardOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
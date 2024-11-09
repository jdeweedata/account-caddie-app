'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PieChart, TrendingUp, DollarSign, BarChart2 } from 'lucide-react'
import { CTAWrapper } from '@/components/CTAWrapper'
import OnboardingWizard from '@/components/OnboardingWizard'

export default function FinancialPlanningPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  const services = [
    {
      title: "Budgeting for Growth",
      description: "Create realistic budgets that support your business expansion plans.",
      icon: PieChart
    },
    {
      title: "Cash Flow Management",
      description: "Optimize your cash flow to ensure sustainable growth and stability.",
      icon: TrendingUp
    },
    {
      title: "Investment Planning",
      description: "Make informed decisions about reinvesting in your business or diversifying.",
      icon: DollarSign
    },
    {
      title: "Financial Forecasting",
      description: "Predict future financial trends to make proactive business decisions.",
      icon: BarChart2
    }
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-pampas py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-te-papa-green mb-8">Growth-Focused Financial Planning</h1>
          <p className="text-xl text-center text-gray-600 mb-12">Strategic financial planning to fuel your business's growth and success</p>
          
          <div className="flex flex-col lg:flex-row items-center mb-16">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="text-3xl font-bold text-te-papa-green mb-4">Plan for Success</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our financial planning services are designed to help your business thrive. We focus on creating strategies that support your growth objectives while maintaining financial stability.
              </p>
              <Button 
                className="bg-chelsea-cucumber text-white hover:bg-te-papa-green text-lg px-8 py-3"
                onClick={() => setIsWizardOpen(true)}
              >
                Get Started
              </Button>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="https://res.cloudinary.com/drnjxfm8t/image/upload/v1731142642/account-caddie-19th-hole-finance-cape-town-office_xccjqg.jpg"
                alt="Financial Planning Services"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-te-papa-green">
                    <service.icon className="w-6 h-6 mr-2 text-chelsea-cucumber" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
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
              planName="Financial Planning"
              onClose={() => setIsWizardOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
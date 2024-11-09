'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, FileText, BarChart2, Calculator, Clock } from 'lucide-react'
import { CTAWrapper } from '@/components/CTAWrapper'
import OnboardingWizard from '@/components/OnboardingWizard'

export default function AccountingReportingPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  const services = [
    {
      title: "Monthly Bookkeeping",
      description: "Accurate recording and categorization of all financial transactions.",
      icon: FileText
    },
    {
      title: "Financial Statements",
      description: "Preparation of comprehensive balance sheets, income statements, and cash flow statements.",
      icon: BarChart2
    },
    {
      title: "Management Reports",
      description: "Customized reports providing insights into your business's financial performance.",
      icon: Calculator
    },
    {
      title: "Year-End Accounting",
      description: "Thorough year-end financial closing and reporting to ensure compliance and accuracy.",
      icon: Clock
    }
  ]

  const benefits = [
    "Accurate and up-to-date financial records",
    "Compliance with accounting standards and regulations",
    "Improved decision-making with timely financial insights",
    "Time savings for business owners and management",
    "Enhanced credibility with stakeholders and financial institutions"
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-pampas py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-te-papa-green mb-8">Accounting & Reporting Services</h1>
          <p className="text-xl text-center text-gray-600 mb-12">Comprehensive financial management solutions to keep your business on track and compliant.</p>
          
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="text-3xl font-bold text-te-papa-green mb-4">Expert Financial Management</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our accounting and reporting services are designed to provide you with accurate, timely, and insightful financial information. We help you stay compliant, make informed decisions, and focus on growing your business.
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
                alt="Accounting & Reporting Services"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-te-papa-green mb-12">Our Accounting & Reporting Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-pampas shadow-lg hover:shadow-xl transition-shadow duration-300">
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

      <section className="bg-te-papa-green py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Benefits of Our Accounting & Reporting Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-6 h-6 text-chelsea-cucumber mr-2 flex-shrink-0 mt-1" />
                <p className="text-white">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAWrapper />

      {isWizardOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <OnboardingWizard 
              planName="Accounting & Reporting"
              onClose={() => setIsWizardOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
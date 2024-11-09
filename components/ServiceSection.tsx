'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp, FileText, Calculator, PieChart, Shield, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'

const services = [
  {
    id: 'accounting',
    name: "Accounting & Reporting",
    icon: FileText,
    description: "Comprehensive accounting solutions to keep your finances in order.",
  },
  {
    id: 'tax',
    name: "Tax Services",
    icon: Calculator,
    description: "Expert tax planning and compliance services for your business.",
  },
  {
    id: 'financial',
    name: "Financial Planning",
    icon: PieChart,
    description: "Strategic financial planning to help you achieve your business goals.",
  },
  {
    id: 'risk',
    name: "Risk & Compliance",
    icon: Shield,
    description: "Ensure your business stays compliant and manages risks effectively.",
  },
  {
    id: 'strategic',
    name: "Strategic Services",
    icon: Briefcase,
    description: "Tailored strategic solutions to drive your business forward.",
  },
];

export default function ServiceSection() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  return (
    <div className="py-12 bg-[#069949]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">Our Services</h2>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="bg-[#068541] rounded-lg p-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                >
                  <div className="flex items-center">
                    <service.icon className="h-6 w-6 text-white mr-3" />
                    <span className="text-white font-medium">{service.name}</span>
                  </div>
                  {expandedService === service.id ? (
                    <ChevronUp className="h-5 w-5 text-white" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white" />
                  )}
                </button>
                {expandedService === service.id && (
                  <p className="mt-2 text-gray-200">{service.description}</p>
                )}
              </div>
            ))}
          </div>
          <Card className="mt-8 lg:mt-0 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#1D4E4E]">Comprehensive Financial Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#768A7E] mb-6">
                Our range of services is designed to support your business at every stage of growth.
                From essential accounting to strategic financial planning and tailored business solutions,
                we've got you covered.
              </p>
              <Link href="/services" passHref>
                <Button className="bg-[#069949] hover:bg-[#1D4E4E] text-white">
                  Explore All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
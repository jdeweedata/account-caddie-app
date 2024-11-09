'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calculator, FileText, PieChart, Shield, ChevronRight, Briefcase } from 'lucide-react'
import { CTAWrapper } from '@/components/CTAWrapper'

export default function ServicesPage() {
  const services = [
    {
      title: "Streamlined Accounting & Reporting",
      description: "Efficient accounting solutions to keep your finances in order as you grow.",
      icon: Calculator,
      link: "/services/accounting-reporting"
    },
    {
      title: "Strategic Tax Services",
      description: "Optimize your tax position and ensure compliance without the complexity.",
      icon: FileText,
      link: "/services/tax-services"
    },
    {
      title: "Growth-Focused Financial Planning",
      description: "Strategic financial planning to fuel your business's growth and success.",
      icon: PieChart,
      link: "/services/financial-planning"
    },
    {
      title: "Strategic Services",
      description: "Tailored solutions to drive your business forward and overcome challenges.",
      icon: Briefcase,
      link: "/services/strategic-services"
    },
    {
      title: "Proactive Risk & Compliance",
      description: "Protect your growing business with cost-effective risk management solutions.",
      icon: Shield,
      link: "/services/risk-compliance"
    }
  ]

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-pampas py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-te-papa-green mb-4">
                Comprehensive Financial Services
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Tailored solutions to empower your business growth and financial success.
              </p>
              <Button className="bg-chelsea-cucumber text-white hover:bg-te-papa-green text-lg px-8 py-3">
                Explore Our Services
              </Button>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="https://res.cloudinary.com/drnjxfm8t/image/upload/v1729258188/download_11_ra457x.jpg"
                alt="Comprehensive Financial Services"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-te-papa-green mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-pampas shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-te-papa-green">
                    <service.icon className="w-6 h-6 mr-2 text-chelsea-cucumber" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link href={service.link} passHref>
                    <Button className="w-full bg-chelsea-cucumber text-white hover:bg-te-papa-green">
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTAWrapper />
    </main>
  )
}
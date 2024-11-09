'use client'

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Clock, ShieldCheck, Lightbulb, Users, TrendingUp } from "lucide-react"

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Clock,
      title: "Time-Saving",
      description: "We handle your financial tasks, allowing you to focus on growing your business."
    },
    {
      icon: ShieldCheck,
      title: "Compliance Assurance",
      description: "Stay compliant with all relevant regulations and avoid costly penalties."
    },
    {
      icon: Lightbulb,
      title: "Expert Insights",
      description: "Benefit from our team's deep industry knowledge and innovative solutions."
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Receive tailored financial strategies that align with your unique business goals."
    },
    {
      icon: TrendingUp,
      title: "Growth-Focused",
      description: "Our services are designed to support and accelerate your business growth."
    }
  ]

  return (
    <section className="bg-pampas py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-te-papa-green mb-12">Why Choose Account Caddie?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="bg-chelsea-cucumber p-3 rounded-full mr-4">
                    <reason.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-te-papa-green">{reason.title}</CardTitle>
                </div>
                <CardContent className="text-gray-600">{reason.description}</CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
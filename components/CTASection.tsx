'use client'

import React, { memo } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, Users } from "lucide-react"

const benefits = [
  {
    icon: Calendar,
    title: 'Free Initial Consultation',
    description: 'No-obligation discussion about your business needs'
  },
  {
    icon: Clock,
    title: '30-Minute Session',
    description: 'Focused meeting to understand your requirements'
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Meet with our experienced financial advisors'
  }
]

const includedFeatures = [
  "Tailored financial solutions",
  "Expert industry knowledge",
  "Comprehensive support",
  "Growth-focused strategies"
]

const CTASection = memo(function CTASection() {
  const handleBooking = () => {
    window.open('https://jeffreyd-accountcaddie.zohobookings.com/#/accountcaddie', '_blank')
  }

  return (
    <section className="bg-gradient-to-br from-[#069949] to-te-papa-green py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-te-papa-green mb-4">
              Ready to Transform Your Business Finances?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule a free consultation with our experts and discover how we can help optimize your financial operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-pampas rounded-xl"
              >
                <div className="w-12 h-12 bg-chelsea-cucumber rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-te-papa-green mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="max-w-2xl mx-auto mb-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
                {includedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-chelsea-cucumber mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              onClick={handleBooking}
              className="bg-chelsea-cucumber hover:bg-te-papa-green text-white px-8 py-6 text-lg w-full sm:w-auto"
            >
              Schedule Your Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
})

export default CTASection
'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from 'lucide-react'

export default function BookingPage() {
  const handleBooking = () => {
    window.open('https://jeffreyd-accountcaddie.zohobookings.com/#/accountcaddie', '_blank')
  }

  const features = [
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book your consultation at a time that works best for you'
    },
    {
      icon: Clock,
      title: '30-Minute Sessions',
      description: 'Focused discussions to understand your business needs'
    },
    {
      icon: Users,
      title: 'Expert Consultation',
      description: 'Meet with our experienced financial advisors'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-pampas to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-te-papa-green mb-4">
            Schedule Your Free Consultation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take the first step towards optimizing your business finances with a no-obligation consultation.
          </p>
          <Button 
            size="lg"
            className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
            onClick={handleBooking}
          >
            Book Your Session Now
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-chelsea-cucumber rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-te-papa-green mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-te-papa-green mb-4">
            What to Expect
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-chelsea-cucumber mb-2">
                During Your Consultation
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Discuss your business's current financial situation</li>
                <li>• Identify key areas for improvement</li>
                <li>• Explore potential solutions and strategies</li>
                <li>• Get answers to your financial questions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-chelsea-cucumber mb-2">
                After Your Consultation
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Receive a summary of discussed points</li>
                <li>• Get a customized action plan</li>
                <li>• Access to follow-up support</li>
                <li>• No pressure to commit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
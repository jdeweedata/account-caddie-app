'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO, Tech Innovators",
      comment: "Account Caddie has transformed our financial management. Their expertise and personalized service have been invaluable to our growth.",
      avatar: "JD"
    },
    {
      name: "Jane Smith",
      position: "CFO, Global Enterprises",
      comment: "Their expertise in tax planning has saved us significant amounts. The team's proactive approach and attention to detail are commendable.",
      avatar: "JS"
    },
    {
      name: "Mark Brown",
      position: "Owner, Brown's Bakery",
      comment: "Account Caddie's financial planning has been crucial to our expansion. They truly understand the needs of small businesses.",
      avatar: "MB"
    }
  ]

  return (
    <section className="bg-gradient-to-b from-pampas to-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-te-papa-green mb-4">What Our Clients Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about their experience with Account Caddie.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-chelsea-cucumber opacity-20" />
                <div className="flex items-center mb-6">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-chelsea-cucumber">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.avatar}&backgroundColor=069949`} />
                    <AvatarFallback className="bg-chelsea-cucumber text-white">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-te-papa-green">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <div className="relative">
                  <p className="text-gray-600 italic leading-relaxed">"{testimonial.comment}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
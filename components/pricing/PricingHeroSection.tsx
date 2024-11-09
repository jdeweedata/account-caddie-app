'use client'

import { Button } from "@/components/ui/button"

export default function PricingHeroSection() {
  return (
    <section className="bg-gradient-to-b from-[#1D4E4E] to-[#069949] text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white">
            Choose the Right Plan for Your Business
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-100">
            Flexible pricing options to suit your accounting needs
          </p>
          <Button className="bg-white text-[#069949] hover:bg-[#F5F2EF] hover:text-[#1D4E4E] text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3">
            View Plans
          </Button>
        </div>
      </div>
    </section>
  )
}
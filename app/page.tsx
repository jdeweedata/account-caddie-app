'use client'

import React from 'react'
import HeroSection from '@/components/HeroSection'
import ServiceSection from '@/components/ServiceSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import { CTAWrapper } from '@/components/CTAWrapper'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection key="hero-section" />
      <ServiceSection />
      <WhyChooseUs />
      <Testimonials />
      <CTAWrapper />
    </main>
  )
}
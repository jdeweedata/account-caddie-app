'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { CTAWrapper } from '@/components/CTAWrapper'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-te-papa-green mb-8 text-center">About Account Caddie</h1>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <p className="text-xl text-gray-600 mb-6">
                Account Caddie is a leading financial services provider, dedicated to helping businesses navigate the complex world of accounting, tax, and financial planning. With our expert team and innovative solutions, we empower businesses to achieve their financial goals and drive growth.
              </p>
              <p className="text-xl text-gray-600 mb-6">
                Our mission is to provide tailored financial guidance and support to businesses of all sizes, enabling them to make informed decisions and optimize their financial performance.
              </p>
              <Button className="bg-[#069949] text-white hover:bg-te-papa-green text-lg px-8 py-3">
                Learn More About Our Services
              </Button>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="https://res.cloudinary.com/drnjxfm8t/image/upload/v1729258188/download_11_ra457x.jpg"
                alt="Account Caddie Team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-pampas py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-te-papa-green mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-[#069949] mb-4">Expertise</h3>
              <p className="text-gray-600">We pride ourselves on our deep industry knowledge and continuous learning to provide the best financial guidance.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-[#069949] mb-4">Integrity</h3>
              <p className="text-gray-600">We maintain the highest ethical standards in all our dealings, ensuring trust and transparency with our clients.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-[#069949] mb-4">Innovation</h3>
              <p className="text-gray-600">We continuously seek innovative solutions to meet the evolving needs of our clients and the financial landscape.</p>
            </div>
          </div>
        </div>
      </section>

      <CTAWrapper />
    </main>
  )
}
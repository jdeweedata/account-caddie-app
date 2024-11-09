'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Optimize loading with custom loading component
const LoadingPlaceholder = () => (
  <div className="bg-gradient-to-br from-[#069949] to-te-papa-green py-12 sm:py-20">
    <div className="container mx-auto px-4">
      <div className="bg-white/50 animate-pulse rounded-2xl h-[400px]"></div>
    </div>
  </div>
)

const CTASection = dynamic(() => import('./CTASection'), {
  loading: LoadingPlaceholder,
  ssr: false
})

export function CTAWrapper() {
  return <CTASection />
}
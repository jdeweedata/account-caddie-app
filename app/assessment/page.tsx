'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ResizeObserverFix } from '@/components/ResizeObserverFix'
import ErrorBoundary from '@/components/ErrorBoundary'

const PIScoreWizardFlow = dynamic(
  () => import('@/components/PIScoreWizard/PIScoreWizardFlow'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-chelsea-cucumber">Loading assessment...</div>
      </div>
    )
  }
)

export default function AssessmentPage() {
  const searchParams = useSearchParams()
  const selectedPackage = searchParams.get('package')

  return (
    <main className="min-h-screen bg-pampas">
      <ResizeObserverFix />
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-pulse text-chelsea-cucumber">Loading assessment...</div>
            </div>
          }
        >
          <PIScoreWizardFlow initialPackage={selectedPackage} />
        </Suspense>
      </ErrorBoundary>
      <div id="toast-container" className="fixed bottom-4 right-4 z-50" />
    </main>
  )
}
'use client'

import React, { Suspense } from 'react'
import { CTAWrapper } from '@/components/CTAWrapper'

const CareersContent = () => (
  <div className="prose max-w-none text-gray-700">
    <p className="mb-6">Join our team of financial experts and help businesses across South Africa thrive. At Account Caddie, we're always looking for talented individuals who are passionate about finance, accounting, and providing exceptional service to our clients.</p>

    <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">Why Work With Us?</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>Challenging and rewarding work environment</li>
      <li>Opportunities for professional growth and development</li>
      <li>Competitive salary and benefits package</li>
      <li>Collaborative team culture</li>
      <li>Work with cutting-edge financial technologies</li>
    </ul>

    <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">Current Openings</h2>
    <p>We currently don't have any open positions, but we're always interested in hearing from talented professionals. If you think you'd be a great fit for our team, please send your CV and a cover letter to careers@accountcaddie.com.</p>

    <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">Our Hiring Process</h2>
    <ol className="list-decimal pl-6 mb-4">
      <li>Application review</li>
      <li>Initial phone screening</li>
      <li>Technical assessment (if applicable)</li>
      <li>In-person or video interview</li>
      <li>Reference checks</li>
      <li>Job offer</li>
    </ol>

    <p className="mt-8">We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, or disability status.</p>

    <p className="mt-8">If you have any questions about careers at Account Caddie, please contact our HR department at hr@accountcaddie.com.</p>
  </div>
)

export default function CareersPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-te-papa-green mb-8">Careers at Account Caddie</h1>
          <Suspense fallback={<div>Loading careers information...</div>}>
            <CareersContent />
          </Suspense>
        </div>
      </section>
      <CTAWrapper />
    </main>
  )
}
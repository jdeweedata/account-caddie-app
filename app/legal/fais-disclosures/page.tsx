import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FAISDisclosures() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-te-papa-green mb-8">FAIS Disclosures</h1>
          <div className="prose max-w-none">
            <p>This page will contain the necessary disclosures as required by the Financial Advisory and Intermediary Services (FAIS) Act.</p>
            {/* Add more content here */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
'use client'

import React from 'react'
import { CTAWrapper } from '@/components/CTAWrapper'

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-te-papa-green mb-8">Terms of Service</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-6">Welcome to Account Caddie. These Terms of Service govern your use of our website and services. By accessing or using Account Caddie's services, you agree to be bound by these Terms. Please read them carefully.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using Account Caddie's services, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">2. Description of Service</h2>
            <p>Account Caddie provides financial management and accounting services for businesses in South Africa. Our services include, but are not limited to, bookkeeping, tax preparation, financial planning, and strategic advisory services. The specific services provided will be outlined in your service agreement.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">3. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. Account Caddie will not be liable for any loss that you may incur as a result of someone else using your password or account, either with or without your knowledge.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">4. Privacy Policy</h2>
            <p>Your use of Account Caddie's services is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. Our Privacy Policy outlines how we collect, use, and protect your personal information in compliance with the Protection of Personal Information Act (POPIA).</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">5. Intellectual Property</h2>
            <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, Account Caddie shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">7. Modifications to Service</h2>
            <p>Account Caddie reserves the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice at any time. You agree that Account Caddie shall not be liable to you or to any third party for any modification, suspension or discontinuance of the service.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">8. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">9. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at legal@accountcaddie.com.</p>
          </div>
        </div>
      </section>
      <CTAWrapper />
    </main>
  )
}
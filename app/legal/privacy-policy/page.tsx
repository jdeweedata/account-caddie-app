'use client'

import React from 'react'
import { CTAWrapper } from '@/components/CTAWrapper'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-te-papa-green mb-8">Privacy Policy</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-6">At Account Caddie, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. By using Account Caddie, you consent to the data practices described in this policy.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you use our services, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact information (name, email address, phone number)</li>
              <li>Business information (company name, registration number)</li>
              <li>Financial information necessary for our services</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <p>We may also automatically collect certain information about your device, including your IP address, browser type, and operating system.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing and maintaining our services</li>
              <li>Communicating with you about our services</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Protecting our rights and preventing fraud</li>
            </ul>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">3. Information Sharing and Disclosure</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>With service providers who assist us in operating our business (subject to confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">5. Your Rights Under POPIA</h2>
            <p>In accordance with the Protection of Personal Information Act (POPIA), you have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Request access to your personal information</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your personal information</li>
              <li>Lodge a complaint with the Information Regulator</li>
            </ul>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">6. Retention of Information</h2>
            <p>We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the bottom of this page.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p>Email: privacy@accountcaddie.com<br />
            Address: 7 Autumn Road, West House, Devcon Park, Rivonia, Johannesburg, 2128</p>

            <p className="mt-8 text-sm">Last Updated: [Current Date]</p>
          </div>
        </div>
      </section>
      <CTAWrapper />
    </main>
  )
}
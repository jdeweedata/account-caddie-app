'use client'

import React from 'react'
import { CTAWrapper } from '@/components/CTAWrapper'

export default function POPIACompliancePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-te-papa-green mb-8">POPIA Compliance</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-6">At Account Caddie, we are committed to protecting your personal information and complying with the Protection of Personal Information Act (POPIA). This page outlines our approach to POPIA compliance and how we safeguard your data.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">1. Our Commitment to POPIA</h2>
            <p>We have implemented comprehensive measures to ensure compliance with POPIA, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Appointing an Information Officer responsible for POPIA compliance</li>
              <li>Conducting regular data protection impact assessments</li>
              <li>Implementing robust data security measures</li>
              <li>Training our staff on data protection and POPIA requirements</li>
              <li>Regularly reviewing and updating our data protection policies and procedures</li>
            </ul>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">2. Lawful Processing of Personal Information</h2>
            <p>We process personal information in accordance with POPIA's conditions for lawful processing, which include:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Accountability</li>
              <li>Processing limitation</li>
              <li>Purpose specification</li>
              <li>Further processing limitation</li>
              <li>Information quality</li>
              <li>Openness</li>
              <li>Security safeguards</li>
              <li>Data subject participation</li>
            </ul>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">3. Your Rights Under POPIA</h2>
            <p>As a data subject, you have the following rights under POPIA:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to be notified that personal information about you is being collected</li>
              <li>The right to be notified if your personal information has been accessed or acquired by an unauthorised person</li>
              <li>The right to establish whether we hold personal information about you and to request access to such personal information</li>
              <li>The right to request correction, destruction or deletion of your personal information</li>
              <li>The right to object to the processing of your personal information</li>
              <li>The right to submit a complaint to the Information Regulator regarding the alleged interference with the protection of your personal information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">4. Data Security Measures</h2>
            <p>We have implemented appropriate technical and organizational measures to ensure the security of your personal information, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption of personal information</li>
              <li>Implementation of access controls</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Secure data backup and recovery procedures</li>
              <li>Incident response and management protocols</li>
            </ul>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">5. Cross-border Data Transfers</h2>
            <p>If we transfer personal information outside of South Africa, we ensure that the recipient country has adequate data protection laws or that the transfer is subject to binding corporate rules or other appropriate safeguards as required by POPIA.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">6. Data Retention</h2>
            <p>We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Our data retention policies are regularly reviewed and updated to ensure compliance with POPIA.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">7. POPIA Training and Awareness</h2>
            <p>We conduct regular training sessions for our employees to ensure they understand and comply with POPIA requirements in their day-to-day activities.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">8. Contact Our Information Officer</h2>
            <p>If you have any questions about our POPIA compliance or wish to exercise your rights under POPIA, please contact our Information Officer:</p>
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
'use client'

import React from 'react'
import { CTAWrapper } from '@/components/CTAWrapper'

export default function ComplaintsProcedurePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-te-papa-green mb-8">Complaints Procedure</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-6">At Account Caddie, we are committed to providing high-quality financial services. However, we recognize that there may be instances where our clients are not fully satisfied. We take all complaints seriously and have established this procedure to ensure that your concerns are addressed promptly and fairly.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">1. How to File a Complaint</h2>
            <p>If you have a complaint about our services, you can submit it through the following channels:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Email: complaints@accountcaddie.com</li>
              <li>Phone: +27 (0)11 123 4567</li>
              <li>In writing: Complaints Department, Account Caddie, 7 Autumn Road, West House, Devcon Park, Rivonia, Johannesburg, 2128</li>
            </ul>
            <p>Please provide as much detail as possible about your complaint, including your contact information, account details (if applicable), and a clear description of the issue.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">2. Complaint Handling Process</h2>
            <ol className="list-decimal pl-6 mb-4">
              <li><strong>Acknowledgment:</strong> We will acknowledge receipt of your complaint within 2 business days.</li>
              <li><strong>Investigation:</strong> Our complaints team will thoroughly investigate your complaint, which may involve reviewing relevant documents and consulting with appropriate staff members.</li>
              <li><strong>Resolution:</strong> We aim to resolve all complaints within 15 business days. If we need more time, we will keep you informed of the progress.</li>
              <li><strong>Response:</strong> Once we have completed our investigation, we will provide you with a written response detailing our findings and any actions we have taken or will take to address your complaint.</li>
            </ol>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">3. Escalation Process</h2>
            <p>If you are not satisfied with the initial resolution of your complaint, you can request an escalation to our senior management team. To do so, please respond to our resolution email or letter within 10 business days, explaining why you are dissatisfied with the outcome.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">4. External Resolution</h2>
            <p>If you remain unsatisfied after our internal escalation process, you have the right to seek external resolution. Depending on the nature of your complaint, you may contact:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>The Financial Sector Conduct Authority (FSCA)</li>
              <li>The Office of the Ombud for Financial Services Providers (FAIS Ombud)</li>
              <li>The National Consumer Commission</li>
            </ul>
            <p>We will provide you with the relevant contact details if you wish to pursue this option.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">5. Record Keeping</h2>
            <p>We maintain a record of all complaints received and their outcomes. This helps us to continuously improve our services and identify any systemic issues that need to be addressed.</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">6. Confidentiality</h2>
            <p>All complaints will be handled with strict confidentiality and in accordance with our Privacy Policy and the Protection of Personal Information Act (POPIA).</p>

            <h2 className="text-2xl font-semibold text-te-papa-green mt-8 mb-4">7. No Retaliation Policy</h2>
            <p>Account Caddie has a strict no-retaliation policy. We will not discriminate against any client who files a complaint in good faith.</p>

            <p className="mt-8">We value your feedback and see complaints as an opportunity to improve our services. If you have any questions about this complaints procedure, please don't hesitate to contact us.</p>

            <p className="mt-8 text-sm">Last Updated: [Current Date]</p>
          </div>
        </div>
      </section>
      <CTAWrapper />
    </main>
  )
}
'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CTAWrapper } from '@/components/CTAWrapper'

const faqs = [
  {
    question: "What services does Account Caddie offer?",
    answer: "Account Caddie offers a range of financial services including accounting and reporting, tax services, financial planning, and risk and compliance management, all tailored for growing businesses."
  },
  {
    question: "How can I get started with Account Caddie?",
    answer: "To get started, you can schedule a consultation through our website or contact us directly. We'll assess your needs and recommend the best services for your business."
  },
  {
    question: "What makes Account Caddie different from other accounting firms?",
    answer: "Account Caddie combines expertise with a personalized approach. We offer tailored solutions, innovative strategies, and a deep understanding of the needs of growing businesses to help you thrive."
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes, we work with businesses of all sizes, from startups to established medium-sized companies. Our services are scalable and can be customized to meet the needs of your specific business."
  },
  {
    question: "How often will I receive financial reports?",
    answer: "The frequency of financial reports depends on the service package you choose. We offer monthly, weekly, and even daily reporting options to suit your business needs."
  },
  {
    question: "Can Account Caddie help with tax planning and compliance?",
    answer: "Absolutely! We offer comprehensive tax services including tax planning, compliance, and strategy to help optimize your tax position and ensure you meet all regulatory requirements."
  }
]

export default function FAQPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-te-papa-green mb-12 text-center">Frequently Asked Questions</h1>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                  <AccordionTrigger className="text-lg font-semibold text-te-papa-green hover:text-chelsea-cucumber px-6 py-4 flex justify-between items-start">
                    <span className="text-left pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 py-4 bg-gray-50">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CTAWrapper />
    </main>
  )
}
'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import ClientLayout from '@/components/ClientLayout'

export default function NotFound() {
  return (
    <ClientLayout>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-te-papa-green mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link href="/" passHref legacyBehavior>
            <Button className="bg-chelsea-cucumber text-white hover:bg-te-papa-green text-lg px-8 py-3">
              Go Back Home
            </Button>
          </Link>
        </div>
      </section>
    </ClientLayout>
  )
}
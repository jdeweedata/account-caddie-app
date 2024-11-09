'use client'

import React from 'react'
import { ZohoAuthInitializer } from '@/components/ZohoAuthInitializer'

export default function ZohoSetupPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">ZOHO Integration Setup</h1>
      <div className="space-y-4">
        <p className="text-gray-600">
          Click the button below to initialize ZOHO integration for Account Caddie.
        </p>
        <ZohoAuthInitializer />
      </div>
    </div>
  )
}
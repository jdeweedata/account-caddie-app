'use client'

import React, { useState } from 'react'
import { useZohoAuth } from '@/lib/zoho/hooks/useZohoAuth'
import { useConsultation } from '@/lib/zoho/hooks/useConsultation'
import { format } from 'date-fns'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function ZohoTest() {
  const { authenticate, isAuthenticated, isLoading: authLoading } = useZohoAuth()
  const { getAvailableSlots, isLoading: slotsLoading } = useConsultation()
  
  const [slots, setSlots] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)

  const handleAuthenticate = async () => {
    try {
      setError(null)
      const response = await authenticate()
      if (response?.access_token) {
        setAuthToken(response.access_token)
      } else {
        throw new Error('No access token received')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
      console.error('Authentication error:', err)
    }
  }

  const handleTestSlots = async () => {
    try {
      setError(null)
      const today = format(new Date(), 'yyyy-MM-dd')
      const availableSlots = await getAvailableSlots(today)
      setSlots(availableSlots || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch slots')
      console.error('Slots fetch error:', err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">ZOHO Integration Test</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Authentication Test Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Authentication</h3>
            <button
              onClick={handleAuthenticate}
              disabled={authLoading}
              className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white
                ${authLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {authLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Test Authentication'
              )}
            </button>

            {isAuthenticated && (
              <div className="flex items-center p-4 bg-green-50 rounded-md text-green-700">
                <CheckCircle className="h-5 w-5 mr-2" />
                Authentication successful
              </div>
            )}

            {authToken && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-700">Token:</p>
                <p className="mt-1 text-sm text-gray-500 break-all font-mono">{authToken}</p>
              </div>
            )}
          </div>

          {/* Available Slots Test Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Available Slots</h3>
            <button
              onClick={handleTestSlots}
              disabled={slotsLoading || !isAuthenticated}
              className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white
                ${(slotsLoading || !isAuthenticated)
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {slotsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                'Test Available Slots'
              )}
            </button>

            {slots.length > 0 && (
              <pre className="p-4 bg-gray-50 rounded-md overflow-auto text-sm font-mono">
                {JSON.stringify(slots, null, 2)}
              </pre>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center p-4 text-red-700 bg-red-50 rounded-md">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <div className="text-sm">
                Error: {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
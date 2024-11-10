'use client'

import { useState } from 'react'

interface UseZohoOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export function useZoho(options: UseZohoOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function createLead(leadData: any) {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/zoho/crm/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      })

      if (!response.ok) {
        throw new Error('Failed to create lead')
      }

      const data = await response.json()
      options.onSuccess?.(data)
      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  async function getAvailableSlots(startDate: string, endDate: string) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/zoho/calendar/availability?start=${startDate}&end=${endDate}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch availability')
      }

      const data = await response.json()
      options.onSuccess?.(data)
      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    createLead,
    getAvailableSlots
  }
}
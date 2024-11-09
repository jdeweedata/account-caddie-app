'use client'

import { useState, useCallback } from 'react'
import { PIScoreFormData } from '@/components/PIScoreWizard/types'
import { TimeSlot } from '../calendar'
import { APIError } from '@/lib/error-handler'
import { toast } from '@/components/ui/toast'

export function useZohoIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createLeadAndSchedule = useCallback(async (
    formData: PIScoreFormData,
    consultationDateTime: string
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData: formData,
          slotDateTime: consultationDateTime,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new APIError(
          errorData.error || 'Failed to schedule consultation',
          response.status,
          errorData.code
        )
      }

      const data = await response.json()
      
      if (!data.success) {
        throw new APIError(data.error || 'Failed to schedule consultation', 500)
      }

      return data
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to create lead and schedule consultation'
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchAvailableSlots = useCallback(async (date: string): Promise<TimeSlot[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/consultation/slots?date=${encodeURIComponent(date)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new APIError(
          errorData.error || 'Failed to fetch slots',
          response.status,
          errorData.code
        )
      }

      const { data, success } = await response.json()
      
      if (!success) {
        throw new APIError('Failed to fetch available slots', 500)
      }

      return data
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to fetch available slots'
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    createLeadAndSchedule,
    fetchAvailableSlots,
    isLoading,
    error,
  }
}
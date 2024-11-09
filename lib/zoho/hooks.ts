import { useState, useCallback } from 'react'
import { ZohoClient } from './client'
import { PIScoreFormData } from '@/components/PIScoreWizard/types'

export function useZohoIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const client = new ZohoClient()

  const createLeadWithConsultation = useCallback(
    async (formData: PIScoreFormData, consultationDateTime?: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await client.createLead(formData, consultationDateTime)
        return response.data[0]
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create lead')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    createLeadWithConsultation,
    isLoading,
    error,
  }
}
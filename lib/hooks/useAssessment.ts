'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { PIScoreFormData } from '@/components/PIScoreWizard/types'

export function useAssessment() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const submitAssessment = async (formData: PIScoreFormData, piScore: number) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          piScore
        })
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: "Authentication Required",
            description: "Please authenticate with Zoho first",
            variant: "destructive"
          })
          router.push('/zoho-setup')
          return
        }
        throw new Error(result.error || 'Failed to submit assessment')
      }

      // Show success message
      toast({
        title: "Assessment Submitted",
        description: `Your PI Score: ${piScore}. Proceeding to booking.`,
      })

      // Redirect to booking page with necessary data
      router.push(`/booking?leadId=${result.data.leadId}&score=${piScore}`)

      return result.data

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to submit assessment',
        variant: "destructive"
      })
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submitAssessment,
    isSubmitting
  }
} 
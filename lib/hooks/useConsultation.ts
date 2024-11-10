'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

interface ConsultationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessDescription?: string
  industry?: string
  annualRevenue?: string
}

export function useConsultation() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const scheduleConsultation = async (formData: ConsultationFormData, consultationDateTime: string) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/consultation/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData,
          consultationDateTime
        })
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 401 && result.requiresAuth) {
          toast({
            title: "Authentication Required",
            description: "Please authenticate with Zoho first.",
            variant: "destructive"
          })
          router.push('/zoho-setup')
          return
        }
        throw new Error(result.error || 'Failed to schedule consultation')
      }

      toast({
        title: "Consultation Scheduled",
        description: "We'll send you a confirmation email shortly.",
      })

      return result.data

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to schedule consultation',
        variant: "destructive"
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    scheduleConsultation,
    isLoading
  }
} 
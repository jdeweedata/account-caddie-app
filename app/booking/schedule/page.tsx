'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsultationScheduler } from '@/components/ConsultationScheduler'
import { PIScoreDisplay } from '@/components/PIScoreDisplay'

interface LeadData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  piScore: number
}

export default function ScheduleConsultationPage() {
  const searchParams = useSearchParams()
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeadData = async () => {
      const leadId = searchParams.get('leadId')
      const score = searchParams.get('score')

      if (!leadId || !score) {
        // Handle invalid params
        return
      }

      try {
        const response = await fetch(`/api/zoho/crm/leads/${leadId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch lead data')
        }

        const data = await response.json()
        setLeadData({
          ...data,
          piScore: parseInt(score)
        })
      } catch (error) {
        console.error('Error fetching lead data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeadData()
  }, [searchParams])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!leadData) {
    return <div>Invalid booking request</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <PIScoreDisplay score={leadData.piScore} />
      
      <Card>
        <CardHeader>
          <CardTitle>Schedule Your Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <ConsultationScheduler 
            leadData={leadData}
            onScheduled={() => {
              // Redirect to success page
              window.location.href = '/assessment/success'
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
} 
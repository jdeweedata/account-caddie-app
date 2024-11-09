'use client'

import React, { useState, useCallback } from 'react'
import { PIScoreFormData } from './types'
import { ZohoCRMService } from '@/lib/zoho/services/crm'
import { toast } from '@/components/ui/toast'
import PIScoreWizard from './PIScoreWizard'
import ConsultationForm from '../ConsultationScheduler/ConsultationForm'

type FlowStep = 'assessment' | 'consultation'

interface PIScoreWizardFlowProps {
  initialPackage?: string | null
}

export default function PIScoreWizardFlow({ initialPackage }: PIScoreWizardFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('assessment')
  const [formData, setFormData] = useState<PIScoreFormData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const crmService = new ZohoCRMService()

  const handleAssessmentComplete = useCallback(async (data: PIScoreFormData) => {
    try {
      setIsLoading(true)
      
      const leadData = {
        First_Name: data.businessProfile.firstName,
        Last_Name: data.businessProfile.lastName,
        Company: data.businessProfile.companyName,
        Email: data.businessProfile.email,
        Phone: data.businessProfile.phone,
        Industry: data.businessProfile.industry,
        Annual_Revenue: data.operationalScale.annualRevenue,
        No_of_Employees: data.operationalScale.employeeCount,
        Lead_Source: 'Website',
        Description: `Package: ${data.serviceRequirements.package}\nAdditional Services: ${data.serviceRequirements.additionalServices.join(', ')}`
      }

      await crmService.createLead(leadData)
      
      setFormData(data)
      setCurrentStep('consultation')
      
      toast({
        title: "Success",
        description: "Assessment completed successfully",
        variant: "success"
      })
    } catch (error) {
      console.error('Error creating lead:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process assessment",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleConsultationScheduled = useCallback(() => {
    toast({
      title: "Success",
      description: "Your consultation has been scheduled. You will receive a confirmation email shortly.",
      variant: "success"
    })
    setCurrentStep('assessment')
    setFormData(null)
  }, [])

  const handleCancel = useCallback(() => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      setCurrentStep('assessment')
      setFormData(null)
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50/80 backdrop-blur-sm p-4">
      {currentStep === 'assessment' && (
        <PIScoreWizard
          onClose={handleCancel}
          onComplete={handleAssessmentComplete}
          initialPackage={initialPackage}
          isLoading={isLoading}
        />
      )}

      {currentStep === 'consultation' && formData && (
        <ConsultationForm
          leadData={formData}
          onScheduled={handleConsultationScheduled}
          onCancel={() => setCurrentStep('assessment')}
        />
      )}
    </div>
  )
}
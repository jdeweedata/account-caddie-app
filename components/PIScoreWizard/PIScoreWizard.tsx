// components/PIScoreWizard/PIScoreWizard.tsx
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from 'lucide-react'
import { PIScoreFormData } from './types'
import BusinessProfileStep from './steps/BusinessProfileStep'
import ServiceRequirementsStep from './steps/ServiceRequirementsStep'
import OperationalScaleStep from './steps/OperationalScaleStep'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PIScoreWizardProps {
  onClose: () => void
  onComplete: (data: PIScoreFormData) => void
  initialPackage?: string | null
}

const initialData: PIScoreFormData = {
  businessProfile: {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    title: '',
    secondaryEmail: '',
    mobile: '',
    website: '',
    skypeId: '',
    twitter: ''
  },
  operationalScale: {
    employeeCount: 0,
    annualTurnover: 0,
    annualRevenue: 0,
    currentAccounting: ''
  },
  serviceRequirements: {
    package: '',
    additionalServices: [],
    leadSource: 'Website',
    leadStatus: 'New',
    rating: ''
  },
  emailOptOut: false,
  piScore: 0
}

export default function PIScoreWizard({ onClose, onComplete, initialPackage }: PIScoreWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<PIScoreFormData>(() => ({
    ...initialData,
    serviceRequirements: {
      ...initialData.serviceRequirements,
      package: initialPackage || ''
    }
  }))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (section: keyof PIScoreFormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>),
        [field]: value
      }
    }))

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateBusinessProfile = () => {
    const errors: Record<string, string> = {}
    const { businessProfile } = formData
    if (!businessProfile.firstName.trim()) errors.firstName = 'First name is required'
    if (!businessProfile.lastName.trim()) errors.lastName = 'Last name is required'
    if (!businessProfile.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessProfile.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!businessProfile.phone.trim()) errors.phone = 'Phone number is required'
    if (!businessProfile.industry) errors.industry = 'Industry is required'
    return errors
  }

  const validateOperationalScale = () => {
    const errors: Record<string, string> = {}
    const { operationalScale } = formData
    if (operationalScale.employeeCount === 0) errors.employeeCount = 'Employee count is required'
    if (operationalScale.annualTurnover === 0) errors.annualTurnover = 'Annual turnover is required'
    if (!operationalScale.currentAccounting) errors.currentAccounting = 'Current accounting setup is required'
    return errors
  }

  const validateServiceRequirements = () => {
    const errors: Record<string, string> = {}
    const { serviceRequirements } = formData
    if (!serviceRequirements.package) errors.package = 'Package selection is required'
    if (serviceRequirements.additionalServices.length === 0) {
      errors.additionalServices = 'Please select at least one additional service'
    }
    return errors
  }

  const validateStep = () => {
    let stepErrors: Record<string, string> = {}
    switch (step) {
      case 1: stepErrors = validateBusinessProfile(); break;
      case 2: stepErrors = validateOperationalScale(); break;
      case 3: stepErrors = validateServiceRequirements(); break;
    }
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1)
      toast.success('Step completed successfully!', {
        position: "bottom-right",
        autoClose: 3000
      })
    } else {
      toast.error('Please fill in all required fields', {
        position: "bottom-right",
        autoClose: 3000
      })
    }
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/zoho/crm/leads', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
        
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || "Failed to create lead")
        }
        
        toast.success('Your consultation has been scheduled!', {
          position: "bottom-right",
          autoClose: 5000
        })
        
        onComplete(formData)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to schedule consultation"
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000
        })
        console.error("Error creating lead:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <Card className="w-full max-w-[600px] bg-white">
      <CardHeader className="relative border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="text-xl text-te-papa-green">
          Business Assessment
        </CardTitle>
        <p className="text-sm text-gray-600">Step {step} of 3</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-chelsea-cucumber h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {errors.submit}
          </div>
        )}
        {step === 1 && (
          <BusinessProfileStep 
            data={formData.businessProfile}
            errors={errors}
            onChange={(field, value) => updateFormData('businessProfile', field, value)}
          />
        )}
        {step === 2 && (
          <OperationalScaleStep 
            data={formData.operationalScale}
            errors={errors}
            onChange={(field, value) => updateFormData('operationalScale', field, value)}
          />
        )}
        {step === 3 && (
          <ServiceRequirementsStep 
            data={formData.serviceRequirements}
            errors={errors}
            onChange={(field, value) => updateFormData('serviceRequirements', field, value)}
          />
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6">
        {step > 1 && (
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
        )}
        <Button 
          onClick={step < 3 ? handleNext : handleSubmit}
          className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            step < 3 ? 'Next' : 'Schedule Consultation'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
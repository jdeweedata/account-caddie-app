'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'

type FormData = {
  businessName: string
  contactName: string
  email: string
  phone: string
  industry: string
  companySize: string
  currentAccounting: string
  specificNeeds: string
}

interface OnboardingWizardProps {
  planName: string
  onClose: () => void
}

export default function OnboardingWizard({ planName, onClose }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    currentAccounting: '',
    specificNeeds: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1)
    }
  }

  const handleBack = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = () => {
    if (validateStep()) {
      console.log('Form submitted:', formData)
      // Here you would typically send the data to your backend
      alert('Thank you for signing up! We will be in touch soon.')
      onClose()
    }
  }

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.businessName && formData.contactName && formData.email && formData.phone
      case 2:
        return formData.industry && formData.companySize
      case 3:
        return formData.currentAccounting && formData.specificNeeds
      default:
        return true
    }
  }

  return (
    <Card className="w-full max-w-[550px] bg-white text-gray-800 shadow-lg">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="text-xl sm:text-2xl text-te-papa-green">Account Caddie Onboarding - {planName} Plan</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600">Step {step} of 3</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm sm:text-base text-gray-700">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-chelsea-cucumber text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-sm sm:text-base text-gray-700">Contact Name</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-chelsea-cucumber text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-chelsea-cucumber text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base text-gray-700">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-chelsea-cucumber text-sm sm:text-base"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-base sm:text-lg text-gray-700 font-semibold">Industry</Label>
                <Select 
                  name="industry" 
                  value={formData.industry}
                  onValueChange={(value) => handleSelectChange('industry', value)}
                >
                  <SelectTrigger className="w-full border-gray-300 focus:border-chelsea-cucumber text-base sm:text-lg py-3">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="technology" className="text-gray-800 hover:bg-gray-100 py-2">Technology</SelectItem>
                    <SelectItem value="finance" className="text-gray-800 hover:bg-gray-100 py-2">Finance</SelectItem>
                    <SelectItem value="healthcare" className="text-gray-800 hover:bg-gray-100 py-2">Healthcare</SelectItem>
                    <SelectItem value="education" className="text-gray-800 hover:bg-gray-100 py-2">Education</SelectItem>
                    <SelectItem value="other" className="text-gray-800 hover:bg-gray-100 py-2">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize" className="text-base sm:text-lg text-gray-700 font-semibold">Company Size</Label>
                <Select 
                  name="companySize" 
                  value={formData.companySize}
                  onValueChange={(value) => handleSelectChange('companySize', value)}
                >
                  <SelectTrigger className="w-full border-gray-300 focus:border-chelsea-cucumber text-base sm:text-lg py-3">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1-10" className="text-gray-800 hover:bg-gray-100 py-2">1-10 employees</SelectItem>
                    <SelectItem value="11-50" className="text-gray-800 hover:bg-gray-100 py-2">11-50 employees</SelectItem>
                    <SelectItem value="51-200" className="text-gray-800 hover:bg-gray-100 py-2">51-200 employees</SelectItem>
                    <SelectItem value="201-500" className="text-gray-800 hover:bg-gray-100 py-2">201-500 employees</SelectItem>
                    <SelectItem value="500+" className="text-gray-800 hover:bg-gray-100 py-2">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="currentAccounting" className="text-sm sm:text-base text-gray-700">Current Accounting Solution</Label>
                <Input
                  id="currentAccounting"
                  name="currentAccounting"
                  value={formData.currentAccounting}
                  onChange={handleInputChange}
                  placeholder="e.g., QuickBooks, Xero"
                  required
                  className="border-gray-300 focus:border-chelsea-cucumber text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specificNeeds" className="text-sm sm:text-base text-gray-700">Specific Needs or Challenges</Label>
                <Textarea
                  id="specificNeeds"
                  name="specificNeeds"
                  value={formData.specificNeeds}
                  onChange={handleInputChange}
                  placeholder="Tell us about your specific accounting needs or challenges"
                  required
                  className="border-gray-300 focus:border-chelsea-cucumber text-sm sm:text-base"
                  rows={4}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-6">
        {step > 1 && (
          <Button onClick={handleBack} variant="outline" className="text-te-papa-green border-te-papa-green hover:bg-te-papa-green hover:text-white text-sm sm:text-base">Back</Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} className="bg-chelsea-cucumber text-white hover:bg-te-papa-green text-sm sm:text-base">Next</Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-chelsea-cucumber text-white hover:bg-te-papa-green text-sm sm:text-base">Submit</Button>
        )}
      </CardFooter>
    </Card>
  )
}
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
}

export function OnboardingModal({ isOpen, onClose, planName }: OnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
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
    setStep(prevStep => prevStep + 1)
  }

  const handleBack = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = () => {
    console.log('Submitting form data:', formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to the {planName} Plan</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="businessName" className="text-right">
                Business Name
              </Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactName" className="text-right">
                Contact Name
              </Label>
              <Input
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="industry" className="text-right">
                Industry
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange('industry', value)}
                value={formData.industry}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companySize" className="text-right">
                Company Size
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange('companySize', value)}
                value={formData.companySize}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentAccounting" className="text-right">
                Current Accounting
              </Label>
              <Input
                id="currentAccounting"
                name="currentAccounting"
                value={formData.currentAccounting}
                onChange={handleInputChange}
                placeholder="e.g., QuickBooks, Xero"
                className="col-span-3"
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specificNeeds" className="text-right">
                Specific Needs
              </Label>
              <Textarea
                id="specificNeeds"
                name="specificNeeds"
                value={formData.specificNeeds}
                onChange={handleInputChange}
                placeholder="Tell us about your specific accounting needs or challenges"
                className="col-span-3"
              />
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
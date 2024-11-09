// components/PIScoreWizard/steps/ServiceRequirementsStep.tsx
'use client'

import React from 'react'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FormError } from '../FormError'

interface ServiceRequirementsStepProps {
  data: {
    package: string;
    additionalServices: string[];
    leadSource: string;
    leadStatus: string;
    rating: string;
  }
  errors: Record<string, string>
  onChange: (field: string, value: any) => void
}

export default function ServiceRequirementsStep({ data, errors, onChange }: ServiceRequirementsStepProps) {
  const handleServiceChange = (service: string) => {
    const currentServices = data.additionalServices;
    const newServices = currentServices.includes(service)
      ? currentServices.filter(s => s !== service)
      : [...currentServices, service];
    onChange('additionalServices', newServices);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="package">Package Selection</Label>
        <Select
          value={data.package}
          onValueChange={(value) => onChange('package', value)}
        >
          <SelectTrigger id="package" className="mt-1 bg-white">
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg border border-gray-200">
            <SelectItem value="starter">Starter Package</SelectItem>
            <SelectItem value="professional">Professional Package</SelectItem>
            <SelectItem value="enterprise">Enterprise Package</SelectItem>
          </SelectContent>
        </Select>
        {errors.package && <FormError message={errors.package} />}
      </div>

      <div className="space-y-2">
        <Label>Additional Services</Label>
        <div className="mt-2 space-y-2">
          {['Payroll', 'Tax Planning', 'Advisory', 'Compliance'].map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={data.additionalServices.includes(service)}
                onCheckedChange={() => handleServiceChange(service)}
              />
              <Label htmlFor={service} className="text-sm font-normal">
                {service}
              </Label>
            </div>
          ))}
        </div>
        {errors.additionalServices && <FormError message={errors.additionalServices} />}
      </div>
    </div>
  )
}
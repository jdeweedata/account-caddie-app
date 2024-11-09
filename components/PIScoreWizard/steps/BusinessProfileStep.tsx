// components/PIScoreWizard/steps/BusinessProfileStep.tsx
'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormError } from '../FormError'

interface BusinessProfileStepProps {
  data: {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phone: string;
    industry: string;
  }
  errors: Record<string, string>
  onChange: (field: string, value: string) => void
}

export default function BusinessProfileStep({ data, errors, onChange }: BusinessProfileStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className="mt-1"
          />
          {errors.firstName && <FormError message={errors.firstName} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className="mt-1"
          />
          {errors.lastName && <FormError message={errors.lastName} />}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={data.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
          className="mt-1"
        />
        {errors.companyName && <FormError message={errors.companyName} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="mt-1"
        />
        {errors.email && <FormError message={errors.email} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="mt-1"
        />
        {errors.phone && <FormError message={errors.phone} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select
          value={data.industry}
          onValueChange={(value) => onChange('industry', value)}
        >
          <SelectTrigger id="industry" className="mt-1 bg-white">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg border border-gray-200">
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="professional_services">Professional Services</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="hospitality">Hospitality</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.industry && <FormError message={errors.industry} />}
      </div>
    </div>
  )
}
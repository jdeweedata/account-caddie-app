// components/PIScoreWizard/steps/OperationalScaleStep.tsx
'use client'

import React from 'react'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormError } from '../FormError'

interface OperationalScaleStepProps {
  data: {
    employeeCount: number;
    annualTurnover: number;
    annualRevenue: number;
    currentAccounting: string;
  }
  errors: Record<string, string>
  onChange: (field: string, value: any) => void
}

export default function OperationalScaleStep({ data, errors, onChange }: OperationalScaleStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="employeeCount">Number of Employees</Label>
        <Select
          value={data.employeeCount.toString()}
          onValueChange={(value) => onChange('employeeCount', parseInt(value))}
        >
          <SelectTrigger id="employeeCount" className="mt-1 bg-white">
            <SelectValue placeholder="Select employee count" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg border border-gray-200">
            <SelectItem value="1">1-5</SelectItem>
            <SelectItem value="2">6-20</SelectItem>
            <SelectItem value="3">21-50</SelectItem>
            <SelectItem value="4">51-200</SelectItem>
            <SelectItem value="5">200+</SelectItem>
          </SelectContent>
        </Select>
        {errors.employeeCount && <FormError message={errors.employeeCount} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="annualTurnover">Annual Turnover</Label>
        <Select
          value={data.annualTurnover.toString()}
          onValueChange={(value) => onChange('annualTurnover', parseInt(value))}
        >
          <SelectTrigger id="annualTurnover" className="mt-1 bg-white">
            <SelectValue placeholder="Select annual turnover" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg border border-gray-200">
            <SelectItem value="1">Less than R1M</SelectItem>
            <SelectItem value="2">R1M - R5M</SelectItem>
            <SelectItem value="3">R5M - R20M</SelectItem>
            <SelectItem value="4">R20M+</SelectItem>
          </SelectContent>
        </Select>
        {errors.annualTurnover && <FormError message={errors.annualTurnover} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAccounting">Current Accounting Setup</Label>
        <Select
          value={data.currentAccounting}
          onValueChange={(value) => onChange('currentAccounting', value)}
        >
          <SelectTrigger id="currentAccounting" className="mt-1 bg-white">
            <SelectValue placeholder="Select current setup" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg border border-gray-200">
            <SelectItem value="none">No formal accounting</SelectItem>
            <SelectItem value="basic">Basic spreadsheets</SelectItem>
            <SelectItem value="software">Accounting software</SelectItem>
            <SelectItem value="outsourced">Outsourced accounting</SelectItem>
          </SelectContent>
        </Select>
        {errors.currentAccounting && <FormError message={errors.currentAccounting} />}
      </div>
    </div>
  )
}
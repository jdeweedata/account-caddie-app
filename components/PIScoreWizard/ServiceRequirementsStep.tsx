'use client'

import { ServiceRequirementsStepProps } from './types'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const ADDITIONAL_SERVICES = [
  { id: 'payroll', label: 'Payroll' },
  { id: 'taxPlanning', label: 'Tax Planning' },
  { id: 'advisory', label: 'Advisory' },
  { id: 'compliance', label: 'Compliance' }
]

const PACKAGES = [
  { id: 'professional', label: 'Professional Package' },
  { id: 'enterprise', label: 'Enterprise Package' },
  { id: 'custom', label: 'Custom Package' }
]

export function ServiceRequirementsStep({ data, errors, onChange }: ServiceRequirementsStepProps) {
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const currentServices = new Set(data.additionalServices)
    if (checked) {
      currentServices.add(serviceId)
    } else {
      currentServices.delete(serviceId)
    }
    onChange('additionalServices', Array.from(currentServices))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="package">Package Selection</Label>
        <Select
          value={data.package}
          onValueChange={(value) => onChange('package', value)}
        >
          <SelectTrigger 
            id="package"
            className={cn(
              "w-full",
              errors.package && "border-red-500"
            )}
          >
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent>
            {PACKAGES.map((pkg) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.package && (
          <p className="text-sm text-red-500">{errors.package}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label>Additional Services</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADDITIONAL_SERVICES.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={service.id}
                checked={data.additionalServices.includes(service.id)}
                onCheckedChange={(checked) => 
                  handleServiceChange(service.id, checked as boolean)
                }
              />
              <Label
                htmlFor={service.id}
                className="text-sm font-normal"
              >
                {service.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.additionalServices && (
          <p className="text-sm text-red-500">{errors.additionalServices}</p>
        )}
      </div>
    </div>
  )
} 
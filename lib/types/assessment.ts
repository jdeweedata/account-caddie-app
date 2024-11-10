export interface BusinessProfile {
  firstName: string
  lastName: string
  companyName: string
  email: string
  phone: string
  industry: string
  position: string
}

export interface OperationalScale {
  employeeCount: number
  annualRevenue: number
  businessAge: string
  registrationType: string
}

export type PackageType = 'Basic' | 'Core' | 'Premium'

export interface ServiceRequirements {
  package: PackageType
  additionalServices: string[]
  consultationPreference: 'Online' | 'In-Person'
  urgencyLevel: 'Immediate' | 'Within 1 Month' | 'Within 3 Months'
}

export interface AssessmentData {
  businessProfile: BusinessProfile
  operationalScale: OperationalScale
  serviceRequirements: ServiceRequirements
  piScore?: number
  consultationDateTime?: string
} 
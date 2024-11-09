// components/PIScoreWizard/index.ts

// Export main components
export { default as PIScoreWizard } from './PIScoreWizard'
export { default as PackageRecommendation } from './PackageRecommendation'
export { default as BusinessProfileStep } from './steps/BusinessProfileStep'
export { default as OperationalScaleStep } from './steps/OperationalScaleStep'
export { default as ServiceRequirementsStep } from './steps/ServiceRequirementsStep'
export { default as ConsultationBooking } from './ConsultationBooking'

// Export types
export type { PIScoreFormData } from './types'
export type { 
  BusinessProfileData,
  OperationalScaleData,
  ServiceRequirementsData,
  ConsultationData,
  StepErrors
} from './types'

// Export flow
export { default as PIScoreWizardFlow } from './PIScoreWizardFlow'
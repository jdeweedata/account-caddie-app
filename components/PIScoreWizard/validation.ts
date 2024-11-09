import { BusinessProfileData, ServiceRequirementsData, OperationalScaleData } from './types'

export const validateBusinessProfile = (data: BusinessProfileData) => {
  const errors: Record<string, string> = {}

  if (!data.companyName.trim()) {
    errors.companyName = 'Company name is required'
  }
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required'
  }
  if (!data.industry) {
    errors.industry = 'Please select an industry'
  }
  if (!data.currentAccounting) {
    errors.currentAccounting = 'Please select your current accounting setup'
  }
  if (!data.companySize) {
    errors.companySize = 'Please select your company size'
  }

  return errors
}

export const validateServiceRequirements = (data: ServiceRequirementsData) => {
  const errors: Record<string, string> = {}

  if (!data.accountingFrequency) {
    errors.accountingFrequency = 'Please select an accounting service level'
  }
  if (!data.managementAccounts) {
    errors.managementAccounts = 'Please select management accounts frequency'
  }
  if (data.additionalServices.length === 0) {
    errors.additionalServices = 'Please select at least one additional service'
  }

  return errors
}

export const validateOperationalScale = (data: OperationalScaleData) => {
  const errors: Record<string, string> = {}

  if (!data.payrollSize) {
    errors.payrollSize = 'Please select your payroll requirements'
  }
  if (!data.debtorsManagement) {
    errors.debtorsManagement = 'Please select your debtors management needs'
  }

  return errors
}
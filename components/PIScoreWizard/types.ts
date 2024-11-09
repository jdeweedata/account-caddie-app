// components/PIScoreWizard/types.ts

export interface BusinessProfileData {
  firstName: string;
  lastName: string;
  title: string;  // Remove optional since it's required in form
  companyName: string;
  email: string;
  secondaryEmail: string;  // Remove optional since it's required in form
  phone: string;
  mobile: string;  // Remove optional since it's required in form
  website: string;  // Remove optional since it's required in form
  industry: string;
  skypeId: string;  // Remove optional since it's required in form
  twitter: string;  // Remove optional since it's required in form
}

export interface OperationalScaleData {
  employeeCount: number;
  annualTurnover: number;
  annualRevenue: number;
  currentAccounting: string;
}

export interface ServiceRequirementsData {
  package: string;
  additionalServices: string[];
  leadSource: string;
  leadStatus: string;
  rating: string;
}

export interface PIScoreFormData {
  businessProfile: BusinessProfileData;
  operationalScale: OperationalScaleData;
  serviceRequirements: ServiceRequirementsData;
  emailOptOut: boolean;
  piScore: number;  // Remove optional modifier
}

export interface ConsultationData {
  consultationDate: string;
  consultationTime: string;
  timezone: string;
  contactMethod: string;
  discussionTopics?: string;
}

export interface StepErrors {
  [key: string]: string;
}

// Additional type definitions for form handling
export type FormStep = 'businessProfile' | 'operationalScale' | 'serviceRequirements' | 'consultation';

export interface PackageOption {
  id: string;
  name: string;
  description: string;
  minimumScore: number;
}

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
}

// Constants for form options
export const INDUSTRY_OPTIONS = [
  'Retail',
  'Manufacturing',
  'Professional Services',
  'Construction',
  'Technology',
  'Other'
] as const;

export const ACCOUNTING_SETUP_OPTIONS = [
  'No formal accounting',
  'Basic bookkeeping',
  'Outsourced accounting',
  'In-house accounting team'
] as const;

export const LEAD_STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal',
  'Negotiation',
  'Converted',
  'Lost'
] as const;

export const RATING_OPTIONS = [
  'Hot',
  'Warm',
  'Cold'
] as const;
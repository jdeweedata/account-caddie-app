// components/PIScoreWizard/PackageRecommendation.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertCircle } from 'lucide-react'
import { PIScoreFormData } from './types'

interface PackageRecommendationProps {
  formData: PIScoreFormData;
  piScore: number;
}

interface PackageDetails {
  name: string;
  basePrice: number;
  features: string[];
  limitations: string[];
  employeeRange: string;
  annualTurnover: string;
  additionalServices: string[];
}

const ACCOUNTING_PACKAGES: Record<string, PackageDetails> = {
  'core': {
    name: 'Core Package',
    basePrice: 4000,
    employeeRange: '1-10',
    annualTurnover: 'Up to R1 million',
    features: [
      'Monthly accounting',
      'Basic bookkeeping',
      'Annual Financial Statements',
      'Annual Tax Returns',
      'Monthly VAT returns',
      'Basic compliance review'
    ],
    limitations: [
      'Limited to monthly processing',
      'Basic support only',
      'No management accounts'
    ],
    additionalServices: [
      'Payroll (R1,400/month)',
      'Basic tax consulting'
    ]
  },
  'professional': {
    name: 'Professional Package',
    basePrice: 6000,
    employeeRange: '11-50',
    annualTurnover: 'R1 million - R5 million',
    features: [
      'All Core Package features',
      'Monthly management accounts',
      'Cash flow forecasting',
      'Budgeting assistance',
      'Quarterly review meetings',
      'Enhanced compliance monitoring'
    ],
    limitations: [
      'Monthly reporting cycle',
      'Standard response times'
    ],
    additionalServices: [
      'Payroll (R2,050/month)',
      'Tax planning',
      'Advisory services'
    ]
  },
  'enterprise': {
    name: 'Enterprise Package',
    basePrice: 15500,
    employeeRange: '51+',
    annualTurnover: 'R5 million+',
    features: [
      'All Professional Package features',
      'Weekly processing',
      'Monthly management packs',
      'Strategic advisory services',
      'Dedicated account manager',
      'Priority support',
      'Custom reporting'
    ],
    limitations: [
      'Premium pricing',
      'Complex implementation'
    ],
    additionalServices: [
      'Payroll (R3,850/month)',
      'Comprehensive tax planning',
      'CFO services'
    ]
  }
}

export default function PackageRecommendation({ formData, piScore }: PackageRecommendationProps) {
  const determineRecommendedPackage = () => {
    const employeeCount = formData.operationalScale.employeeCount;
    const annualTurnover = formData.operationalScale.annualTurnover;

    if (employeeCount > 50 || annualTurnover > 5000000) {
      return ACCOUNTING_PACKAGES['enterprise'];
    } else if (employeeCount > 10 || annualTurnover > 1000000) {
      return ACCOUNTING_PACKAGES['professional'];
    }
    return ACCOUNTING_PACKAGES['core'];
  }

  const calculateMonthlyInvestment = (basePackage: PackageDetails) => {
    let total = basePackage.basePrice;
    
    // Add employee-based payroll costs if selected
    const employeeCount = formData.operationalScale.employeeCount;
    if (formData.serviceRequirements.additionalServices.includes('payroll')) {
      if (employeeCount <= 10) total += 1400;
      else if (employeeCount <= 50) total += 2050;
      else total += 3850;
    }

    return total;
  }

  const recommendedPackage = determineRecommendedPackage();
  const monthlyInvestment = calculateMonthlyInvestment(recommendedPackage);

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-chelsea-cucumber text-white rounded-t-lg">
          <CardTitle className="text-2xl">Package Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-te-papa-green mb-2">
                {recommendedPackage.name}
              </h3>
              <p className="text-gray-600">
                Recommended for businesses with:
              </p>
              <ul className="text-sm text-gray-500 mt-2">
                <li>• {recommendedPackage.employeeRange} employees</li>
                <li>• Annual turnover: {recommendedPackage.annualTurnover}</li>
              </ul>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Monthly Investment</span>
                <span className="text-chelsea-cucumber">
                  R{monthlyInvestment.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Core Services</h4>
                <ul className="space-y-2">
                  {recommendedPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-chelsea-cucumber mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Additional Services Available</h4>
                <ul className="space-y-2">
                  {recommendedPackage.additionalServices.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Package Notes</h4>
                <ul className="space-y-2">
                  {recommendedPackage.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
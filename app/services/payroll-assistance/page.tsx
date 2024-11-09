'use client'

import React, { useState } from 'react'
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CTAWrapper } from '@/components/CTAWrapper'
import OnboardingWizard from '@/components/OnboardingWizard'

const payrollPackages = [
  {
    name: "Standard Package",
    employeeRange: "1-10 Employees",
    price: "R1400",
    onceOffFee: "R700.00"
  },
  {
    name: "Growth Package",
    employeeRange: "11-50 Employees",
    price: "R2050",
    onceOffFee: "R1500.00"
  },
  {
    name: "Premium Package",
    employeeRange: "51-100 Employees",
    price: "R2550",
    onceOffFee: "R1500.00"
  },
  {
    name: "Enterprise Package",
    employeeRange: "100+ Employees",
    price: "R3850",
    onceOffFee: "R2000.00"
  }
]

const payrollServices = [
  "Monthly payslips",
  "Leave management",
  "Payroll payment batches",
  "Employee info updates",
  "Monthly EMP201 submissions",
  "Bi-annual EMP501 submissions",
  "COIDA return of earnings",
  "UIF returns",
  "Department of labour compliance",
  "Expense claims"
]

export default function PayrollAssistancePage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('')

  const handleScheduleCall = (packageName: string) => {
    setSelectedPackage(packageName)
    setIsWizardOpen(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="bg-[#E6F3F0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1D3F39] mb-2 text-center">Only need <span className="text-[#069949]">payroll assistance?</span></h2>
          <p className="text-center text-[#1D3F39] mb-8">We can! With our payroll packages below:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {payrollPackages.map((pkg, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#1D3F39] mb-1">{pkg.name}</h3>
                  <p className="text-sm text-[#748B75] mb-4">{pkg.employeeRange}</p>
                  <p className="text-3xl font-bold text-[#069949] mb-1">{pkg.price}</p>
                  <p className="text-sm text-[#748B75] mb-4">Monthly, Excluding VAT</p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <p className="text-sm text-[#748B75]">Once-off Take on fee: {pkg.onceOffFee} Excluding VAT</p>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#1D3F39] mb-4 text-center">Here's what our payroll service entails:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {payrollServices.map((service, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-[#069949] mr-2" />
                  <span className="text-sm text-[#1D3F39]">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Button 
              className="bg-[#069949] text-white hover:bg-[#1D3F39]"
              onClick={() => handleScheduleCall('Payroll Assistance')}
            >
              Schedule A Call
            </Button>
          </div>
        </div>
      </div>

      <CTAWrapper />

      {isWizardOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <OnboardingWizard 
              planName={selectedPackage}
              onClose={() => setIsWizardOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
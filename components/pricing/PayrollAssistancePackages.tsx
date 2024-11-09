import React from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { PricingCard } from "@/components/ui/pricing-card"

const payrollPackages = [
  {
    name: "Standard Package",
    employeeRange: "1-10 Employees",
    price: "R1400",
    onceOffFee: "R700.00",
    features: ["Monthly payslips", "Leave management", "Payroll payment batches"],
    packageId: "payroll-standard"
  },
  {
    name: "Growth Package",
    employeeRange: "11-50 Employees",
    price: "R2050",
    onceOffFee: "R1500.00",
    features: ["All Standard features", "Employee info updates", "Monthly EMP201 submissions"],
    packageId: "payroll-growth"
  },
  {
    name: "Premium Package",
    employeeRange: "51-100 Employees",
    price: "R2550",
    onceOffFee: "R1500.00",
    features: ["All Growth features", "Bi-annual EMP501 submissions", "COIDA return of earnings"],
    packageId: "payroll-premium"
  },
  {
    name: "Enterprise Package",
    employeeRange: "100+ Employees",
    price: "R3850",
    onceOffFee: "R2000.00",
    features: ["All Premium features", "UIF returns", "Department of labour compliance", "Expense claims"],
    packageId: "payroll-enterprise"
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

export default function PayrollAssistancePackages() {
  const router = useRouter()

  const handleSelectPlan = (packageId: string) => {
    router.push(`/assessment?package=${packageId}`)
  }

  return (
    <section className="pricing-section">
      <h2 className="text-3xl font-bold text-[#1D4E4E] mb-8 text-center">Payroll Assistance Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payrollPackages.map((pkg) => (
          <PricingCard 
            key={pkg.packageId}
            {...pkg}
            onSelectPlan={() => handleSelectPlan(pkg.packageId)}
          />
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg p-8">
        <h3 className="text-xl font-semibold text-[#1D4E4E] mb-6">What's included in our payroll service</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payrollServices.map((service, index) => (
            <div key={index} className="flex items-center">
              <Check className="w-5 h-5 text-[#069949] mr-2 flex-shrink-0" />
              <span className="text-sm text-[#768A7E]">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
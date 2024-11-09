import React from 'react'
import { useRouter } from 'next/navigation'
import { PricingCard } from "@/components/ui/pricing-card"

const accountingPackages = [
  {
    name: "Core",
    subname: "Core package",
    price: "ZAR 4000",
    features: [
      "Monthly accounting",
      "Monthly management accounts",
      "Annual Financial Statements",
      "Annual Income Tax return"
    ],
    packageId: "core"
  },
  {
    name: "Accountant",
    subname: "Essential package",
    price: "ZAR 6000",
    features: [
      "Monthly accounting",
      "Monthly management accounts",
      "Annual Financial Statements",
      "Annual Income Tax return",
      "Budget support",
      "Cash flow support",
      "Assistance with all technical queries"
    ],
    packageId: "accountant"
  },
  {
    name: "Financial Manager",
    subname: "Advanced package",
    price: "ZAR 15500",
    features: [
      "Daily accounting",
      "Weekly management accounts",
      "Annual Financial Statements",
      "Annual Income Tax return",
      "Budget support",
      "Cash flow support",
      "Assistance with all technical queries",
      "Management Reporting",
      "Analysis and forecasting"
    ],
    packageId: "financial-manager"
  }
]

export default function AccountingPackages() {
  const router = useRouter()

  const handleSelectPlan = (packageId: string) => {
    router.push(`/assessment?package=${packageId}`)
  }

  return (
    <section className="pricing-section">
      <h2 className="text-3xl font-bold text-[#1D4E4E] mb-8 text-center">Accounting Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {accountingPackages.map((pkg) => (
          <PricingCard 
            key={pkg.packageId}
            {...pkg}
            onSelectPlan={() => handleSelectPlan(pkg.packageId)}
          />
        ))}
      </div>
    </section>
  )
}
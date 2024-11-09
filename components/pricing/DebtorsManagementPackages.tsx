import React from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { PricingCard } from "@/components/ui/pricing-card"

const debtorsPackages = [
  {
    name: "Standard Package",
    price: "R3750",
    features: [
      "Once a month follow up: Send statements to clients and one personalised email about outstanding accounts. (Capped to 50 clients)",
      "Customised feedback report (Once a month)",
      "Send Acknowledgement of debt letter (Capped to 2 letters)"
    ],
    packageId: "debtors-standard"
  },
  {
    name: "Premium Package",
    price: "R10500",
    features: [
      "Twice a month follow up: Send statements to clients and one personalised email about outstanding accounts. (Capped to 80 clients)",
      "Issue of sales invoices (Capped to 200 invoices) ONLY once a month (Includes recons)",
      "Receipts capturing in Xero ONLY twice a month before each follow up"
    ],
    packageId: "debtors-premium"
  },
  {
    name: "Established Package",
    price: "R16500",
    features: [
      "Weekly follow up: Send statements to clients and one personalised email about outstanding accounts. (Capped to 150 clients)",
      "Receipts capturing in Xero Once a week before each follow up",
      "Run debit orders - Capped to 200 clients"
    ],
    packageId: "debtors-established"
  }
]

const includedFeatures = [
  "Liaise with legal department via our integrated customer support channel",
  "Send Acknowledgement of debt letter (Exceeding the number included in package)",
  "Send Final Demand letter (Exceeding the number included in package)",
  "Excludes: Quotes, daily issuing of receivables invoices, legal action, and weekly meetings"
]

export default function DebtorsManagementPackages() {
  const router = useRouter()

  const handleSelectPlan = (packageId: string) => {
    router.push(`/assessment?package=${packageId}`)
  }

  return (
    <section className="pricing-section">
      <h2 className="text-3xl font-bold text-[#1D4E4E] mb-8 text-center">Debtors Management Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {debtorsPackages.map((pkg) => (
          <PricingCard 
            key={pkg.packageId}
            {...pkg}
            onSelectPlan={() => handleSelectPlan(pkg.packageId)}
          />
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg p-8">
        <h3 className="text-xl font-semibold text-[#1D4E4E] mb-6">Included in all packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {includedFeatures.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="w-5 h-5 text-[#069949] mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-[#768A7E]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
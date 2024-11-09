import React from 'react'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PricingCardProps {
  name: string
  subname?: string
  price: string
  features: string[]
  employeeRange?: string
  onceOffFee?: string
  className?: string
  onSelectPlan?: () => void
}

export function PricingCard({
  name,
  subname,
  price,
  features,
  employeeRange,
  onceOffFee,
  className,
  onSelectPlan
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col h-full min-h-[600px] w-full max-w-sm mx-auto bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${className}`}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg sm:text-xl font-medium text-[#1D4E4E]">
          {name}
        </CardTitle>
        {subname && <p className="text-sm text-[#768A7E]">{subname}</p>}
        {employeeRange && <p className="text-sm text-[#748B75]">{employeeRange}</p>}
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col">
        <div className="mb-6 text-center">
          <p className="text-4xl sm:text-5xl font-extrabold text-[#069949] mb-1">
            {price}
            <span className="ml-1 text-lg sm:text-xl font-medium text-[#768A7E]">/month</span>
          </p>
          <p className="text-sm text-[#768A7E]">Excluding VAT</p>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 text-[#069949] mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm text-[#768A7E]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-6">
        <div className="w-full space-y-4">
          <Button 
            className="w-full bg-[#069949] hover:bg-[#1D4E4E] text-white py-2.5"
            onClick={onSelectPlan}
          >
            Choose Plan
          </Button>
          {onceOffFee && (
            <p className="text-sm text-[#748B75] text-center">
              Once-off Take on fee: {onceOffFee} Excluding VAT
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
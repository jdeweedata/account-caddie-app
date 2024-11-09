import React from 'react'
import { Button } from "@/components/ui/button"
import { BarChart, DollarSign, Calculator } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/assessment')
  }

  return (
    <section className="bg-pampas py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-te-papa-green mb-4">
              Expert Financial Guidance for Your Business
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Let us handle your finances so you can focus on what you do best.
            </p>
            <Button 
              className="bg-chelsea-cucumber text-white hover:bg-te-papa-green text-lg px-8 py-3 w-full sm:w-auto"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 relative">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/drnjxfm8t/image/upload/v1729255937/pexels-leeloothefirst-8962520_xgouuq.jpg"
                alt="Financial Guidance"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md hidden sm:block">
                <BarChart className="w-12 h-12 text-chelsea-cucumber" />
                <div className="mt-2 text-sm font-semibold text-te-papa-green">Financial Growth</div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-lg shadow-md hidden sm:block">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-8 h-8 text-chelsea-cucumber" />
                  <Calculator className="w-8 h-8 text-chelsea-cucumber" />
                </div>
                <div className="mt-2 text-sm font-semibold text-te-papa-green">Financial Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
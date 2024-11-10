import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pampas to-white py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-chelsea-cucumber" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Your Consultation is Scheduled!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-gray-600">
              <p className="text-lg mb-2">Thank you for choosing Account Caddie.</p>
              <p>We're excited to meet with you and discuss your business needs.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Next Steps:</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>You'll receive a confirmation email with your consultation details</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>A calendar invite has been sent to your email</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Our team will prepare a personalized consultation plan</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>You'll receive a reminder 24 hours before the consultation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">To Prepare:</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Have your business documents ready</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>List any specific questions or concerns</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Think about your business goals and challenges</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center pt-4">
              <Link href="/">
                <Button className="bg-chelsea-cucumber hover:bg-te-papa-green text-white">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 
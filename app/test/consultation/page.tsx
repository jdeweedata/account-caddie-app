'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { generateTestConsultationData, testZohoAuth, testConsultationBooking } from '@/lib/zoho/test-utils/consultation'
import { ZohoAuthInitializer } from '@/components/ZohoAuthInitializer'

export default function ConsultationTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [requiresAuth, setRequiresAuth] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    setError(null)
    setTestResults(null)
    setRequiresAuth(false)

    try {
      // 1. Test Auth
      const authResult = await testZohoAuth()
      
      if (!authResult.success && authResult.requiresAuth) {
        setRequiresAuth(true)
        throw new Error('Authentication required')
      }
      
      // 2. Test Consultation Booking
      const testData = generateTestConsultationData()
      const bookingResult = await testConsultationBooking(testData)

      setTestResults({
        auth: authResult,
        booking: bookingResult,
        testData
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Test failed'
      setError(errorMessage)
      
      if (errorMessage === 'Authentication required') {
        setRequiresAuth(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Zoho CRM Integration Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiresAuth ? (
            <div className="space-y-4">
              <Alert>
                <AlertTitle>Authentication Required</AlertTitle>
                <AlertDescription>
                  Please authenticate with Zoho to run the tests
                </AlertDescription>
              </Alert>
              <ZohoAuthInitializer />
            </div>
          ) : (
            <Button 
              onClick={runTests}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Tests...
                </>
              ) : (
                'Run Integration Tests'
              )}
            </Button>
          )}

          {error && !requiresAuth && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {testResults && (
            <div className="space-y-4">
              <Alert variant="default">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Tests Completed</AlertTitle>
                <AlertDescription>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {JSON.stringify(testResults, null, 2)}
                  </pre>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 
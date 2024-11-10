'use client'

import { BookingForm } from '@/components/BookingForm'
import { CustomFieldForm } from '@/components/CustomFieldForm'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function BookingsPage() {
  const { toast } = useToast()

  const handleBookingSuccess = () => {
    toast({
      title: "Booking Created",
      description: "Your consultation has been scheduled successfully.",
      variant: "default"
    })
  }

  const handleBookingError = (error: string) => {
    toast({
      title: "Booking Error",
      description: error,
      variant: "destructive"
    })
  }

  const handleFieldSuccess = () => {
    toast({
      title: "Custom Field Created",
      description: "The custom field has been added to Zoho CRM.",
      variant: "default"
    })
  }

  const handleFieldError = (error: string) => {
    toast({
      title: "Custom Field Error",
      description: error,
      variant: "destructive"
    })
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-chelsea-cucumber">
            Zoho CRM Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="booking" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="booking">Schedule Consultation</TabsTrigger>
              <TabsTrigger value="fields">Custom Fields</TabsTrigger>
            </TabsList>

            <TabsContent value="booking" className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Schedule a Consultation
                </h2>
                <BookingForm 
                  onSuccess={handleBookingSuccess}
                  onError={handleBookingError}
                />
              </div>
            </TabsContent>

            <TabsContent value="fields" className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Create Custom CRM Field
                </h2>
                <CustomFieldForm 
                  onSuccess={handleFieldSuccess}
                  onError={handleFieldError}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Zoho CRM Connection</span>
                <span className="text-green-500">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Calendar Integration</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Custom Fields</span>
                <span className="text-green-500">Configured</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
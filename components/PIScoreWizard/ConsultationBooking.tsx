'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useZohoIntegration } from '@/lib/zoho/hooks/useZohoIntegration'
import { format } from 'date-fns'
import { toast } from '@/components/ui/toast'
import { Loader2 } from 'lucide-react'

interface ConsultationBookingProps {
  data: {
    consultationDate: string
    contactMethod: string
    discussionTopics: string
    timezone: string
  }
  onScheduled: () => void
  onCancel: () => void
}

export default function ConsultationBooking({
  data,
  onScheduled,
  onCancel
}: ConsultationBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [contactMethod, setContactMethod] = useState(data.contactMethod)
  const [discussionTopics, setDiscussionTopics] = useState(data.discussionTopics)
  const { fetchAvailableSlots, isLoading } = useZohoIntegration()
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    setSelectedTime('')
    
    try {
      const slots = await fetchAvailableSlots(format(date, 'yyyy-MM-dd'))
      setAvailableSlots(slots.map(slot => slot.start))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch available time slots",
        variant: "destructive"
      })
    }
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !contactMethod) {
      toast({
        title: "Error",
        description: "Please select all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const consultationDateTime = `${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`
      
      // Call ZOHO integration to schedule consultation
      await onScheduled()
      
      toast({
        title: "Success",
        description: "Consultation scheduled successfully",
        variant: "success"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule consultation",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>Schedule Your Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border"
            />
          </div>

          <div>
            <Label>Select Time</Label>
            <Select
              value={selectedTime}
              onValueChange={setSelectedTime}
              disabled={!selectedDate || isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? "Loading..." : "Select time"} />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Preferred Contact Method</Label>
            <Select value={contactMethod} onValueChange={setContactMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="office">Office Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Topics to Discuss</Label>
            <Textarea
              value={discussionTopics}
              onChange={(e) => setDiscussionTopics(e.target.value)}
              placeholder="What would you like to discuss in the consultation?"
              className="h-24"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel}>
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !selectedDate || !selectedTime || !contactMethod}
            className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              'Schedule Consultation'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
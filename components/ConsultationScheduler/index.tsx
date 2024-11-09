'use client'

import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useZohoIntegration } from '@/lib/zoho/hooks/useZohoIntegration'
import { PIScoreFormData } from '@/components/PIScoreWizard/types'
import { TimeSlot } from '@/lib/zoho/calendar'
import TimeSlotPicker from './TimeSlotPicker'
import BusinessHoursInfo from './BusinessHoursInfo'
import { toast } from '@/components/ui/toast'
import { APIError } from '@/lib/error-handler'

interface ConsultationSchedulerProps {
  leadData: PIScoreFormData
  onScheduled: () => void
  onCancel: () => void
}

export default function ConsultationScheduler({
  leadData,
  onScheduled,
  onCancel
}: ConsultationSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>()
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [error, setError] = useState<string | null>(null)
  
  const {
    createLeadAndSchedule,
    fetchAvailableSlots,
    isLoading,
  } = useZohoIntegration()

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(undefined)
    setError(null)
    
    try {
      const slots = await fetchAvailableSlots(format(date, 'yyyy-MM-dd'))
      setAvailableSlots(slots || [])
    } catch (error) {
      console.error('Error fetching slots:', error)
      setAvailableSlots([])
      
      const message = error instanceof APIError 
        ? error.message 
        : 'Failed to fetch available slots. Please try again.'

      setError(message)
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    }
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot)
  }

  const handleSchedule = async () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Error",
        description: "Please select a date and time slot",
        variant: "destructive"
      })
      return
    }

    try {
      const consultationDateTime = `${format(selectedDate, 'yyyy-MM-dd')}T${selectedSlot.start}:00Z`
      
      await createLeadAndSchedule(leadData, consultationDateTime)

      toast({
        title: "Success",
        description: "Your consultation has been scheduled successfully.",
        variant: "success"
      })
      
      onScheduled()
    } catch (error) {
      console.error('Error scheduling consultation:', error)
      
      const message = error instanceof APIError 
        ? error.message 
        : "Failed to schedule consultation. Please try again."

      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="w-full max-w-[800px]">
      <CardHeader>
        <CardTitle className="text-xl text-te-papa-green">
          Schedule Your Consultation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={{ before: new Date() }}
              className="rounded-md border"
            />
            <BusinessHoursInfo />
          </div>
          
          <div>
            {selectedDate ? (
              <TimeSlotPicker
                slots={availableSlots}
                selectedSlot={selectedSlot}
                onSelect={handleSlotSelect}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <div className="flex items-center justify-center h-full p-8 text-gray-500">
                Please select a date to view available slots
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedSlot || isLoading}
            className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
          >
            {isLoading ? "Scheduling..." : "Schedule Consultation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
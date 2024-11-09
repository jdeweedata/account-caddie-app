'use client'

import React, { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsultationSlot } from '@/lib/zoho/types'
import { ZohoCalendarService } from '@/lib/zoho/services/calendar'
import { format } from 'date-fns'
import { toast } from '@/components/ui/toast'

interface ConsultationFormProps {
  leadData: any
  onScheduled: () => void
  onCancel: () => void
}

export default function ConsultationForm({
  leadData,
  onScheduled,
  onCancel
}: ConsultationFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [availableSlots, setAvailableSlots] = useState<ConsultationSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<ConsultationSlot>()
  const [isLoading, setIsLoading] = useState(false)

  const calendarService = new ZohoCalendarService()

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate)
    }
  }, [selectedDate])

  const fetchAvailableSlots = async (date: Date) => {
    try {
      setIsLoading(true)
      const slots = await calendarService.getAvailableSlots(date)
      setAvailableSlots(slots)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch available slots",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
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
      setIsLoading(true)
      
      const consultationEvent = {
        subject: `Consultation with ${leadData.First_Name} ${leadData.Last_Name}`,
        startDateTime: `${format(selectedDate, 'yyyy-MM-dd')}T${selectedSlot.startTime}:00`,
        endDateTime: `${format(selectedDate, 'yyyy-MM-dd')}T${selectedSlot.endTime}:00`,
        participants: [{
          email: leadData.Email,
          type: 'required'
        }],
        reminders: [{
          minutes: 15
        }]
      }

      await calendarService.scheduleConsultation(consultationEvent)
      
      toast({
        title: "Success",
        description: "Consultation scheduled successfully",
        variant: "success"
      })
      
      onScheduled()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule consultation",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>Schedule Your Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                const day = date.getDay()
                return ![1, 2, 4].includes(day) || date < new Date()
              }}
              className="rounded-md border"
            />
          </div>
          
          <div>
            {selectedDate && (
              <div className="space-y-4">
                <h3 className="font-medium">Available Time Slots</h3>
                {isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chelsea-cucumber" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={`${slot.startTime}-${slot.endTime}`}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        onClick={() => setSelectedSlot(slot)}
                        disabled={!slot.available}
                        className={slot.available ? "hover:bg-chelsea-cucumber hover:text-white" : "opacity-50"}
                      >
                        {slot.startTime}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={isLoading || !selectedDate || !selectedSlot}
            className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
          >
            {isLoading ? "Scheduling..." : "Schedule Consultation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
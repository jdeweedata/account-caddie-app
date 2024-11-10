'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'

interface TimeSlot {
  startTime: string
  endTime: string
  available: boolean
}

interface BookingFormProps {
  leadId: string
  piScore: number
}

export function BookingForm({ leadId, piScore }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(format(selectedDate, 'yyyy-MM-dd'))
    }
  }, [selectedDate])

  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await fetch(`/api/zoho/calendar/slots?date=${date}`)
      if (!response.ok) throw new Error('Failed to fetch slots')
      const data = await response.json()
      setAvailableSlots(data.slots)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load available time slots",
        variant: "destructive"
      })
    }
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/zoho/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          leadId,
          dateTime: `${format(selectedDate, 'yyyy-MM-dd')}T${selectedSlot}`
        })
      })

      if (!response.ok) throw new Error('Failed to book consultation')

      toast({
        title: "Success",
        description: "Your consultation has been scheduled!"
      })

      // Redirect to success page
      window.location.href = '/booking/success'

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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Schedule Your Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date > new Date().setMonth(new Date().getMonth() + 2)}
            className="rounded-md border"
          />
        </div>

        {selectedDate && availableSlots.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <Button
                  key={slot.startTime}
                  variant={selectedSlot === slot.startTime ? "default" : "outline"}
                  onClick={() => setSelectedSlot(slot.startTime)}
                  disabled={!slot.available}
                  className="w-full"
                >
                  {format(new Date(`2000-01-01T${slot.startTime}`), 'h:mm a')}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleBooking}
          disabled={isLoading || !selectedDate || !selectedSlot}
          className="w-full bg-chelsea-cucumber hover:bg-te-papa-green text-white"
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
      </CardContent>
    </Card>
  )
} 
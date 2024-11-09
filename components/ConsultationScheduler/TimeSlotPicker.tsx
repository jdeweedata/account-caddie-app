import React from 'react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import { Clock, AlertCircle } from 'lucide-react'
import { TimeSlot } from '@/lib/zoho/calendar'

interface TimeSlotPickerProps {
  slots: TimeSlot[]
  selectedSlot?: TimeSlot
  onSelect: (slot: TimeSlot) => void
  isLoading?: boolean
  error?: string | null
}

export default function TimeSlotPicker({
  slots,
  selectedSlot,
  onSelect,
  isLoading = false,
  error = null
}: TimeSlotPickerProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chelsea-cucumber" />
        <p className="mt-4 text-gray-600">Loading available slots...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="text-center font-medium">{error}</p>
        <p className="text-sm mt-2 text-gray-600">Please try again or select a different date</p>
      </div>
    )
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500">
        <Clock className="w-8 h-8 mb-2" />
        <p className="text-center font-medium">No available slots</p>
        <p className="text-sm mt-2">Please select another date</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-te-papa-green mb-4">Available Time Slots</h3>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <Button
            key={`${slot.start}-${slot.end}`}
            onClick={() => slot.available && onSelect(slot)}
            disabled={!slot.available}
            variant="outline"
            className={cn(
              'w-full transition-colors',
              selectedSlot?.start === slot.start && 'bg-chelsea-cucumber text-white hover:bg-te-papa-green',
              !slot.available && 'opacity-50 cursor-not-allowed bg-gray-100'
            )}
          >
            {slot.start} - {slot.end}
          </Button>
        ))}
      </div>
    </div>
  )
}
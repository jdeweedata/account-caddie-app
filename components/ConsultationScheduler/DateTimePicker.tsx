'use client'

import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { format } from 'date-fns'
import { formStyles } from '@/lib/styles/form'

interface DateTimePickerProps {
  value: string
  onChange: (value: string) => void
  minDate?: Date
  className?: string
}

export function DateTimePicker({ value, onChange, minDate = new Date(), className }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  )
  const [selectedTime, setSelectedTime] = useState<string>(
    value ? format(new Date(value), 'HH:mm') : ''
  )

  // Business hours: 9 AM to 5 PM
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9 // Start from 9 AM
    return `${hour.toString().padStart(2, '0')}:00`
  })

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date && selectedTime) {
      const [hours, minutes] = selectedTime.split(':')
      const newDate = new Date(date)
      newDate.setHours(parseInt(hours), parseInt(minutes))
      onChange(newDate.toISOString())
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (selectedDate) {
      const [hours, minutes] = time.split(':')
      const newDate = new Date(selectedDate)
      newDate.setHours(parseInt(hours), parseInt(minutes))
      onChange(newDate.toISOString())
    }
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Select Date</Label>
          <div className="mt-1 bg-white rounded-lg border border-gray-200">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const day = date.getDay()
                return (
                  date < minDate || // Can't select past dates
                  date.getTime() > minDate.getTime() + 30 * 24 * 60 * 60 * 1000 || // Can't select more than 30 days ahead
                  day === 0 || // Sunday
                  day === 6 || // Saturday
                  day === 3 || // Wednesday
                  day === 5    // Friday
                )
              }}
              className="w-full"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center text-sm font-medium",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell: "text-gray-500 rounded-md w-8 font-normal text-[0.8rem] w-full",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full",
                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 mx-auto",
                day_range_end: "day-range-end",
                day_selected: "bg-chelsea-cucumber text-white hover:bg-chelsea-cucumber hover:text-white focus:bg-chelsea-cucumber focus:text-white rounded-md",
                day_today: "bg-gray-100 text-gray-900 rounded-md",
                day_outside: "opacity-50",
                day_disabled: "text-gray-300",
                day_hidden: "invisible",
              }}
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Select Time</Label>
          <div className="mt-1">
            <Select
              value={selectedTime}
              onValueChange={handleTimeSelect}
              disabled={!selectedDate}
            >
              <SelectTrigger className={formStyles.input}>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent className={`${formStyles.dropdown} max-h-[300px]`}>
                {timeSlots.map((time) => (
                  <SelectItem 
                    key={time} 
                    value={time}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {format(new Date().setHours(parseInt(time), 0), 'h:mm a')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {!selectedDate && (
              <p className="text-sm text-gray-500 mt-2">
                Please select a date first
              </p>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Available Days</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Monday</li>
              <li>• Tuesday</li>
              <li>• Thursday</li>
            </ul>
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Business Hours</h4>
            <p className="text-sm text-gray-600">9:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
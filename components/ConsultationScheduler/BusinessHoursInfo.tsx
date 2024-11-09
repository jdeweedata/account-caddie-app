'use client'

import React from 'react'
import { BUSINESS_HOURS } from '@/config/business-hours'
import { format } from 'date-fns'
import { Clock, Calendar } from 'lucide-react'

export default function BusinessHoursInfo() {
  const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const selectedWorkDays = BUSINESS_HOURS.workDays.map(day => workDays[day - 1])

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-te-papa-green mb-4">Business Hours</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-chelsea-cucumber mt-1" />
          <div>
            <p className="font-medium">Operating Hours</p>
            <p className="text-gray-600">
              {BUSINESS_HOURS.start} - {BUSINESS_HOURS.end} ({BUSINESS_HOURS.timezone})
            </p>
            <p className="text-sm text-gray-500">
              Break: {BUSINESS_HOURS.breakTime.start} - {BUSINESS_HOURS.breakTime.end}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Calendar className="w-5 h-5 text-chelsea-cucumber mt-1" />
          <div>
            <p className="font-medium">Working Days</p>
            <p className="text-gray-600">{selectedWorkDays.join(', ')}</p>
            <p className="text-sm text-gray-500">
              Consultation Duration: {BUSINESS_HOURS.consultationDuration} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
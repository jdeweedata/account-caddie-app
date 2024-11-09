'use client'

import { useState, useCallback } from 'react'
import { isAvailableTime, generateTimeSlots } from '../utils/date-utils'
import { BUSINESS_HOURS } from '@/config/business-hours'
import { addDays, startOfDay } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export function useBusinessHours() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAvailableDays = useCallback((startDate: Date, daysAhead: number = 30) => {
    const availableDays: Date[] = []
    let currentDate = startOfDay(startDate)
    
    for (let i = 0; i < daysAhead; i++) {
      const checkDate = addDays(currentDate, i)
      const zonedDate = utcToZonedTime(checkDate, BUSINESS_HOURS.timezone)
      
      if (isAvailableTime(zonedDate)) {
        availableDays.push(checkDate)
      }
    }
    
    return availableDays
  }, [])

  const getAvailableSlots = useCallback((date: Date) => {
    try {
      const zonedDate = utcToZonedTime(date, BUSINESS_HOURS.timezone)
      return generateTimeSlots(zonedDate)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate time slots')
      return []
    }
  }, [])

  const isTimeAvailable = useCallback((date: Date) => {
    try {
      const zonedDate = utcToZonedTime(date, BUSINESS_HOURS.timezone)
      return isAvailableTime(zonedDate)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check time availability')
      return false
    }
  }, [])

  return {
    getAvailableDays,
    getAvailableSlots,
    isTimeAvailable,
    isLoading,
    error,
  }
}
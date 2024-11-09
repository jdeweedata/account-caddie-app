import { useState, useCallback } from 'react'
import { ZohoCalendar, TimeSlot } from '../calendar'

export function useCalendar() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const calendar = new ZohoCalendar()

  const getAvailableSlots = useCallback(async (date: Date) => {
    setIsLoading(true)
    setError(null)

    try {
      const slots = await calendar.getAvailableSlots(date)
      return slots
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch available slots')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const scheduleConsultation = useCallback(async (
    leadId: string,
    datetime: Date,
    contactEmail: string
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await calendar.scheduleConsultation(
        leadId,
        datetime,
        contactEmail
      )
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule consultation')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    getAvailableSlots,
    scheduleConsultation,
    isLoading,
    error,
  }
}
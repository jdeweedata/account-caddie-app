import { ZOHO_CONFIG } from './config'
import { ZohoAuth } from './auth'
import { BUSINESS_HOURS } from '@/config/business-hours'
import { addMinutes, format, parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { APIError } from '@/lib/error-handler'

export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export class ZohoCalendar {
  private auth = ZohoAuth.getInstance()

  async getAvailableSlots(dateStr: string): Promise<TimeSlot[]> {
    try {
      const date = new Date(dateStr)
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)

      // Generate base slots without checking calendar
      const baseSlots = this.generateBaseTimeSlots(date)

      // Get existing events from calendar
      const events = await this.getCalendarEvents(dayStart, dayEnd)

      // Mark slots as unavailable if they conflict with existing events
      return this.markUnavailableSlots(baseSlots, events)
    } catch (error) {
      console.error('Error getting available slots:', error)
      throw new APIError(
        'Failed to get available slots',
        500,
        'CALENDAR_ERROR'
      )
    }
  }

  private generateBaseTimeSlots(date: Date): TimeSlot[] {
    const slots: TimeSlot[] = []
    const startTime = parse(BUSINESS_HOURS.start, 'HH:mm', date)
    const endTime = parse(BUSINESS_HOURS.end, 'HH:mm', date)
    const breakStart = parse(BUSINESS_HOURS.breakTime.start, 'HH:mm', date)
    const breakEnd = parse(BUSINESS_HOURS.breakTime.end, 'HH:mm', date)
    
    let currentTime = startTime
    
    while (currentTime < endTime) {
      const slotEnd = addMinutes(currentTime, BUSINESS_HOURS.consultationDuration)
      
      const isBusinessHours = currentTime >= startTime && slotEnd <= endTime
      const isBreakTime = (currentTime < breakEnd && slotEnd > breakStart)
      
      slots.push({
        start: format(currentTime, 'HH:mm'),
        end: format(slotEnd, 'HH:mm'),
        available: isBusinessHours && !isBreakTime
      })
      
      currentTime = slotEnd
    }
    
    return slots
  }

  private async getCalendarEvents(start: Date, end: Date) {
    try {
      const token = await this.auth.getAccessToken()
      
      const response = await fetch(
        `${ZOHO_CONFIG.apiDomain}/api/${ZOHO_CONFIG.version}/calendar/${ZOHO_CONFIG.calendarId}/events?from=${start.toISOString()}&to=${end.toISOString()}`,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )

      if (!response.ok) {
        throw new APIError(
          'Failed to fetch calendar events',
          response.status
        )
      }

      const data = await response.json()
      return data.events || []
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw new APIError(
        'Failed to fetch calendar events',
        500,
        'CALENDAR_ERROR'
      )
    }
  }

  private markUnavailableSlots(slots: TimeSlot[], events: any[]): TimeSlot[] {
    return slots.map(slot => {
      const slotStart = parse(slot.start, 'HH:mm', new Date())
      const slotEnd = parse(slot.end, 'HH:mm', new Date())

      const hasConflict = events.some(event => {
        const eventStart = new Date(event.start)
        const eventEnd = new Date(event.end)
        return (
          isWithinInterval(slotStart, { start: eventStart, end: eventEnd }) ||
          isWithinInterval(slotEnd, { start: eventStart, end: eventEnd })
        )
      })

      return {
        ...slot,
        available: slot.available && !hasConflict
      }
    })
  }

  async scheduleConsultation(leadId: string, datetime: Date, attendeeEmail: string) {
    try {
      const token = await this.auth.getAccessToken()
      
      const eventData = {
        title: 'Account Caddie Consultation',
        start: datetime.toISOString(),
        end: addMinutes(datetime, BUSINESS_HOURS.consultationDuration).toISOString(),
        attendees: [{ email: attendeeEmail, type: 'required' }],
        reminder: { minutes: 15, type: 'popup' },
        description: `Consultation for Lead ID: ${leadId}`,
        status: 'confirmed'
      }

      const response = await fetch(
        `${ZOHO_CONFIG.apiDomain}/api/${ZOHO_CONFIG.version}/calendar/${ZOHO_CONFIG.calendarId}/events`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Zoho-oauthtoken ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData)
        }
      )

      if (!response.ok) {
        throw new APIError(
          'Failed to schedule consultation',
          response.status
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error scheduling consultation:', error)
      throw new APIError(
        'Failed to schedule consultation',
        500,
        'CALENDAR_ERROR'
      )
    }
  }

  async cancelConsultation(eventId: string): Promise<void> {
    try {
      const token = await this.auth.getAccessToken()
      
      const response = await fetch(
        `${ZOHO_CONFIG.apiDomain}/api/${ZOHO_CONFIG.version}/calendar/${ZOHO_CONFIG.calendarId}/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Zoho-oauthtoken ${token}`,
          }
        }
      )

      if (!response.ok) {
        throw new APIError(
          'Failed to cancel consultation',
          response.status
        )
      }
    } catch (error) {
      console.error('Error canceling consultation:', error)
      throw new APIError(
        'Failed to cancel consultation',
        500,
        'CALENDAR_ERROR'
      )
    }
  }
}
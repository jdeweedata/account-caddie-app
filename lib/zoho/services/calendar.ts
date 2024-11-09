import { ConsultationSlot, ConsultationEvent } from '../types'
import { ZOHO_CONFIG } from '../config'
import { addMinutes, format, parse, isBefore } from 'date-fns'
import { logger } from '@/lib/logger'

export class ZohoCalendarService {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getAvailableSlots(date: Date): Promise<ConsultationSlot[]> {
    try {
      const dayOfWeek = date.getDay()
      if (!ZOHO_CONFIG.businessHours.consultationDays.includes(dayOfWeek)) {
        return []
      }

      const events = await this.getEventsForDay(date)
      const slots = this.generateTimeSlots(date)
      return this.markUnavailableSlots(slots, events)
    } catch (error) {
      logger.error(error, 'ZohoCalendarService.getAvailableSlots')
      throw error
    }
  }

  async scheduleConsultation(event: ConsultationEvent) {
    try {
      const response = await fetch(`${ZOHO_CONFIG.apiDomain}${ZOHO_CONFIG.endpoints.calendar}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      })

      if (!response.ok) {
        const error = new Error('Failed to schedule consultation')
        logger.error(error, 'ZohoCalendarService.scheduleConsultation')
        throw error
      }

      return await response.json()
    } catch (error) {
      logger.error(error, 'ZohoCalendarService.scheduleConsultation')
      throw error
    }
  }

  private async getEventsForDay(date: Date) {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const response = await fetch(
        `${ZOHO_CONFIG.apiDomain}${ZOHO_CONFIG.endpoints.calendar}/events?date=${formattedDate}`,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
          }
        }
      )

      if (!response.ok) {
        const error = new Error('Failed to fetch calendar events')
        logger.error(error, 'ZohoCalendarService.getEventsForDay')
        throw error
      }

      return await response.json()
    } catch (error) {
      logger.error(error, 'ZohoCalendarService.getEventsForDay')
      throw error
    }
  }

  private generateTimeSlots(date: Date): ConsultationSlot[] {
    const slots: ConsultationSlot[] = []
    const { startTime, endTime, slotDuration } = ZOHO_CONFIG.businessHours
    
    let currentTime = parse(startTime, 'HH:mm', date)
    const endDateTime = parse(endTime, 'HH:mm', date)

    while (isBefore(currentTime, endDateTime)) {
      const slotEnd = addMinutes(currentTime, slotDuration)
      
      slots.push({
        startTime: format(currentTime, 'HH:mm'),
        endTime: format(slotEnd, 'HH:mm'),
        available: true
      })

      currentTime = addMinutes(currentTime, slotDuration + ZOHO_CONFIG.businessHours.bufferTime)
    }

    return slots
  }

  private markUnavailableSlots(slots: ConsultationSlot[], events: any[]): ConsultationSlot[] {
    return slots.map(slot => ({
      ...slot,
      available: !events.some(event => this.isSlotConflicting(slot, event))
    }))
  }

  private isSlotConflicting(slot: ConsultationSlot, event: any): boolean {
    const slotStart = parse(slot.startTime, 'HH:mm', new Date())
    const slotEnd = parse(slot.endTime, 'HH:mm', new Date())
    const eventStart = new Date(event.start_time)
    const eventEnd = new Date(event.end_time)

    return (
      (slotStart >= eventStart && slotStart < eventEnd) ||
      (slotEnd > eventStart && slotEnd <= eventEnd)
    )
  }
}
import { BUSINESS_HOURS } from '@/config/business-hours'
import { addMinutes, format, isWithinInterval, parse, setHours, setMinutes } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

export function isBusinessHour(date: Date): boolean {
  const zonedDate = utcToZonedTime(date, BUSINESS_HOURS.timezone)
  const hours = zonedDate.getHours()
  const minutes = zonedDate.getMinutes()
  const time = hours * 100 + minutes

  const startTime = parse(BUSINESS_HOURS.start, 'HH:mm', new Date())
  const endTime = parse(BUSINESS_HOURS.end, 'HH:mm', new Date())
  const startMinutes = startTime.getHours() * 100 + startTime.getMinutes()
  const endMinutes = endTime.getHours() * 100 + endTime.getMinutes()

  return time >= startMinutes && time <= endMinutes
}

export function isWorkDay(date: Date): boolean {
  const zonedDate = utcToZonedTime(date, BUSINESS_HOURS.timezone)
  const day = zonedDate.getDay()
  return BUSINESS_HOURS.workDays.includes(day)
}

export function isHoliday(date: Date): boolean {
  const dateStr = format(utcToZonedTime(date, BUSINESS_HOURS.timezone), 'yyyy-MM-dd')
  return BUSINESS_HOURS.holidays.includes(dateStr)
}

export function isBreakTime(date: Date): boolean {
  const zonedDate = utcToZonedTime(date, BUSINESS_HOURS.timezone)
  const time = format(zonedDate, 'HH:mm')
  return time >= BUSINESS_HOURS.breakTime.start && time <= BUSINESS_HOURS.breakTime.end
}

export function isAvailableTime(date: Date): boolean {
  return (
    isWorkDay(date) &&
    isBusinessHour(date) &&
    !isHoliday(date) &&
    !isBreakTime(date)
  )
}

export function generateTimeSlots(date: Date): Array<{
  start: string
  end: string
  available: boolean
}> {
  const slots = []
  const startTime = parse(BUSINESS_HOURS.start, 'HH:mm', date)
  const endTime = parse(BUSINESS_HOURS.end, 'HH:mm', date)
  
  let currentTime = startTime
  while (currentTime < endTime) {
    const slotEnd = addMinutes(currentTime, BUSINESS_HOURS.consultationDuration)
    
    slots.push({
      start: format(currentTime, 'HH:mm'),
      end: format(slotEnd, 'HH:mm'),
      available: isAvailableTime(currentTime) && !isBreakTime(currentTime)
    })
    
    currentTime = slotEnd
  }
  
  return slots
}
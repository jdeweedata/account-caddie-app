import { NextRequest, NextResponse } from 'next/server'
import { getZohoToken } from '@/lib/zoho/auth'
import { ZOHO_CONFIG } from '@/lib/zoho/config'
import { addMinutes, format, parse } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    const accessToken = await getZohoToken()
    if (!accessToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get events for the day
    const response = await fetch(
      `${ZOHO_CONFIG.calendarApiDomain}/api/v1/calendars/${ZOHO_CONFIG.calendarId}/events?date=${date}`,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch calendar events')
    }

    const events = await response.json()

    // Generate 30-minute slots for business hours (9 AM to 5 PM)
    const businessHours = {
      start: 9,
      end: 17
    }

    const slots = []
    let currentTime = parse('09:00', 'HH:mm', new Date())
    const endTime = parse('17:00', 'HH:mm', new Date())

    while (currentTime < endTime) {
      const slotStart = format(currentTime, 'HH:mm:ss')
      const slotEnd = format(addMinutes(currentTime, 30), 'HH:mm:ss')
      
      // Check if slot conflicts with any existing events
      const isAvailable = !events.data.some((event: any) => {
        const eventStart = new Date(event.start_datetime)
        const eventEnd = new Date(event.end_datetime)
        const slotStartDate = new Date(`${date}T${slotStart}`)
        const slotEndDate = new Date(`${date}T${slotEnd}`)
        
        return (
          (slotStartDate >= eventStart && slotStartDate < eventEnd) ||
          (slotEndDate > eventStart && slotEndDate <= eventEnd)
        )
      })

      slots.push({
        startTime: slotStart,
        endTime: slotEnd,
        available: isAvailable
      })

      currentTime = addMinutes(currentTime, 30)
    }

    return NextResponse.json({
      success: true,
      slots
    })

  } catch (error) {
    console.error('Error fetching slots:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch available slots'
    }, { status: 500 })
  }
} 
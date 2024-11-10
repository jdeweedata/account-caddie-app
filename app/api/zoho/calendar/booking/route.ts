import { NextRequest, NextResponse } from 'next/server'
import { ZOHO_CONFIG } from '@/lib/zoho/config'
import { getZohoToken } from '@/lib/zoho/auth'
import { addHours, format } from 'date-fns'

export async function POST(request: NextRequest) {
  try {
    const accessToken = await getZohoToken()
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }

    const { title, startTime, endTime, attendees, timezone } = await request.json()

    const response = await fetch(
      `${ZOHO_CONFIG.calendarApiDomain}/api/v1/calendars/${ZOHO_CONFIG.calendarId}/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          start_datetime: startTime,
          end_datetime: endTime || format(addHours(new Date(startTime), 1), "yyyy-MM-dd'T'HH:mm:ss"),
          attendees: attendees?.map((email: string) => ({ email })) || [],
          timezone: timezone || ZOHO_CONFIG.timezone,
          location: 'Online Meeting'
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Calendar Error:', errorData)
      throw new Error(errorData.message || 'Failed to create booking')
    }

    const result = await response.json()
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create booking'
    }, { status: 500 })
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { getZohoToken } from '@/lib/zoho/auth'

export async function GET(req: NextRequest) {
  try {
    const accessToken = await getZohoToken()
    
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token available' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN}/api/v1/calendars/${process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ID}/events?range={"start":"${startDate}","end":"${endDate}"}`, 
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`
        }
      }
    )

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching calendar availability:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
} 
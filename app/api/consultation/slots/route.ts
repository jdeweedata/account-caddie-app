import { NextResponse } from 'next/server'
import { ZohoCalendar } from '@/lib/zoho/calendar'
import { APIError } from '@/lib/error-handler'
import { format, isValid } from 'date-fns'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date')

    if (!dateStr) {
      return NextResponse.json({
        success: false,
        error: 'Date parameter is required'
      }, { status: 400 })
    }

    const date = new Date(dateStr)
    if (!isValid(date)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid date format'
      }, { status: 400 })
    }

    const calendar = new ZohoCalendar()
    const slots = await calendar.getAvailableSlots(format(date, 'yyyy-MM-dd'))

    return NextResponse.json({
      success: true,
      data: slots
    })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof APIError ? error.message : 'Failed to fetch available slots'
    }, { status: error instanceof APIError ? error.status : 500 })
  }
}
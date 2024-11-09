'use client'

import { NextResponse } from 'next/server'
import { ZohoCalendar } from '@/lib/zoho/calendar'
import { ZohoClient } from '@/lib/zoho/client'

export async function POST(req: Request) {
  try {
    const { eventId, leadId } = await req.json()

    if (!eventId || !leadId) {
      return NextResponse.json({
        success: false,
        error: 'Event ID and Lead ID are required'
      }, {
        status: 400
      })
    }

    const calendar = new ZohoCalendar()
    const client = new ZohoClient()

    // Cancel the calendar event
    await calendar.cancelConsultation(eventId)

    // Update lead status in CRM
    await client.updateLead(leadId, {
      Consultation_DateTime: null,
      Status: 'Consultation Cancelled'
    })

    return NextResponse.json({
      success: true,
      message: 'Consultation cancelled successfully'
    })
  } catch (error) {
    console.error('Error cancelling consultation:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel consultation'
    }, {
      status: 500
    })
  }
}
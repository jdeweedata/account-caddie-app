'use client'

import { NextResponse } from 'next/server'
import { ZohoCalendar } from '@/lib/zoho/calendar'
import { ZohoClient } from '@/lib/zoho/client'

interface RescheduleRequest {
  leadId: string
  oldEventId: string
  newDateTime: string
  email: string
}

export async function POST(req: Request) {
  try {
    const { leadId, oldEventId, newDateTime, email } = await req.json() as RescheduleRequest

    if (!leadId || !oldEventId || !newDateTime || !email) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, {
        status: 400
      })
    }

    const calendar = new ZohoCalendar()
    const client = new ZohoClient()

    // Cancel old event
    await calendar.cancelConsultation(oldEventId)

    // Schedule new event
    const newEvent = await calendar.scheduleConsultation(
      leadId,
      new Date(newDateTime),
      email
    )

    // Update lead in CRM
    await client.updateLead(leadId, {
      Consultation_DateTime: newDateTime
    })

    return NextResponse.json({
      success: true,
      data: {
        eventId: newEvent.id,
        consultationDateTime: newDateTime
      }
    })
  } catch (error) {
    console.error('Error rescheduling consultation:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reschedule consultation'
    }, {
      status: 500
    })
  }
}
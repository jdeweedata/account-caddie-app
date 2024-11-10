import { NextRequest, NextResponse } from 'next/server'
import { getZohoToken } from '@/lib/zoho/auth'
import { ZOHO_CONFIG } from '@/lib/zoho/config'
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

    const data = await request.json()

    // 1. Create Lead in CRM
    const leadResponse = await fetch(
      `${ZOHO_CONFIG.apiDomain}/crm/v2/Leads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [{
            First_Name: data.firstName,
            Last_Name: data.lastName,
            Email: data.email,
            Phone: data.phone,
            Company: data.companyName || 'Not Provided',
            Lead_Status: 'Consultation Scheduled',
            Description: data.notes || '',
            Consultation_DateTime: data.dateTime,
            $process_flow: true,
            $workflow_rules: [
              {
                name: 'schedule_consultation',
                data: {
                  consultation_date: data.dateTime,
                  attendee_email: data.email
                }
              }
            ]
          }]
        })
      }
    )

    if (!leadResponse.ok) {
      const error = await leadResponse.json()
      throw new Error(error.message || 'Failed to create lead')
    }

    const result = await leadResponse.json()

    return NextResponse.json({
      success: true,
      data: {
        leadId: result.data[0].id,
        consultationDateTime: data.dateTime
      }
    })

  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create booking'
    }, { status: 500 })
  }
} 
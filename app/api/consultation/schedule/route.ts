import { NextRequest, NextResponse } from 'next/server'
import { getZohoToken } from '@/lib/zoho/auth'
import { ZOHO_CONFIG } from '@/lib/zoho/config'
import { addHours, format } from 'date-fns'

export async function POST(req: NextRequest) {
  try {
    const accessToken = await getZohoToken()

    if (!accessToken) {
      return NextResponse.json({ 
        success: false,
        error: 'Authentication required',
        requiresAuth: true
      }, { status: 401 })
    }

    const { formData, consultationDateTime } = await req.json()

    // 1. Create Lead in CRM
    const leadResponse = await fetch(`${ZOHO_CONFIG.apiDomain}/crm/v2/Leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [{
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email: formData.email,
          Phone: formData.phone,
          Lead_Status: 'Consultation Scheduled',
          Description: formData.businessDescription || '',
          Industry: formData.industry || '',
          Annual_Revenue: formData.annualRevenue || '',
          Consultation_DateTime: consultationDateTime
        }]
      })
    })

    if (!leadResponse.ok) {
      throw new Error('Failed to create lead in CRM')
    }

    const leadData = await leadResponse.json()
    const leadId = leadData.data[0].id

    // 2. Schedule Consultation in Calendar
    const startTime = new Date(consultationDateTime)
    const endTime = addHours(startTime, 1) // 1 hour consultation

    const eventResponse = await fetch(
      `${ZOHO_CONFIG.calendarApiDomain}/api/v1/calendars/${ZOHO_CONFIG.calendarId}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `Business Assessment Consultation - ${formData.firstName} ${formData.lastName}`,
          start_datetime: format(startTime, "yyyy-MM-dd'T'HH:mm:ss"),
          end_datetime: format(endTime, "yyyy-MM-dd'T'HH:mm:ss"),
          attendees: [{ email: formData.email }],
          description: `Lead ID: ${leadId}\nBusiness: ${formData.businessDescription}\nIndustry: ${formData.industry}`,
          location: "Online Meeting",
          timezone: ZOHO_CONFIG.timezone
        })
      }
    )

    if (!eventResponse.ok) {
      throw new Error('Failed to schedule consultation')
    }

    const eventData = await eventResponse.json()

    return NextResponse.json({
      success: true,
      data: {
        leadId,
        eventId: eventData.id,
        consultationDateTime
      }
    })

  } catch (error) {
    console.error('Consultation scheduling error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to schedule consultation'
    }, { status: 500 })
  }
} 
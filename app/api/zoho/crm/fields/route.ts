import { NextRequest, NextResponse } from 'next/server'
import { getZohoToken } from '@/lib/zoho/auth'
import { ZOHO_CONFIG } from '@/lib/zoho/config'
import { BOOKING_FIELDS } from '@/lib/zoho/fields/config'

export async function POST(request: NextRequest) {
  try {
    const accessToken = await getZohoToken()
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }

    const { fieldGroup } = await request.json()
    const fields = fieldGroup === 'all' 
      ? [...Object.values(BOOKING_FIELDS.CONSULTATION), ...Object.values(BOOKING_FIELDS.BUSINESS)]
      : BOOKING_FIELDS[fieldGroup as keyof typeof BOOKING_FIELDS]

    const response = await fetch(
      `${ZOHO_CONFIG.apiDomain}/crm/v2/settings/fields?module=Leads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create fields')
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Field creation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create fields'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const accessToken = await getZohoToken()
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }

    const response = await fetch(
      `${ZOHO_CONFIG.apiDomain}/crm/v2/settings/fields?module=Leads`,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch fields')
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Field fetch error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch fields'
    }, { status: 500 })
  }
} 
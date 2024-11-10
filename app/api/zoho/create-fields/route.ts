import { NextRequest, NextResponse } from 'next/server'
import { getZohoToken } from '@/lib/zoho/auth'
import { ZOHO_CONFIG } from '@/lib/zoho/config'

export async function POST(request: NextRequest) {
  try {
    const accessToken = await getZohoToken()
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }

    // Create custom fields in Zoho CRM
    const fieldsResponse = await fetch(
      `${ZOHO_CONFIG.apiDomain}/crm/v2/settings/fields?module=Leads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: [
            {
              field_label: 'Consultation DateTime',
              api_name: 'Consultation_DateTime',
              data_type: 'datetime',
              required: false
            },
            {
              field_label: 'Consultation Status',
              api_name: 'Consultation_Status',
              data_type: 'picklist',
              pick_list_values: [
                { display_value: 'Not Requested' },
                { display_value: 'Scheduled' },
                { display_value: 'Completed' },
                { display_value: 'Cancelled' }
              ]
            }
          ]
        })
      }
    )

    if (!fieldsResponse.ok) {
      const error = await fieldsResponse.json()
      throw new Error(error.message || 'Failed to create custom fields')
    }

    return NextResponse.json({
      success: true,
      message: 'Custom fields created successfully'
    })

  } catch (error) {
    console.error('Field creation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create custom fields'
    }, { status: 500 })
  }
} 
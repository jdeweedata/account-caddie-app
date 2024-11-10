import { NextResponse } from 'next/server'
import { ZOHO_CONFIG } from '@/lib/zoho/config'
import { generateTestConsultationData } from '@/lib/zoho/test-utils/consultation'

export async function GET() {
  try {
    // 1. Test environment variables
    const configTest = {
      hasClientId: !!ZOHO_CONFIG.clientId,
      hasClientSecret: !!ZOHO_CONFIG.clientSecret,
      hasRedirectUri: !!ZOHO_CONFIG.redirectUri,
      hasCalendarId: !!ZOHO_CONFIG.calendarId,
      apiDomain: ZOHO_CONFIG.apiDomain,
      calendarApiDomain: process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN
    }

    // 2. Generate test data
    const testData = generateTestConsultationData()

    return NextResponse.json({
      success: true,
      config: configTest,
      testData,
      message: 'Test environment is properly configured'
    })
  } catch (error) {
    console.error('Test setup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Test setup failed'
    }, { status: 500 })
  }
} 
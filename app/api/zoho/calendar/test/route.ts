import { NextResponse } from 'next/server';

const CALENDAR_API_DOMAIN = 'https://calendar.zoho.com/api/v1';

async function getAccessToken() {
  try {
    const response = await fetch('http://localhost:3000/api/zoho/auth/refresh', {
      method: 'POST'
    });
    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to get access token');
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // 1. Get access token
    const accessToken = await getAccessToken();
    console.log('Got access token:', accessToken.substring(0, 10) + '...');

    // 2. Test Calendar API access
    const testResponse = await fetch(`${CALENDAR_API_DOMAIN}/calendars`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const responseText = await testResponse.text();
    console.log('Calendar API Test Response:', {
      status: testResponse.status,
      headers: Object.fromEntries(testResponse.headers.entries()),
      body: responseText
    });

    // 3. Check response
    if (!testResponse.ok) {
      return NextResponse.json({
        success: false,
        error: "Calendar API access failed",
        details: responseText,
        status: testResponse.status,
        scopes_needed: ['ZohoCalendar.events.CREATE']
      }, { status: testResponse.status });
    }

    // 4. Return success response
    return NextResponse.json({
      success: true,
      message: "Calendar API access verified successfully",
      data: JSON.parse(responseText)
    });

  } catch (error) {
    console.error('Calendar API test error:', error);
    return NextResponse.json({
      success: false,
      error: "Calendar API test failed",
      details: error instanceof Error ? error.message : 'Unknown error',
      scopes_needed: ['ZohoCalendar.events.CREATE']
    }, { status: 500 });
  }
} 
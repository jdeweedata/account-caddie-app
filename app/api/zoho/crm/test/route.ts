import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    // Test CRM API access
    const crmResponse = await fetch('https://www.zohoapis.com/crm/v3/info', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!crmResponse.ok) {
      throw new Error(`CRM API error: ${await crmResponse.text()}`);
    }

    const crmData = await crmResponse.json();
    return NextResponse.json(crmData);
  } catch (error) {
    console.error('CRM test error:', error);
    return NextResponse.json(
      { error: 'Failed to test CRM access', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
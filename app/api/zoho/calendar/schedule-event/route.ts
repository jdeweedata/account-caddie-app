import { NextResponse } from 'next/server';

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

export async function POST(req: Request) {
  try {
    const accessToken = await getAccessToken();
    const body = await req.json();
    
    // Convert date and time to Zoho's required format
    const startTime = new Date(`${body.date}T${body.time}`);
    const endTime = new Date(startTime.getTime() + (60 * 60 * 1000)); // 1 hour duration

    const eventData = {
      title: `Consultation - ${body.name}`,
      start_datetime: startTime.toISOString(),
      end_datetime: endTime.toISOString(),
      attendees: [{
        email: body.email,
        name: body.name
      }],
      description: body.reason || 'Consultation',
      location: 'Online Meeting'
    };

    // Create event in Zoho Calendar
    const response = await fetch('https://calendar.zoho.com/api/v1/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: ${await response.text()}`);
    }

    const result = await response.json();
    return NextResponse.json({ success: true, event: result });

  } catch (error) {
    console.error('Schedule event error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to schedule event' 
    }, { status: 500 });
  }
} 
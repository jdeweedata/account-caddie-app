// app/api/consultation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { zohoAuthInstance } from '@/app/api/zoho/auth';  // Updated import path
import { logger } from '@/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const accessToken = await zohoAuthInstance.getAccessToken();

    const availableSlots = [
      { 
        day: 'Monday', 
        timeSlots: ['09h00', '09h30', '10h00'] 
      },
      { 
        day: 'Tuesday', 
        timeSlots: ['09h00', '09h30'] 
      }
    ];

    return NextResponse.json({ success: true, availableSlots });
  } catch (error) {
    logger.error(error instanceof Error ? error : new Error(String(error)), 'ZohoCalendarService.getSlots');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const accessToken = await zohoAuthInstance.getAccessToken();
    const bookingData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN}/api/v1/calendars/${process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ID}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: "Consultation",
          start_time: bookingData.startTime,
          end_time: bookingData.endTime,
          description: "Business Consultation",
          location: "Online",
          timezone: "Africa/Johannesburg",
          attendees_list: [{ email_id: bookingData.email }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to schedule consultation');
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    logger.error(error instanceof Error ? error : new Error(String(error)), 'ZohoCalendarService.scheduleConsultation');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
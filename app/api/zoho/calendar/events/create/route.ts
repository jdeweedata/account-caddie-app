import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createCalendarEvent } from '@/lib/zoho/api/calendar-client';
import type { CreateCalendarEventInput } from '@/lib/zoho/api/calendar-client';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const eventData: CreateCalendarEventInput = await request.json();
    const event = await createCalendarEvent(accessToken, eventData);
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json(
      { error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchCalendarEvents } from '@/lib/zoho/api/calendar-client';

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const events = await fetchCalendarEvents(accessToken);
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
} 
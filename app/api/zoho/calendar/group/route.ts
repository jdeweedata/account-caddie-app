import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getGroupCalendarDetails } from '@/lib/zoho/api/calendar-client';

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const groupCalendar = await getGroupCalendarDetails(accessToken);
    return NextResponse.json(groupCalendar);
  } catch (error) {
    console.error('Error fetching group calendar details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch group calendar details' },
      { status: 500 }
    );
  }
} 
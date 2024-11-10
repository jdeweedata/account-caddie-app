import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchGroupCalendars } from '@/lib/zoho/api/calendar-client';

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const groups = await fetchGroupCalendars(accessToken);
    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching group calendars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch group calendars' },
      { status: 500 }
    );
  }
} 
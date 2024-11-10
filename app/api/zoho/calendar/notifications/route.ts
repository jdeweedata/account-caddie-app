import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getNotificationSettings, updateNotificationSettings } from '@/lib/zoho/api/calendar-client';
import type { ZohoNotificationSettings } from '@/lib/zoho/api/calendar-client';

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const settings = await getNotificationSettings(accessToken);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notification settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const settings: ZohoNotificationSettings = await request.json();
    await updateNotificationSettings(accessToken, settings);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notification settings:', error);
    return NextResponse.json(
      { error: 'Failed to update notification settings' },
      { status: 500 }
    );
  }
} 
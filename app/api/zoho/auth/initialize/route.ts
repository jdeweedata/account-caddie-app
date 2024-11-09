// app/api/zoho/auth/initialize/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const authParams = new URLSearchParams({
      client_id: '1000.PXP5AMIFRUMYFAVRS71QT4QUVE9Q1Z',
      redirect_uri: 'https://stackblitzstarterse5eerq-jy1s--3000--34c588ed.local-credentialless.webcontainer.io/api/zoho/auth/callback',
      response_type: 'code',
      access_type: 'offline',
      scope: 'ZohoCRM.users.ALL,ZohoCRM.org.ALL',
      prompt: 'consent'
    });

    const authUrl = `https://accounts.zoho.com/oauth/v2/auth?${authParams}`;
    console.log('Auth URL:', authUrl);

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate auth URL' }, { status: 500 });
  }
}
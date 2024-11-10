import { NextRequest, NextResponse } from 'next/server';
import { ZOHO_CONFIG } from '@/lib/zoho/config';

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json({
        success: false,
        error: 'No refresh token provided'
      }, { status: 400 });
    }

    const params = new URLSearchParams({
      refresh_token: refresh_token,
      client_id: ZOHO_CONFIG.clientId,
      client_secret: ZOHO_CONFIG.clientSecret,
      grant_type: 'refresh_token'
    });

    const response = await fetch(
      `${ZOHO_CONFIG.authDomain}/oauth/v2/token?${params}`,
      { method: 'POST' }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to refresh token');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      access_token: data.access_token,
      expires_in: data.expires_in
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to refresh token'
    }, { status: 500 });
  }
}

export const GET = POST; 
import { NextRequest, NextResponse } from 'next/server';
import { ZohoAuth } from '@/lib/zoho/auth';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const { endpoint, method = 'GET', data } = await req.json();
    const auth = ZohoAuth.getInstance();
    const token = await auth.getAccessToken();

    if (!token) {
      throw new Error('Failed to get access token');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_ZOHO_API_DOMAIN}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.error(new Error(errorData.message || 'API request failed'), 'ZohoClientAPI');
      return NextResponse.json(errorData, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    logger.error(error, 'ZohoClientAPI');
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
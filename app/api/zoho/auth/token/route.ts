import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const { grant_type, refresh_token, code } = await req.json();

    const params = new URLSearchParams({
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      redirect_uri: process.env.ZOHO_REDIRECT_URI!,
    });

    // Add appropriate parameters based on grant type
    if (grant_type === 'authorization_code' && code) {
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
    } else if (grant_type === 'refresh_token' && refresh_token) {
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', refresh_token);
    } else {
      params.append('grant_type', 'client_credentials');
      params.append('scope', process.env.ZOHO_API_SCOPES!);
    }

    const response = await fetch(`${process.env.ZOHO_AUTH_DOMAIN}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      logger.error(new Error(data.error || 'Token request failed'), 'ZohoAuthAPI');
      return NextResponse.json(
        { error: data.error || 'Failed to obtain token' },
        { status: response.status }
      );
    }

    // Log successful token retrieval for debugging purposes
    logger.info('Successfully obtained Zoho access token');

    return NextResponse.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
      refresh_token: data.refresh_token,
    });
  } catch (error) {
    // Cast error to Error type for logging
    const err = error as Error;
    
    // Log any unexpected errors that occur during the process
    logger.error(err.message, 'ZohoAuthAPI');
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
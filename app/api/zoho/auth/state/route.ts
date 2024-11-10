import { NextResponse } from 'next/server';
import { getServerAuthTokens } from '@/lib/zoho/auth-server';

export async function GET() {
  const tokens = getServerAuthTokens();
  
  return NextResponse.json({
    isAuthenticated: !!tokens.refreshToken,
    tokens
  });
} 
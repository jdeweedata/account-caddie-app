import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    accessToken: process.env.ZOHO_ACCESS_TOKEN || null
  });
} 
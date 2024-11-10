import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function bookingMiddleware(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const leadId = searchParams.get('leadId')
  const score = searchParams.get('score')

  // If accessing booking page without required params, redirect to assessment
  if (request.nextUrl.pathname.startsWith('/booking') && (!leadId || !score)) {
    return NextResponse.redirect(new URL('/assessment', request.url))
  }

  return NextResponse.next()
} 
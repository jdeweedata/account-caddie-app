import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { corsMiddleware } from './middleware/cors'
import { bookingMiddleware } from './middleware/booking'

export async function middleware(request: NextRequest) {
  // Apply CORS middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return corsMiddleware(request)
  }

  // Apply booking protection middleware
  if (request.nextUrl.pathname.startsWith('/booking')) {
    return bookingMiddleware(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/booking/:path*'
  ]
} 
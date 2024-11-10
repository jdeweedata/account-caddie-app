import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', // For testing
  process.env.NEXT_PUBLIC_APP_URL,
  'https://accountcaddie.com' // Your production domain
].filter(Boolean) as string[]

export function corsMiddleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin')
  
  // If no origin or origin is allowed, proceed
  if (!origin || allowedOrigins.includes(origin)) {
    const response = NextResponse.next()
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', origin || '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Max-Age', '86400') // 24 hours
    
    return response
  }
  
  // If origin is not allowed, return 403
  return new NextResponse(null, {
    status: 403,
    statusText: 'Forbidden',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
} 
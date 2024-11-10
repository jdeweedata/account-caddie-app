import { NextResponse } from 'next/server'
import { ZOHO_CONFIG } from '@/lib/zoho/config'
import { zohoAuthInstance } from '@/lib/zoho/auth'

export async function GET() {
  try {
    // Initialize auth first
    const isInitialized = await zohoAuthInstance.initialize()
    
    if (!isInitialized) {
      return NextResponse.json({
        success: false,
        error: 'Failed to initialize authentication',
        requiresAuth: true
      }, { status: 401 })
    }

    const accessToken = await zohoAuthInstance.getAccessToken()
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'No access token available',
        requiresAuth: true
      }, { status: 401 })
    }

    // Test the token with a simple API call
    const response = await fetch(`${ZOHO_CONFIG.apiDomain}/crm/v2/users`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to validate access token')
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      tokenStatus: {
        hasAccessToken: true,
        tokenType: 'Zoho-oauthtoken'
      }
    })

  } catch (error) {
    console.error('Auth test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Authentication test failed',
      requiresAuth: true
    }, { status: 401 })
  }
} 
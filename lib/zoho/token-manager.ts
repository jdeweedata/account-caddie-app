import { APIError } from '@/lib/error-handler'
import { ZOHO_CONFIG } from './config'

interface TokenData {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  api_domain?: string
}

export class TokenManager {
  private static instance: TokenManager
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private tokenExpiry: number = 0

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager()
    }
    return TokenManager.instance
  }

  async getAccessToken(): Promise<string> {
    if (this.isTokenValid()) {
      return this.accessToken!
    }

    if (this.refreshToken) {
      return this.refreshAccessToken()
    }

    return this.generateNewToken()
  }

  private async generateNewToken(): Promise<string> {
    try {
      const response = await fetch(`${ZOHO_CONFIG.authDomain}/oauth/v2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Connection': 'keep-alive'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: ZOHO_CONFIG.clientId!,
          client_secret: ZOHO_CONFIG.clientSecret!,
          scope: ZOHO_CONFIG.scope
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new APIError(
          error.message || 'Failed to generate token',
          response.status,
          error.code
        )
      }

      const data = await response.json()
      this.setTokens(data)
      return this.accessToken!
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Failed to generate token', 500)
    }
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await fetch(`${ZOHO_CONFIG.authDomain}/oauth/v2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Connection': 'keep-alive'
        },
        body: new URLSearchParams({
          refresh_token: this.refreshToken!,
          grant_type: 'refresh_token',
          client_id: ZOHO_CONFIG.clientId!,
          client_secret: ZOHO_CONFIG.clientSecret!,
          scope: ZOHO_CONFIG.scope
        })
      })

      if (!response.ok) {
        // If refresh fails, try getting a new token
        return this.generateNewToken()
      }

      const data = await response.json()
      
      if (data.error) {
        return this.generateNewToken()
      }

      this.setTokens(data)
      return this.accessToken!
    } catch (error) {
      // If refresh fails for any reason, try getting a new token
      return this.generateNewToken()
    }
  }

  setTokens(data: TokenData): void {
    this.accessToken = data.access_token
    if (data.refresh_token) {
      this.refreshToken = data.refresh_token
    }
    this.tokenExpiry = Date.now() + (data.expires_in * 1000)
  }

  private isTokenValid(): boolean {
    if (!this.accessToken || !this.tokenExpiry) {
      return false
    }

    // Add 5-minute buffer before expiry
    const bufferTime = 5 * 60 * 1000
    return Date.now() < (this.tokenExpiry - bufferTime)
  }

  clearTokens(): void {
    this.accessToken = null
    this.refreshToken = null
    this.tokenExpiry = 0
  }
}
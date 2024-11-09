import { ZOHO_CONFIG } from './config';
import { logger } from '@/lib/logger';
import { APIError } from '@/lib/error-handler';

export class ZohoAuth {
  private static instance: ZohoAuth;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number = 0;

  private constructor() {
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN || null;
  }

  static getInstance(): ZohoAuth {
    if (!ZohoAuth.instance) {
      ZohoAuth.instance = new ZohoAuth();
    }
    return ZohoAuth.instance;
  }

  async getAccessToken(): Promise<string> {
    try {
      if (this.isTokenValid()) {
        return this.accessToken!;
      }

      if (this.refreshToken) {
        try {
          return await this.refreshAccessToken();
        } catch (error) {
          logger.error(error, 'ZohoAuth.refreshAccessToken');
          // If refresh fails, try generating new token
          return await this.generateNewToken();
        }
      }

      return await this.generateNewToken();
    } catch (error) {
      logger.error(error, 'ZohoAuth.getAccessToken');
      throw new APIError('Failed to obtain access token', 500);
    }
  }

  private async generateNewToken(): Promise<string> {
    try {
      const response = await fetch('/api/zoho/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new APIError(error.error || 'Failed to generate token', response.status);
      }

      const data = await response.json();
      this.setTokens(data);
      return this.accessToken!;
    } catch (error) {
      logger.error(error, 'ZohoAuth.generateNewToken');
      throw new APIError('Failed to generate new token', 500);
    }
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await fetch('/api/zoho/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        }),
      });

      if (!response.ok) {
        throw new APIError('Failed to refresh token', response.status);
      }

      const data = await response.json();
      this.setTokens(data);
      return this.accessToken!;
    } catch (error) {
      logger.error(error, 'ZohoAuth.refreshAccessToken');
      throw error;
    }
  }

  private setTokens(data: any): void {
    this.accessToken = data.access_token;
    if (data.refresh_token) {
      this.refreshToken = data.refresh_token;
    }
    this.tokenExpiry = Date.now() + ((data.expires_in - 300) * 1000); // 5 minute buffer
  }

  private isTokenValid(): boolean {
    return !!(this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry);
  }

  async getAuthHeaders(): Promise<Headers> {
    const token = await this.getAccessToken();
    return new Headers({
      'Authorization': `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
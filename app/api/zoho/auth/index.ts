// app/api/zoho/auth/index.ts
class ZohoAuth {
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;
  
    async getAccessToken(): Promise<string> {
      try {
        // Check if we have a valid cached token
        if (this.accessToken && Date.now() < this.tokenExpiry) {
          return this.accessToken;
        }
  
        // Get new token
        const response = await fetch(`${process.env.ZOHO_AUTH_DOMAIN}/oauth/v2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.ZOHO_CLIENT_ID!,
            client_secret: process.env.ZOHO_CLIENT_SECRET!,
            grant_type: 'client_credentials',
            scope: 'ZohoCRM.modules.leads.CREATE,ZohoCRM.settings.ALL'
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to obtain access token from Zoho');
        }
  
        const data = await response.json();
  
        if (!data.access_token) {
          throw new Error('No access token received from Zoho');
        }
  
        // Store the new token with type assertion
        const newToken: string = data.access_token;
        this.accessToken = newToken;
        this.tokenExpiry = Date.now() + ((data.expires_in || 3600) * 1000);
  
        return newToken;
      } catch (error) {
        // Always throw an error instead of returning null
        throw new Error(error instanceof Error ? error.message : 'Failed to authenticate with Zoho CRM');
      }
    }
  }
  
  export const zohoAuthInstance = new ZohoAuth();
export const ZOHO_CONFIG = {
  // API Configuration
  clientId: process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_ZOHO_REDIRECT_URI,
  apiDomain: process.env.NEXT_PUBLIC_ZOHO_API_DOMAIN,
  authDomain: process.env.NEXT_PUBLIC_ZOHO_AUTH_DOMAIN,
  
  // Business Hours Configuration
  businessHours: {
    consultationDays: [1, 2, 4], // Monday, Tuesday, Thursday
    startTime: '09:00',
    endTime: '16:00',
    slotDuration: 30, // minutes
    bufferTime: 15, // minutes for potential overrun
  },
  
  // API Scopes
  scopes: [
    'ZohoCRM.modules.ALL',
    'ZohoCalendar.event.ALL',
    'ZohoCRM.settings.ALL'
  ].join(','),
  
  // API Versions
  version: 'v2',
  
  // Endpoints
  endpoints: {
    token: '/oauth/v2/token',
    auth: '/oauth/v2/auth',
    calendar: '/calendar/v1',
    crm: '/crm/v2'
  }
}
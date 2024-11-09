// config/zohoFlowConfig.ts
export const flowConnection = {
  clientId: process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_ZOHO_REDIRECT_URI,
  scopes: [
    "ZohoCalendar.calendar.ALL",
    "ZohoCRM.modules.ALL",
    "ZohoMail.messages.ALL"
  ]
}
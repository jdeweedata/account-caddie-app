import { ZOHO_CONFIG } from './config'

export async function validateZohoConfig() {
  const missingConfigs: string[] = []

  const requiredConfigs = {
    'Client ID': ZOHO_CONFIG.clientId,
    'Client Secret': ZOHO_CONFIG.clientSecret,
    'Redirect URI': ZOHO_CONFIG.redirectUri,
    'API Domain': ZOHO_CONFIG.apiDomain,
    'Auth Domain': ZOHO_CONFIG.authDomain,
    'Calendar ID': ZOHO_CONFIG.calendarId,
  }

  Object.entries(requiredConfigs).forEach(([key, value]) => {
    if (!value) {
      missingConfigs.push(key)
    }
  })

  return {
    isValid: missingConfigs.length === 0,
    missingConfigs,
  }
}

export function generateTestLead() {
  return {
    Company: 'Test Company',
    Email: 'test@example.com',
    Phone: '+27123456789',
    PI_Score: 85,
    Package_Selected: 'Core Package',
    Employee_Count: 10,
    Annual_Turnover: 1000000,
    Additional_Services: 'Payroll;Debtors Management'
  }
}

export function generateTestEvent() {
  const startTime = new Date()
  startTime.setHours(startTime.getHours() + 1)
  
  const endTime = new Date(startTime)
  endTime.setMinutes(endTime.getMinutes() + 30)

  return {
    title: 'Test Consultation',
    start_datetime: startTime.toISOString(),
    end_datetime: endTime.toISOString(),
    participants: [{ email: 'test@example.com' }],
    reminder: { minutes: 15 }
  }
}
import { format, addDays } from 'date-fns'

export interface TestConsultationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessDescription: string
  industry: string
  annualRevenue: string
  consultationDateTime: string
}

export function generateTestConsultationData(): TestConsultationData {
  const tomorrow = addDays(new Date(), 1)
  const consultationTime = '10:00:00'
  
  return {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+27123456789',
    businessDescription: 'Test Business Description',
    industry: 'Technology',
    annualRevenue: '1000000',
    consultationDateTime: `${format(tomorrow, 'yyyy-MM-dd')}T${consultationTime}`
  }
}

export async function testZohoAuth() {
  try {
    const response = await fetch('/api/zoho/auth/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          requiresAuth: true,
          error: result.error || 'Authentication required'
        }
      }
      throw new Error(result.error || 'Auth test failed')
    }
    
    return result
  } catch (error) {
    console.error('Auth test error:', error)
    throw error
  }
}

export async function testConsultationBooking(data: TestConsultationData) {
  try {
    const response = await fetch('/api/consultation/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formData: data,
        consultationDateTime: data.consultationDateTime
      })
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Booking test failed')
    }

    return result
  } catch (error) {
    console.error('Booking test error:', error)
    throw error
  }
} 
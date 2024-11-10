import { generateTestConsultationData } from '@/lib/zoho/test-utils/consultation'
import '@testing-library/jest-dom'

describe('Zoho Consultation Integration', () => {
  test('generates valid test data', () => {
    const testData = generateTestConsultationData()
    
    expect(testData).toHaveProperty('firstName')
    expect(testData).toHaveProperty('lastName')
    expect(testData).toHaveProperty('email')
    expect(testData).toHaveProperty('consultationDateTime')
    
    const dateTime = new Date(testData.consultationDateTime)
    expect(dateTime).toBeInstanceOf(Date)
    expect(dateTime.getTime()).toBeGreaterThan(Date.now())
  })
}) 
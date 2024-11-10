import { NextRequest, NextResponse } from 'next/server'
import { getZohoToken } from '@/lib/zoho/auth'
import { ZOHO_CONFIG } from '@/lib/zoho/config'

export async function POST(request: NextRequest) {
  try {
    const accessToken = await getZohoToken()
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }

    const data = await request.json()
    const { businessProfile, operationalScale, serviceRequirements, piScore } = data

    // 1. Create lead in Zoho CRM
    const leadResponse = await fetch(
      `${ZOHO_CONFIG.apiDomain}/crm/v2/Leads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [{
            First_Name: businessProfile.firstName,
            Last_Name: businessProfile.lastName,
            Email: businessProfile.email,
            Phone: businessProfile.phone,
            Company: businessProfile.companyName,
            Industry: businessProfile.industry,
            Annual_Revenue: operationalScale.annualRevenue,
            No_of_Employees: operationalScale.employeeCount,
            Description: `Package Selected: ${serviceRequirements.package}\nAdditional Services: ${serviceRequirements.additionalServices.join(', ')}`,
            Lead_Source: 'Business Assessment',
            Lead_Status: 'Assessment Completed',
            PI_Score: piScore,
            Package_Selected: serviceRequirements.package,
            Additional_Services: serviceRequirements.additionalServices.join(';'),
            Assessment_Date: new Date().toISOString()
          }]
        })
      }
    )

    if (!leadResponse.ok) {
      const error = await leadResponse.json()
      throw new Error(error.message || 'Failed to create lead')
    }

    const result = await leadResponse.json()
    const leadId = result.data[0].id

    // 2. Create assessment record
    const assessmentResponse = await fetch(
      `${ZOHO_CONFIG.apiDomain}/crm/v2/Business_Assessments`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [{
            Name: `Assessment for ${businessProfile.companyName}`,
            Lead: leadId,
            PI_Score: piScore,
            Employee_Count: operationalScale.employeeCount,
            Annual_Revenue: operationalScale.annualRevenue,
            Current_Accounting: operationalScale.currentAccounting,
            Package_Selected: serviceRequirements.package,
            Additional_Services: serviceRequirements.additionalServices.join(';'),
            Assessment_Date: new Date().toISOString(),
            Status: 'Completed'
          }]
        })
      }
    )

    if (!assessmentResponse.ok) {
      const error = await assessmentResponse.json()
      throw new Error(error.message || 'Failed to create assessment record')
    }

    const assessmentResult = await assessmentResponse.json()

    return NextResponse.json({
      success: true,
      data: {
        leadId,
        assessmentId: assessmentResult.data[0].id,
        piScore
      }
    })

  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit assessment'
    }, { status: 500 })
  }
} 
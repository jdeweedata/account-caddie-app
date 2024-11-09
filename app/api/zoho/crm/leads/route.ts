// app/api/zoho/crm/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { zohoAuthInstance } from '@/app/api/zoho/auth';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    // Get access token
    const accessToken = await zohoAuthInstance.getAccessToken();
    
    // Get form data
    const formData = await req.json();

    // Transform form data to Zoho CRM lead format
    const leadData = {
      data: [{
        Last_Name: `${formData.businessProfile.firstName} ${formData.businessProfile.lastName}`,
        First_Name: formData.businessProfile.firstName,
        Company: formData.businessProfile.companyName,
        Email: formData.businessProfile.email,
        Phone: formData.businessProfile.phone,
        Industry: formData.businessProfile.industry,
        Title: formData.businessProfile.title,
        Secondary_Email: formData.businessProfile.secondaryEmail,
        Mobile: formData.businessProfile.mobile,
        Website: formData.businessProfile.website,
        Skype_ID: formData.businessProfile.skypeId,
        Twitter: formData.businessProfile.twitter,
        Lead_Source: formData.serviceRequirements.leadSource,
        Lead_Status: formData.serviceRequirements.leadStatus,
        Rating: formData.serviceRequirements.rating,
        Email_Opt_Out: formData.emailOptOut,
        No_of_Employees: formData.operationalScale.employeeCount,
        Annual_Revenue: formData.operationalScale.annualRevenue
      }]
    };

    // Create lead in Zoho CRM
    const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData)
    });

    const result = await response.json();

    if (!response.ok) {
      logger.error(new Error(result.message || 'Failed to create lead in Zoho CRM'), 'ZohoCRM.createLead');
      return NextResponse.json(
        { error: result.message || 'Failed to create lead in Zoho CRM' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create lead';
    logger.error(new Error(errorMessage), 'ZohoCRM.createLead');
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
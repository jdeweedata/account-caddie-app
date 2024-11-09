// lib/zoho/api/client.ts

import { ZOHO_CONFIG } from '../config';
import { PIScoreFormData } from '@/components/PIScoreWizard/types';
import { ZohoLead, ZohoAPIResponse } from '../types';
import { ZohoAuth } from '../auth';
import { APIError } from '@/lib/error-handler';

export class ZohoClient {
  private static instance: ZohoClient;
  private auth = ZohoAuth.getInstance();
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${ZOHO_CONFIG.apiDomain}/crm/${ZOHO_CONFIG.version}`;
  }

  public static getInstance(): ZohoClient {
    if (!ZohoClient.instance) {
      ZohoClient.instance = new ZohoClient();
    }
    return ZohoClient.instance;
  }

  async createLead(
    formData: PIScoreFormData, 
    consultationDateTime?: string
  ): Promise<ZohoAPIResponse<ZohoLead>> {
    try {
      const headers = await this.auth.getAuthHeaders();
      
      const leadData: ZohoLead = {
        First_Name: formData.businessProfile.firstName,
        Last_Name: formData.businessProfile.lastName,
        Email: formData.businessProfile.email,
        Secondary_Email: formData.businessProfile.secondaryEmail,
        Phone: formData.businessProfile.phone,
        Mobile: formData.businessProfile.mobile,
        Company: formData.businessProfile.companyName,
        Website: formData.businessProfile.website,
        Industry: formData.businessProfile.industry,
        Lead_Source: "Website",
        Lead_Status: "New",
        No_of_Employees: formData.operationalScale.employeeCount,
        Annual_Revenue: formData.operationalScale.annualTurnover,
        PI_Score: this.calculatePIScore(formData),
        Package: this.determinePackage(formData),
        Additional_Services: this.getAdditionalServices(formData),
        Employee_Count: formData.operationalScale.payrollSize,
        Annual_Turnover: formData.operationalScale.annualTurnover,
        ConsultationDate: consultationDateTime,
        Email_Opt_Out: false,
        Rating: this.calculateRating(formData)
      };

      const response = await fetch(`${this.baseUrl}/Leads`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [leadData],
          trigger: ["workflow"]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new APIError(
          errorData.message || 'Failed to create lead',
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Lead creation error:', error);
      throw error instanceof APIError ? error : new APIError('Failed to create lead', 500);
    }
  }

  private calculatePIScore(formData: PIScoreFormData): number {
    // Implement scoring logic based on form responses
    return 0; // Replace with actual calculation
  }

  private calculateRating(formData: PIScoreFormData): string {
    // Implement rating logic based on PI Score
    const score = this.calculatePIScore(formData);
    if (score >= 80) return 'Hot';
    if (score >= 60) return 'Warm';
    return 'Cold';
  }

  private determinePackage(formData: PIScoreFormData): string {
    // Implement package determination logic
    return 'Standard'; // Replace with actual logic
  }

  private getAdditionalServices(formData: PIScoreFormData): string {
    // Convert selected services to comma-separated string
    return formData.serviceRequirements.selectedServices.join(', ');
  }
}

// Update the types.ts file with the new interface:
export interface ZohoLead {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Secondary_Email?: string;
  Phone: string;
  Mobile?: string;
  Company: string;
  Website?: string;
  Industry: string;
  Lead_Source: string;
  Lead_Status: string;
  No_of_Employees?: number;
  Annual_Revenue?: number;
  PI_Score: number;
  Package: string;
  Additional_Services: string;
  Employee_Count: number;
  Annual_Turnover?: number;
  ConsultationDate?: string;
  Email_Opt_Out: boolean;
  Rating?: string;
}
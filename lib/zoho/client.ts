import { APIError } from '@/lib/error-handler';
import { logger } from '@/lib/logger';
import { PIScoreFormData } from '@/components/PIScoreWizard/types';
import { ZohoAuth } from './auth';

export class ZohoClient {
  private static instance: ZohoClient;
  private auth: ZohoAuth;

  private constructor() {
    this.auth = ZohoAuth.getInstance();
  }

  static getInstance(): ZohoClient {
    if (!ZohoClient.instance) {
      ZohoClient.instance = new ZohoClient();
    }
    return ZohoClient.instance;
  }

  async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
    try {
      const headers = await this.auth.getAuthHeaders();
      const response = await fetch(`${process.env.ZOHO_API_DOMAIN}${endpoint}`, {
        method,
        headers,
        ...(data && { body: JSON.stringify(data) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new APIError(
          errorData.message || 'API request failed',
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      logger.error(error, 'ZohoClient.makeRequest');
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Failed to make API request', 500);
    }
  }

  async createLead(formData: PIScoreFormData, consultationDateTime?: string) {
    try {
      const leadData = {
        data: [{
          First_Name: formData.businessProfile.firstName,
          Last_Name: formData.businessProfile.lastName,
          Company: formData.businessProfile.companyName,
          Email: formData.businessProfile.email,
          Phone: formData.businessProfile.phone,
          Industry: formData.businessProfile.industry,
          Annual_Revenue: formData.operationalScale.annualRevenue,
          No_of_Employees: formData.operationalScale.employeeCount,
          Lead_Source: 'Website',
          Description: `Package: ${formData.serviceRequirements.package}\nAdditional Services: ${formData.serviceRequirements.additionalServices.join(', ')}`,
          Consultation_DateTime: consultationDateTime,
        }],
        trigger: ['workflow'],
      };

      const response = await this.makeRequest('/crm/v2/Leads', 'POST', leadData);
      return response.data[0];
    } catch (error) {
      logger.error(error, 'ZohoClient.createLead');
      throw error instanceof APIError ? error : new APIError('Failed to create lead', 500);
    }
  }

  async updateLead(leadId: string, data: any) {
    try {
      return await this.makeRequest(`/crm/v2/Leads/${leadId}`, 'PUT', {
        data: [data],
      });
    } catch (error) {
      logger.error(error, 'ZohoClient.updateLead');
      throw error instanceof APIError ? error : new APIError('Failed to update lead', 500);
    }
  }

  async deleteLead(leadId: string) {
    try {
      return await this.makeRequest(`/crm/v2/Leads/${leadId}`, 'DELETE');
    } catch (error) {
      logger.error(error, 'ZohoClient.deleteLead');
      throw error instanceof APIError ? error : new APIError('Failed to delete lead', 500);
    }
  }
}
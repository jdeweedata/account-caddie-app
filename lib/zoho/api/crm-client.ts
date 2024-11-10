import { AuthTokens } from '../auth-types';
import { refreshZohoToken } from '../auth';

export interface ZohoCRMResponse<T> {
  data: T[];
  info?: {
    count: number;
    more_records: boolean;
    page: number;
    per_page: number;
  };
}

export interface ZohoContact {
  id: string;
  Email: string;
  Full_Name: string;
  First_Name?: string;
  Last_Name?: string;
  Phone?: string;
  Created_Time?: string;
  Title?: string;
  Department?: string;
  Lead_Source?: string;
  Mobile?: string;
}

export interface CreateContactInput {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone?: string;
  Mobile?: string;
  Title?: string;
  Department?: string;
  Lead_Source?: string;
}

export interface ContactsQueryParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
}

export async function fetchCRMContacts(params: ContactsQueryParams = {}): Promise<ZohoCRMResponse<ZohoContact>> {
  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    try {
      const accessToken = process.env.ZOHO_ACCESS_TOKEN;
      const apiDomain = process.env.ZOHO_API_DOMAIN;
      const apiVersion = process.env.ZOHO_CRM_API_VERSION;

      if (!accessToken || !apiDomain || !apiVersion) {
        throw new Error('Missing required environment variables for CRM request');
      }

      const fields = [
        'id',
        'Email',
        'Full_Name',
        'First_Name',
        'Last_Name',
        'Phone',
        'Created_Time',
        'Title',
        'Department',
        'Lead_Source',
        'Mobile'
      ].join(',');

      // Build query parameters
      const queryParams = new URLSearchParams({
        fields,
        page: String(params.page || 1),
        per_page: String(params.per_page || 200),
      });

      // Add optional parameters
      if (params.sort_by) {
        queryParams.append('sort_by', params.sort_by);
        queryParams.append('sort_order', params.sort_order || 'asc');
      }

      if (params.search) {
        queryParams.append('search_text', params.search);
      }

      const response = await fetch(
        `${apiDomain}/crm/${apiVersion}/Contacts?${queryParams.toString()}`,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 401) {
        if (attempts === 0) {
          const newToken = await refreshZohoToken();
          attempts++;
          continue;
        }
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to fetch contacts: ${JSON.stringify(error)}`);
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      if (attempts === maxAttempts - 1) {
        throw error;
      }
      attempts++;
    }
  }

  throw new Error('Failed to fetch contacts after maximum attempts');
}

export async function createCRMContact(accessToken: string, contact: CreateContactInput): Promise<ZohoContact> {
  const apiDomain = process.env.ZOHO_API_DOMAIN;
  
  if (!apiDomain) {
    throw new Error('ZOHO_API_DOMAIN environment variable is not set');
  }

  console.log('Creating contact:', contact);

  try {
    const response = await fetch(`${apiDomain}/crm/v2/Contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [contact]
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('CRM API Error:', {
        status: response.status,
        statusText: response.statusText,
        error
      });
      throw new Error(`Failed to create contact: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    console.log('CRM Create Response:', data);
    return data.data[0];
  } catch (error) {
    console.error('CRM Create Request Failed:', error);
    throw error;
  }
}

export async function deleteCRMContact(accessToken: string, contactId: string): Promise<void> {
  const apiDomain = process.env.ZOHO_API_DOMAIN;
  
  if (!apiDomain) {
    throw new Error('ZOHO_API_DOMAIN environment variable is not set');
  }

  console.log('Deleting contact:', contactId);

  try {
    const response = await fetch(`${apiDomain}/crm/v2/Contacts/${contactId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('CRM API Error:', {
        status: response.status,
        statusText: response.statusText,
        error
      });
      throw new Error(`Failed to delete contact: ${JSON.stringify(error)}`);
    }

    console.log('Contact deleted successfully');
  } catch (error) {
    console.error('CRM Delete Request Failed:', error);
    throw error;
  }
} 
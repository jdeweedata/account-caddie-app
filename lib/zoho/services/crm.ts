import { ZohoLead } from '../types'
import { ZOHO_CONFIG } from '../config'
import { ZohoAuth } from '../auth'
import { logger } from '@/lib/logger'

export class ZohoCRMService {
  private auth: ZohoAuth

  constructor() {
    this.auth = ZohoAuth.getInstance()
  }

  async createLead(leadData: ZohoLead) {
    try {
      const accessToken = await this.auth.getAccessToken()
      
      const response = await fetch(`${ZOHO_CONFIG.apiDomain}${ZOHO_CONFIG.endpoints.crm}/Leads`, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [leadData],
          trigger: ['workflow']
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(errorData.message || 'Failed to create lead in Zoho CRM')
        logger.error(error, 'ZohoCRMService.createLead')
        throw error
      }

      return await response.json()
    } catch (error) {
      logger.error(error, 'ZohoCRMService.createLead')
      throw error
    }
  }
}
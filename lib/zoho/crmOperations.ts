import * as ZOHOCRMSDK from '@zohocrm/nodejs-sdk-7.0';
import { initializeCRMClient } from './crm';

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description?: string;
  [key: string]: any;
}

export async function createLead(leadData: LeadData) {
  try {
    await initializeCRMClient();
    
    const recordOperations = new ZOHOCRMSDK.Record.RecordOperations();
    const bodyWrapper = new ZOHOCRMSDK.Record.BodyWrapper();
    
    const record = new ZOHOCRMSDK.Record.Record();
    
    // Set required fields
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LAST_NAME, leadData.lastName);
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.FIRST_NAME, leadData.firstName);
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.EMAIL, leadData.email);
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.MOBILE, leadData.phone);
    
    if (leadData.description) {
      record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.DESCRIPTION, leadData.description);
    }
    
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LEAD_SOURCE, "Web Form");

    bodyWrapper.setData([record]);

    const response = await recordOperations.createRecords("Leads", bodyWrapper);
    return response;
  } catch (error) {
    console.error('Error creating lead in Zoho CRM:', error);
    throw error;
  }
}

export async function updateLead(leadId: string, updateData: Partial<LeadData>) {
  try {
    await initializeCRMClient();
    
    const recordOperations = new ZOHOCRMSDK.Record.RecordOperations();
    const bodyWrapper = new ZOHOCRMSDK.Record.BodyWrapper();
    const record = new ZOHOCRMSDK.Record.Record();
    
    record.setId(leadId);
    
    // Update fields based on provided data
    Object.entries(updateData).forEach(([key, value]) => {
      record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads[key.toUpperCase()], value);
    });

    bodyWrapper.setData([record]);

    const response = await recordOperations.updateRecords("Leads", bodyWrapper);
    return response;
  } catch (error) {
    console.error('Error updating lead in Zoho CRM:', error);
    throw error;
  }
}

export async function getLead(leadId: string) {
  try {
    await initializeCRMClient();
    
    const recordOperations = new ZOHOCRMSDK.Record.RecordOperations();
    const response = await recordOperations.getRecord("Leads", leadId);
    return response;
  } catch (error) {
    console.error('Error fetching lead from Zoho CRM:', error);
    throw error;
  }
} 
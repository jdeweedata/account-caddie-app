export interface ZohoLead {
  First_Name: string;
  Last_Name: string;
  Company: string;
  Email: string;
  Phone: string;
  Industry: string;
  Annual_Revenue: number;
  No_of_Employees: number;
  Lead_Source: string;
  Description: string;
}

export interface ConsultationSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface ConsultationEvent {
  subject: string;
  startDateTime: string;
  endDateTime: string;
  participants: Array<{
    email: string;
    type: 'required' | 'optional';
  }>;
  reminders: Array<{
    minutes: number;
  }>;
}
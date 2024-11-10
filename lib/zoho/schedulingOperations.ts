import { createLead, updateLead } from './crmOperations';
import { scheduleCalendarEvent } from './calendarOperations'; // Your existing calendar scheduling function

export async function scheduleConsultation(consultationData: any) {
  try {
    // First create/update the lead in CRM
    const leadResponse = await createLead({
      firstName: consultationData.firstName,
      lastName: consultationData.lastName,
      email: consultationData.email,
      phone: consultationData.phone,
      description: `Consultation scheduled for ${consultationData.dateTime}`
    });

    // Then schedule the calendar event
    const calendarResponse = await scheduleCalendarEvent({
      ...consultationData,
      leadId: leadResponse.getData()[0].getDetails().getId() // Store CRM lead ID in calendar event
    });

    // Update the lead with the calendar event details
    await updateLead(leadResponse.getData()[0].getDetails().getId(), {
      Calendar_Event_Id: calendarResponse.eventId
    });

    return {
      leadId: leadResponse.getData()[0].getDetails().getId(),
      eventId: calendarResponse.eventId
    };
  } catch (error) {
    console.error('Failed to schedule consultation:', error);
    throw error;
  }
} 
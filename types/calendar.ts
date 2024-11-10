export interface CalendarEventData {
  eventdata: {
    title: string;
    dateandtime: {
      start: string;  // Format: yyyyMMddTHHmmssZ
      end: string;    // Format: yyyyMMddTHHmmssZ
      timezone: string;
    };
    attendees: Array<{
      email: string;
      name: string;
      type: "required" | "optional";
    }>;
    description?: string;
    location?: string;
    reminders?: Array<{
      action: "popup" | "email";
      minutes: number;
    }>;
  };
} 
export interface ZohoCalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
  status?: string;
  created_time?: string;
  modified_time?: string;
}

export interface ZohoCalendarGroup {
  name: string;
  entityid: string;
}

export interface ZohoNotificationSettings {
  emailformat: '0' | '1'; // 0 = html, 1 = plain text
  remindernotify: boolean;
  agendanotify: '-1' | '0' | '1'; // -1 = off, 0 = daily, 1 = weekly
  notifyemail?: string;
}

export interface CreateCalendarEventInput {
  title: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
}

export interface ZohoGroupCalendar {
  id: string;
  name: string;
  description?: string;
  members?: {
    id: string;
    name: string;
    email: string;
    role: string;
  }[];
}

export async function fetchCalendarEvents(accessToken: string): Promise<ZohoCalendarEvent[]> {
  const apiDomain = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN;
  const calendarId = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ID;
  
  if (!apiDomain || !calendarId) {
    throw new Error('Calendar configuration missing');
  }

  console.log('Fetching calendar events');

  try {
    const response = await fetch(`${apiDomain}/group/calendar/${calendarId}/events`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      console.error('Calendar API Error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseText
      });
      throw new Error(`Failed to fetch events: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Calendar Response:', data);
    return data.events || [];
  } catch (error) {
    console.error('Calendar Request Failed:', error);
    throw error;
  }
}

export async function createCalendarEvent(
  accessToken: string, 
  event: CreateCalendarEventInput
): Promise<ZohoCalendarEvent> {
  const apiDomain = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN;
  const calendarId = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ID;
  
  if (!apiDomain || !calendarId) {
    throw new Error('Calendar configuration missing');
  }

  const eventData = {
    title: event.title,
    description: event.description || "",
    dateandtime: {
      timezone: process.env.NEXT_PUBLIC_ZOHO_CALENDAR_TIMEZONE || 'Africa/Johannesburg',
      start: formatZohoDateTime(event.start),
      end: formatZohoDateTime(event.end)
    },
    location: event.location || "",
    show_time_as: "BUSY",
    repeats: "NEVER",
    reminder: [{
      minutes: "-60",
      action: "popup"
    }],
    calendar_alarm: false,
    enable_eventmanagement: false
  };

  console.log('Creating calendar event with data:', eventData);

  try {
    const url = `${apiDomain}/api/v1/calendars/${calendarId}/events`;
    console.log('Request URL:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventdata: eventData })
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      console.error('Calendar API Error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseText
      });
      throw new Error(`Failed to create event: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Calendar Create Response:', data);
    return data.events[0];
  } catch (error) {
    console.error('Calendar Create Request Failed:', error);
    throw error;
  }
}

function formatZohoDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export async function fetchGroupCalendars(accessToken: string): Promise<ZohoCalendarGroup[]> {
  const apiDomain = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN;
  
  if (!apiDomain) {
    throw new Error('Calendar configuration missing');
  }

  console.log('Fetching group calendars');

  try {
    const response = await fetch(`${apiDomain}/api/v1/groups`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      console.error('Calendar API Error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseText
      });
      throw new Error(`Failed to fetch group calendars: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Group Calendars Response:', data);
    return data.groups || [];
  } catch (error) {
    console.error('Group Calendars Request Failed:', error);
    throw error;
  }
}

export async function getNotificationSettings(accessToken: string): Promise<ZohoNotificationSettings> {
  const apiDomain = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN;
  
  if (!apiDomain) {
    throw new Error('Calendar configuration missing');
  }

  try {
    const response = await fetch(`${apiDomain}/api/v1/notification`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch notification settings: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return data.notification[0];
  } catch (error) {
    console.error('Get Notification Settings Failed:', error);
    throw error;
  }
}

export async function updateNotificationSettings(
  accessToken: string,
  settings: ZohoNotificationSettings
): Promise<void> {
  const apiDomain = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN;
  
  if (!apiDomain) {
    throw new Error('Calendar configuration missing');
  }

  try {
    const response = await fetch(`${apiDomain}/api/v1/notification`, {
      method: 'PUT',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notification: settings }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update notification settings: ${JSON.stringify(error)}`);
    }
  } catch (error) {
    console.error('Update Notification Settings Failed:', error);
    throw error;
  }
}

export async function getGroupCalendarDetails(accessToken: string): Promise<ZohoGroupCalendar> {
  const apiDomain = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN;
  const groupCalendarId = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ID;
  
  if (!apiDomain || !groupCalendarId) {
    throw new Error('Calendar configuration missing');
  }

  try {
    const response = await fetch(`${apiDomain}/api/v1/groups/${groupCalendarId}`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch group calendar details: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return data.group;
  } catch (error) {
    console.error('Get Group Calendar Details Failed:', error);
    throw error;
  }
}

export function getCalendarEmbedUrl(): string {
  return process.env.NEXT_PUBLIC_ZOHO_CALENDAR_EMBED_URL || '';
}

export function getCalendarICalUrl(): string {
  return process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ICAL_URL || '';
} 
// Test utility for Zoho Calendar API
export async function testCalendarAPI(accessToken: string) {
  const apiDomain = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_API_DOMAIN;
  const calendarId = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ID;
  const scheduleUrl = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_SCHEDULE_URL;

  console.log('Testing Zoho Calendar API...');
  console.log('API Domain:', apiDomain);
  console.log('Calendar ID:', calendarId);

  // 1. Test Schedule Appointment (Web API)
  try {
    console.log('\n1. Testing Schedule Appointment...');
    if (!scheduleUrl) {
      throw new Error('Schedule URL not configured');
    }

    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 1); // Tomorrow
    
    const params = new URLSearchParams({
      name: 'Test User',
      mailId: 'test@example.com',
      date: formatDate(appointmentDate),
      time: '13:00',
      reason: 'API Test Appointment'
    });

    const testUrl = `${scheduleUrl}?${params.toString()}`;
    console.log('Schedule URL:', testUrl);

    const scheduleResponse = await fetch(testUrl);
    console.log('Status:', scheduleResponse.status);
    const scheduleData = await scheduleResponse.text();
    console.log('Response:', scheduleData);
  } catch (error) {
    console.error('Schedule Appointment Test Failed:', error);
  }

  // 2. Test Get Calendar Events (CalDAV)
  try {
    console.log('\n2. Testing Get Calendar Events via CalDAV...');
    const caldavUrl = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_CALDAV_URL;
    if (!caldavUrl) {
      throw new Error('CalDAV URL not configured');
    }

    // Add Basic Auth for CalDAV
    const authString = Buffer.from(`${process.env.ZOHO_CLIENT_ID}:${process.env.ZOHO_CLIENT_SECRET}`).toString('base64');

    const eventsResponse = await fetch(caldavUrl, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'text/calendar',
        'Depth': '1',
      },
      method: 'PROPFIND', // Use PROPFIND for CalDAV
    });

    console.log('Status:', eventsResponse.status);
    const eventsData = await eventsResponse.text();
    console.log('Response:', eventsData);
  } catch (error) {
    console.error('CalDAV Events Test Failed:', error);
  }

  // 3. Test iCal Feed
  try {
    console.log('\n3. Testing iCal Feed...');
    const icalUrl = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ICAL_URL;
    if (!icalUrl) {
      throw new Error('iCal URL not configured');
    }

    const icalResponse = await fetch(icalUrl);
    console.log('Status:', icalResponse.status);
    const icalData = await icalResponse.text();
    console.log('Response:', icalData.substring(0, 200) + '...');

    // Parse iCal data to show events
    if (icalResponse.ok) {
      const events = parseICalData(icalData);
      console.log('Parsed Events:', events);
    }
  } catch (error) {
    console.error('iCal Feed Test Failed:', error);
  }

  // 4. Test Embed URL
  try {
    console.log('\n4. Testing Calendar Embed URL...');
    const embedUrl = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_EMBED_URL;
    if (!embedUrl) {
      throw new Error('Embed URL not configured');
    }

    const embedResponse = await fetch(embedUrl);
    console.log('Status:', embedResponse.status);
    console.log('Embed URL accessible:', embedResponse.ok);
  } catch (error) {
    console.error('Embed URL Test Failed:', error);
  }
}

// Helper function to format date for schedule API (MM/dd/yyyy)
function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

// Helper function to parse iCal data
function parseICalData(icalData: string): any[] {
  const events: any[] = [];
  const lines = icalData.split('\n');
  let currentEvent: any = null;

  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      currentEvent = {};
    } else if (line.startsWith('END:VEVENT')) {
      if (currentEvent) {
        events.push(currentEvent);
        currentEvent = null;
      }
    } else if (currentEvent) {
      const [key, ...values] = line.split(':');
      if (key && values.length) {
        currentEvent[key] = values.join(':').trim();
      }
    }
  }

  return events;
} 
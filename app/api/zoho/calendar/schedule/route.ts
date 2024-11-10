import { NextResponse } from 'next/server';
import { getZohoToken } from '@/lib/zoho/auth';
import { ZohoCalendarService } from '@/lib/zoho/services/calendar';

export async function POST(request: Request) {
  try {
    const token = await getZohoToken();
    const calendarService = new ZohoCalendarService(token);

    const body = await request.json();
    const { name, email, date, time, reason } = body;

    console.log('Received appointment request:', { name, email, date, time, reason });

    // Validate input
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Parse date and time
      let startDateTime;
      try {
        // Log the incoming date and time
        console.log('Parsing date and time:', { date, time });

        // Try different date formats
        const dateFormats = ['MM/dd/yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy'];
        let parsedDate = null;

        for (const dateFormat of dateFormats) {
          try {
            parsedDate = parse(date, dateFormat, new Date());
            if (isValid(parsedDate)) {
              console.log(`Successfully parsed date with format ${dateFormat}`);
              break;
            }
          } catch (e) {
            console.log(`Failed to parse with format ${dateFormat}`);
          }
        }

        if (!parsedDate || !isValid(parsedDate)) {
          throw new Error(`Could not parse date: ${date}`);
        }

        // Parse time (expecting HH:mm format)
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) {
          throw new Error(`Invalid time format: ${time}`);
        }

        // Combine date and time
        startDateTime = new Date(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate(),
          hours,
          minutes
        );

        if (!isValid(startDateTime)) {
          throw new Error('Invalid combined date and time');
        }

        console.log('Successfully parsed datetime:', startDateTime);
      } catch (e) {
        console.error('Date/time parsing error:', e);
        throw new Error(`Invalid date or time format. Date: ${date}, Time: ${time}`);
      }

      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

      const calendarId = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_UID;
      const apiDomain = 'https://calendar.zoho.com';
      const timezone = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_TIMEZONE || 'Africa/Johannesburg';

      if (!calendarId) {
        throw new Error('Missing calendar configuration');
      }

      console.log('Calendar config:', {
        calendarId,
        apiDomain,
        timezone,
        parsedStartDateTime: format(startDateTime, 'yyyy-MM-dd HH:mm:ss'),
        parsedEndDateTime: format(endDateTime, 'yyyy-MM-dd HH:mm:ss')
      });

      const eventData = {
        title: `Consultation with ${name}`,
        start_datetime: startDateTime.toISOString(),
        end_datetime: endDateTime.toISOString(),
        description: reason || 'Consultation',
        location: "Online",
        timezone: timezone,
        attendees: [{
          email: email,
          name: name,
          type: "required"
        }],
        reminder: {
          minutes: 30,
          type: "email"
        }
      };

      console.log('Event data:', JSON.stringify(eventData, null, 2));

      const apiUrl = `${apiDomain}/api/v1/events`;
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', e);
        console.error('Response text:', responseText);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}...`);
      }

      console.log('Parsed response data:', responseData);

      if (!response.ok) {
        throw new Error(`Calendar API error: ${JSON.stringify(responseData)}`);
      }

      return NextResponse.json({ 
        success: true, 
        data: responseData 
      });

    } catch (error) {
      console.error('Specific error:', error);
      throw error;
    }

  } catch (error) {
    console.error('Calendar scheduling error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 
'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';

interface CalendarProps {
  width?: number | string;
  height?: number | string;
  appointmentData?: {
    name?: string;
    email?: string;
    date?: string;
    time?: string;
    reason?: string;
  };
}

export function GroupCalendar({ 
  width = 432,
  height = 350,
  appointmentData
}: CalendarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMessage = async (event: MessageEvent) => {
    // Only handle messages from Zoho Calendar
    if (!event.origin.includes('calendar.zoho.com')) return;

    try {
      const data = event.data;
      console.log('Received message from calendar:', data);

      if (!data || typeof data !== 'object') return;

      // Check if this is an appointment submission
      if (data.action === 'appointment_scheduled') {
        setIsSubmitting(true);
        setError(null);

        const appointmentData = {
          name: data.name,
          email: data.email,
          date: data.date, // Keep the original format from Zoho
          time: data.time,
          reason: data.reason || 'Consultation'
        };

        console.log('Sending appointment data:', {
          ...appointmentData,
          parsedDate: format(new Date(data.date), 'yyyy-MM-dd'),
          originalDate: data.date
        });

        const response = await fetch('/api/zoho/calendar/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData)
        });

        let result;
        try {
          result = await response.json();
        } catch (e) {
          console.error('Failed to parse response:', e);
          throw new Error('Invalid response from server');
        }

        console.log('Server response:', result);

        if (!result.success) {
          throw new Error(result.error || 'Failed to schedule appointment');
        }

        alert('Appointment scheduled successfully!');
      }
    } catch (error) {
      console.error('Calendar scheduling error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to schedule appointment';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add event listener for messages from iframe
  React.useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const baseUrl = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_SCHEDULE_URL;
  
  if (!baseUrl) {
    console.error('Missing NEXT_PUBLIC_ZOHO_CALENDAR_SCHEDULE_URL environment variable');
    return <div>Calendar configuration error</div>;
  }

  const calendarUrl = appointmentData 
    ? `${baseUrl}?` + new URLSearchParams({
        name: appointmentData.name || '',
        email: appointmentData.email || '',
        dateformat: 'MM/dd/yyyy',
        date: appointmentData.date || '',
        time: appointmentData.time || '',
        reason: appointmentData.reason || '',
        theme: '0',
        l: 'en',
        tz: 'Africa/Johannesburg'
      }).toString()
    : `${baseUrl}?theme=0&l=en&tz=Africa/Johannesburg`;

  return (
    <div className="calendar-wrapper relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white">Scheduling appointment...</div>
        </div>
      )}
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-sm">
          {error}
        </div>
      )}
      <iframe 
        src={calendarUrl}
        width={width}
        height={height}
        frameBorder={0}
        scrolling="no"
        title="Schedule Appointment"
        style={{
          border: 'none',
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  );
} 
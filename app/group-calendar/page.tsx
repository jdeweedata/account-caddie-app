'use client';

import { ConsultationScheduler } from '@/components/ConsultationScheduler';

export default function GroupCalendarPage() {
  // Construct the embed URL with all required parameters
  const embedUrl = "https://calendar.zoho.com/zc/ui/embed/#" + 
    "calendar=zz08011240d57a738c2986384c56d8903f4d42d9ca84375880fd075ff879e95d32de7b49eacbfb615494f1d24b2deeef43225b9fd83610a8b30860cc0c46f3d78c6f147cbc" +
    "&title=Account%20Caddie%20Consultations" +
    "&type=1" +
    "&language=en" +
    "&timezone=Africa%2FJohannesburg" +
    "&showTitle=1" +
    "&showTimezone=1" +
    "&startingDayOfWeek=1" +
    "&timeFormat=1" +
    "&view=day" +
    "&showDetail=1" +
    "&theme=1" +
    "&showAttendee=0" +
    "&showSwitchingViews=1" +
    "&eventColorType=light" +
    "&calendarColor=%236D8815" +
    "&showLogo=0";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Caddie Consultations</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Embed */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
            <iframe 
              src={embedUrl}
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              className="bg-white"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              title="Account Caddie Consultations Calendar"
            />
          </div>

          {/* Consultation Scheduler */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Schedule a Consultation</h2>
            <ConsultationScheduler />
          </div>
        </div>
      </div>
    </div>
  );
} 
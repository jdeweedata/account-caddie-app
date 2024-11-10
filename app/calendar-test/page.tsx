'use client';

import { GroupCalendar } from '@/components/GroupCalendar';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function CalendarTestPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: "Test User",
    email: "test@example.com",
    date: "",
    time: "",
    reason: "Test Consultation"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      const formattedDate = formatDate(value);
      setAppointmentData(prev => ({
        ...prev,
        date: formattedDate
      }));
    } else if (name === 'time') {
      setAppointmentData(prev => ({
        ...prev,
        time: value.substring(0, 5)
      }));
    } else {
      setAppointmentData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/zoho/calendar/schedule-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to schedule appointment');
      }

      toast({
        title: "Success",
        description: "Appointment scheduled successfully!",
        variant: "success",
      });

      setAppointmentData({
        name: "",
        email: "",
        date: "",
        time: "",
        reason: ""
      });

    } catch (error) {
      console.error('Scheduling error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to schedule appointment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Calendar Test Page</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={appointmentData.name}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={appointmentData.email}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date:</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Time:</label>
                <input
                  type="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Reason:</label>
                <input
                  type="text"
                  name="reason"
                  value={appointmentData.reason}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Scheduling...' : 'Schedule Appointment'}
              </button>
            </form>
          </div>

          {/* Calendar Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Calendar Preview</h2>
            <GroupCalendar appointmentData={appointmentData} />
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(appointmentData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 
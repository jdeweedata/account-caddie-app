'use client';

import { useState } from 'react';

interface ConsultationBookingProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function ConsultationBooking({ onSuccess, onError }: ConsultationBookingProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const scheduleUrl = process.env.NEXT_PUBLIC_ZOHO_CALENDAR_SCHEDULE_URL;

    if (!scheduleUrl) {
      setError('Calendar configuration missing');
      setLoading(false);
      return;
    }

    try {
      // Create URL with appointment data
      const params = new URLSearchParams({
        name: formData.get('name') as string,
        mailId: formData.get('email') as string,
        date: formatDate(new Date(formData.get('date') as string)),
        time: formData.get('time') as string,
        reason: formData.get('reason') as string,
      });

      const response = await fetch(`${scheduleUrl}?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule consultation');
      }

      onSuccess?.();
      e.currentTarget.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to schedule consultation';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          required
          min={new Date().toISOString().split('T')[0]}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <select
          name="time"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        >
          <option value="">Select a time</option>
          <option value="09:00">09:00 AM</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="13:00">01:00 PM</option>
          <option value="14:00">02:00 PM</option>
          <option value="15:00">03:00 PM</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reason</label>
        <textarea
          name="reason"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-chelsea-cucumber hover:bg-chelsea-cucumber/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chelsea-cucumber disabled:opacity-50"
      >
        {loading ? 'Scheduling...' : 'Schedule Consultation'}
      </button>
    </form>
  );
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
} 
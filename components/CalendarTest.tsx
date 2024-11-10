'use client';

import { useEffect, useState } from 'react';
import { useZohoAuth } from './ZohoAuthProvider';
import type { ZohoCalendarEvent, CreateCalendarEventInput } from '@/lib/zoho/api/calendar-client';

export function CalendarTest() {
  const { isAuthenticated } = useZohoAuth();
  const [events, setEvents] = useState<ZohoCalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [isAuthenticated]);

  async function fetchEvents() {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/zoho/calendar/events');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch events');
      }

      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const eventData: CreateCalendarEventInput = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      start: new Date(formData.get('start') as string).toISOString(),
      end: new Date(formData.get('end') as string).toISOString(),
      location: formData.get('location') as string,
    };

    try {
      const response = await fetch('/api/zoho/calendar/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create event');
      }

      const newEvent = await response.json();
      setEvents(prev => [...prev, newEvent]);
      setShowCreateForm(false);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">Please authenticate first</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chelsea-cucumber"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Calendar Events</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-chelsea-cucumber text-white rounded-md hover:bg-chelsea-cucumber/90"
        >
          Add Event
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateEvent} className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Event</h3>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start</label>
              <input
                type="datetime-local"
                name="start"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End</label>
              <input
                type="datetime-local"
                name="end"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-chelsea-cucumber hover:bg-chelsea-cucumber/90"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No events found</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-white rounded-lg shadow border border-gray-100"
            >
              <h3 className="font-semibold text-lg">{event.title}</h3>
              {event.description && (
                <p className="text-gray-600 mt-1">{event.description}</p>
              )}
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  Start: {new Date(event.start).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  End: {new Date(event.end).toLocaleString()}
                </p>
                {event.location && (
                  <p className="text-sm text-gray-500">
                    Location: {event.location}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import type { CreateContactInput } from '@/lib/zoho/api/crm-client';

interface CreateContactFormProps {
  onSuccess: (contact: any) => void;
  onCancel: () => void;
}

export function CreateContactForm({ onSuccess, onCancel }: CreateContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const contactData: CreateContactInput = {
      First_Name: formData.get('firstName') as string,
      Last_Name: formData.get('lastName') as string,
      Email: formData.get('email') as string,
      Phone: formData.get('phone') as string || undefined,
      Mobile: formData.get('mobile') as string || undefined,
      Title: formData.get('title') as string || undefined,
      Department: formData.get('department') as string || undefined,
      Lead_Source: formData.get('leadSource') as string || undefined,
    };

    try {
      const response = await fetch('/api/zoho/crm/contacts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create contact');
      }

      const contact = await response.json();
      onSuccess(contact);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Add New Contact</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="tel"
            name="mobile"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          name="department"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lead Source
        </label>
        <select
          name="leadSource"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-chelsea-cucumber focus:ring-chelsea-cucumber"
        >
          <option value="">Select a source</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Employee Referral">Employee Referral</option>
          <option value="External Referral">External Referral</option>
          <option value="Partner">Partner</option>
          <option value="Public Relations">Public Relations</option>
          <option value="Web Form">Web Form</option>
          <option value="Website">Website</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chelsea-cucumber"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-chelsea-cucumber hover:bg-chelsea-cucumber/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chelsea-cucumber disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Contact'}
        </button>
      </div>
    </form>
  );
} 
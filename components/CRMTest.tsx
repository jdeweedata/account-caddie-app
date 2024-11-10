'use client';

import { useEffect, useState } from 'react';
import { useZohoAuth } from './ZohoAuthProvider';
import { ZohoContact } from '@/lib/zoho/api/crm-client';
import { CreateContactForm } from './CreateContactForm';
import { ConsultationBooking } from './ConsultationBooking';

export function CRMTest() {
  const { isAuthenticated } = useZohoAuth();
  const [contacts, setContacts] = useState<ZohoContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ZohoContact | null>(null);
  const [deletingContact, setDeletingContact] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  async function fetchContacts() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/zoho/crm/contacts');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contacts');
      }

      setContacts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  const handleCreateSuccess = (newContact: ZohoContact) => {
    setContacts(prev => [newContact, ...prev]);
    setShowCreateForm(false);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    // Optionally update contact details or refresh the list
    fetchContacts();
  };

  const handleScheduleConsultation = (contact: ZohoContact) => {
    setSelectedContact(contact);
    setShowBookingForm(true);
  };

  const handleDeleteClick = (contact: ZohoContact) => {
    setSelectedContact(contact);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedContact) return;

    setDeletingContact(selectedContact.id);
    setError(null);

    try {
      const response = await fetch(`/api/zoho/crm/contacts/${selectedContact.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete contact');
      }

      setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
      setShowDeleteConfirm(false);
      setSelectedContact(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
    } finally {
      setDeletingContact(null);
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
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chelsea-cucumber"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">CRM Contacts</h2>
        <div className="flex items-center space-x-4">
          <span className="bg-chelsea-cucumber text-white px-3 py-1 rounded-full text-sm">
            {contacts.length} Contacts
          </span>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-chelsea-cucumber text-white rounded-md hover:bg-chelsea-cucumber/90 transition-colors"
          >
            Add Contact
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Create Contact Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full">
            <CreateContactForm
              onSuccess={handleCreateSuccess}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingForm && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Schedule Consultation</h3>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            <ConsultationBooking
              onSuccess={handleBookingSuccess}
              onError={(error) => setError(error)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedContact.Full_Name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedContact(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={!!deletingContact}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                {deletingContact ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {contact.Full_Name}
                </h3>
                <p className="text-sm text-gray-500">{contact.Title}</p>
              </div>
              {contact.Lead_Source && (
                <span className="text-xs px-2 py-1 bg-chelsea-cucumber/10 text-chelsea-cucumber rounded-full">
                  {contact.Lead_Source}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              {contact.Email && (
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${contact.Email}`} className="text-chelsea-cucumber hover:underline">
                    {contact.Email}
                  </a>
                </div>
              )}
              {contact.Phone && (
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${contact.Phone}`} className="text-chelsea-cucumber hover:underline">
                    {contact.Phone}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <button
                onClick={() => handleScheduleConsultation(contact)}
                className="text-chelsea-cucumber hover:text-chelsea-cucumber/90 text-sm font-medium"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => handleDeleteClick(contact)}
                disabled={deletingContact === contact.id}
                className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
              >
                {deletingContact === contact.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
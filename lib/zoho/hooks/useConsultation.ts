'use client'

import { useState } from 'react';

export function useConsultation() {
  const [isLoading, setIsLoading] = useState(false);

  const getAvailableSlots = async (date: string) => {
    try {
      setIsLoading(true);
      
      // Make API call to get available slots
      const response = await fetch(`/api/zoho/bookings/slots?date=${date}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch slots: ${errorText}`);
      }

      const data = await response.json();
      return data.slots;
    } catch (error) {
      console.error('Error fetching slots:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAvailableSlots,
    isLoading,
  };
}
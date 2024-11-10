import { useZoho } from '@/lib/zoho/hooks/useZoho'

export function FormWizard() {
  const { createLead, getAvailableSlots, isLoading, error } = useZoho({
    onSuccess: (data) => {
      // Handle success
      console.log('Success:', data)
    },
    onError: (error) => {
      // Handle error
      console.error('Error:', error)
    }
  })

  async function handleSubmit(formData: any) {
    try {
      // Create lead in Zoho CRM
      const leadResponse = await createLead({
        Last_Name: formData.lastName,
        Email: formData.email,
        // Add other fields as needed
      })

      // Get available slots
      const slots = await getAvailableSlots(
        formData.startDate,
        formData.endDate
      )

      // Handle the responses
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  // Rest of your component code
} 
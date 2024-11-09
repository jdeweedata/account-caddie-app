// flows/consultationFlow.ts
const consultationFlow = {
  trigger: {
    type: "FormSubmission",
    source: "ConsultationScheduler"
  },
  actions: [
    {
      // Create Calendar Event
      app: "ZohoCalendar",
      action: "CreateEvent",
      params: {
        title: "Financial Consultation - ${customer.name}",
        startTime: "${appointment.startTime}",
        duration: 60,
        participants: ["${customer.email}"]
      }
    },
    {
      // Create CRM Lead
      app: "ZohoCRM",
      action: "CreateLead",
      params: {
        firstName: "${customer.firstName}",
        lastName: "${customer.lastName}",
        email: "${customer.email}",
        phone: "${customer.phone}",
        source: "Website Consultation"
      }
    }
  ]
};
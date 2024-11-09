// flows/followupFlow.ts
const followupFlow = {
  trigger: {
    type: "EventCompleted",
    source: "ZohoCalendar"
  },
  actions: [
    {
      // Update CRM Status
      app: "ZohoCRM",
      action: "UpdateLead",
      params: {
        status: "Contacted",
        lastMeeting: "${event.endTime}"
      }
    },
    {
      // Schedule Follow-up
      app: "ZohoCalendar",
      action: "CreateEvent",
      params: {
        title: "Follow-up - ${customer.name}",
        startTime: "${addDays(event.endTime, 7)}",
        duration: 30
      }
    }
  ]
}
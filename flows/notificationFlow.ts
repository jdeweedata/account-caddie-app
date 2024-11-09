// flows/notificationFlow.ts
const notificationFlow = {
  trigger: {
    type: "EventCreated",
    source: "ZohoCalendar"
  },
  actions: [
    {
      // Send Confirmation Email
      app: "ZohoMail",
      action: "SendEmail",
      params: {
        to: "${customer.email}",
        template: "consultation_confirmation",
        variables: {
          appointmentTime: "${event.startTime}",
          meetingLink: "${event.conferenceLink}"
        }
      }
    }
  ]
}
export const CONSULTATION_WORKFLOW = {
  name: 'schedule_consultation',
  description: 'Schedule consultation when lead is created with consultation date',
  trigger: {
    module: 'Leads',
    type: 'when_record_is',
    condition: 'created_or_edited',
    criteria: [
      {
        field: 'Consultation_DateTime',
        operator: 'is_not_empty'
      },
      {
        field: 'Consultation_Status',
        operator: 'equals',
        value: 'Scheduled'
      }
    ]
  },
  actions: [
    {
      type: 'create_event',
      module: 'Calendar',
      data: {
        title: 'Business Assessment Consultation - ${Lead.First_Name} ${Lead.Last_Name}',
        start_time: '${Lead.Consultation_DateTime}',
        duration: 60,
        description: 'Consultation for ${Lead.Company}\nIndustry: ${Lead.Industry}\nPackage: ${Lead.Package_Selected}',
        attendees: ['${Lead.Email}'],
        send_notification: true
      }
    },
    {
      type: 'update_record',
      module: 'Leads',
      data: {
        Lead_Status: 'Consultation Scheduled',
        Next_Follow_Up: '${Lead.Consultation_DateTime}'
      }
    },
    {
      type: 'send_email',
      template: 'consultation_confirmation',
      to: '${Lead.Email}'
    }
  ]
} 
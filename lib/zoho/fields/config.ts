export const BOOKING_FIELDS = {
  CONSULTATION: {
    DATE_TIME: {
      field_label: 'Consultation DateTime',
      api_name: 'Consultation_DateTime',
      data_type: 'datetime',
      required: true
    },
    STATUS: {
      field_label: 'Consultation Status',
      api_name: 'Consultation_Status',
      data_type: 'picklist',
      pick_list_values: [
        { display_value: 'Scheduled' },
        { display_value: 'Completed' },
        { display_value: 'Cancelled' },
        { display_value: 'No Show' }
      ]
    },
    TYPE: {
      field_label: 'Consultation Type',
      api_name: 'Consultation_Type',
      data_type: 'picklist',
      pick_list_values: [
        { display_value: 'Initial Assessment' },
        { display_value: 'Follow Up' },
        { display_value: 'Business Review' }
      ]
    },
    NOTES: {
      field_label: 'Consultation Notes',
      api_name: 'Consultation_Notes',
      data_type: 'text',
      length: 1000
    },
    DURATION: {
      field_label: 'Consultation Duration',
      api_name: 'Consultation_Duration',
      data_type: 'integer',
      min_value: 30,
      max_value: 120
    }
  },
  BUSINESS: {
    PI_SCORE: {
      field_label: 'PI Score',
      api_name: 'PI_Score',
      data_type: 'integer',
      min_value: 0,
      max_value: 100
    },
    ASSESSMENT_DATE: {
      field_label: 'Assessment Date',
      api_name: 'Assessment_Date',
      data_type: 'date',
      required: true
    }
  }
} as const 
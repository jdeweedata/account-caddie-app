export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn?: number;
  apiDomain?: string;
}

export interface ZohoScope {
  CRM: {
    MODULES: {
      ALL: string;
    };
    SETTINGS: {
      ALL: string;
      FIELDS: {
        ALL: string;
      };
      RELATED_LISTS: {
        ALL: string;
      };
    };
    CALENDAR: {
      ALL: string;
    };
  };
}

export const ZOHO_SCOPES: ZohoScope = {
  CRM: {
    MODULES: {
      ALL: 'ZohoCRM.modules.ALL'
    },
    SETTINGS: {
      ALL: 'ZohoCRM.settings.ALL',
      FIELDS: {
        ALL: 'ZohoCRM.settings.fields.ALL'
      },
      RELATED_LISTS: {
        ALL: 'ZohoCRM.settings.related_lists.ALL'
      }
    },
    CALENDAR: {
      ALL: 'ZohoCalendar.calendar.ALL'
    }
  }
}; 
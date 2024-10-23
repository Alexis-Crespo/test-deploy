import { SelectOption } from '../types';

// ! None of this interfaces are real - just for mocked purposes

export interface MailNotificationOption {
  id: number;
  label: string;
}

export interface MailNotificationsConfig {
  termOptions: {
    options?: MailNotificationOption[];
    selected: MailNotificationOption;
  };
  sectionsOptions: {
    options?: string[];
    selected: string[];
  };
  otherNotifications: {
    options?: MailNotificationOption[];
    selected: MailNotificationOption;
  };
}

export interface WebNotificationsConfig {
  termOptions: {
    options?: string[];
    selected: string[];
  };
}

export interface SessionConfig {
  selectOptions: {
    options: SelectOption[];
    selected: SelectOption;
    notificationWhenLogIn?: boolean;
    notificationSelected: boolean;
  };
}
export interface TwoFactorAuthConfig {
  activeCode?: boolean;
  selected: boolean;
}

export interface IGeneralConfigurationDataGetResponse {
  mailNotifications: MailNotificationsConfig;
  webNotifications: WebNotificationsConfig;
  sessionConfig: SessionConfig;
  twoFactorAuth: TwoFactorAuthConfig;
}

export interface IGeneralConfigurationDataPostResponse {
  status: 200 | 400 | 401 | 500,
  messages?: string[]
}

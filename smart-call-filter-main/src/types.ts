export type ScreenDecision = 'ALLOWED' | 'BLOCKED' | 'SCREENED';

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  status: 'allow' | 'block' | 'screen';
  category: 'Family' | 'Work' | 'Emergency' | 'Doctors' | 'School' | 'Delivery' | 'Custom' | 'Friends' | 'Spam' | 'Unknown';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  name: string;
  phoneNumber: string;
  decision: ScreenDecision;
  reason: string;
  smsSent: boolean;
  smsText?: string;
  isEmergencyCall?: boolean;
  transcript?: string;
}

export interface AppConfig {
  callScreeningEnabled: boolean; // default role active
  contactsPermissionGranted: boolean;
  smsPermissionGranted: boolean;
  blockUnknownCallers: boolean;
  allowedTimeStart: string; // e.g. "08:00"
  allowedTimeEnd: string; // e.g. "22:00"
  allowWeekendCalls: boolean;
  emergencyOverridePolicy: 'none' | 'repeated' | 'immediate'; // repeated = same caller twice in 3 mins
  customAutoSms: string;
}

export type OnboardingStep = 
  | 'welcome' 
  | 'privacy' 
  | 'role-setup'
  | 'contacts-setup'
  | 'sms-setup'
  | 'summary';

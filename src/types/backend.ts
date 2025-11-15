// --- ENUM Types ---
export type ProviderType = 'google' | 'microsoft'

export type AccountStatus = 'active' | 'revoked' | 'error' | 'paused'

export type AutomationLogStatus = 'pending' | 'success' | 'failure' | 'skipped'

// --- Tabel Interfaces (met JSON tags) ---

export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface Account {
  id: string
  user_id: string
  provider: ProviderType
  email: string
  provider_user_id: string
  token_expiry: string
  scopes: string[]
  status: AccountStatus
  created_at: string
  updated_at: string
  last_checked: string | null
}

export interface Rule {
  id: string
  connected_account_id: string
  name: string
  is_active: boolean
  trigger_conditions: TriggerConditions
  action_params: ActionParams
  created_at: string
  updated_at: string
}

export interface AutomationLog {
  id: number
  connected_account_id: string
  rule_id: string
  timestamp: string
  status: AutomationLogStatus
  trigger_details: TriggerLogDetails | null
  action_details: ActionLogDetails | null
  error_message: string
}

// Aangepaste interfaces voor JSONB met meer flexibiliteit voor shift automation
export interface TriggerConditions {
  summary_equals?: string
  summary_contains?: string[]
  location_contains?: string[]
}

export interface ActionParams {
  offset_minutes: number
  new_event_title: string
  duration_min: number
}

// --- OPTIMALISATIE: Interfaces voor JSONB Logging ---
export interface TriggerLogDetails {
  google_event_id: string
  trigger_summary: string
  trigger_time: string
}

export interface ActionLogDetails {
  created_event_id: string
  created_event_summary: string
  reminder_time: string
}

export interface Event {
  id: string
  summary: string
  description: string
  start: string
  end: string
  calendarId: string
  // ... andere fields als nodig
}

export interface GoogleEventDateTime {
  dateTime?: string
  date?: string
  timeZone?: string
}

export interface GoogleCalendarEvent {
  id: string
  summary: string
  description?: string
  location?: string
  start: GoogleEventDateTime // Google API stuurt camelCase, dus dit blijft
  end: GoogleEventDateTime // Google API stuurt camelCase, dus dit blijft
}

export interface CreateEventData {
  summary: string
  description?: string
  start: GoogleEventDateTime
  end: GoogleEventDateTime
  location?: string
  calendarId?: string
}

export interface UpdateEventData extends Partial<CreateEventData> {}

export interface AggregatedEventsRequest {
  accounts: Array<{
    accountId: string
    calendarId?: string
  }>
  timeMin?: string
  timeMax?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
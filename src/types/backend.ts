export interface Account {
  id: string
  user_id: string
  provider: string
  email: string
  status: string
  provider_user_id: string
  created_at: string
}

export interface Rule {
  id: string
  connected_account_id: string
  name: string
  is_active: boolean
  trigger_conditions: object
  action_params: object
  created_at: string
  updated_at: string
}

// --- NIEUW (Feature 1) ---
export interface AutomationLog {
  id: number
  timestamp: string // ISO 8601 date string
  status: 'success' | 'failure' | 'skipped' | 'pending'
  trigger_details: {
    google_event_id?: string
    trigger_summary?: string
    trigger_time?: string
  } | null
  action_details: {
    created_event_id?: string
    created_event_summary?: string
    reminder_time?: string
  } | null
  error_message: string
}
// --- EINDE NIEUW ---

export interface ApiResponse<T> {
  data: T
  message?: string
}
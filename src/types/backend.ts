// Backend API Types
// These types are derived from the backend models in internal/domain/models.go

// Backend response types (PascalCase)
export interface BackendUser {
  ID: string; // UUID
  Email: string;
  Name: string;
  CreatedAt: string; // ISO timestamp
  UpdatedAt: string;
}

// Parsed types for store (camelCase)
export interface User {
  id: string; // UUID
  email: string;
  name: string;
  createdAt: string; // ISO timestamp
  updatedAt: string;
}

export enum ProviderType {
  Google = 'google',
  Microsoft = 'microsoft',
}

export enum AccountStatus {
  Active = 'active',
  Revoked = 'revoked',
  Error = 'error',
  Paused = 'paused',
}

// Backend response types (PascalCase from actual backend)
export interface BackendConnectedAccount {
  ID: string; // UUID
  UserID: string; // UUID
  Provider: ProviderType;
  Email: string;
  ProviderUserID: string;
  // access_token and refresh_token not exposed (encrypted)
  TokenExpiry: string | null; // ISO timestamp
  Scopes: string[];
  Status: AccountStatus;
  CreatedAt: string;
  UpdatedAt: string;
  LastChecked: string | null;
}

// Parsed types for store (camelCase)
export interface ConnectedAccount {
  id: string; // UUID
  userId: string; // UUID
  provider: ProviderType;
  email: string;
  providerUserId: string;
  // accessToken and refreshToken not exposed
  tokenExpiry: string | null; // ISO timestamp
  scopes: string[];
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
  lastChecked: string | null;
}

// Backend JSONB types (snake_case keys)
export interface BackendTriggerConditions {
  summary_equals?: string; // e.g., "Dienst"
  summary_contains?: string[]; // Fallback array
  location_equals?: string; // e.g., "Amsterdam"
  location_contains?: string; // Partial match
  description_contains?: string; // e.g., "important"
  status_equals?: string; // e.g., "confirmed", "tentative", "cancelled"
  creator_contains?: string; // e.g., "SDB Planning"
  organizer_contains?: string; // e.g., "specific person"
  start_time_after?: string; // ISO time e.g., "06:00:00" for early shifts
  start_time_before?: string; // ISO time e.g., "14:00:00" for late shifts
  end_time_after?: string; // ISO time e.g., "13:45:00"
  end_time_before?: string; // ISO time e.g., "21:00:00"
}

// Parsed types (camelCase)
export interface TriggerConditions {
  summaryEquals?: string; // e.g., "Dienst"
  summaryContains?: string[]; // Fallback array
  locationEquals?: string; // e.g., "Amsterdam"
  locationContains?: string; // Partial match
  descriptionContains?: string; // e.g., "important"
  statusEquals?: string; // e.g., "confirmed", "tentative", "cancelled"
  creatorContains?: string; // e.g., "SDB Planning"
  organizerContains?: string; // e.g., "specific person"
  startTimeAfter?: string; // ISO time e.g., "06:00:00" for early shifts
  startTimeBefore?: string; // ISO time e.g., "14:00:00" for late shifts
  endTimeAfter?: string; // ISO time e.g., "13:45:00"
  endTimeBefore?: string; // ISO time e.g., "21:00:00"
}

// Backend JSONB types (snake_case keys)
export interface BackendActionParams {
  offset_minutes: number; // e.g., -60 for 1 hour before
  duration_min: number; // e.g., 5 for reminder duration
  title_prefix?: string;
}

// Parsed types (camelCase)
export interface ActionParams {
  offsetMinutes: number; // e.g., -60 for 1 hour before
  durationMin: number; // e.g., 5 for reminder duration
  titlePrefix?: string;
}

// Backend response types (PascalCase, JSONB as strings or objects)
export interface BackendAutomationRule {
  ID: string; // UUID
  ConnectedAccountID: string; // UUID
  Name: string;
  IsActive: boolean;
  TriggerConditions: string | BackendTriggerConditions; // JSON string or object
  ActionParams: string | BackendActionParams; // JSON string or object
  CreatedAt: string;
  UpdatedAt: string;
}

// Parsed types for store (camelCase, parsed JSONB)
export interface AutomationRule {
  id: string; // UUID
  connectedAccountId: string; // UUID
  name: string;
  isActive: boolean;
  triggerConditions: TriggerConditions; // Parsed
  actionParams: ActionParams; // Parsed
  createdAt: string;
  updatedAt: string;
}

export enum AutomationLogStatus {
  Pending = 'pending',
  Success = 'success',
  Failure = 'failure',
  Skipped = 'skipped',
}

// Backend response type (PascalCase)
export interface BackendAutomationLog {
  ID: string; // UUID
  ConnectedAccountID: string; // UUID
  RuleID: string | null; // UUID
  Status: AutomationLogStatus;
  Details: string;
  Timestamp: string; // ISO
}

// Parsed type (camelCase)
export interface AutomationLog {
  id: string; // UUID
  connectedAccountId: string; // UUID
  ruleId: string | null; // UUID
  status: AutomationLogStatus;
  details: string;
  timestamp: string; // ISO
}


// Calendar Event Response (from GET /accounts/{account_id}/events)
export interface CalendarEventResponse {
  id: string;
  summary: string;
  description?: string;
  start: string; // ISO timestamp
  end: string; // ISO timestamp
  location?: string;
  status?: string;
}
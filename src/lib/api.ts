import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import type {
  BackendConnectedAccount,
  BackendTriggerConditions,
  BackendActionParams,
  BackendAutomationRule,
  BackendAutomationLog,
  BackendUser,
  TriggerConditions,
  ActionParams,
  AutomationRule,
  User
} from '../types/backend';

// Base API configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 10000, // 10 seconds timeout to prevent hanging
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/session
});

// Request interceptor to add auth token if available (future: from store or cookies)
api.interceptors.request.use(
  (config) => {
    // Example: const token = getTokenFromStore();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Global error handling, e.g., toast notifications
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      window.location.href = '/login';
    } else if (error.response && error.response.status >= 500) {
      // Log detailed server error information
      console.error('Server error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response.data,
        message: error.message,
      });
    } else if (error.response) {
      // Log other HTTP errors
      console.error('HTTP error:', {
        status: error.response.status,
        url: error.config?.url,
        data: error.response.data,
      });
    } else if (error.request) {
      // Log network errors (no response received)
      console.error('Network error - no response:', {
        url: error.config?.url,
        message: error.message,
      });
    } else {
      // Log other errors
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export axios instance
export { api };

// API Functions using React Query

// Users
export const useCreateUserMutation = (queryClient: QueryClient) => {
  return useMutation<BackendUser, Error, Partial<User>>({
    mutationFn: (userData: Partial<User>) => {
      const backendData = {
        email: userData.email,
        name: userData.name,
      };
      return api.post('/users', backendData).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Connected Accounts
export const useConnectedAccountsQuery = (userId: string) => {
  return useQuery<BackendConnectedAccount[]>({
    queryKey: ['accounts', userId],
    queryFn: async () => {
      console.log('Fetching accounts for userId:', userId);
      try {
        const response = await api.get(`/users/${userId}/accounts`);
        console.log('Accounts response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
      }
    },
    enabled: !!userId, // Only fetch if userId exists
    retry: 1, // Only retry once
    retryDelay: 1000,
    staleTime: 30000,
  });
};

// Event Summary type from backend
export interface EventSummary {
  summary: string;
  location?: string;
  description?: string;
  start_time?: string; // ISO timestamp
  count: number;
}

// Event Summaries (for dropdown selection)
export const useEventSummariesQuery = (accountId: string) => {
  return useQuery<EventSummary[]>({
    queryKey: ['event-summaries', accountId],
    queryFn: () => api.get(`/accounts/${accountId}/events/summaries`).then((res) => res.data),
    enabled: !!accountId,
    staleTime: 60000, // Cache for 1 minute
  });
};

// Automation Rules
export const useAutomationRulesQuery = (connectedAccountId: string) => {
  return useQuery<BackendAutomationRule[]>({
    queryKey: ['rules', connectedAccountId],
    queryFn: () => api.get(`/accounts/${connectedAccountId}/rules`).then((res) => res.data),
    enabled: !!connectedAccountId, // Enabled - backend endpoint implemented
  });
};

// Helper to transform to backend format
function toBackendTriggerConditions(tc: TriggerConditions): BackendTriggerConditions {
  return {
    summary_equals: tc.summaryEquals,
    summary_contains: tc.summaryContains,
    location_equals: tc.locationEquals,
    location_contains: tc.locationContains,
    description_contains: tc.descriptionContains,
    status_equals: tc.statusEquals,
    creator_contains: tc.creatorContains,
    organizer_contains: tc.organizerContains,
    start_time_after: tc.startTimeAfter,
    start_time_before: tc.startTimeBefore,
    end_time_after: tc.endTimeAfter,
    end_time_before: tc.endTimeBefore,
  };
}

function toBackendActionParams(ap: ActionParams): BackendActionParams {
  return {
    offset_minutes: ap.offsetMinutes,
    duration_min: ap.durationMin,
    title_prefix: ap.titlePrefix,
  };
}

// Helper to convert backend format to frontend format
function fromBackendTriggerConditions(btc: BackendTriggerConditions): TriggerConditions {
  return {
    summaryEquals: btc.summary_equals,
    summaryContains: btc.summary_contains,
    locationEquals: btc.location_equals,
    locationContains: btc.location_contains,
    descriptionContains: btc.description_contains,
    statusEquals: btc.status_equals,
    creatorContains: btc.creator_contains,
    organizerContains: btc.organizer_contains,
    startTimeAfter: btc.start_time_after,
    startTimeBefore: btc.start_time_before,
    endTimeAfter: btc.end_time_after,
    endTimeBefore: btc.end_time_before,
  };
}

function fromBackendActionParams(bap: BackendActionParams): ActionParams {
  return {
    offsetMinutes: bap.offset_minutes,
    durationMin: bap.duration_min,
    titlePrefix: bap.title_prefix,
  };
}

// Helper to parse backend rule to frontend with error handling
function parseAutomationRule(backendRule: BackendAutomationRule): AutomationRule {
  let triggerConditions: TriggerConditions = {};
  let actionParams: ActionParams = { offsetMinutes: -60, durationMin: 5 };

  try {
    // Check if it's already an object (backend may send as object instead of string)
    if (typeof backendRule.TriggerConditions === 'string') {
      const parsed = JSON.parse(backendRule.TriggerConditions) as BackendTriggerConditions;
      triggerConditions = fromBackendTriggerConditions(parsed);
    } else {
      triggerConditions = fromBackendTriggerConditions(backendRule.TriggerConditions as BackendTriggerConditions);
    }
  } catch (error) {
    console.error('Failed to parse TriggerConditions:', error);
  }

  try {
    // Check if it's already an object (backend may send as object instead of string)
    if (typeof backendRule.ActionParams === 'string') {
      const parsed = JSON.parse(backendRule.ActionParams) as BackendActionParams;
      actionParams = fromBackendActionParams(parsed);
    } else {
      actionParams = fromBackendActionParams(backendRule.ActionParams as BackendActionParams);
    }
  } catch (error) {
    console.error('Failed to parse ActionParams, using defaults:', error);
  }

  return {
    id: backendRule.ID,
    connectedAccountId: backendRule.ConnectedAccountID,
    name: backendRule.Name,
    isActive: backendRule.IsActive,
    createdAt: backendRule.CreatedAt,
    updatedAt: backendRule.UpdatedAt,
    triggerConditions,
    actionParams,
  };
}

export const useCreateAutomationRuleMutation = (queryClient: QueryClient) => {
  return useMutation<AutomationRule, Error, {
    connected_account_id: string;
    name: string;
    trigger_conditions: TriggerConditions;
    action_params: ActionParams;
  }>({
    mutationFn: (ruleData) => {
      const backendData = {
        connected_account_id: ruleData.connected_account_id,
        name: ruleData.name,
        trigger_conditions: toBackendTriggerConditions(ruleData.trigger_conditions),
        action_params: toBackendActionParams(ruleData.action_params),
      };
      return api.post('/rules', backendData).then((res) => {
        const backendRule = res.data as BackendAutomationRule;
        return parseAutomationRule(backendRule);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};

// Update Rule Status (Toggle active/inactive)
export const useUpdateRuleStatusMutation = (queryClient: QueryClient) => {
  return useMutation<AutomationRule, Error, { ruleId: string; isActive: boolean }>({
    mutationFn: ({ ruleId, isActive }) => {
      return api.patch(`/rules/${ruleId}/toggle`, { is_active: isActive }).then((res) => {
        const backendRule = res.data as BackendAutomationRule;
        return parseAutomationRule(backendRule);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};

// Delete Rule
export const useDeleteRuleMutation = (queryClient: QueryClient) => {
  return useMutation<void, Error, string>({
    mutationFn: (ruleId: string) => {
      return api.delete(`/rules/${ruleId}`).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};

// Disconnect Account
export const useDisconnectAccountMutation = (queryClient: QueryClient) => {
  return useMutation<void, Error, string>({
    mutationFn: (accountId: string) => {
      return api.delete(`/accounts/${accountId}`).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

// Automation Logs
export const useAutomationLogsQuery = (connectedAccountId?: string) => {
  return useQuery<BackendAutomationLog[]>({
    queryKey: ['logs', connectedAccountId],
    queryFn: () => {
      // Use the query endpoint for flexibility
      return api.get(`/logs/query?account_id=${connectedAccountId}`).then((res) => res.data);
    },
    enabled: !!connectedAccountId, // Only fetch when we have an account ID
    staleTime: 5000,
  });
};

// Generic API hooks
export const useApiQuery = <T>(key: string[], url: string, config?: AxiosRequestConfig) => {
  return useQuery<T>({
    queryKey: ['api', ...key],
    queryFn: () => api.get(url, config).then((res) => res.data),
  });
};

export const useApiMutation = <T, V>(url: string, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (variables: V) => api.post(url, variables).then((res) => res.data as T),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api'] });
    },
  });
};
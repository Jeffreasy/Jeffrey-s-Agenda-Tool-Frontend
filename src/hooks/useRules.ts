import {
  useAutomationRulesQuery,
  useCreateAutomationRuleMutation,
  useUpdateRuleStatusMutation,
  useDeleteRuleMutation
} from '@/lib/api'
import {
  AutomationRule,
  BackendAutomationRule,
  TriggerConditions,
  ActionParams,
  BackendTriggerConditions,
  BackendActionParams
} from '@/types/backend'
import { useQueryClient } from '@tanstack/react-query'

// Helper to convert backend snake_case to frontend camelCase
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

export function useRules(connectedAccountId?: string) {
  const queryClient = useQueryClient()
  const { data: rules, ...query } = useAutomationRulesQuery(connectedAccountId || '')

  // Parse backend data to frontend types with error handling
  const parsedRules: AutomationRule[] = (rules || []).map((rule: BackendAutomationRule): AutomationRule => {
    let triggerConditions: TriggerConditions = {};
    let actionParams: ActionParams = { offsetMinutes: -60, durationMin: 5 };

    try {
      // Check if it's already an object (backend may send as object instead of string)
      if (typeof rule.TriggerConditions === 'string') {
        const parsed = JSON.parse(rule.TriggerConditions) as BackendTriggerConditions;
        triggerConditions = fromBackendTriggerConditions(parsed);
      } else {
        triggerConditions = fromBackendTriggerConditions(rule.TriggerConditions as BackendTriggerConditions);
      }
    } catch (error) {
      console.error(`Failed to parse TriggerConditions for rule ${rule.ID}:`, error);
    }

    try {
      // Check if it's already an object (backend may send as object instead of string)
      if (typeof rule.ActionParams === 'string') {
        const parsed = JSON.parse(rule.ActionParams) as BackendActionParams;
        actionParams = fromBackendActionParams(parsed);
      } else {
        actionParams = fromBackendActionParams(rule.ActionParams as BackendActionParams);
      }
    } catch (error) {
      console.error(`Failed to parse ActionParams for rule ${rule.ID}, using defaults:`, error);
    }

    return {
      id: rule.ID,
      connectedAccountId: rule.ConnectedAccountID,
      name: rule.Name,
      isActive: rule.IsActive,
      createdAt: rule.CreatedAt,
      updatedAt: rule.UpdatedAt,
      triggerConditions,
      actionParams,
    };
  });

  const createMutation = useCreateAutomationRuleMutation(queryClient)
  const updateStatusMutation = useUpdateRuleStatusMutation(queryClient)
  const deleteMutation = useDeleteRuleMutation(queryClient)

  const createRule = (ruleData: {
    connected_account_id: string
    name: string
    trigger_conditions: TriggerConditions
    action_params: ActionParams
  }) => {
    return createMutation.mutateAsync(ruleData)
  }

  const toggleRuleStatus = (ruleId: string, isActive: boolean) => {
    return updateStatusMutation.mutateAsync({ ruleId, isActive })
  }

  const deleteRule = (ruleId: string) => {
    return deleteMutation.mutateAsync(ruleId)
  }

  return {
    rules: parsedRules,
    ...query,
    createRule,
    toggleRuleStatus,
    deleteRule,
    isCreating: createMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
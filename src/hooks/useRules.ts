// src/hooks/useRules.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { Rule, TriggerConditions, ActionParams } from '../types/backend'

interface CreateRuleData {
  connected_account_id: string
  name: string
  trigger_conditions: TriggerConditions
  action_params: ActionParams
}

interface UpdateRuleData {
  name: string
  trigger_conditions: TriggerConditions
  action_params: ActionParams
}

export const useRules = (accountId?: string) => {
  return useQuery({
    queryKey: ['rules', accountId],
    queryFn: async () => {
      const response = await api.get<Rule[]>(`/accounts/${accountId}/rules`)
      return response.data
    },
    enabled: !!accountId,
  })
}

export const useCreateRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (rule: CreateRuleData) => {
      // De 'rule' data die binnenkomt heeft al de juiste 'connected_account_id'
      const response = await api.post<Rule>(
        `/accounts/${rule.connected_account_id}/rules`, // Aangepaste URL om accountId op te nemen
        rule
      )
      return response.data
    },
    onSuccess: (data) => {
      // Gebruik hier de correcte 'connected_account_id'
      queryClient.invalidateQueries({ queryKey: ['rules', data.connected_account_id] })
    },
  })
}

export const useUpdateRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ ruleId, data }: { ruleId: string; data: UpdateRuleData }) => {
      const response = await api.put<Rule>(`/rules/${ruleId}`, data)
      return response.data
    },
    onSuccess: (data) => {
      // Gebruik hier de correcte 'connected_account_id'
      queryClient.invalidateQueries({ queryKey: ['rules', data.connected_account_id] })
    },
  })
}

export const useToggleRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ruleId: string) => {
      const response = await api.put<Rule>(`/rules/${ruleId}/toggle`)
      return response.data
    },
    onSuccess: (data) => {
      // Gebruik hier de correcte 'connected_account_id'
      queryClient.invalidateQueries({ queryKey: ['rules', data.connected_account_id] })
    },
  })
}

export const useDeleteRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ruleId: string) => {
      await api.delete(`/rules/${ruleId}`)
    },
    onSuccess: () => {
      // Invalideer alle 'rules' queries. Dit is prima.
      queryClient.invalidateQueries({ queryKey: ['rules'] })
    },
  })
}
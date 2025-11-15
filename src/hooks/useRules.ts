import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { Rule } from '../types/backend'

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

interface CreateRuleData {
  connected_account_id: string
  name: string
  trigger_conditions: object
  action_params: object
}

export const useCreateRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (rule: CreateRuleData) => {
      const response = await api.post<Rule>('/rules', rule)
      return response.data
    },
    onSuccess: (data) => {
      // Invalideer specifiek voor dit account
      queryClient.invalidateQueries({ queryKey: ['rules', data.connected_account_id] })
    },
  })
}

// --- NIEUW (Feature 2) ---
export const useDeleteRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ruleId: string) => {
      await api.delete(`/rules/${ruleId}`)
    },
    onSuccess: (_, variables, context) => {
      // We weten niet welk accountId het was, dus invalideer alle rules
      // Een betere implementatie zou het accountId meegeven
      queryClient.invalidateQueries({ queryKey: ['rules'] })
    },
  })
}
// --- EINDE NIEUW ---
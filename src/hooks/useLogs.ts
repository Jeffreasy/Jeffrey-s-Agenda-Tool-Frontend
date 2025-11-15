import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { AutomationLog } from '../types/backend'

export const useLogs = (accountId?: string) => {
  return useQuery({
    queryKey: ['logs', accountId],
    queryFn: async () => {
      const response = await api.get<AutomationLog[]>(`/accounts/${accountId}/logs`)
      return response.data
    },
    enabled: !!accountId, // Voer alleen uit als we een accountId hebben
    refetchInterval: 60000, // Haal elke minuut opnieuw op
  })
}
import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { Account } from '../types/backend'

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await api.get<Account[]>('/accounts')
      return response.data
    },
  })
}
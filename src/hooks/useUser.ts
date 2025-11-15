// src/hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get<User>('/users/me')
      return response.data
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await api.delete('/me')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      // Redirect to login na delete
      window.location.href = '/'
    },
  })
}
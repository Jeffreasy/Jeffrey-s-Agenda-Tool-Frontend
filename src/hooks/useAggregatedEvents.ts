// src/hooks/useAggregatedEvents.ts
import { useMutation } from '@tanstack/react-query'
import api from '../lib/api'
import { GoogleCalendarEvent, AggregatedEventsRequest } from '../types/backend'

export const useAggregatedEvents = () => {
  return useMutation({
    mutationFn: async (data: AggregatedEventsRequest) => {
      const response = await api.post<GoogleCalendarEvent[]>('/calendar/aggregated-events', data)
      return response.data
    },
  })
}
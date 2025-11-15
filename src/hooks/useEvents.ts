// src/hooks/useEvents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { GoogleCalendarEvent, CreateEventData, UpdateEventData } from '../types/backend'

export const useEvents = (accountId?: string, calendarId?: string) => {
  return useQuery({
    queryKey: ['events', accountId, calendarId],
    queryFn: async () => {
      if (!accountId) return [] // Voorkom een call zonder accountId

      // Haal de events op van de backend
      // De backend stuurt de ruwe Google Calendar events door
      const params: any = calendarId ? { calendarId } : {}
      // Stel timeMin en timeMax in voor unlimited fetching
      params.timeMin = '1900-01-01T00:00:00Z'
      params.timeMax = '2100-12-31T23:59:59Z'
      const response = await api.get<GoogleCalendarEvent[]>(
        `/accounts/${accountId}/calendar/events`,
        { params }
      )
      return response.data
    },
    enabled: !!accountId, // Voer alleen uit als we een accountId hebben
  })
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ accountId, data, calendarId }: { accountId: string; data: CreateEventData; calendarId?: string }) => {
      const params = calendarId ? { calendarId } : {}
      const response = await api.post<GoogleCalendarEvent>(
        `/accounts/${accountId}/calendar/events`,
        data,
        { params }
      )
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events', variables.accountId, variables.calendarId] })
    },
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ accountId, eventId, data, calendarId }: { accountId: string; eventId: string; data: UpdateEventData; calendarId?: string }) => {
      const params = calendarId ? { calendarId } : {}
      const response = await api.put<GoogleCalendarEvent>(
        `/accounts/${accountId}/calendar/events/${eventId}`,
        data,
        { params }
      )
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events', variables.accountId, variables.calendarId] })
    },
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ accountId, eventId, calendarId }: { accountId: string; eventId: string; calendarId?: string }) => {
      const params = calendarId ? { calendarId } : {}
      await api.delete(`/accounts/${accountId}/calendar/events/${eventId}`, { params })
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events', variables.accountId, variables.calendarId] })
    },
  })
}
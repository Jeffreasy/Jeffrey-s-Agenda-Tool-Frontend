// src/components/EventManager.tsx
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form-field'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../hooks/useEvents'
import { useAggregatedEvents } from '../hooks/useAggregatedEvents'
import { useAccounts } from '../hooks/useAccounts'
import { GoogleCalendarEvent, CreateEventData, UpdateEventData } from '../types/backend'
import { Trash2, Edit, Plus } from 'lucide-react'
import { toast } from 'sonner'

const eventSchema = z.object({
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().optional(),
  location: z.string().optional(),
  startDateTime: z.string().min(1, 'Start date/time is required'),
  endDateTime: z.string().min(1, 'End date/time is required'),
  calendarId: z.string().optional(),
})

type EventFormData = z.infer<typeof eventSchema>

interface EventManagerProps {
  accountId: string
}

export const EventManager: React.FC<EventManagerProps> = ({ accountId }) => {
  const [editingEvent, setEditingEvent] = useState<GoogleCalendarEvent | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { data: events, isLoading: eventsLoading, refetch } = useEvents(accountId)
  const { data: accounts } = useAccounts()
  const createEvent = useCreateEvent()
  const updateEvent = useUpdateEvent()
  const deleteEvent = useDeleteEvent()
  const aggregatedEvents = useAggregatedEvents()

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      summary: '',
      description: '',
      location: '',
      startDateTime: '',
      endDateTime: '',
      calendarId: '',
    },
  })

  const handleCreateEvent = (data: EventFormData) => {
    const eventData: CreateEventData = {
      summary: data.summary,
      description: data.description,
      location: data.location,
      start: {
        dateTime: data.startDateTime,
        timeZone: 'Europe/Amsterdam',
      },
      end: {
        dateTime: data.endDateTime,
        timeZone: 'Europe/Amsterdam',
      },
    }

    createEvent.mutate(
      {
        accountId,
        data: eventData,
        calendarId: data.calendarId || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Event created successfully')
          setIsCreateDialogOpen(false)
          form.reset()
          refetch()
        },
        onError: () => {
          toast.error('Failed to create event')
        },
      }
    )
  }

  const handleUpdateEvent = (data: EventFormData) => {
    if (!editingEvent) return

    const eventData: UpdateEventData = {
      summary: data.summary,
      description: data.description,
      location: data.location,
      start: {
        dateTime: data.startDateTime,
        timeZone: 'Europe/Amsterdam',
      },
      end: {
        dateTime: data.endDateTime,
        timeZone: 'Europe/Amsterdam',
      },
    }

    updateEvent.mutate(
      {
        accountId,
        eventId: editingEvent.id,
        data: eventData,
        calendarId: data.calendarId || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Event updated successfully')
          setEditingEvent(null)
          form.reset()
          refetch()
        },
        onError: () => {
          toast.error('Failed to update event')
        },
      }
    )
  }

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent.mutate(
        { accountId, eventId },
        {
          onSuccess: () => {
            toast.success('Event deleted successfully')
            refetch()
          },
          onError: () => {
            toast.error('Failed to delete event')
          },
        }
      )
    }
  }

  const handleEditEvent = (event: GoogleCalendarEvent) => {
    setEditingEvent(event)
    form.reset({
      summary: event.summary,
      description: event.description || '',
      location: event.location || '',
      startDateTime: event.start.dateTime || '',
      endDateTime: event.end.dateTime || '',
      calendarId: '',
    })
  }

  const handleAggregatedEvents = () => {
    if (!accounts) return

    const requestData = {
      accounts: accounts.map(account => ({
        accountId: account.id,
        calendarId: 'primary',
      })),
    }

    aggregatedEvents.mutate(requestData, {
      onSuccess: (data) => {
        console.log('Aggregated events:', data)
        toast.success(`Fetched ${data.length} aggregated events`)
      },
      onError: () => {
        toast.error('Failed to fetch aggregated events')
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Manager</CardTitle>
          <CardDescription>Manage your calendar events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateEvent)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary</FormLabel>
                          <FormControl>
                            <Input placeholder="Event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Event description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Event location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startDateTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date/Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDateTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date/Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="calendarId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calendar ID (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={createEvent.isPending}>
                      {createEvent.isPending ? 'Creating...' : 'Create Event'}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Button onClick={handleAggregatedEvents} disabled={aggregatedEvents.isPending}>
              {aggregatedEvents.isPending ? 'Loading...' : 'Load Aggregated Events'}
            </Button>
          </div>

          {eventsLoading ? (
            <p>Loading events...</p>
          ) : (
            <div className="space-y-2">
              {events?.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{event.summary}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.start.dateTime || event.start.date} - {event.end.dateTime || event.end.date}
                    </p>
                    {event.location && <p className="text-sm">{event.location}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Event Dialog */}
      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateEvent)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Input placeholder="Event title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Event description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Event location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date/Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date/Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="calendarId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calendar ID (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={updateEvent.isPending}>
                  {updateEvent.isPending ? 'Updating...' : 'Update Event'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
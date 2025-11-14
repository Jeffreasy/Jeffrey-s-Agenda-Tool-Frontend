import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { api } from '../lib/api'
import { CalendarEventResponse, ConnectedAccount } from '@/types/backend'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Loader2, RefreshCw, Calendar as CalendarIcon } from 'lucide-react'

// Constants
const ERROR_MESSAGES = {
  NO_ACCOUNT: 'No active Google account connected.',
  SERVER_ERROR: 'Backend server error occurred.',
  AUTH_ERROR: 'Authentication error. Please reconnect your account.',
  NOT_FOUND: 'Account not found.',
  NETWORK_ERROR: 'Network error. Please check if backend is running.',
  GENERIC: 'Failed to load events.',
} as const

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const

// Types
interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  extendedProps?: {
    description?: string
    location?: string
    status?: string
  }
}

interface CalendarViewProps {
  accounts?: ConnectedAccount[]
}

interface AxiosError {
  response?: {
    status?: number
    data?: {
      error?: string
      message?: string
      details?: string
    }
  }
  message?: string
}

// Utility functions
const transformEventsToCalendarFormat = (events: CalendarEventResponse[]): CalendarEvent[] => {
  return events.map(event => ({
    id: event.id,
    title: event.summary,
    start: event.start,
    end: event.end,
    extendedProps: {
      description: event.description,
      location: event.location,
      status: event.status,
    },
  }))
}

const getErrorMessage = (err: AxiosError): string => {
  if (err.response) {
    const { status, data } = err.response
    
    switch (status) {
      case HTTP_STATUS.SERVER_ERROR:
        return data?.message || ERROR_MESSAGES.SERVER_ERROR
      case HTTP_STATUS.UNAUTHORIZED:
      case HTTP_STATUS.FORBIDDEN:
        return ERROR_MESSAGES.AUTH_ERROR
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_MESSAGES.NOT_FOUND
      default:
        return ERROR_MESSAGES.GENERIC
    }
  }
  
  return err.message || ERROR_MESSAGES.NETWORK_ERROR
}

export function CalendarView({ accounts }: CalendarViewProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Memoize active account to prevent unnecessary recalculations
  const activeAccount = useMemo(
    () => accounts?.find(acc => acc.status === 'active'),
    [accounts]
  )

  // Memoize fetchEvents to prevent unnecessary recreations
  const fetchEvents = useCallback(async (accId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.get<CalendarEventResponse[]>(`/accounts/${accId}/events`)
      const transformedEvents = transformEventsToCalendarFormat(response.data)
      
      setEvents(transformedEvents)
    } catch (err) {
      const errorMessage = getErrorMessage(err as AxiosError)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Effect to load events when active account changes
  useEffect(() => {
    if (!activeAccount) {
      setError(ERROR_MESSAGES.NO_ACCOUNT)
      setLoading(false)
      return
    }
    
    fetchEvents(activeAccount.id)
  }, [activeAccount, fetchEvents])

  // Memoize refresh handler
  const handleRefresh = useCallback(() => {
    if (activeAccount) {
      fetchEvents(activeAccount.id)
    }
  }, [activeAccount, fetchEvents])

  // Memoize calendar configuration
  const calendarConfig = useMemo(() => ({
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth' as const,
    contentHeight: 600,
    expandRows: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    eventDisplay: 'block' as const,
    nowIndicator: true,
    eventClassNames: 'cursor-pointer hover:opacity-80 transition-opacity',
    dayCellClassNames: 'hover:bg-accent/50 transition-colors',
    dayMaxEvents: 3,
    moreLinkClick: 'popover' as const,
    eventMaxStack: 3,
    views: {
      dayGridMonth: {
        dayMaxEvents: 3,
      },
    },
  }), [])

  // Memoize event count description
  const eventDescription = useMemo(
    () => events.length > 0 ? `${events.length} events loaded` : 'No events found',
    [events.length]
  )

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Calendar Overview</CardTitle>
              <CardDescription className="mt-1">
                {eventDescription}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!loading && !error && (
              <Badge variant="secondary" className="text-xs">
                Synced
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={loading || !activeAccount}
              className="group"
              aria-label="Refresh calendar events"
            >
              <RefreshCw className={`h-4 w-4 transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium mb-2">Loading Calendar Events</p>
            <p className="text-sm text-muted-foreground">Fetching your upcoming events...</p>
          </div>
        )}
        
        {error && (
          <div className="rounded-lg border-2 border-destructive/50 bg-destructive/10 p-6 animate-scale-in">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-destructive/20 p-2 shrink-0">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-destructive mb-1">Cannot Load Calendar</h3>
                  <p className="text-sm text-destructive/90">{error}</p>
                </div>
                
                <div className="p-3 rounded-md bg-destructive/20 text-xs space-y-2">
                  <p className="font-semibold text-destructive">Troubleshooting Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-destructive/80">
                    <li>Verify backend is running at http://localhost:8080</li>
                    <li>Try disconnecting and reconnecting your Google account</li>
                    <li>Check backend logs for detailed error information</li>
                    <li>Ensure account has Google Calendar API permissions</li>
                  </ol>
                </div>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                  aria-label="Retry loading events"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {!loading && !error && (
          <div className="animate-fade-in overflow-hidden rounded-lg">
            <div className="calendar-container [&_.fc]:h-full [&_.fc-view]:overflow-hidden [&_.fc-scroller]:!overflow-visible">
              <FullCalendar
                {...calendarConfig}
                events={events}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
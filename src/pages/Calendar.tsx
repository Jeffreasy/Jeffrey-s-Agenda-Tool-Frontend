// src/pages/Calendar.tsx
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Layout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { EventManager } from '../components/EventManager'
import { useAccounts } from '../hooks/useAccounts'
import { useEvents } from '../hooks/useEvents'

const Calendar: React.FC = () => {
  const { data: accounts } = useAccounts()
  // AANGEPAST: Gebruik 'id' (lowercase)
  const firstAccountId = accounts?.[0]?.id
  const { data: events, isLoading } = useEvents(firstAccountId)

  // AANGEPAST: Dit blok gebruikt nu de juiste (lowercase) properties
  const calendarEvents = events?.map(event => ({
    // Gebruik 'id' en 'summary' (lowercase)
    id: event.id,
    title: event.summary,

    // Gebruik 'start' en 'end' (lowercase)
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date,
  })) || []

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">View and manage your calendar events</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Your events from connected account</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading events...</p>
            ) : (
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                height="600px"
              />
            )}
          </CardContent>
        </Card>

        {firstAccountId && <EventManager accountId={firstAccountId} />}
      </div>
    </Layout>
  )
}

export default Calendar
import React from 'react'
import { Layout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const Calendar: React.FC = () => {
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
            <CardDescription>FullCalendar integration coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar component will be implemented here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Calendar
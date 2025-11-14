import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStore } from '@/lib/store'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

interface LogTableProps {
  limit?: number
}

// Helper to safely access log details
const getLogDetails = (details: string): { ruleName: string; eventSummary: string; errorMessage?: string } => {
  try {
    const parsed = JSON.parse(details)
    return {
      ruleName: (parsed.ruleName as string) || 'Automation Rule',
      eventSummary: (parsed.eventSummary as string) || (parsed.summary as string) || 'No event data',
      errorMessage: parsed.errorMessage as string
    }
  } catch {
    return {
      ruleName: 'Automation Rule',
      eventSummary: details || 'No event data'
    }
  }
}

export function LogTable({ limit }: LogTableProps) {
  const { logs } = useStore()
  const displayLogs = limit ? logs.slice(0, limit) : logs

  if (logs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No Logs Yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Activity logs from your automation rules will appear here once they start running.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-base font-semibold">Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Rule</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLogs.map((log, index) => {
                const details = getLogDetails(log.details)
                return (
                  <TableRow
                    key={log.id}
                    className="animate-fade-in hover:bg-accent/30 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {log.status === 'success' ? (
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Success</span>
                          </div>
                        ) : log.status === 'failure' ? (
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
                            <XCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Failed</span>
                          </div>
                        ) : log.status === 'skipped' ? (
                          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Skipped</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs font-medium">Pending</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-sm">
                          {details.ruleName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Rule ID: {log.ruleId ? log.ruleId.substring(0, 8) + '...' : 'N/A'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm">
                          {details.eventSummary}
                        </p>
                        {details.errorMessage && (
                          <p className="text-xs text-destructive truncate max-w-xs">{details.errorMessage}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={log.status === 'success' ? 'default' : log.status === 'failure' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        {limit && logs.length > limit && (
          <div className="p-4 border-t bg-muted/20 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {limit} of {logs.length} logs
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
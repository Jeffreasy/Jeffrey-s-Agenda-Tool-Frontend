import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Server, Database, Activity, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'loading'
  database: boolean
  services: string[]
  timestamp?: string
}

// Hook for reusable health status logic
export function useHealthStatus() {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'loading',
    database: false,
    services: [],
  })

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/health`)
        if (response.ok) {
          const data = await response.json()
          setHealth({
            status: 'healthy',
            database: data.database || true,
            services: data.services || ['API', 'Auth', 'Calendar Sync'],
            timestamp: new Date().toISOString(),
          })
        } else {
          setHealth({
            status: 'unhealthy',
            database: false,
            services: [],
            timestamp: new Date().toISOString(),
          })
        }
      } catch {
        setHealth({
          status: 'unhealthy',
          database: false,
          services: [],
          timestamp: new Date().toISOString(),
        })
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return health
}

// Compact header version
export function HealthIndicatorCompact() {
  const health = useHealthStatus()
  
  const StatusIcon = health.status === 'healthy' ? CheckCircle : health.status === 'unhealthy' ? XCircle : Loader2
  const statusColor = health.status === 'healthy' ? 'text-green-500' : health.status === 'unhealthy' ? 'text-red-500' : 'text-muted-foreground'

  return (
    <div className="flex items-center gap-3 text-sm">
      {/* Backend Status */}
      <div className="flex items-center gap-1.5">
        <Server className="h-3.5 w-3.5 text-muted-foreground" />
        <StatusIcon className={`h-3.5 w-3.5 ${statusColor} ${health.status === 'loading' ? 'animate-spin' : ''}`} />
      </div>
      
      {/* Database Status */}
      <div className="flex items-center gap-1.5">
        <Database className="h-3.5 w-3.5 text-muted-foreground" />
        <StatusIcon className={`h-3.5 w-3.5 ${statusColor} ${health.status === 'loading' ? 'animate-spin' : ''}`} />
      </div>
      
      {/* Services Count */}
      <div className="flex items-center gap-1.5">
        <Activity className="h-3.5 w-3.5 text-muted-foreground" />
        <Badge variant={health.status === 'healthy' ? 'default' : 'secondary'} className="h-5 px-1.5 text-xs">
          {health.services.length}
        </Badge>
      </div>
    </div>
  )
}

// Full card version (original)
export function HealthIndicator() {
  const health = useHealthStatus()

  const StatusIcon = health.status === 'healthy' ? CheckCircle : health.status === 'unhealthy' ? XCircle : Loader2
  const statusColor = health.status === 'healthy' ? 'text-green-500' : health.status === 'unhealthy' ? 'text-red-500' : 'text-muted-foreground'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Backend Status */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Backend API</CardTitle>
          <div className="rounded-full bg-primary/10 p-2">
            <Server className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-6 w-6 ${statusColor} ${health.status === 'loading' ? 'animate-spin' : ''}`} />
            <div className="flex-1">
              <div className="text-2xl font-bold">
                {health.status === 'loading' ? 'Checking...' : health.status === 'healthy' ? 'Online' : 'Offline'}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {health.timestamp ? `Last checked: ${new Date(health.timestamp).toLocaleTimeString()}` : 'Initializing...'}
              </p>
            </div>
          </div>
          <Badge variant={health.status === 'healthy' ? 'default' : health.status === 'unhealthy' ? 'destructive' : 'secondary'}>
            {health.status}
          </Badge>
        </CardContent>
      </Card>

      {/* Database Status */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Database</CardTitle>
          <div className="rounded-full bg-primary/10 p-2">
            <Database className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-6 w-6 ${statusColor} ${health.status === 'loading' ? 'animate-spin' : ''}`} />
            <div className="flex-1">
              <div className="text-2xl font-bold">
                {health.status === 'loading' ? 'Checking...' : health.database ? 'Connected' : 'Disconnected'}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                PostgreSQL Database
              </p>
            </div>
          </div>
          <Badge variant={health.database ? 'default' : 'destructive'}>
            {health.database ? 'active' : 'inactive'}
          </Badge>
        </CardContent>
      </Card>

      {/* Services Status */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Services</CardTitle>
          <div className="rounded-full bg-primary/10 p-2">
            <Activity className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-6 w-6 ${statusColor} ${health.status === 'loading' ? 'animate-spin' : ''}`} />
            <div className="flex-1">
              <div className="text-2xl font-bold">
                {health.status === 'loading' ? 'Loading...' : `${health.services.length} Active`}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Running services
              </p>
            </div>
          </div>
          {health.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {health.services.map((service, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
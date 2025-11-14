import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout'
import { CalendarView } from '@/components/calendar-view'
import { LogTable } from '@/components/log-table'
import { RulesManager } from '@/components/rules-manager'
import { useStore } from '@/lib/store'
import { useAccounts } from '@/hooks/useAccounts'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setAuthenticated, setLogs } = useStore()

  // Extract userId from OAuth callback URL parameters
  const userId = searchParams.get('userId') || ''

  // Check authentication - require userId from OAuth callback
  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }
  }, [userId, navigate])

  // Fetch real accounts from backend using the userId from OAuth callback
  const { accounts, isLoading: accountsLoading, error: accountsError } = useAccounts(userId)

  // Initialize empty logs once
  useEffect(() => {
    setLogs([])
  }, [setLogs])

  // Mark as authenticated on successful OAuth callback
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setAuthenticated(true)
    }
  }, [searchParams, setAuthenticated])

  // Get first active account for rules manager
  const activeAccount = accounts?.find((acc) => acc.status === 'active')
  
  console.log('Dashboard render - accounts:', accounts?.length || 0)

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Error State */}
        {accountsError && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 animate-scale-in">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-destructive">Error Loading Accounts</h3>
                <p className="text-sm text-destructive/90">{(accountsError as Error).message}</p>
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="destructive" size="sm">
                <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/google/login`}>
                  Try Connecting Again
                </a>
              </Button>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {!accountsError && accountsLoading && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium mb-2">Loading Your Connected Accounts</p>
            <p className="text-sm text-muted-foreground">
              {userId ? `User ID: ${userId.substring(0, 8)}...` : 'No user ID found in URL'}
            </p>
          </div>
        )}
        
        {/* No User ID State */}
        {!accountsError && !accountsLoading && !userId && (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
            <div className="rounded-full bg-muted p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No User ID Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Please log in via Google OAuth to access your dashboard and connect your calendar.
            </p>
            <Button asChild size="lg">
              <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/google/login`}>
                Connect Google Account
              </a>
            </Button>
          </div>
        )}
        
        {/* No Accounts State */}
        {!accountsError && !accountsLoading && userId && accounts?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
            <div className="rounded-full bg-muted p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Connected Accounts</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect a Google account to get started with automated calendar reminders.
            </p>
            <Button asChild size="lg">
              <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/google/login`}>
                Connect Google Account
              </a>
            </Button>
          </div>
        )}
        
        {/* Main Dashboard Content */}
        {!accountsError && !accountsLoading && accounts && accounts.length > 0 && (
          <>
            {/* Calendar and Rules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Calendar - Takes 2/3 of space on large screens */}
              <div className="lg:col-span-2 animate-slide-in-from-left">
                <CalendarView accounts={accounts} />
              </div>
              
              {/* Rules Sidebar - Takes 1/3 of space on large screens */}
              <div className="space-y-6 animate-slide-in-from-right">
                {activeAccount ? (
                  <RulesManager connectedAccountId={activeAccount.id} />
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium mb-1">No Active Account</p>
                    <p className="text-sm text-muted-foreground">
                      Connect a Google account to create automation rules
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Logs Section */}
            <div className="space-y-4 animate-slide-in-from-bottom">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Recent Automation Logs</h2>
                <span className="text-sm text-muted-foreground">Last 10 entries</span>
              </div>
              <LogTable limit={10} />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}
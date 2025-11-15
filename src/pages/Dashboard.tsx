import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button' // <-- NIEUW
import { RuleForm } from '../components/rule-form'
import { useAccounts } from '../hooks/useAccounts'
import { useRules, useDeleteRule } from '../hooks/useRules' // <-- AANGEPAST
import { useLogs } from '../hooks/useLogs' // <-- NIEUW
import { useAuthStore } from '../stores/authStore'
import { format } from 'date-fns' // <-- NIEUW
import { Trash2, CheckCircle, XCircle, SkipForward } from 'lucide-react' // <-- NIEUW

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      console.log("Gevonden token! Opslaan...")
      setToken(token)
      navigate('/dashboard', { replace: true })
    }
  }, [searchParams, setToken, navigate])

  // Data hooks
  const { data: accounts, isLoading: accountsLoading } = useAccounts()
  const firstAccountId = accounts?.[0]?.id

  const { data: rules, isLoading: rulesLoading } = useRules(firstAccountId)
  const { data: logs, isLoading: logsLoading } = useLogs(firstAccountId) // <-- NIEUW (Feature 1)

  // Action hooks
  const deleteRule = useDeleteRule() // <-- NIEUW (Feature 2)

  // --- NIEUW (Feature 1) ---
  const renderLogIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failure':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'skipped':
        return <SkipForward className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  // --- NIEUW (Feature 1) ---
  const getLogMessage = (log: any): string => {
    if (log.status === 'success' && log.action_details?.created_event_summary) {
      return `Created event: "${log.action_details.created_event_summary}"`
    }
    if (log.status === 'failure') {
      return `Failed: ${log.error_message}`
    }
    if (log.status === 'skipped' && log.trigger_details?.trigger_summary) {
      return `Skipped (already exists): "${log.trigger_details.trigger_summary}"`
    }
    return `Processed rule for "${log.trigger_details?.trigger_summary || 'event'}"`
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your accounts and automation rules</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* --- CARD 1: Connected Accounts (Aangepast voor duidelijkheid) --- */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                {accountsLoading ? 'Loading...' : `${accounts?.length || 0} accounts connected`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accountsLoading && <p>Loading accounts...</p>}
              {accounts?.map((account) => (
                <div key={account.id} className="flex justify-between items-center py-2">
                  <span>{account.email}</span>
                  <span className={`text-sm ${account.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {account.status === 'active' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* --- CARD 2: Automation Rules (ZWAAR AANGEPAST) --- */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                {rulesLoading ? 'Loading...' : `${rules?.length || 0} rules active`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {firstAccountId && <RuleForm accountId={firstAccountId} />}

              {/* --- NIEUWE LIJST (Feature 2) --- */}
              <div className="mt-6 space-y-2">
                {rulesLoading && <p className="text-sm text-muted-foreground">Loading rules...</p>}
                {!rulesLoading && rules?.length === 0 && (
                  <p className="text-sm text-muted-foreground">No rules created yet.</p>
                )}
                {rules?.map((rule) => (
                  <div key={rule.id} className="flex justify-between items-center p-2 rounded-md border">
                    <span className="text-sm font-medium">{rule.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteRule.mutate(rule.id)}
                      disabled={deleteRule.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              {/* --- EINDE NIEUWE LIJST --- */}

            </CardContent>
          </Card>
        </div>

        {/* --- CARD 3: Recent Activity (ZWAAR AANGEPAST) --- */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest automation events</CardDescription>
          </CardHeader>
          <CardContent>
            {/* --- NIEUWE LIJST (Feature 1) --- */}
            {logsLoading && <p className="text-sm text-muted-foreground">Loading activity...</p>}
            {!logsLoading && logs?.length === 0 && (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {logs?.map((log) => (
                <div key={log.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {renderLogIcon(log.status)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{getLogMessage(log)}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(log.timestamp), 'dd MMM yyyy, HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* --- EINDE NIEUWE LIJST --- */}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard
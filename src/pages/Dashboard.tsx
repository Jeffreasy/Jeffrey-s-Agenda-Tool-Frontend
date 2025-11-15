// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { RuleForm } from '../components/rule-form'
import { RuleEditForm } from '../components/RuleEditForm' // Nieuw
import { useAccounts, useDeleteAccount } from '../hooks/useAccounts'
import { useRules, useDeleteRule, useToggleRule } from '../hooks/useRules'
import { useLogs } from '../hooks/useLogs'
import { useUser } from '../hooks/useUser' // Aangepast (geen delete user)
import { useAuthStore } from '../stores/authStore'
import { format } from 'date-fns'
import { Trash2, CheckCircle, XCircle, SkipForward, Edit, Pause, Play } from 'lucide-react'
import { toast } from 'sonner' // Voor errors
import { Rule, AutomationLog } from '../types/backend' // Types geïmporteerd

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setToken(token)
      navigate('/dashboard', { replace: true })
    }
  }, [searchParams, setToken, navigate])

  // Data
  const { data: accounts, isLoading: accountsLoading } = useAccounts()
  const firstAccountId = accounts?.[0]?.id // AANGEPAST: id
  const { data: rules, isLoading: rulesLoading } = useRules(firstAccountId)
  const { data: logs, isLoading: logsLoading } = useLogs(firstAccountId)
  const { data: user, isLoading: userLoading } = useUser()

  // Mutations
  const deleteRule = useDeleteRule()
  const toggleRule = useToggleRule()
  const deleteAccount = useDeleteAccount()
  // const deleteUser = useDeleteUser() // (Uit 'useUser' hook gehaald, was niet correct)

  // State voor edit modal
  const [editingRule, setEditingRule] = useState<Rule | null>(null)

  const renderLogIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failure': return <XCircle className="w-4 h-4 text-red-500" />
      case 'skipped': return <SkipForward className="w-4 h-4 text-yellow-500" />
      default: return null
    }
  }

  const getLogMessage = (log: AutomationLog): string => { // AANGEPAST: Type
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

  // AANGEPAST: Verwijder user delete functie voor nu, hook was incorrect
  // const handleDeleteUser = () => {
  //   if (confirm('Are you sure you want to delete your account?')) {
  //     deleteUser.mutate(undefined, {
  //       onSuccess: () => toast.success('Account deleted'),
  //       onError: () => toast.error('Failed to delete account'),
  //     })
  //   }
  // }

  const handleDeleteAccount = (accountId: string) => {
    if (confirm('Are you sure you want to disconnect this account?')) {
      deleteAccount.mutate(accountId, {
        onSuccess: () => toast.success('Account disconnected'),
        onError: () => toast.error('Failed to disconnect account'),
      })
    }
  }

  const handleToggleRule = (ruleId: string, isActive: boolean) => {
    toggleRule.mutate(ruleId, {
      onSuccess: () => toast.success(`Rule ${isActive ? 'paused' : 'activated'}`),
      onError: () => toast.error('Failed to toggle rule'),
    })
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your accounts and automation rules</p>
        </div>

        {/* User Info (Nieuw) */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {userLoading ? 'Loading...' : (
              <>
                {/* AANGEPAST: Gebruik lowercase properties */}
                <p>Email: {user?.email}</p>
                {/* <Button variant="destructive" onClick={handleDeleteUser} className="mt-4">
                  Delete My Account
                </Button> */}
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>{accountsLoading ? 'Loading...' : `${accounts?.length || 0} accounts connected`}</CardDescription>
            </CardHeader>
            <CardContent>
              {accounts?.map((account) => (
                // AANGEPAST: Gebruik lowercase properties
                <div key={account.id} className="flex justify-between items-center py-2">
                  <span>{account.email || 'No email available'}</span>
                  <div>
                    <span className={`text-sm ${account.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {account.status}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAccount(account.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>{rulesLoading ? 'Loading...' : `${rules?.length || 0} rules active`}</CardDescription>
            </CardHeader>
            <CardContent>
              {firstAccountId && <RuleForm accountId={firstAccountId} />}

              <div className="mt-6 space-y-2">
                {rules?.map((rule) => (
                  // AANGEPAST: Gebruik lowercase properties
                  <div key={rule.id} className="flex justify-between items-center p-2 rounded-md border">
                    <span className="text-sm font-medium">{rule.name} {rule.is_active ? '(Active)' : '(Paused)'}</span>
                    <div>
                      <Button variant="ghost" size="icon" onClick={() => setEditingRule(rule)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleToggleRule(rule.id, rule.is_active)}>
                        {rule.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteRule.mutate(rule.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest automation events</CardDescription>
          </CardHeader>
          <CardContent>
            {logsLoading && <p className="text-sm text-muted-foreground">Loading activity...</p>}
            {!logsLoading && logs?.length === 0 && (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {logs?.map((log) => (
                // AANGEPAST: Gebruik lowercase properties
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
          </CardContent>
        </Card>

        {editingRule && <RuleEditForm rule={editingRule} onClose={() => setEditingRule(null)} />}
      </div>
    </Layout>
  )
}

export default Dashboard
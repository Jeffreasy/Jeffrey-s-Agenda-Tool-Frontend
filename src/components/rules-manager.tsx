import { RuleForm } from '@/components/rule-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRules } from '@/hooks/useRules'
import { Clock, AlertCircle, Trash2, MoreVertical, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface RulesManagerProps {
  connectedAccountId: string
}

export function RulesManager({ connectedAccountId }: RulesManagerProps) {
  const { rules, isLoading, toggleRuleStatus, deleteRule, isDeleting } = useRules(connectedAccountId)

  const handleToggleRule = async (ruleId: string, currentStatus: boolean) => {
    try {
      await toggleRuleStatus(ruleId, !currentStatus)
      toast.success(`Rule ${!currentStatus ? 'activated' : 'deactivated'}`)
    } catch (error) {
      toast.error('Failed to update rule status')
    }
  }

  const handleDeleteRule = async (ruleId: string) => {
    try {
      await deleteRule(ruleId)
      toast.success('Rule deleted successfully')
    } catch (error) {
      toast.error('Failed to delete rule')
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Rule Form */}
      <Card className="border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Create Automation Rule</CardTitle>
          <CardDescription>
            Define conditions and actions for automatic calendar reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RuleForm connectedAccountId={connectedAccountId} />
        </CardContent>
      </Card>

      {/* Existing Rules List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Active Rules</CardTitle>
              <CardDescription className="mt-1">
                {isLoading ? 'Loading...' : `${rules.length} ${rules.length === 1 ? 'rule' : 'rules'} configured`}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-base px-3 py-1">
              {rules.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Loading rules...</p>
            </div>
          ) : rules.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="rounded-full bg-muted p-4 mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No Rules Yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-4">
                Create your first automation rule above to start adding automatic reminders to your calendar events.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {rules.map((rule, index) => (
                <li 
                  key={rule.id} 
                  className="group p-4 border rounded-lg hover:bg-accent/50 hover:border-accent transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-base">{rule.name}</h4>
                        <button
                          onClick={() => handleToggleRule(rule.id, rule.isActive)}
                          disabled={isDeleting}
                        >
                          <Badge 
                            variant={rule.isActive ? 'default' : 'secondary'}
                            className="text-xs cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{rule.actionParams.offsetMinutes} min offset</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{rule.actionParams.durationMin} min duration</span>
                        </div>
                      </div>
                      
                      {rule.triggerConditions.summaryEquals && (
                        <div className="flex items-start gap-2 p-2 rounded bg-muted/50 text-xs">
                          <span className="text-muted-foreground">Triggers when:</span>
                          <span className="font-medium">&ldquo;{rule.triggerConditions.summaryEquals}&rdquo;</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={isDeleting}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteRule(rule.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
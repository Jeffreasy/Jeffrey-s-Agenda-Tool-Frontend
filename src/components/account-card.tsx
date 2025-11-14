import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProviderType, AccountStatus, ConnectedAccount } from '@/types/backend'
import { User, Mail, Calendar, Shield, AlertCircle } from 'lucide-react'

interface AccountCardProps {
  account: ConnectedAccount
  onDisconnect?: () => void
}

// Map AccountStatus to Badge variants
const statusVariants: Record<AccountStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  revoked: 'destructive',
  error: 'destructive',
  paused: 'secondary',
}

const providerIcons: Record<ProviderType, React.ReactNode> = {
  google: <User className="h-4 w-4" />,
  microsoft: <Mail className="h-4 w-4" />,
}

const statusMessages: Record<AccountStatus, string> = {
  active: 'Connected and syncing',
  revoked: 'Access revoked',
  error: 'Connection error',
  paused: 'Temporarily paused',
}

export function AccountCard({ account, onDisconnect }: AccountCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            {providerIcons[account.provider]}
          </div>
          <div>
            <p className="text-sm font-medium">{account.email}</p>
            <p className="text-xs text-muted-foreground">{statusMessages[account.status]}</p>
          </div>
        </CardTitle>
        <Badge variant={statusVariants[account.status]} className="shrink-0">
          {account.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Provider User ID</p>
              <p className="font-mono text-xs truncate">{account.providerUserId}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <Shield className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Scopes</p>
              <div className="flex flex-wrap gap-1">
                {account.scopes.map((scope, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-background border"
                  >
                    {scope}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {account.lastChecked && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Last Checked</p>
                <p className="text-xs font-medium">{new Date(account.lastChecked).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
        
        {onDisconnect && (
          <div className="pt-2 border-t">
            <Button
              onClick={onDisconnect}
              variant="ghost"
              size="sm"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Disconnect Account
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
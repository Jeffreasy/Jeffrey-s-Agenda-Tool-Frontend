import { useConnectedAccountsQuery, useDisconnectAccountMutation } from '@/lib/api'
import { ConnectedAccount, BackendConnectedAccount, AccountStatus } from '@/types/backend'
import { useQueryClient } from '@tanstack/react-query'

export function useAccounts(userId?: string) {
  const queryClient = useQueryClient()
  const { data: accounts, ...query } = useConnectedAccountsQuery(userId || '')
  const disconnectMutation = useDisconnectAccountMutation(queryClient)

  // Parse backend data to frontend types - explicit mapping from PascalCase
  const parsedAccounts: ConnectedAccount[] = (accounts || []).map((acc: BackendConnectedAccount) => ({
    id: acc.ID,
    userId: acc.UserID,
    provider: acc.Provider,
    email: acc.Email,
    providerUserId: acc.ProviderUserID,
    tokenExpiry: acc.TokenExpiry,
    scopes: acc.Scopes,
    status: acc.Status.toLowerCase() as AccountStatus, // Normalize to lowercase
    createdAt: acc.CreatedAt,
    updatedAt: acc.UpdatedAt,
    lastChecked: acc.LastChecked,
  }));

  const disconnectAccount = (accountId: string) => {
    return disconnectMutation.mutateAsync(accountId)
  }

  return {
    accounts: parsedAccounts,
    ...query,
    disconnectAccount,
    isDisconnecting: disconnectMutation.isPending,
  }
}
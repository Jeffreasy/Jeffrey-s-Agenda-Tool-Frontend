import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, ConnectedAccount, AutomationRule, AutomationLog } from '@/types/backend'

interface AppState {
  user: User | null
  accounts: ConnectedAccount[]
  rules: AutomationRule[]
  logs: AutomationLog[]
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setAccounts: (accounts: ConnectedAccount[]) => void
  addAccount: (account: ConnectedAccount) => void
  setRules: (rules: AutomationRule[]) => void
  addRule: (rule: AutomationRule) => void
  updateRule: (id: string, updates: Partial<AutomationRule>) => void
  deleteRule: (id: string) => void
  setLogs: (logs: AutomationLog[]) => void
  addLog: (log: AutomationLog) => void
  setAuthenticated: (auth: boolean) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      accounts: [],
      rules: [],
      logs: [],
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setAccounts: (accounts) => set({ accounts }),
      addAccount: (account) => set((state) => ({ accounts: [...state.accounts, account] })),
      setRules: (rules) => set({ rules }),
      addRule: (rule) => set((state) => ({ rules: [...state.rules, rule] })),
      updateRule: (id, updates) =>
        set((state) => ({
          rules: state.rules.map((rule) =>
            rule.id === id ? { ...rule, ...updates } : rule
          ),
        })),
      deleteRule: (id) =>
        set((state) => ({
          rules: state.rules.filter((rule) => rule.id !== id),
        })),
      setLogs: (logs) => set({ logs }),
      addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: 'agenda-automator-storage',
    }
  )
)
import { create } from 'zustand'

interface AuthState {
  token: string | null
  setToken: (token: string | null) => void
}

const getInitialToken = () => {
  return localStorage.getItem('user_token')
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('user_token', token)
    } else {
      localStorage.removeItem('user_token')
    }
    set({ token })
  },
}))
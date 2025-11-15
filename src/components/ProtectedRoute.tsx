import React, { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [searchParams] = useSearchParams()
  const { token, setToken } = useAuthStore()
  const urlToken = searchParams.get('token')

  useEffect(() => {
    if (urlToken) {
      setToken(urlToken)
    }
  }, [urlToken, setToken])

  if (!token && !urlToken) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
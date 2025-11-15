import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const Login: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google/login`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Agenda Automator</CardTitle>
          <CardDescription>
            Sign in with Google to manage your calendar automations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGoogleLogin}
            className="w-full"
            size="lg"
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
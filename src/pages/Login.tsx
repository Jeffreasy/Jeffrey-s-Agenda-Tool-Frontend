import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Shield, Zap, Chrome } from 'lucide-react'

export default function Login() {
  const handleLogin = () => {
    // Use Vite env variable
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google/login`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <div className="w-full max-w-md space-y-8 animate-scale-in">
        {/* Logo/Brand Section */}
        <div className="text-center space-y-2 animate-slide-in-from-top">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
            <Calendar className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to manage your calendar automation
          </p>
        </div>

        {/* Main Login Card */}
        <Card className="border-2 animate-slide-in-from-bottom">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription className="text-base">
              Connect with your Google account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign In Button */}
            <Button 
              onClick={handleLogin} 
              className="w-full h-12 text-base font-medium group"
              size="lg"
            >
              <Chrome className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Sign in with Google
            </Button>

            {/* Features List */}
            <div className="pt-4 space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Automatic Reminders</p>
                  <p className="text-muted-foreground text-xs">Add reminders to events automatically</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Smart Rules</p>
                  <p className="text-muted-foreground text-xs">Create custom automation rules</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Secure & Private</p>
                  <p className="text-muted-foreground text-xs">Your data is encrypted and protected</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Secure OAuth 2.0
                </span>
              </div>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              By signing in, you agree to our Terms of Service and Privacy Policy. 
              We only access your calendar data to create automated reminders.
            </p>
          </CardContent>
        </Card>

        {/* Bottom Link */}
        <p className="text-center text-sm text-muted-foreground animate-fade-in">
          Don&apos;t have an account?{' '}
          <button 
            onClick={handleLogin}
            className="text-primary hover:underline font-medium"
          >
            Sign up with Google
          </button>
        </p>
      </div>
    </div>
  )
}
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Calendar, Zap, Shield, ArrowRight } from 'lucide-react'
import { MainLayout } from '@/components/layout'

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-slide-in-from-top">
            <Zap className="h-4 w-4" />
            <span>Intelligent Calendar Automation</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl animate-slide-in-from-bottom">
            Automate Your Calendar Reminders with{' '}
            <span className="text-primary">Smart Rules</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl animate-slide-in-from-bottom" style={{ animationDelay: '0.1s' }}>
            Connect your Google Calendar and create intelligent automation rules that add reminders to your events automatically. Never miss an important meeting again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-from-bottom" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="group">
              <Link to="/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Auto-Reminders</h3>
            <p className="text-muted-foreground">
              Automatically add reminders to calendar events based on custom rules and conditions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Rules</h3>
            <p className="text-muted-foreground">
              Create complex automation rules with multiple conditions and actions for precise control.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your calendar data is encrypted and secure. We only access what&apos;s necessary for automation.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border animate-scale-in">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Automate Your Calendar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join and start creating smart automation rules in minutes. No credit card required.
          </p>
          <Button asChild size="lg" className="group">
            <Link to="/login">
              Connect Google Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
import { ThemeToggle } from '@/components/theme-toggle'
import { Calendar } from 'lucide-react'
import { ReactNode } from 'react'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with enhanced styling */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 animate-slide-in-from-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">Agenda Automator</h1>
              <p className="hidden sm:block text-xs text-muted-foreground">Smart Calendar Rules</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 animate-slide-in-from-right">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content with improved spacing */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>

      {/* Enhanced footer */}
      <footer className="w-full border-t bg-muted/30 mt-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>© 2025 Agenda Automator</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
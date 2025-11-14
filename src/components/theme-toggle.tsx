import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="relative group">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9 hover:bg-accent transition-all duration-200 relative"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
        
        {/* Hover indicator for extra polish */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-6" />
      </Button>
      
      {/* Tooltip on hover */}
      <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
        <div className="absolute -top-1 right-4 w-2 h-2 bg-popover rotate-45" />
      </div>
    </div>
  )
}
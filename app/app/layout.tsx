'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { MessageCircle, TrendingUp, BarChart3, Gift, Moon, Sun } from 'lucide-react'

const navItems = [
  { href: '/app/check-in', icon: MessageCircle, label: 'Check-In' },
  { href: '/app/markets', icon: TrendingUp, label: 'Markets' },
  { href: '/app/trends', icon: BarChart3, label: 'Trends' },
  { href: '/app/rewards', icon: Gift, label: 'Rewards' },
]

function ThemeToggle(): JSX.Element | null {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 transition-smooth touch-manipulation shadow-md hover:shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
    </button>
  )
}

export default function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Desktop Sidebar - Premium */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-border/50 bg-card shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border/50 bg-gradient-to-b from-card to-card/50">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl transition-smooth">
                <span className="text-primary-foreground font-bold text-base">M</span>
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">MindScoreAI</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pb-24 lg:pb-8">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-background/95 border-b border-border/40">
          <div className="flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">MindScoreAI</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t border-border/40 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-1 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl min-w-[64px] min-h-[56px] touch-manipulation ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className={`text-xs font-semibold ${isActive ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

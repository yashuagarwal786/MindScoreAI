'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Moon, Sun, MessageCircle, BarChart3, TrendingUp, Shield, Users, MapPin } from 'lucide-react'

interface AnimatedCounterProps {
  target: number
  duration?: number
}

const AnimatedCounter = ({ target, duration = 2000 }: AnimatedCounterProps): JSX.Element => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('counter-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return <span>{count.toLocaleString()}</span>
}

const ThemeToggle = (): JSX.Element | null => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-3 rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 transition-smooth touch-manipulation shadow-md hover:shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
    </button>
  )
}

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header - Premium Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">MindScoreAI</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/onboarding">
              <Button className="rounded-full px-7 h-11 font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-smooth">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Premium */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div 
          className={`max-w-3xl mx-auto text-center transition-all duration-[var(--motion-reveal)] relative z-10 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Now available: Anonymous emotional wellness tracking
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance mb-8">
            <span className="block">Track How You Feel.</span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Predict How You'll Improve.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            Anonymous emotional check-ins turned into insight and rewards. Understand yourself better, one conversation at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button 
                size="lg" 
                className="w-full sm:w-auto rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-smooth hover:scale-105"
              >
                Start Free Check-In
              </Button>
            </Link>
            <Link href="/demo">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto rounded-full px-10 h-14 text-base font-semibold bg-transparent hover:bg-muted/50 transition-smooth"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Premium */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">
              How MindScoreAI Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to better understand your emotional wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Chat',
                description: 'Have a quick, anonymous conversation with our empathetic AI about how you\'re feeling.',
              },
              {
                icon: BarChart3,
                title: 'Score',
                description: 'Receive a personalized emotional wellness score based on your check-in.',
              },
              {
                icon: TrendingUp,
                title: 'Predict',
                description: 'Commit to your improvement predictions and earn rewards as you grow.',
              },
            ].map((item, index) => (
              <Card 
                key={item.title}
                className={`relative p-8 rounded-3xl border border-border/50 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/30 transition-smooth group cursor-pointer overflow-hidden ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/20 transition-smooth">
                    <item.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* City Stress Index Preview - Premium */}
      <section id="counter-section" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 rounded-3xl border border-border/50 shadow-2xl shadow-primary/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">City Stress Index</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-bold mb-4">San Francisco</h3>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-7xl sm:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <AnimatedCounter target={67} />
                </span>
                <span className="text-2xl text-muted-foreground font-semibold">/100</span>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-semibold">
                <span className="w-2 h-2 rounded-full bg-current" />
                Moderate Stress
              </div>
              <p className="mt-8 text-muted-foreground leading-relaxed text-lg">
                See how your city compares. All data is completely anonymous and aggregated.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Safety & Ethics - Premium */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-8">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                Your Emotional Safety Comes First
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                MindScoreAI is designed to support reflection, not replace professional care. We never store personally identifiable information, and our AI is trained to recognize when you might need additional support.
              </p>
              <ul className="space-y-4">
                {[
                  'Completely anonymous check-ins',
                  'No personal data collection',
                  'Gentle escalation to resources when needed',
                  'Non-clinical, supportive language',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-muted-foreground group cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2.5 group-hover:scale-150 transition-transform" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <div className="relative w-56 h-56">
                {/* Outer circle with gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl animate-pulse" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                {/* Shield icon center */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full">
                  <Shield className="w-20 h-20 text-primary drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Premium */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Growing Community</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-balance">
              Trusted by Thousands
            </h2>
          </div>
          
          <div className="grid grid-cols-3 gap-6 lg:gap-12">
            {[
              { value: 50000, label: 'Check-ins Completed', suffix: '+' },
              { value: 12000, label: 'Active Users', suffix: '+' },
              { value: 45, label: 'Cities Tracked', suffix: '' },
            ].map((stat) => (
              <Card key={stat.label} className="p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-smooth group text-center">
                <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-4 inline-flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/20 transition-smooth">
                  <div className="text-5xl sm:text-6xl font-bold text-primary">
                    <AnimatedCounter target={stat.value} />
                  </div>
                </div>
                <span className="text-5xl sm:text-6xl font-bold text-primary">{stat.suffix}</span>
                <div className="text-muted-foreground text-base font-medium mt-4">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-balance">
            Ready to Understand Yourself Better?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Start your first anonymous check-in today. It takes less than 5 minutes.
          </p>
          <Link href="/onboarding">
            <Button 
              size="lg" 
              className="rounded-full px-12 h-14 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40 transition-smooth hover:scale-105"
            >
              Get Started Free
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-8">
            No credit card required • Completely anonymous
          </p>
        </div>
      </section>

      {/* Footer - Premium */}
      <footer className="py-12 px-4 sm:px-6 border-t border-border/50 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">M</span>
                </div>
                <span className="font-semibold">MindScoreAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Supporting emotional wellness, one check-in at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Security', 'Demo'].map(item => (
                  <li key={item} className="text-sm text-muted-foreground hover:text-foreground transition-smooth cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                  <li key={item} className="text-sm text-muted-foreground hover:text-foreground transition-smooth cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Cookies', 'Compliance'].map(item => (
                  <li key={item} className="text-sm text-muted-foreground hover:text-foreground transition-smooth cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 MindScoreAI. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map(item => (
                <button key={item} className="text-xs text-muted-foreground hover:text-primary transition-smooth">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

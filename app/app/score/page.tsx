'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TrendingUp, BarChart3, Sparkles } from 'lucide-react'

function AnimatedScore({ score }: { score: number }) {
  const [currentScore, setCurrentScore] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCurrentScore(Math.floor(easeOut * score))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [score])
  
  // Calculate the stroke dashoffset for the circular progress
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (currentScore / 100) * circumference
  
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-100"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7BC47F" />
            <stop offset="100%" stopColor="#7C6AE6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-bold text-foreground">{currentScore}</span>
        <span className="text-lg text-muted-foreground">/100</span>
      </div>
    </div>
  )
}

export default function ScorePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const score = 72 // This would come from the check-in analysis
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: 'Thriving', color: 'text-green-600 dark:text-green-400' }
    if (score >= 60) return { label: 'Balanced', color: 'text-primary' }
    if (score >= 40) return { label: 'Reflecting', color: 'text-amber-600 dark:text-amber-400' }
    return { label: 'Seeking Support', color: 'text-muted-foreground' }
  }
  
  const scoreInfo = getScoreLabel(score)
  
  return (
    <div className="min-h-[calc(100vh-64px)] lg:min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div 
        className={`w-full max-w-md transition-all duration-[var(--motion-reveal)] relative z-10 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <Card className="p-10 rounded-3xl border border-border/50 shadow-2xl shadow-primary/15 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Wellness Score</span>
          </div>
          
          <AnimatedScore score={score} />
          
          <div className={`mt-8 text-2xl font-bold transition-smooth ${scoreInfo.color}`}>
            {scoreInfo.label}
          </div>
          
          <p className="mt-6 text-muted-foreground leading-relaxed text-base">
            Your responses show a thoughtful awareness of your emotional state. You're taking positive steps by checking in with yourself.
          </p>
          
          <div className="mt-10 space-y-4">
            <Link href="/app/markets" className="block">
              <Button className="w-full h-14 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 transition-smooth flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Predict My Improvement
              </Button>
            </Link>
            <Link href="/app/trends" className="block">
              <Button 
                variant="outline" 
                className="w-full h-14 rounded-full text-base font-semibold flex items-center justify-center gap-2 hover:bg-muted/50 transition-smooth"
              >
                <BarChart3 className="w-5 h-5" />
                View Trends
              </Button>
            </Link>
          </div>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-8 px-4 leading-relaxed">
          Your score is a reflection tool, not a diagnosis. It's meant to help you notice patterns over time.
        </p>
      </div>
    </div>
  )
}

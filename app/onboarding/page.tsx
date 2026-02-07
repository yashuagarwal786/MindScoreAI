'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, BarChart3, Trophy, ChevronRight, Wallet } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    title: 'Chat anonymously',
    description: 'Have a private conversation with our AI about how you\'re feeling. No judgment, no records.',
  },
  {
    icon: BarChart3,
    title: 'Understand how you feel',
    description: 'Receive insights and a personalized wellness score based on your check-in.',
  },
  {
    icon: Trophy,
    title: 'Predict improvement & earn rewards',
    description: 'Commit to your growth predictions and earn tokens as you improve over time.',
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showWalletConnect, setShowWalletConnect] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowWalletConnect(true)
    }
  }

  const handleSkip = () => {
    router.push('/app/check-in')
  }

  const handleConnectWallet = () => {
    // In production, this would connect to a wallet
    router.push('/app/check-in')
  }

  if (showWalletConnect) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
          <Card className="w-full max-w-md p-8 rounded-3xl border border-border/50 shadow-2xl shadow-primary/15 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mx-auto mb-8">
              <Wallet className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Connect a wallet to earn and manage your reward tokens. This is optional.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={handleConnectWallet}
                className="w-full h-14 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl"
              >
                Connect Wallet
              </Button>
              <Button 
                variant="outline"
                onClick={handleSkip}
                className="w-full h-14 rounded-full text-base font-semibold"
              >
                Skip for now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Progress indicators */}
      <div className="px-6 pt-8 pb-4 relative z-10">
        <div className="flex gap-2 max-w-md mx-auto">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-[var(--motion-transition)] ${
                index <= currentStep ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        <div 
          className="w-full max-w-md text-center transition-all duration-[var(--motion-reveal)]"
          key={currentStep}
        >
          <div 
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-10"
          >
            {(() => {
              const Icon = steps[currentStep].icon
              return <Icon className="w-14 h-14 text-primary" />
            })()}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
            {steps[currentStep].title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-12 pt-4 relative z-10">
        <div className="max-w-md mx-auto space-y-4">
          <Button 
            onClick={handleNext}
            className="w-full h-14 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 transition-smooth flex items-center justify-center gap-2"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline"
            onClick={handleSkip}
            className="w-full h-14 rounded-full text-base font-semibold"
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}

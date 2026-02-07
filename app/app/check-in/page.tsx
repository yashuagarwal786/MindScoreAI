'use client'

import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useState, useRef, useEffect, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Sparkles, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// ✅ Backend URL (from env)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

function TypingIndicator() {
  return (
    <div className="flex gap-2 px-5 py-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function MessageTimestamp({ timestamp }: { timestamp: Date }) {
  return (
    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground/60">
      <Clock className="w-3 h-3" />
      {format(timestamp, 'HH:mm')}
    </div>
  )
}

export default function CheckInPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm here to check in with you. How are you feeling today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    if (!BACKEND_URL) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Backend URL not configured. Please check your environment variables.',
          timestamp: new Date()
        }
      ])
      setIsTyping(false)
      return
    }

    // Simulate response delay for better UX
    setTimeout(() => {
      try {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Thank you for sharing. That sounds important. Can you tell me more about what\'s been on your mind?',
            timestamp: new Date()
          }
        ])
      } catch {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'I\'m having trouble processing that right now. Please try again.',
            timestamp: new Date()
          }
        ])
      }

      setIsTyping(false)
      inputRef.current?.focus()
    }, 1200)
  }

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-2xl" />
      </div>

      {/* Chat Header */}
      <div className="relative z-10 sticky top-0 glass border-b border-border/40 px-4 sm:px-6 py-4 sm:py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">MindScore Check-in</h1>
              <p className="text-xs text-muted-foreground">AI-powered wellness conversation</p>
            </div>
          </div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
        </div>
      </div>

      {/* Messages Container */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-md">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-2xl px-5 py-3.5 max-w-[85%] sm:max-w-md ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-md'
                    : 'bg-card border border-border/50 text-foreground rounded-tl-md'
                }`}>
                  {message.content}
                </div>
                <MessageTimestamp timestamp={message.timestamp} />
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xs font-semibold text-muted-foreground">
                  You
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border/50 rounded-2xl rounded-tl-md shadow-md">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 glass border-t border-border/40 px-4 sm:px-6 py-4 sm:py-5">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as any)
                  }
                }}
                placeholder="Share how you're feeling... (Shift+Enter for new line)"
                disabled={isTyping}
                className="flex-1 p-4 rounded-2xl border border-border/50 bg-muted/50 focus:bg-background focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none placeholder:text-muted-foreground text-foreground max-h-[120px]"
                rows={1}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isTyping || !input.trim()}
              className="h-auto px-5 py-4 rounded-2xl flex items-center gap-2 font-semibold hover:opacity-90"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-2 px-1">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  )
}

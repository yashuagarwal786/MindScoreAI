"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, TrendingUp, Calendar } from "lucide-react";
import { sendEmotion } from "@/lib/api";

export default function DashboardHome() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const data = await sendEmotion(text);
      setResult(data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-8">
      <div className={`max-w-4xl mx-auto transition-all duration-[var(--motion-reveal)] ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-3">
            Welcome back
          </h1>
          <p className="text-lg text-muted-foreground">
            Check in with your emotional wellness today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Heart, label: 'This Week', value: '4 Check-ins', color: 'from-red-500/20 to-pink-500/20' },
            { icon: TrendingUp, label: 'Trend', value: 'Improving ↑', color: 'from-green-500/20 to-emerald-500/20' },
            { icon: Sparkles, label: 'Streak', value: '7 Days', color: 'from-purple-500/20 to-blue-500/20' },
            { icon: Calendar, label: 'Last Check-in', value: '2h ago', color: 'from-orange-500/20 to-yellow-500/20' },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 rounded-2xl border border-border/50 hover:border-primary/30 transition-smooth group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Check-in Card */}
        <Card className="p-8 rounded-3xl border border-border/50 shadow-xl shadow-primary/10 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">New Check-in</h2>
          </div>
          
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)}
            placeholder="How are you feeling right now? Share freely and anonymously..."
            className="w-full p-4 rounded-2xl border border-border bg-muted/50 focus:bg-background focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth resize-none text-foreground placeholder:text-muted-foreground"
            rows={5}
          />
          
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleSubmit}
              disabled={!text.trim() || isLoading}
              className="rounded-full px-8 py-3 font-semibold shadow-lg shadow-primary/20 hover:shadow-xl disabled:opacity-50 transition-smooth"
            >
              {isLoading ? 'Analyzing...' : 'Analyze My Feelings'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => setText("")}
              className="rounded-full px-8 py-3 font-semibold"
            >
              Clear
            </Button>
          </div>
        </Card>

        {/* Results */}
        {result && (
          <Card className={`p-8 rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 shadow-xl transition-smooth ${
            result ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Analysis Complete</h3>
                <div className="space-y-2">
                  <p className="text-lg"><span className="font-semibold">Emotion:</span> <span className="text-primary">{result.emotion}</span></p>
                  <p className="text-lg"><span className="font-semibold">Wellness Score:</span> <span className="text-green-600 dark:text-green-400">{result.score}/100</span></p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

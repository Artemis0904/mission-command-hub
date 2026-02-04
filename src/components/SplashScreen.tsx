import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3500 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'launch' | 'flight' | 'impact'>('launch');

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 20) {
        setPhase('launch');
      } else if (newProgress < 85) {
        setPhase('flight');
      } else {
        setPhase('impact');
      }

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* Ground/horizon line */}
      <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Mountains silhouette */}
      <svg className="absolute bottom-16 left-0 right-0 w-full h-32 text-slate-950/80" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path 
          fill="currentColor" 
          d="M0,120 L0,80 L100,60 L200,75 L300,40 L400,65 L500,30 L600,55 L700,25 L800,50 L900,35 L1000,60 L1100,45 L1200,70 L1200,120 Z"
        />
      </svg>

      {/* Launch pad */}
      <div className="absolute bottom-16 left-16 w-20 h-24">
        <svg viewBox="0 0 80 100" className="w-full h-full">
          {/* Base structure */}
          <rect x="25" y="70" width="30" height="30" fill="hsl(var(--muted))" />
          <rect x="20" y="65" width="40" height="8" fill="hsl(var(--border))" />
          {/* Tower */}
          <rect x="50" y="20" width="8" height="50" fill="hsl(var(--muted-foreground))" />
          <rect x="48" y="15" width="12" height="8" fill="hsl(var(--primary))" />
          {/* Launch smoke effect */}
          {phase === 'launch' && (
            <g className="animate-pulse">
              <ellipse cx="40" cy="95" rx="25" ry="8" fill="hsl(var(--accent) / 0.6)" />
              <ellipse cx="40" cy="90" rx="20" ry="6" fill="hsl(var(--destructive) / 0.5)" />
              <ellipse cx="40" cy="85" rx="15" ry="5" fill="white" opacity="0.8" />
            </g>
          )}
        </svg>
      </div>

      {/* Target zone */}
      <div className="absolute bottom-16 right-24">
        <div className={cn(
          "relative w-16 h-16 transition-all duration-500",
          phase === 'impact' && "scale-125"
        )}>
          {/* Target rings */}
          <div className={cn(
            "absolute inset-0 border-2 border-primary/40 rounded-full",
            phase === 'impact' && "animate-ping"
          )} />
          <div className="absolute inset-2 border-2 border-primary/60 rounded-full" />
          <div className="absolute inset-4 border-2 border-primary/80 rounded-full" />
          <div className={cn(
            "absolute inset-6 bg-primary rounded-full",
            phase === 'impact' && "bg-accent animate-pulse"
          )} />
          
          {/* Impact explosion */}
          {phase === 'impact' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-accent/50 rounded-full animate-ping" />
              <div className="absolute w-12 h-12 bg-destructive/60 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Missile with trajectory */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Trajectory path (parabola) */}
          <path
            d="M 8 85 Q 50 -10 92 85"
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
          
          {/* Missile trail */}
          <defs>
            <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(var(--accent) / 0.5)" />
              <stop offset="100%" stopColor="hsl(var(--destructive))" />
            </linearGradient>
          </defs>
          
          {progress > 5 && progress < 95 && (
            <path
              d="M 8 85 Q 50 -10 92 85"
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="0.5"
              strokeDasharray={`${progress * 1.5} 200`}
              className="drop-shadow-lg"
            />
          )}
        </svg>
        
        {/* Animated Missile */}
        <div 
          className={cn(
            "absolute transition-opacity duration-300",
            progress < 5 || progress > 95 ? "opacity-0" : "opacity-100"
          )}
          style={{
            // Parabolic trajectory calculation
            left: `${8 + (progress / 100) * 84}%`,
            top: `${85 - Math.sin((progress / 100) * Math.PI) * 90}%`,
            transform: `rotate(${progress < 50 ? -45 + (progress / 50) * 45 : (progress - 50) / 50 * 45}deg)`,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-2xl">
            {/* Missile body */}
            <defs>
              <linearGradient id="missileBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--muted-foreground))" />
                <stop offset="50%" stopColor="hsl(var(--foreground))" />
                <stop offset="100%" stopColor="hsl(var(--muted-foreground))" />
              </linearGradient>
              <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="30%" stopColor="hsl(var(--accent))" />
                <stop offset="70%" stopColor="hsl(var(--destructive))" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            
            {/* Nose cone */}
            <path d="M 32 20 L 24 16 L 24 24 Z" fill="hsl(var(--destructive))" />
            
            {/* Main body */}
            <rect x="8" y="17" width="16" height="6" rx="1" fill="url(#missileBody)" />
            
            {/* Fins */}
            <path d="M 8 17 L 4 12 L 8 15 Z" fill="hsl(var(--muted-foreground))" />
            <path d="M 8 23 L 4 28 L 8 25 Z" fill="hsl(var(--muted-foreground))" />
            <path d="M 12 17 L 10 13 L 14 17 Z" fill="hsl(var(--primary))" />
            <path d="M 12 23 L 10 27 L 14 23 Z" fill="hsl(var(--primary))" />
            
            {/* Engine flame */}
            <ellipse cx="4" cy="20" rx="5" ry="3" fill="url(#flameGradient)" className="animate-pulse" />
            <ellipse cx="2" cy="20" rx="3" ry="2" fill="white" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center mb-32">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl animate-float">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          IWTS Control
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Integrated Weapons Training System
        </p>

        {/* Loading bar */}
        <div className="w-80 mx-auto">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className={cn(
              "transition-colors duration-300",
              phase === 'launch' ? "text-accent font-medium" : "text-muted-foreground"
            )}>
              Launch
            </span>
            <span className={cn(
              "transition-colors duration-300",
              phase === 'flight' ? "text-accent font-medium" : "text-muted-foreground"
            )}>
              In Flight
            </span>
            <span className={cn(
              "transition-colors duration-300",
              phase === 'impact' ? "text-accent font-medium" : "text-muted-foreground"
            )}>
              Impact
            </span>
          </div>
        </div>

        {/* Loading percentage */}
        <p className="text-2xl font-mono text-primary mt-6 tabular-nums">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}

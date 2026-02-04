import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import zenLogo from '@/assets/zen-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'visible' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    // Start with enter phase
    setTimeout(() => setPhase('visible'), 100);
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 85) {
        setPhase('exit');
      }

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500",
        phase === 'exit' && "opacity-0"
      )}
    >
      {/* iOS-style gradient mesh background - matches AppLayout */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-purple-50/60 to-pink-100/80 dark:from-blue-950/50 dark:via-purple-950/30 dark:to-slate-900/80" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-transparent dark:from-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-400/30 to-transparent dark:from-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-300/20 via-transparent to-blue-300/20 dark:from-pink-600/10 dark:to-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Glass card container */}
        <div 
          className={cn(
            "relative p-12 rounded-3xl transition-all duration-700 ease-out",
            "bg-white/40 dark:bg-white/5 backdrop-blur-xl",
            "border border-white/50 dark:border-white/10",
            "shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)]",
            "dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]",
            phase === 'enter' && "opacity-0 scale-90 translate-y-4",
            phase === 'visible' && "opacity-100 scale-100 translate-y-0",
            phase === 'exit' && "opacity-0 scale-105 -translate-y-4"
          )}
        >
          {/* Glow effect behind logo */}
          <div 
            className={cn(
              "absolute inset-0 rounded-3xl transition-opacity duration-1000",
              phase === 'visible' ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
            }}
          />

          {/* Main logo */}
          <img 
            src={zenLogo} 
            alt="ZEN Technologies" 
            className={cn(
              "relative w-64 h-auto transition-all duration-700",
              phase === 'visible' && "drop-shadow-lg"
            )}
            style={{
              filter: phase === 'visible' 
                ? 'drop-shadow(0 4px 12px rgba(99,102,241,0.2))'
                : 'none',
            }}
          />
        </div>

        {/* Loading indicator */}
        <div 
          className={cn(
            "mt-8 flex flex-col items-center gap-4 transition-all duration-500",
            phase === 'enter' && "opacity-0 translate-y-4",
            phase === 'visible' && "opacity-100 translate-y-0",
            phase === 'exit' && "opacity-0 -translate-y-2"
          )}
        >
          {/* Progress bar */}
          <div className="w-48 h-1 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full rounded-full transition-all duration-100 ease-out bg-gradient-to-r from-violet-500 to-indigo-500"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 12px rgba(99,102,241,0.5)',
              }}
            />
          </div>
          
          {/* Loading text */}
          <p className="text-sm text-muted-foreground font-medium tracking-wide">
            Loading...
          </p>
        </div>
      </div>

      {/* Version text */}
      <p 
        className={cn(
          "absolute bottom-8 text-xs text-muted-foreground/60 transition-opacity duration-500",
          phase === 'exit' && "opacity-0"
        )}
      >
        C2 Station v1.0
      </p>
    </div>
  );
}

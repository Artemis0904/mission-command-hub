import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import zenLogo from '@/assets/zen-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'glow' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 30) {
        setPhase('enter');
      } else if (newProgress < 85) {
        setPhase('glow');
      } else {
        setPhase('exit');
      }

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow behind logo */}
      <div 
        className={cn(
          "absolute w-[600px] h-[600px] rounded-full transition-all duration-1000",
          phase === 'enter' && "opacity-0 scale-50",
          phase === 'glow' && "opacity-100 scale-100",
          phase === 'exit' && "opacity-0 scale-150"
        )}
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Scanning lines effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{
            top: `${(progress * 1.2) % 120}%`,
            transition: 'top 0.1s linear',
          }}
        />
        <div 
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          style={{
            top: `${((progress * 1.2) + 20) % 120}%`,
            transition: 'top 0.1s linear',
          }}
        />
      </div>

      {/* Logo container with animations */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glowing ring around logo */}
        <div 
          className={cn(
            "absolute -inset-8 rounded-3xl transition-all duration-700",
            phase === 'enter' && "opacity-0 scale-90",
            phase === 'glow' && "opacity-100 scale-100",
            phase === 'exit' && "opacity-0 scale-110"
          )}
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.1) 0%, transparent 50%, rgba(34,211,238,0.1) 100%)',
            boxShadow: phase === 'glow' ? '0 0 60px rgba(34,211,238,0.3), inset 0 0 60px rgba(34,211,238,0.1)' : 'none',
          }}
        />

        {/* Main logo with animation */}
        <div
          className={cn(
            "relative transition-all duration-700 ease-out",
            phase === 'enter' && "opacity-0 scale-75 translate-y-8",
            phase === 'glow' && "opacity-100 scale-100 translate-y-0",
            phase === 'exit' && "opacity-0 scale-110 -translate-y-4"
          )}
        >
          <img 
            src={zenLogo} 
            alt="ZEN Technologies" 
            className="w-64 h-auto drop-shadow-2xl"
            style={{
              filter: phase === 'glow' 
                ? 'drop-shadow(0 0 30px rgba(34,211,238,0.5)) drop-shadow(0 0 60px rgba(34,211,238,0.3))'
                : 'none',
            }}
          />
          
          {/* Reflection effect */}
          <div 
            className={cn(
              "absolute -bottom-4 left-0 right-0 h-32 overflow-hidden opacity-30 transition-opacity duration-500",
              phase === 'glow' ? "opacity-20" : "opacity-0"
            )}
            style={{
              transform: 'scaleY(-1)',
              maskImage: 'linear-gradient(to top, black 0%, transparent 60%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 60%)',
            }}
          >
            <img 
              src={zenLogo} 
              alt="" 
              className="w-64 h-auto blur-sm"
            />
          </div>
        </div>

        {/* Loading indicator */}
        <div 
          className={cn(
            "mt-16 w-48 transition-all duration-500",
            phase === 'enter' && "opacity-0 translate-y-4",
            phase === 'glow' && "opacity-100 translate-y-0",
            phase === 'exit' && "opacity-0 -translate-y-4"
          )}
        >
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 rounded-full transition-all duration-100"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(34,211,238,0.6)',
              }}
            />
          </div>
          <p className="text-center text-cyan-400/70 text-sm mt-4 font-light tracking-widest">
            LOADING
          </p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
      }} />
    </div>
  );
}

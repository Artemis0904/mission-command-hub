import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import zenLogo from '@/assets/zen-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3500 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'glow' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 25) {
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
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(34,211,238,${0.3 + Math.random() * 0.5})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${4 + Math.random() * 6}s ease-in-out infinite, particlePulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: '0 0 10px rgba(34,211,238,0.5)',
            }}
          />
        ))}
      </div>

      {/* Rotating outer ring */}
      <div 
        className={cn(
          "absolute w-[500px] h-[500px] rounded-full transition-all duration-1000",
          phase === 'enter' && "opacity-0 scale-50",
          phase === 'glow' && "opacity-100 scale-100",
          phase === 'exit' && "opacity-0 scale-150"
        )}
        style={{
          border: '1px solid rgba(34,211,238,0.2)',
          animation: phase === 'glow' ? 'spinSlow 30s linear infinite' : 'none',
        }}
      >
        {/* Ring dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(250px) translateY(-50%)`,
              boxShadow: '0 0 15px rgba(34,211,238,0.8)',
              animation: 'dotPulse 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Inner rotating ring */}
      <div 
        className={cn(
          "absolute w-[350px] h-[350px] rounded-full transition-all duration-1000",
          phase === 'enter' && "opacity-0 scale-50",
          phase === 'glow' && "opacity-100 scale-100",
          phase === 'exit' && "opacity-0 scale-150"
        )}
        style={{
          border: '1px dashed rgba(34,211,238,0.3)',
          animation: phase === 'glow' ? 'spinReverse 20s linear infinite' : 'none',
        }}
      />

      {/* Pulsing glow layers */}
      <div 
        className={cn(
          "absolute w-[400px] h-[400px] rounded-full transition-all duration-700",
          phase === 'enter' && "opacity-0 scale-0",
          phase === 'glow' && "opacity-100 scale-100",
          phase === 'exit' && "opacity-0 scale-200"
        )}
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
          animation: phase === 'glow' ? 'pulseGlow 2s ease-in-out infinite' : 'none',
        }}
      />
      
      <div 
        className={cn(
          "absolute w-[300px] h-[300px] rounded-full transition-all duration-700 delay-100",
          phase === 'enter' && "opacity-0 scale-0",
          phase === 'glow' && "opacity-100 scale-100",
          phase === 'exit' && "opacity-0 scale-200"
        )}
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 60%)',
          animation: phase === 'glow' ? 'pulseGlow 2s ease-in-out infinite 0.5s' : 'none',
        }}
      />

      {/* Scanning beam */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-full h-32 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
          style={{
            top: `${-20 + (progress * 1.4)}%`,
            transition: 'top 0.05s linear',
          }}
        />
      </div>

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Hexagonal frame */}
        <div 
          className={cn(
            "absolute -inset-12 transition-all duration-700",
            phase === 'enter' && "opacity-0 scale-75 rotate-12",
            phase === 'glow' && "opacity-100 scale-100 rotate-0",
            phase === 'exit' && "opacity-0 scale-110 -rotate-6"
          )}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.5)" />
                <stop offset="50%" stopColor="rgba(34,211,238,0.1)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0.5)" />
              </linearGradient>
            </defs>
            <polygon 
              points="100,10 180,55 180,145 100,190 20,145 20,55" 
              fill="none" 
              stroke="url(#hexGradient)" 
              strokeWidth="1"
              style={{
                animation: phase === 'glow' ? 'hexPulse 3s ease-in-out infinite' : 'none',
              }}
            />
          </svg>
        </div>

        {/* Main logo with layered animations */}
        <div
          className={cn(
            "relative transition-all duration-700 ease-out",
            phase === 'enter' && "opacity-0 scale-50",
            phase === 'glow' && "opacity-100 scale-100",
            phase === 'exit' && "opacity-0 scale-125"
          )}
        >
          {/* Shadow/blur layer */}
          <img 
            src={zenLogo} 
            alt="" 
            className={cn(
              "absolute inset-0 w-72 h-auto blur-xl transition-opacity duration-500",
              phase === 'glow' ? "opacity-60" : "opacity-0"
            )}
            style={{
              filter: 'brightness(1.5) hue-rotate(-10deg)',
              animation: phase === 'glow' ? 'logoPulse 2s ease-in-out infinite' : 'none',
            }}
          />
          
          {/* Main logo */}
          <img 
            src={zenLogo} 
            alt="ZEN Technologies" 
            className="relative w-72 h-auto drop-shadow-2xl"
            style={{
              filter: phase === 'glow' 
                ? 'drop-shadow(0 0 20px rgba(34,211,238,0.6)) drop-shadow(0 0 40px rgba(34,211,238,0.4)) drop-shadow(0 0 60px rgba(34,211,238,0.2))'
                : 'none',
              animation: phase === 'glow' ? 'logoFloat 3s ease-in-out infinite' : 'none',
            }}
          />
          
          {/* Shimmer overlay */}
          <div 
            className={cn(
              "absolute inset-0 overflow-hidden rounded-lg transition-opacity duration-500",
              phase === 'glow' ? "opacity-100" : "opacity-0"
            )}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              style={{
                animation: phase === 'glow' ? 'shimmer 2.5s ease-in-out infinite' : 'none',
              }}
            />
          </div>
        </div>

        {/* Reflection */}
        <div 
          className={cn(
            "mt-4 overflow-hidden transition-opacity duration-500",
            phase === 'glow' ? "opacity-25" : "opacity-0"
          )}
          style={{
            transform: 'scaleY(-1) perspective(100px) rotateX(30deg)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 50%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 50%)',
          }}
        >
          <img 
            src={zenLogo} 
            alt="" 
            className="w-72 h-auto blur-sm opacity-60"
          />
        </div>

        {/* Loading bar */}
        <div 
          className={cn(
            "mt-12 w-56 transition-all duration-500",
            phase === 'enter' && "opacity-0 translate-y-8",
            phase === 'glow' && "opacity-100 translate-y-0",
            phase === 'exit' && "opacity-0 -translate-y-4"
          )}
        >
          <div className="relative h-1.5 bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Animated background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)',
                animation: 'loadingBg 1.5s ease-in-out infinite',
              }}
            />
            {/* Progress fill */}
            <div 
              className="relative h-full rounded-full transition-all duration-100 ease-out"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, rgba(34,211,238,0.8), rgba(34,211,238,1), rgba(34,211,238,0.8))',
                boxShadow: '0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.4)',
              }}
            />
          </div>
          
          {/* Loading text with typewriter effect */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-cyan-400/70 text-xs font-light tracking-[0.3em] uppercase">
              Initializing
            </span>
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span 
                  key={i}
                  className="w-1 h-1 bg-cyan-400/70 rounded-full"
                  style={{
                    animation: 'dotBounce 1s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </span>
          </div>
          
          {/* Percentage */}
          <p className="text-center text-cyan-300 text-2xl font-mono mt-3 tabular-nums">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Animated corner brackets */}
      {[
        { pos: 'top-6 left-6', rotate: '0deg', delay: '0s' },
        { pos: 'top-6 right-6', rotate: '90deg', delay: '0.1s' },
        { pos: 'bottom-6 right-6', rotate: '180deg', delay: '0.2s' },
        { pos: 'bottom-6 left-6', rotate: '270deg', delay: '0.3s' },
      ].map((corner, i) => (
        <div 
          key={i}
          className={cn(
            "absolute w-20 h-20 transition-all duration-700",
            corner.pos,
            phase === 'enter' && "opacity-0 scale-0",
            phase === 'glow' && "opacity-100 scale-100",
            phase === 'exit' && "opacity-0 scale-150"
          )}
          style={{ 
            transform: `rotate(${corner.rotate})`,
            transitionDelay: corner.delay,
          }}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <path 
              d="M 0 15 L 0 0 L 15 0" 
              fill="none" 
              stroke="rgba(34,211,238,0.5)" 
              strokeWidth="2"
              style={{
                animation: phase === 'glow' ? 'cornerPulse 2s ease-in-out infinite' : 'none',
                animationDelay: corner.delay,
              }}
            />
          </svg>
        </div>
      ))}

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }} 
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes particlePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: rotate(inherit) translateX(250px) translateY(-50%) scale(1); opacity: 0.5; }
          50% { transform: rotate(inherit) translateX(250px) translateY(-50%) scale(1.5); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        @keyframes hexPulse {
          0%, 100% { stroke-opacity: 0.5; }
          50% { stroke-opacity: 1; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-200%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes cornerPulse {
          0%, 100% { stroke-opacity: 0.3; }
          50% { stroke-opacity: 0.8; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes loadingBg {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

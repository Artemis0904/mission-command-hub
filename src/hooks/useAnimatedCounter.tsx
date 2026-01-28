import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterOptions {
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'spring';
}

export function useAnimatedCounter(
  end: number,
  options: UseAnimatedCounterOptions = {}
): number {
  const { duration = 1500, delay = 0, easing = 'easeOut' } = options;
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const easingFunctions = {
      linear: (t: number) => t,
      easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
      easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      spring: (t: number) => 1 - Math.pow(Math.cos(t * Math.PI * 0.5), 3),
    };

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current - delay;
      
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);
      const currentCount = Math.round(easedProgress * end);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, delay, easing]);

  return count;
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  value,
  duration = 1500,
  delay = 0,
  className = '',
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const count = useAnimatedCounter(value, { duration, delay });

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

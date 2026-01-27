import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  baseDelay?: number;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, index = 0, baseDelay = 50, style, ...props }, ref) => {
    const delay = index * baseDelay;
    
    return (
      <Card
        ref={ref}
        className={cn(
          "opacity-0 animate-card-enter",
          className
        )}
        style={{
          ...style,
          animationDelay: `${delay}ms`,
          animationFillMode: "forwards",
        }}
        {...props}
      />
    );
  }
);
AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard };

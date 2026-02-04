import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number;
}

const AnimatedList = React.forwardRef<HTMLDivElement, AnimatedListProps>(
  ({ className, children, staggerDelay = 50, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {React.Children.map(children, (child, index) => (
          <div
            className="opacity-0 animate-stagger-fade"
            style={{
              animationDelay: `${index * staggerDelay}ms`,
              animationFillMode: "forwards",
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);
AnimatedList.displayName = "AnimatedList";

interface AnimatedListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
  baseDelay?: number;
}

const AnimatedListItem = React.forwardRef<HTMLDivElement, AnimatedListItemProps>(
  ({ className, children, index = 0, baseDelay = 50, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "opacity-0 animate-stagger-fade transition-all duration-200 hover:translate-x-1",
          className
        )}
        style={{
          ...style,
          animationDelay: `${index * baseDelay}ms`,
          animationFillMode: "forwards",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AnimatedListItem.displayName = "AnimatedListItem";

export { AnimatedList, AnimatedListItem };

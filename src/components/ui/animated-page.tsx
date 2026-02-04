import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AnimatedPage = React.forwardRef<HTMLDivElement, AnimatedPageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-page-enter",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AnimatedPage.displayName = "AnimatedPage";

export { AnimatedPage };

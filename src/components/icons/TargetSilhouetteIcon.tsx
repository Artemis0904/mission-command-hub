 import { cn } from '@/lib/utils';
 
 interface TargetSilhouetteIconProps {
   className?: string;
 }
 
 export function TargetSilhouetteIcon({ className }: TargetSilhouetteIconProps) {
   return (
     <svg
       viewBox="0 0 24 24"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
       className={cn("w-4 h-4", className)}
     >
       {/* Human silhouette */}
       <ellipse cx="12" cy="5" rx="3" ry="3.5" fill="currentColor" />
       <path
         d="M6 22V14C6 11.5 8 9 12 9C16 9 18 11.5 18 14V22H6Z"
         fill="currentColor"
       />
       
       {/* Bullet holes */}
       <circle cx="12" cy="13" r="1.2" fill="hsl(var(--background))" />
       <circle cx="10" cy="15.5" r="0.9" fill="hsl(var(--background))" />
       <circle cx="14" cy="16" r="0.8" fill="hsl(var(--background))" />
     </svg>
   );
 }
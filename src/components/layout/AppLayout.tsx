import { ReactNode } from 'react';
import TopNavigation from './TopNavigation';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* iOS-style gradient mesh background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-purple-50/60 to-pink-100/80 dark:from-blue-950/50 dark:via-purple-950/30 dark:to-slate-900/80" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-transparent dark:from-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-400/30 to-transparent dark:from-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-300/20 via-transparent to-blue-300/20 dark:from-pink-600/10 dark:to-blue-600/10 rounded-full blur-3xl" />
      </div>
      <TopNavigation />
      <main className="flex-1 p-4 md:p-6 animate-page-enter">{children}</main>
    </div>
  );
}

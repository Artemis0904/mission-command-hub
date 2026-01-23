import { ReactNode } from 'react';
import TopNavigation from './TopNavigation';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavigation />
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}

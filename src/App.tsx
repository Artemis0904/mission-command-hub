import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import AppLayout from "@/components/layout/AppLayout";
import SplashScreen from "@/components/SplashScreen";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomCourses from "./pages/CustomCourses";
import StationManagement from "./pages/StationManagement";
import StationProgress from "./pages/StationProgress";
import Leaderboards from "./pages/Leaderboards";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/custom-courses" element={<ProtectedRoute><CustomCourses /></ProtectedRoute>} />
      <Route path="/stations" element={<ProtectedRoute><StationManagement /></ProtectedRoute>} />
      <Route path="/station-progress" element={<ProtectedRoute><StationProgress /></ProtectedRoute>} />
      <Route path="/leaderboards" element={<ProtectedRoute><Leaderboards /></ProtectedRoute>} />
      <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    // Check if splash was already shown this session
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
      setSplashComplete(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setSplashComplete(true);
    setTimeout(() => setShowSplash(false), 500);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Hidden SVG filter for army rustic edges */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="rustic-edge">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
          {showSplash && !splashComplete && (
            <SplashScreen onComplete={handleSplashComplete} duration={3500} />
          )}
          <div className={showSplash && !splashComplete ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
            <BrowserRouter>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

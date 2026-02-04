import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import {
  LayoutDashboard,
  BookOpen,
  Monitor,
  Users,
  Trophy,
  AlertTriangle,
  FileBarChart,
  LogOut,
  Bell,
  User,
  Target,
  Menu,
  Sun,
  Moon,
  Power,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/custom-courses', label: 'Custom Courses', icon: BookOpen },
  { path: '/stations', label: 'Stations', icon: Monitor },
  { path: '/station-progress', label: 'Station Progress', icon: Monitor },
  { path: '/leaderboards', label: 'Leaderboards', icon: Trophy },
  { path: '/compliance', label: 'Alerts', icon: AlertTriangle },
  { path: '/reports', label: 'Reports', icon: FileBarChart },
];

export default function TopNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleExitToDesktop = () => {
    // This will be used when packaged as a desktop app (Electron/Tauri)
    // Check if running in Electron
    if ((window as any).electronAPI?.quit) {
      (window as any).electronAPI.quit();
    } 
    // Check if running in Tauri
    else if ((window as any).__TAURI__) {
      (window as any).__TAURI__.process.exit(0);
    }
    // Fallback: try to close window (works in some contexts)
    else {
      window.close();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => mobile && setMobileOpen(false)}
          className={cn(
            'group flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
            mobile ? 'w-full opacity-0 animate-stagger-fade' : '',
            isActive(item.path)
              ? 'bg-primary/15 text-primary shadow-sm'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:-translate-y-0.5'
          )}
          style={mobile ? { animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' } : undefined}
        >
          <div className={cn(
            'p-1.5 rounded-lg transition-all duration-200',
            isActive(item.path) 
              ? 'bg-primary/20' 
              : 'bg-transparent group-hover:bg-primary/10 group-hover:scale-110'
          )}>
            <item.icon className={cn(
              'w-4 h-4 transition-all duration-200',
              isActive(item.path) ? 'text-primary' : 'group-hover:text-primary'
            )} />
          </div>
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-white/10 shadow-lg animate-fade-in-down bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 mr-6 group">
          <div className="icon-gradient-primary p-2 rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Target className="w-5 h-5" />
          </div>
          <span className="font-bold text-foreground hidden sm:block text-lg">IWTS Control</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          <NavLinks />
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative group">
            <div className="icon-container-primary w-10 h-10 group-hover:scale-105 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
            <span className="absolute top-0 right-0 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-md badge-pulse">
              3
            </span>
          </Button>

          {/* User Menu with Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 h-auto rounded-xl hover:bg-muted/80 transition-all duration-200">
                <div className="icon-gradient-primary w-9 h-9 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-foreground">{user?.username}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover rounded-xl shadow-xl border border-border p-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground font-medium px-2">
                Settings
              </DropdownMenuLabel>
              
              {/* Theme Toggle */}
              <div className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-primary" />
                  ) : (
                    <Sun className="w-4 h-4 text-accent" />
                  )}
                  <span className="text-sm font-medium">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <DropdownMenuSeparator className="my-2" />
              
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer px-2 py-2.5"
              >
                <LogOut className="w-4 h-4 mr-3" />
                <span className="font-medium">Logout</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={handleExitToDesktop} 
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg cursor-pointer px-2 py-2.5"
              >
                <Power className="w-4 h-4 mr-3" />
                <span className="font-medium">Exit to Desktop</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-l border-border">
              <div className="flex flex-col gap-2 mt-6">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
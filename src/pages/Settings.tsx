import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Save,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function Settings() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    alerts: true,
    reports: false,
  });

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-muted-foreground" />
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Settings
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input defaultValue={user?.username || 'instructor'} className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue={user?.role || 'Instructor'} className="bg-muted" disabled />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="instructor@c2station.mil" className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input defaultValue="Chief Instructor" className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch 
              checked={notifications.email} 
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Desktop Notifications</p>
              <p className="text-sm text-muted-foreground">Show desktop push notifications</p>
            </div>
            <Switch 
              checked={notifications.desktop} 
              onCheckedChange={(checked) => setNotifications({...notifications, desktop: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Compliance Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified about compliance issues</p>
            </div>
            <Switch 
              checked={notifications.alerts} 
              onCheckedChange={(checked) => setNotifications({...notifications, alerts: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Weekly Reports</p>
              <p className="text-sm text-muted-foreground">Receive weekly training summary reports</p>
            </div>
            <Switch 
              checked={notifications.reports} 
              onCheckedChange={(checked) => setNotifications({...notifications, reports: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-status-info" />
            Security
          </CardTitle>
          <CardDescription>Manage your security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="••••••••" className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="••••••••" className="bg-muted" />
            </div>
          </div>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-muted-foreground" />
            System Information
          </CardTitle>
          <CardDescription>Application details and data management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
            <div>
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="font-medium text-foreground">C2 Station v1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Sync</p>
              <p className="font-medium text-foreground">Jan 23, 2026 09:15 AM</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Database Status</p>
              <p className="font-medium text-primary">Connected</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Simulators</p>
              <p className="font-medium text-foreground">8 / 11</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Data
            </Button>
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

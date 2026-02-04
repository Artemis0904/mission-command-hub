import { useState } from 'react';
import { 
  AlertTriangle, 
  Bell,
  AlertCircle,
  Clock,
  Monitor,
  CheckCircle2,
  Send,
  Shield,
  Filter,
  Flame,
  ShieldAlert,
  CircleAlert,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { complianceAlerts, getStationById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { AnimatedCounter } from '@/hooks/useAnimatedCounter';

export default function Compliance() {
  const { toast } = useToast();
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredAlerts = complianceAlerts.filter(alert => {
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
    if (typeFilter !== 'all' && alert.type !== typeFilter) return false;
    return true;
  });

  const alertCounts = {
    high: complianceAlerts.filter(a => a.severity === 'high').length,
    medium: complianceAlerts.filter(a => a.severity === 'medium').length,
    low: complianceAlerts.filter(a => a.severity === 'low').length,
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'overdue': return <Clock className="w-5 h-5" />;
      case 'inactive': return <Monitor className="w-5 h-5" />;
      case 'pending': return <CircleAlert className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 border-destructive/30 text-destructive';
      case 'medium': return 'bg-accent/10 border-accent/30 text-accent';
      case 'low': return 'bg-[hsl(var(--status-info))]/10 border-[hsl(var(--status-info))]/30 text-[hsl(var(--status-info))]';
      default: return 'bg-muted border-border';
    }
  };

  const handleSendReminder = (stationId: string) => {
    const station = getStationById(stationId);
    toast({
      title: 'Reminder Sent',
      description: `Notification sent to ${station?.name} operators.`,
    });
  };

  const handleEscalate = (stationId: string) => {
    const station = getStationById(stationId);
    toast({
      title: 'Escalated to Admin',
      description: `Alert for ${station?.name} has been escalated.`,
    });
  };

  const handleMarkResolved = (stationId: string) => {
    const station = getStationById(stationId);
    toast({
      title: 'Marked as Resolved',
      description: `${station?.name} alert has been resolved.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(0 75% 55%) 0%, hsl(15 80% 50%) 100%)' }}>
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            Compliance & Alerts
          </h1>
          <p className="text-muted-foreground mt-1">Monitor training compliance and manage alerts</p>
        </div>
        <div className="flex gap-3">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-36 bg-muted border-border rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent className="bg-popover rounded-xl">
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-36 bg-muted border-border rounded-xl">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-popover rounded-xl">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alert Stats - Distinct colors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnimatedCard index={0} className="tactical-card-hover border-l-4 border-l-rose-500 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  High Priority
                </p>
                <p className="metric-value text-rose-600 dark:text-rose-400 mt-1">
                  <AnimatedCounter value={alertCounts.high} duration={1000} delay={100} />
                </p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(350 80% 55%) 0%, hsl(10 85% 50%) 100%)' }}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={1} className="tactical-card-hover border-l-4 border-l-amber-500 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Medium Priority
                </p>
                <p className="metric-value text-amber-600 dark:text-amber-400 mt-1">
                  <AnimatedCounter value={alertCounts.medium} duration={1000} delay={200} />
                </p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(38 95% 55%) 0%, hsl(25 90% 50%) 100%)' }}>
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={2} className="tactical-card-hover border-l-4 border-l-sky-500 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Low Priority
                </p>
                <p className="metric-value text-sky-600 dark:text-sky-400 mt-1">
                  <AnimatedCounter value={alertCounts.low} duration={1000} delay={300} />
                </p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(200 90% 55%) 0%, hsl(210 85% 60%) 100%)' }}>
                <Bell className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Alerts List */}
      <AnimatedCard index={3} className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <div className="icon-container-danger w-9 h-9">
              <Bell className="w-5 h-5" />
            </div>
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => {
              const station = getStationById(alert.stationId);
              
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all duration-200 hover:-translate-x-0.5 ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Monitor className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">{station?.name}</span>
                        <Badge 
                          variant={
                            alert.severity === 'high' ? 'destructive' :
                            alert.severity === 'medium' ? 'default' : 'secondary'
                          }
                          className="rounded-lg"
                        >
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline" className="capitalize rounded-lg">{alert.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Location: {station?.location}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="btn-interactive hover:glow-primary rounded-lg"
                        onClick={() => handleSendReminder(alert.stationId)}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Remind
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="btn-interactive hover:glow-accent rounded-lg"
                        onClick={() => handleEscalate(alert.stationId)}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Escalate
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="btn-interactive rounded-lg"
                        onClick={() => handleMarkResolved(alert.stationId)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No alerts match the current filters
            </div>
          )}
        </CardContent>
      </AnimatedCard>

      {/* Compliance Summary */}
      <AnimatedCard index={4} className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <div className="icon-container-primary w-9 h-9">
              <Shield className="w-5 h-5" />
            </div>
            Compliance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="icon-container-danger w-10 h-10 group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground">Overdue Training</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {complianceAlerts.filter(a => a.type === 'overdue').length} stations have overdue training courses that require immediate attention.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="icon-container-accent w-10 h-10 group-hover:scale-105 transition-transform">
                  <Monitor className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground">Inactive Stations</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {complianceAlerts.filter(a => a.type === 'inactive').length} stations have not logged any training activity in the past 7 days.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="icon-container w-10 h-10 bg-[hsl(var(--status-info))]/10 text-[hsl(var(--status-info))] group-hover:scale-105 transition-transform">
                  <CircleAlert className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground">Pending Completion</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {complianceAlerts.filter(a => a.type === 'pending').length} stations have training courses pending completion.
              </p>
            </div>
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  );
}

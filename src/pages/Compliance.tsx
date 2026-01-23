import { useState } from 'react';
import { 
  AlertTriangle, 
  Bell,
  Mail,
  AlertCircle,
  Clock,
  UserX,
  CheckCircle,
  Send,
  Shield,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { complianceAlerts, getTraineeById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

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
      case 'inactive': return <UserX className="w-5 h-5" />;
      case 'pending': return <AlertCircle className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 border-destructive/30 text-destructive';
      case 'medium': return 'bg-accent/10 border-accent/30 text-accent';
      case 'low': return 'bg-status-info/10 border-status-info/30 text-status-info';
      default: return 'bg-muted border-border';
    }
  };

  const handleSendReminder = (traineeId: string) => {
    const trainee = getTraineeById(traineeId);
    toast({
      title: 'Reminder Sent',
      description: `Notification sent to ${trainee?.name}.`,
    });
  };

  const handleEscalate = (traineeId: string) => {
    const trainee = getTraineeById(traineeId);
    toast({
      title: 'Escalated to Admin',
      description: `Alert for ${trainee?.name} has been escalated.`,
    });
  };

  const handleExcuse = (traineeId: string) => {
    const trainee = getTraineeById(traineeId);
    toast({
      title: 'Marked as Excused',
      description: `${trainee?.name} has been marked as excused.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-destructive" />
            Compliance & Alerts
          </h1>
          <p className="text-muted-foreground">Monitor training compliance and manage alerts</p>
        </div>
        <div className="flex gap-3">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-36 bg-muted border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-36 bg-muted border-border">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="tactical-card-hover border-destructive/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="metric-value text-destructive">{alertCounts.high}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card-hover border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medium Priority</p>
                <p className="metric-value text-accent">{alertCounts.medium}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card-hover border-status-info/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Priority</p>
                <p className="metric-value text-status-info">{alertCounts.low}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-status-info/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-status-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => {
              const trainee = getTraineeById(alert.traineeId);
              
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{trainee?.name}</span>
                        <Badge variant={
                          alert.severity === 'high' ? 'destructive' :
                          alert.severity === 'medium' ? 'default' : 'secondary'
                        }>
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline" className="capitalize">{alert.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {trainee?.rank} • {trainee?.unit}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendReminder(alert.traineeId)}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Remind
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEscalate(alert.traineeId)}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Escalate
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleExcuse(alert.traineeId)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Excuse
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
      </Card>

      {/* Compliance Summary */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-destructive" />
                <span className="font-medium text-foreground">Overdue Training</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {complianceAlerts.filter(a => a.type === 'overdue').length} trainees have overdue training assignments that require immediate attention.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <UserX className="w-5 h-5 text-accent" />
                <span className="font-medium text-foreground">Inactive Trainees</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {complianceAlerts.filter(a => a.type === 'inactive').length} trainees have not logged any training activity in the past 7 days.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-status-info" />
                <span className="font-medium text-foreground">Pending Completion</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {complianceAlerts.filter(a => a.type === 'pending').length} trainees have training modules pending completion.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

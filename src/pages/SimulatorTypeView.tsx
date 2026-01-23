import { useParams, useNavigate } from 'react-router-dom';
import { 
  Target, 
  Crosshair, 
  Bomb, 
  Zap, 
  Play,
  Pause,
  Power,
  MapPin,
  Clock,
  Users,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { simulatorTypes, getSimulatorsByType, missions } from '@/data/mockData';

const iconMap: Record<string, typeof Target> = {
  Target,
  Crosshair,
  Bomb,
  Zap,
};

export default function SimulatorTypeView() {
  const { typeId } = useParams<{ typeId: string }>();
  const navigate = useNavigate();

  const simulatorType = simulatorTypes.find(t => t.id === typeId);
  const simulators = getSimulatorsByType(typeId || '');
  const typeMissions = missions.filter(m => m.simulatorType === typeId);

  if (!simulatorType) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Simulator type not found</p>
      </div>
    );
  }

  const IconComponent = iconMap[simulatorType.icon] || Target;

  const statusCounts = {
    idle: simulators.filter(s => s.status === 'idle').length,
    'in-mission': simulators.filter(s => s.status === 'in-mission').length,
    offline: simulators.filter(s => s.status === 'offline').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'idle': return <Pause className="w-4 h-4" />;
      case 'in-mission': return <Play className="w-4 h-4" />;
      case 'offline': return <Power className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'bg-status-idle/20 text-status-idle border-status-idle/30';
      case 'in-mission': return 'bg-primary/20 text-primary border-primary/30';
      case 'offline': return 'bg-status-offline/20 text-muted-foreground border-status-offline/30';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{simulatorType.name} Simulators</h1>
            <p className="text-muted-foreground">{simulatorType.fullName}</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/mission-assignment')}>
          <Target className="w-4 h-4 mr-2" />
          Assign Mission
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Idle</p>
                <p className="metric-value text-status-idle">{statusCounts.idle}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-status-idle/10 flex items-center justify-center">
                <Pause className="w-6 h-6 text-status-idle" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Mission</p>
                <p className="metric-value text-primary">{statusCounts['in-mission']}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Play className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offline</p>
                <p className="metric-value text-muted-foreground">{statusCounts.offline}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-status-offline/10 flex items-center justify-center">
                <Power className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simulator Units Grid */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Simulator Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulators.map((sim) => (
              <div
                key={sim.id}
                className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${getStatusColor(sim.status)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(sim.status)}
                    <span className="font-semibold text-foreground">{sim.name}</span>
                  </div>
                  <Badge variant={sim.status === 'in-mission' ? 'default' : 'secondary'}>
                    {sim.status === 'in-mission' ? 'Active' : sim.status === 'idle' ? 'Idle' : 'Offline'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{sim.location}</span>
                </div>
                <Button 
                  variant={sim.status === 'offline' ? 'secondary' : 'outline'}
                  className="w-full"
                  disabled={sim.status === 'offline'}
                  onClick={() => navigate('/mission-assignment')}
                >
                  {sim.status === 'in-mission' ? 'View Mission' : sim.status === 'idle' ? 'Assign Mission' : 'Unavailable'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Missions for this Type */}
      <Card className="tactical-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Scheduled Missions</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/mission-scheduler')}>
            View Calendar
          </Button>
        </CardHeader>
        <CardContent>
          {typeMissions.length > 0 ? (
            <div className="space-y-3">
              {typeMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{mission.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {mission.date} at {mission.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {mission.assignedTrainees.length} trainees
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      mission.status === 'in-progress' ? 'default' : 
                      mission.status === 'completed' ? 'secondary' : 'outline'
                    }>
                      {mission.status}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">
                      {mission.duration}min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No missions scheduled for this simulator type
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { 
  Monitor, 
  Search,
  TrendingUp,
  Target,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Timer,
  Award,
  Activity,
  Clock,
  Sparkles,
  Medal,
  BarChart3,
  Crosshair,
  Wifi,
  WifiOff,
  Play,
  Calendar,
} from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { iwtsStations, stationProgress, sessionReports, customCourses, getCourseById, stationUsageTrends } from '@/data/mockData';
import { AnimatedCounter } from '@/hooks/useAnimatedCounter';

interface StationProfile {
  station: typeof iwtsStations[0];
  progress: typeof stationProgress[0] | undefined;
  recentSessions: typeof sessionReports;
}

export default function StationProgress() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState<StationProfile | null>(null);
  const [trendView, setTrendView] = useState<'daily' | 'weekly'>('daily');

  // Merge station data with progress
  const stationsWithProgress = iwtsStations.map(station => {
    const progress = stationProgress.find(p => p.stationId === station.id);
    return {
      ...station,
      ...progress,
      completionRate: progress ? Math.round((progress.completedExercises / progress.assignedExercises) * 100) : 0
    };
  });

  const filteredStations = stationsWithProgress.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.sessionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-use':
        return <Badge className="bg-[hsl(var(--status-active))]/15 text-[hsl(var(--status-active))] border-[hsl(var(--status-active))]/30">In Use</Badge>;
      case 'idle':
        return <Badge className="bg-[hsl(var(--status-info))]/15 text-[hsl(var(--status-info))] border-[hsl(var(--status-info))]/30">Idle</Badge>;
      case 'offline':
        return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Offline</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-use':
        return <Play className="w-4 h-4" />;
      case 'idle':
        return <Wifi className="w-4 h-4" />;
      case 'offline':
        return <WifiOff className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const openStationProfile = (station: typeof stationsWithProgress[0]) => {
    const baseStation = iwtsStations.find(s => s.id === station.id)!;
    const progress = stationProgress.find(p => p.stationId === station.id);
    const recentSessions = sessionReports.filter(r => r.stationId === station.id);
    setSelectedStation({ station: baseStation, progress, recentSessions });
  };

  const inUseCount = stationsWithProgress.filter(s => s.status === 'in-use').length;
  const idleCount = stationsWithProgress.filter(s => s.status === 'idle').length;
  const offlineCount = stationsWithProgress.filter(s => s.status === 'offline').length;
  const totalExercises = stationsWithProgress.reduce((sum, s) => sum + (s.assignedExercises || 0), 0);
  const completedExercises = stationsWithProgress.reduce((sum, s) => sum + (s.completedExercises || 0), 0);

  const trendData = trendView === 'daily' ? stationUsageTrends.daily : stationUsageTrends.weekly;
  const xAxisKey = trendView === 'daily' ? 'date' : 'week';

  const chartConfig = {
    'IWTS-01': { label: 'IWTS-01', color: 'hsl(210 95% 55%)' },
    'IWTS-02': { label: 'IWTS-02', color: 'hsl(170 75% 45%)' },
    'IWTS-03': { label: 'IWTS-03', color: 'hsl(280 70% 55%)' },
    'IWTS-05': { label: 'IWTS-05', color: 'hsl(45 95% 55%)' },
    'IWTS-06': { label: 'IWTS-06', color: 'hsl(340 75% 55%)' },
    'IWTS-09': { label: 'IWTS-09', color: 'hsl(190 85% 50%)' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="icon-gradient-primary p-2 rounded-xl">
              <Monitor className="w-6 h-6" />
            </div>
            Station Progress
          </h1>
          <p className="text-muted-foreground mt-1">Track station usage and exercise completion</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search stations or sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-border rounded-xl"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AnimatedCard index={0} className="tactical-card-hover group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" />
                  Total Stations
                </p>
                <p className="metric-value text-foreground mt-1">
                  <AnimatedCounter value={iwtsStations.length} duration={1000} />
                </p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(210 95% 55%) 0%, hsl(230 90% 60%) 100%)' }}>
                <Monitor className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={1} className="tactical-card-hover group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  In Use
                </p>
                <p className="metric-value text-[hsl(var(--status-active))] mt-1">
                  <AnimatedCounter value={inUseCount} duration={1000} delay={100} />
                </p>
              </div>
              <div className="icon-gradient-success p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={2} className="tactical-card-hover group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Idle
                </p>
                <p className="metric-value text-[hsl(var(--status-info))] mt-1">
                  <AnimatedCounter value={idleCount} duration={1000} delay={200} />
                </p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(210 95% 55%) 0%, hsl(220 90% 60%) 100%)' }}>
                <Wifi className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={3} className="tactical-card-hover group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  Exercises Done
                </p>
                <p className="metric-value text-primary mt-1">
                  <AnimatedCounter value={completedExercises} duration={1200} delay={300} />
                  <span className="text-muted-foreground text-lg">/{totalExercises}</span>
                </p>
              </div>
              <div className="icon-gradient-primary p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Crosshair className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Usage Trends Chart */}
      <AnimatedCard index={4} className="tactical-card">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="icon-gradient-accent p-2 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              Usage Trends
            </CardTitle>
            <Tabs value={trendView} onValueChange={(v) => setTrendView(v as 'daily' | 'weekly')} className="w-auto">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="daily" className="text-sm gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Daily
                </TabsTrigger>
                <TabsTrigger value="weekly" className="text-sm gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Weekly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            {trendView === 'daily' ? (
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillIWTS01" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210 95% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(210 95% 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillIWTS02" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(170 75% 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(170 75% 45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillIWTS06" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(340 75% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(340 75% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey={xAxisKey} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => trendView === 'daily' ? value.slice(5) : value}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="IWTS-01" stroke="hsl(210 95% 55%)" fill="url(#fillIWTS01)" strokeWidth={2} />
                <Area type="monotone" dataKey="IWTS-02" stroke="hsl(170 75% 45%)" fill="url(#fillIWTS02)" strokeWidth={2} />
                <Area type="monotone" dataKey="IWTS-06" stroke="hsl(340 75% 55%)" fill="url(#fillIWTS06)" strokeWidth={2} />
              </AreaChart>
            ) : (
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey={xAxisKey} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="IWTS-01" fill="hsl(210 95% 55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="IWTS-02" fill="hsl(170 75% 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="IWTS-05" fill="hsl(45 95% 55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="IWTS-06" fill="hsl(340 75% 55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="IWTS-09" fill="hsl(190 85% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ChartContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {Object.entries(chartConfig).slice(0, trendView === 'daily' ? 3 : 5).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: config.color }} />
                {config.label}
              </div>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Station Table */}
      <AnimatedCard index={5} className="tactical-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Station</th>
                  <th>Session ID</th>
                  <th>Exercises Assigned</th>
                  <th>Completed</th>
                  <th>Avg Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStations.map((station) => (
                  <tr key={station.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200 ${
                          station.status === 'in-use' 
                            ? 'icon-gradient-success' 
                            : station.status === 'offline' 
                              ? 'bg-destructive/20 text-destructive' 
                              : 'icon-gradient-primary'
                        }`}>
                          {getStatusIcon(station.status)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{station.name}</p>
                          <p className="text-xs text-muted-foreground">{station.location}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-sm text-muted-foreground">
                        {station.sessionId || '-'}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium text-foreground flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-primary" />
                        {station.assignedExercises || 0}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={station.completionRate} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-foreground w-16">
                          {station.completedExercises || 0}/{station.assignedExercises || 0}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="font-bold text-primary flex items-center gap-1">
                        <Medal className="w-3.5 h-3.5" />
                        {station.avgScore || '-'}
                      </span>
                    </td>
                    <td>{getStatusBadge(station.status)}</td>
                    <td>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="btn-interactive rounded-lg"
                        onClick={() => openStationProfile(station)}
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Station Profile Dialog */}
      <Dialog open={!!selectedStation} onOpenChange={() => setSelectedStation(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-background rounded-2xl">
          {selectedStation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    selectedStation.station.status === 'in-use' 
                      ? 'icon-gradient-success' 
                      : selectedStation.station.status === 'offline' 
                        ? 'bg-destructive/20 text-destructive' 
                        : 'icon-gradient-primary'
                  }`}>
                    <Monitor className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{selectedStation.station.name}</p>
                    <p className="text-sm text-muted-foreground font-normal">
                      {selectedStation.station.location} • {getStatusBadge(selectedStation.station.status)}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                    <div className="icon-container-primary w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6" />
                    </div>
                    <p className="metric-value text-foreground">
                      {selectedStation.progress?.assignedExercises || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Assigned</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                    <div className="icon-container w-12 h-12 mx-auto mb-2 bg-[hsl(var(--status-active))]/10 text-[hsl(var(--status-active))] group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="metric-value text-foreground">
                      {selectedStation.progress?.completedExercises || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                    <div className="icon-container-accent w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <p className="metric-value text-foreground">
                      {selectedStation.progress?.avgScore || '-'}
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                </div>

                {/* Progress Summary */}
                {selectedStation.progress && (
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      Exercise Completion
                    </h3>
                    <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground flex items-center gap-2">
                          <Crosshair className="w-4 h-4 text-primary" />
                          Current Session
                        </span>
                        <span className="text-sm text-muted-foreground font-mono">
                          {selectedStation.progress.sessionId}
                        </span>
                      </div>
                      <Progress 
                        value={(selectedStation.progress.completedExercises / selectedStation.progress.assignedExercises) * 100} 
                        className="h-3" 
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-muted-foreground">
                          {selectedStation.progress.completedExercises} of {selectedStation.progress.assignedExercises} exercises
                        </span>
                        <span className="font-medium text-foreground">
                          {Math.round((selectedStation.progress.completedExercises / selectedStation.progress.assignedExercises) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assigned Course */}
                {selectedStation.station.assignedCourseId && (
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      Assigned Course
                    </h3>
                    <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <p className="font-medium text-foreground">
                        {getCourseById(selectedStation.station.assignedCourseId)?.name || 'Unknown Course'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Recent Sessions */}
                {selectedStation.recentSessions.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Medal className="w-4 h-4 text-accent" />
                      Recent Sessions
                    </h3>
                    <div className="space-y-2">
                      {selectedStation.recentSessions.slice(0, 5).map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className={`icon-container w-10 h-10 ${session.result === 'pass' ? 'bg-[hsl(var(--status-active))]/10 text-[hsl(var(--status-active))]' : 'bg-destructive/10 text-destructive'} group-hover:scale-105 transition-transform`}>
                              {session.result === 'pass' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-foreground font-mono text-sm">{session.sessionId}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(session.dateTime).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold text-primary">{session.score}</p>
                              <p className="text-xs text-muted-foreground">{session.duration}m</p>
                            </div>
                            <Badge variant={session.result === 'pass' ? 'default' : 'destructive'} className="rounded-lg">
                              {session.result}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

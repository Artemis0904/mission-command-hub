import { 
  Monitor, 
  Calendar, 
  Users, 
  FileBarChart, 
  Trophy, 
  AlertTriangle,
  Clock,
  Activity,
  TrendingUp,
  Zap,
  Play,
  BookOpen,
  Crosshair,
  Target,
  Gauge,
  Sparkles,
  ArrowUpRight,
  Shield,
  Medal,
  Crown,
  Flame,
  BarChart3,
  CircleDot,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { dashboardStats, missions, trainees, complianceAlerts, getTraineeById, getCourseById, iwtsStations } from '@/data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  const todaysMissions = missions.filter(m => m.date === '2026-01-23');
  const topTrainees = trainees.slice(0, 5);
  const activeStations = iwtsStations.filter(s => s.status !== 'offline').length;
  const stationsInUse = iwtsStations.filter(s => s.status === 'in-use').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="icon-gradient-primary p-2 rounded-xl">
              <Target className="w-6 h-6" />
            </div>
            IWTS Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back, Instructor. Here's today's overview.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-active))] animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">System Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedCard index={0} className="tactical-card-hover cursor-pointer group" onClick={() => navigate('/stations')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <CircleDot className="w-3.5 h-3.5" />
                  IWTS Stations
                </p>
                <p className="metric-value text-foreground mt-1">{dashboardStats.totalStations}</p>
              </div>
              <div className="icon-gradient-primary p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[hsl(var(--status-active))]/10 text-[hsl(var(--status-active))]">
                <Activity className="w-3 h-3" />
                {stationsInUse} in use
              </span>
              <span className="text-muted-foreground">{activeStations} available</span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={1} className="tactical-card-hover group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Upcoming Missions
                </p>
                <p className="metric-value text-foreground mt-1">{dashboardStats.upcomingMissions}</p>
              </div>
              <div className="icon-gradient-accent p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10 text-accent">
                <Crosshair className="w-3 h-3" />
                {todaysMissions.length} today
              </span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={2} className="tactical-card-hover cursor-pointer group" onClick={() => navigate('/custom-courses')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Custom Courses
                </p>
                <p className="metric-value text-foreground mt-1">{dashboardStats.customCourses}</p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(210 95% 55%) 0%, hsl(230 90% 60%) 100%)' }}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[hsl(var(--status-info))]/10 text-[hsl(var(--status-info))]">
                <TrendingUp className="w-3 h-3" />
                Active courses
              </span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={3} className="tactical-card-hover group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Reports Generated
                </p>
                <p className="metric-value text-foreground mt-1">{dashboardStats.recentReports}</p>
              </div>
              <div className="icon-gradient-success p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileBarChart className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="text-muted-foreground">This week</span>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Missions */}
        <AnimatedCard index={4} className="tactical-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-accent w-9 h-9">
                <Crosshair className="w-5 h-5" />
              </div>
              Today's Missions
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysMissions.length > 0 ? (
              todaysMissions.map((mission) => {
                const course = getCourseById(mission.courseId);
                return (
                  <div
                    key={mission.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all duration-200 hover:-translate-x-0.5 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-all duration-200 group-hover:scale-105 ${
                        mission.status === 'in-progress' 
                          ? 'bg-accent/20 text-accent' 
                          : 'bg-primary/15 text-primary'
                      }`}>
                        {mission.status === 'in-progress' ? (
                          <Play className="w-5 h-5" />
                        ) : (
                          <Target className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{mission.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course?.name} • {mission.time} • {mission.duration}min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={mission.status === 'in-progress' ? 'default' : 'secondary'}
                        className={mission.status === 'in-progress' ? 'bg-accent text-accent-foreground' : ''}
                      >
                        {mission.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {mission.assignedTrainees.length}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No missions scheduled for today
              </div>
            )}
          </CardContent>
        </AnimatedCard>

        {/* Leaderboard Top 5 */}
        <AnimatedCard index={5} className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-warning w-9 h-9">
                <Trophy className="w-5 h-5" />
              </div>
              Top Trainees
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/leaderboards')} className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {topTrainees.map((trainee, index) => (
              <div
                key={trainee.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:-translate-x-0.5 group ${
                  index < 3 ? 'bg-[hsl(var(--status-warning))]/5 border border-[hsl(var(--status-warning))]/20' : 'bg-muted/30'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-transform duration-200 group-hover:scale-110 ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800 shadow-md' :
                  index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-md' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index === 0 ? <Crown className="w-4 h-4" /> :
                   index === 1 ? <Medal className="w-4 h-4" /> :
                   index === 2 ? <Medal className="w-4 h-4" /> :
                   index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{trainee.name}</p>
                  <p className="text-xs text-muted-foreground">{trainee.unit}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{trainee.totalScore}</p>
                  <p className="text-xs text-muted-foreground">pts</p>
                </div>
              </div>
            ))}
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Assignments */}
        <AnimatedCard index={6} className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-primary w-9 h-9">
                <Shield className="w-5 h-5" />
              </div>
              Pending Assignments
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Manage
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { trainee: 'SGT John Mitchell', mission: 'Night Ops Training', station: 'IWTS-05', status: 'assigned' },
                { trainee: 'CPL David Kim', mission: 'Advanced Combat Drill', station: 'IWTS-06', status: 'overdue' },
                { trainee: 'SPC Robert Hayes', mission: 'Qualification Test', station: 'IWTS-09', status: 'assigned' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 transition-all duration-200 hover:bg-secondary/50 hover:-translate-x-0.5 group">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-105 ${
                      item.status === 'overdue' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.trainee}</p>
                      <p className="text-sm text-muted-foreground">{item.mission} • {item.station}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'overdue' ? 'destructive' : 'secondary'}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Compliance Alerts */}
        <AnimatedCard index={7} className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-danger w-9 h-9">
                <AlertTriangle className="w-5 h-5" />
              </div>
              Compliance Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/compliance')} className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceAlerts.slice(0, 3).map((alert) => {
                const trainee = getTraineeById(alert.traineeId);
                return (
                  <div key={alert.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:-translate-x-0.5 group ${
                    alert.severity === 'high' 
                      ? 'bg-destructive/5 border-destructive/30 hover:bg-destructive/10' 
                      : 'bg-muted/30 border-border hover:bg-secondary/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-105 ${
                        alert.severity === 'high' ? 'bg-destructive/15 text-destructive' :
                        alert.severity === 'medium' ? 'bg-[hsl(var(--status-warning))]/15 text-[hsl(var(--status-warning))]' : 
                        'bg-primary/10 text-primary'
                      }`}>
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{trainee?.name}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                      {alert.severity}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Quick Actions */}
      <AnimatedCard index={8} className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <div className="icon-gradient-accent p-2 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg group rounded-xl"
              onClick={() => navigate('/custom-courses')}
            >
              <div className="icon-container-primary w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-medium">Create Course</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lg group rounded-xl"
              onClick={() => navigate('/stations')}
            >
              <div className="icon-container-accent w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-6 h-6" />
              </div>
              <span className="font-medium">Manage Stations</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-[hsl(var(--status-info))]/50 hover:shadow-lg group rounded-xl"
              onClick={() => navigate('/reports')}
            >
              <div className="icon-container w-12 h-12 bg-[hsl(var(--status-info))]/10 text-[hsl(var(--status-info))] group-hover:scale-110 transition-transform duration-300">
                <Gauge className="w-6 h-6" />
              </div>
              <span className="font-medium">View Reports</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-[hsl(var(--status-active))]/50 hover:shadow-lg group rounded-xl"
              onClick={() => navigate('/trainee-progress')}
            >
              <div className="icon-container-success w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-medium">Track Progress</span>
            </Button>
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  );
}

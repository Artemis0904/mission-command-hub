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
      <div>
        <h1 className="text-2xl font-bold text-foreground">IWTS Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Instructor. Here's today's overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedCard index={0} className="tactical-card-hover cursor-pointer" onClick={() => navigate('/stations')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">IWTS Stations</p>
                <p className="metric-value text-foreground">{dashboardStats.totalStations}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-primary flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {stationsInUse} in use
              </span>
              <span className="text-muted-foreground">• {activeStations} available</span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={1} className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Missions</p>
                <p className="metric-value text-foreground">{dashboardStats.upcomingMissions}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-accent flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {todaysMissions.length} today
              </span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={2} className="tactical-card-hover cursor-pointer" onClick={() => navigate('/custom-courses')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom Courses</p>
                <p className="metric-value text-foreground">{dashboardStats.customCourses}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-status-info/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-status-info" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-status-info flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Active courses
              </span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={3} className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
                <p className="metric-value text-foreground">{dashboardStats.recentReports}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileBarChart className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
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
            <CardTitle className="text-lg font-semibold">Today's Missions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/mission-scheduler')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysMissions.length > 0 ? (
              todaysMissions.map((mission) => {
                const course = getCourseById(mission.courseId);
                return (
                  <div
                    key={mission.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all duration-200 hover:-translate-x-0.5"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        mission.status === 'in-progress' 
                          ? 'bg-accent/20 text-accent' 
                          : 'bg-primary/20 text-primary'
                      }`}>
                        {mission.status === 'in-progress' ? (
                          <Play className="w-5 h-5" />
                        ) : (
                          <Calendar className="w-5 h-5" />
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
                      <Badge variant={mission.status === 'in-progress' ? 'default' : 'secondary'}>
                        {mission.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {mission.assignedTrainees.length} trainees
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
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Top Trainees
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/leaderboards')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {topTrainees.map((trainee, index) => (
              <div
                key={trainee.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:-translate-x-0.5 ${
                  index < 3 ? 'bg-accent/5 border border-accent/20' : 'bg-muted/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-accent text-accent-foreground' :
                  index === 1 ? 'bg-gray-400 text-gray-900' :
                  index === 2 ? 'bg-amber-700 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
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
            <CardTitle className="text-lg font-semibold">Pending Assignments</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/mission-assignment')}>
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { trainee: 'SGT John Mitchell', mission: 'Night Ops Training', station: 'IWTS-05', status: 'assigned' },
                { trainee: 'CPL David Kim', mission: 'Advanced Combat Drill', station: 'IWTS-06', status: 'overdue' },
                { trainee: 'SPC Robert Hayes', mission: 'Qualification Test', station: 'IWTS-09', status: 'assigned' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 transition-all duration-200 hover:bg-secondary/50 hover:-translate-x-0.5">
                  <div>
                    <p className="font-medium text-foreground">{item.trainee}</p>
                    <p className="text-sm text-muted-foreground">{item.mission} • {item.station}</p>
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
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Compliance Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/compliance')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceAlerts.slice(0, 3).map((alert) => {
                const trainee = getTraineeById(alert.traineeId);
                return (
                  <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:-translate-x-0.5 ${
                    alert.severity === 'high' 
                      ? 'bg-destructive/5 border-destructive/30 hover:bg-destructive/10' 
                      : 'bg-muted/30 border-border hover:bg-secondary/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-destructive' :
                        alert.severity === 'medium' ? 'bg-accent' : 'bg-primary'
                      }`} />
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
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50"
              onClick={() => navigate('/custom-courses')}
            >
              <BookOpen className="w-6 h-6 text-primary" />
              <span>Create Course</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50"
              onClick={() => navigate('/stations')}
            >
              <Monitor className="w-6 h-6 text-accent" />
              <span>Manage Stations</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 hover:border-status-info/50"
              onClick={() => navigate('/reports')}
            >
              <FileBarChart className="w-6 h-6 text-status-info" />
              <span>View Reports</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50"
              onClick={() => navigate('/trainee-progress')}
            >
              <Users className="w-6 h-6 text-primary" />
              <span>Track Progress</span>
            </Button>
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  );
}

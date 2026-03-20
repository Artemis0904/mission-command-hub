import { useTheme } from '@/hooks/useTheme';
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
  Star,
  Radio,
  Eye,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { AnimatedCounter } from '@/hooks/useAnimatedCounter';
import { dashboardStats, missions, trainees, complianceAlerts, getStationById, getCourseById, iwtsStations } from '@/data/mockData';
import armyBg from '@/assets/army-bg.jpg';

// ─── Army-mode Dashboard ─────────────────────────────────────────────
function ArmyDashboard() {
  const navigate = useNavigate();
  const todaysMissions = missions.filter(m => m.date === '2026-01-23');
  const topTrainees = [...trainees].sort((a, b) => b.totalScore - a.totalScore).slice(0, 5);
  const bestTrainee = topTrainees[0];

  const quickActions = [
    { label: 'CREATE MISSION', icon: BookOpen, color: 'from-purple-700/80 to-purple-900/80', glow: 'hover:shadow-purple-500/30', onClick: () => navigate('/custom-courses') },
    { label: 'DEPLOY STATIONS', icon: Radio, color: 'from-orange-700/80 to-orange-900/80', glow: 'hover:shadow-orange-500/30', onClick: () => navigate('/stations') },
    { label: 'INTEL REPORTS', icon: Eye, color: 'from-cyan-700/80 to-cyan-900/80', glow: 'hover:shadow-cyan-500/30', onClick: () => navigate('/reports') },
    { label: 'MONITOR PROGRESS', icon: Target, color: 'from-emerald-700/80 to-emerald-900/80', glow: 'hover:shadow-emerald-500/30', onClick: () => navigate('/station-progress') },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Header ─────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-[#c8d8a0] drop-shadow-[0_0_18px_rgba(160,210,90,0.35)]">
            <span className="inline-flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-green-800/60 border border-green-600/40">
                <Target className="w-7 h-7 text-green-400" />
              </div>
              Command Center Dashboard
            </span>
          </h1>
          <p className="text-green-500/70 mt-1.5 tracking-wide text-sm">
            Welcome back, Commander. Here's today's overview.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-lg bg-green-900/50 border border-green-700/40 backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          <span className="text-xs font-mono uppercase tracking-widest text-green-400/80">System Online</span>
        </div>
      </div>

      {/* ── Main Content Grid ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT: Today's Missions (2-col span) */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden border border-green-700/40 bg-green-900/40 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(100,160,60,0.1)]">
          {/* Card inner with map texture */}
          <div className="relative">
            <img src={armyBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-green-950/60 via-transparent to-green-950/80" />
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold uppercase tracking-wider text-green-300 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center">
                    <Crosshair className="w-4 h-4 text-amber-400" />
                  </div>
                  Today's Missions
                </h2>
                <button className="text-xs text-green-500/60 hover:text-green-400 transition-colors flex items-center gap-1 uppercase tracking-wider">
                  View All <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mission Card */}
              {todaysMissions.length > 0 ? todaysMissions.map((mission) => {
                const course = getCourseById(mission.courseId);
                return (
                  <div key={mission.id} className="p-4 rounded-lg bg-green-950/50 border border-green-700/30 backdrop-blur-md mb-3 last:mb-0 group hover:border-green-500/40 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-green-200 uppercase tracking-wide text-base">
                          OPERATION: {mission.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-xs text-green-500/60">
                          <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> {dashboardStats.totalStations} stations</span>
                          <span className="flex items-center gap-1"><Crosshair className="w-3 h-3" /> {course?.exerciseIds?.length || 1} exercises</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {mission.duration} min</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-green-500/50 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {mission.date}
                        </span>
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          mission.status === 'in-progress' 
                            ? 'bg-red-600/80 text-red-100 shadow-[0_0_8px_rgba(239,68,68,0.3)]' 
                            : 'bg-green-700/60 text-green-200'
                        }`}>
                          {mission.status === 'in-progress' ? 'Active' : 'Scheduled'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-12 text-green-600/50 text-sm">No missions scheduled for today</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Top 5 Operatives */}
        <div className="rounded-xl border border-green-700/40 bg-green-900/40 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(100,160,60,0.1)]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold uppercase tracking-wider text-green-300 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                Top 5 Operatives
              </h2>
              <button onClick={() => navigate('/leaderboards')} className="text-xs text-green-500/60 hover:text-green-400 transition-colors flex items-center gap-1 uppercase tracking-wider">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Operative rows */}
            <div className="space-y-2">
              {topTrainees.map((trainee, i) => {
                const maxScore = topTrainees[0]?.totalScore || 1;
                const pct = Math.round((trainee.totalScore / maxScore) * 100);
                return (
                  <div key={trainee.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-green-800/30 transition-all duration-200 group">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      i === 0 ? 'bg-amber-600/40 border border-amber-500/50 text-amber-300' :
                      i === 1 ? 'bg-gray-500/30 border border-gray-400/40 text-gray-300' :
                      i === 2 ? 'bg-amber-800/40 border border-amber-700/50 text-amber-400' :
                      'bg-green-800/40 border border-green-700/40 text-green-500'
                    }`}>
                      {i === 0 ? <Crown className="w-4 h-4" /> : i < 3 ? <Medal className="w-4 h-4" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-green-200 text-sm truncate">{trainee.name}</p>
                      <p className="text-[10px] text-green-600/60 uppercase tracking-wider">{trainee.rank} · {trainee.unit}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-bold text-sm ${pct === 100 ? 'text-green-400' : pct >= 70 ? 'text-amber-400' : 'text-green-500'}`}>
                        {pct}%
                      </p>
                      <p className="text-[10px] text-green-600/50">score</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recommended card */}
            {bestTrainee && (
              <div className="mt-4 p-4 rounded-lg bg-green-950/60 border border-amber-600/30 shadow-[0_0_16px_rgba(180,140,40,0.1)]">
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-green-200 text-sm">
                      Recommended: {bestTrainee.name} (100% score)
                    </p>
                    <p className="text-xs text-green-500/60 mt-1">Recommended for Advanced Leadership Training</p>
                    <span className="inline-block mt-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-600/30 text-amber-300 border-l-2 border-amber-400">
                      Top Performer
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Tactical Commands ──────────────── */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-green-400/80 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Tactical Commands
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`group relative flex flex-col items-center gap-4 py-8 px-4 rounded-xl border border-green-700/40 bg-green-900/40 backdrop-blur-lg
                shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(100,160,60,0.08)]
                hover:scale-[1.04] hover:border-green-500/50 ${action.glow} hover:shadow-lg
                transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center
                group-hover:scale-110 transition-transform duration-300 shadow-lg border border-white/10`}>
                <action.icon className="w-8 h-8 text-white/90" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-green-300/80 group-hover:text-green-200 transition-colors">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Default Dashboard (Light/Dark) ──────────────────────────────────
function DefaultDashboard() {
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
        <AnimatedCard index={0} className="tactical-card-hover cursor-pointer group border-l-4 border-l-blue-500" onClick={() => navigate('/stations')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5"><CircleDot className="w-3.5 h-3.5" />IWTS Stations</p>
                <p className="metric-value text-foreground mt-1"><AnimatedCounter value={dashboardStats.totalStations} duration={1200} delay={100} /></p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(210 95% 55%) 0%, hsl(230 85% 60%) 100%)' }}>
                <Monitor className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Activity className="w-3 h-3" /><AnimatedCounter value={stationsInUse} duration={1000} delay={300} /> in use
              </span>
              <span className="text-muted-foreground"><AnimatedCounter value={activeStations} duration={1000} delay={400} /> available</span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={1} className="tactical-card-hover group border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Upcoming Missions</p>
                <p className="metric-value text-foreground mt-1"><AnimatedCounter value={dashboardStats.upcomingMissions} duration={1200} delay={200} /></p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(38 95% 55%) 0%, hsl(25 90% 50%) 100%)' }}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Crosshair className="w-3 h-3" /><AnimatedCounter value={todaysMissions.length} duration={800} delay={500} /> today
              </span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={2} className="tactical-card-hover cursor-pointer group border-l-4 border-l-violet-500" onClick={() => navigate('/custom-courses')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />Custom Courses</p>
                <p className="metric-value text-foreground mt-1"><AnimatedCounter value={dashboardStats.customCourses} duration={1200} delay={300} /></p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(270 85% 60%) 0%, hsl(290 80% 55%) 100%)' }}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <TrendingUp className="w-3 h-3" />Active courses
              </span>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={3} className="tactical-card-hover group border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" />Reports Generated</p>
                <p className="metric-value text-foreground mt-1"><AnimatedCounter value={dashboardStats.recentReports} duration={1200} delay={400} /></p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(150 70% 45%) 0%, hsl(170 65% 45%) 100%)' }}>
                <FileBarChart className="w-6 h-6 text-white" />
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
        <AnimatedCard index={4} className="tactical-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-accent w-9 h-9"><Crosshair className="w-5 h-5" /></div>
              Today's Missions
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">View All<ArrowUpRight className="w-4 h-4 ml-1" /></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysMissions.length > 0 ? todaysMissions.map((mission) => {
              const course = getCourseById(mission.courseId);
              return (
                <div key={mission.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all duration-200 hover:-translate-x-0.5 group">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-all duration-200 group-hover:scale-105 ${mission.status === 'in-progress' ? 'bg-accent/20 text-accent' : 'bg-primary/15 text-primary'}`}>
                      {mission.status === 'in-progress' ? <Play className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{mission.name}</p>
                      <p className="text-sm text-muted-foreground">{course?.name} • {mission.time} • {mission.duration}min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={mission.status === 'in-progress' ? 'default' : 'secondary'} className={mission.status === 'in-progress' ? 'bg-accent text-accent-foreground' : ''}>
                      {mission.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1"><Users className="w-3.5 h-3.5" />{mission.assignedTrainees.length}</span>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-8 text-muted-foreground">No missions scheduled for today</div>
            )}
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={5} className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-warning w-9 h-9"><Trophy className="w-5 h-5" /></div>
              Top Trainees
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/leaderboards')} className="text-muted-foreground hover:text-foreground">View All<ArrowUpRight className="w-4 h-4 ml-1" /></Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {topTrainees.map((trainee, index) => (
              <div key={trainee.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:-translate-x-0.5 group ${index < 3 ? 'bg-[hsl(var(--status-warning))]/5 border border-[hsl(var(--status-warning))]/20' : 'bg-muted/30'}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-transform duration-200 group-hover:scale-110 ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800 shadow-md' :
                  index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-md' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index === 0 ? <Crown className="w-4 h-4" /> : index === 1 ? <Medal className="w-4 h-4" /> : index === 2 ? <Medal className="w-4 h-4" /> : index + 1}
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
        <AnimatedCard index={6} className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-primary w-9 h-9"><Shield className="w-5 h-5" /></div>
              Pending Assignments
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Manage<ArrowUpRight className="w-4 h-4 ml-1" /></Button>
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
                    <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-105 ${item.status === 'overdue' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.trainee}</p>
                      <p className="text-sm text-muted-foreground">{item.mission} • {item.station}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'overdue' ? 'destructive' : 'secondary'}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={7} className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="icon-container-danger w-9 h-9"><AlertTriangle className="w-5 h-5" /></div>
              Compliance Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/compliance')} className="text-muted-foreground hover:text-foreground">View All<ArrowUpRight className="w-4 h-4 ml-1" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceAlerts.slice(0, 3).map((alert) => {
                const station = getStationById(alert.stationId);
                return (
                  <div key={alert.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:-translate-x-0.5 group ${
                    alert.severity === 'high' ? 'bg-destructive/5 border-destructive/30 hover:bg-destructive/10' : 'bg-muted/30 border-border hover:bg-secondary/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-105 ${
                        alert.severity === 'high' ? 'bg-destructive/15 text-destructive' :
                        alert.severity === 'medium' ? 'bg-[hsl(var(--status-warning))]/15 text-[hsl(var(--status-warning))]' : 'bg-primary/10 text-primary'
                      }`}>
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{station?.name}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>{alert.severity}</Badge>
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
            <div className="icon-gradient-accent p-2 rounded-xl"><Zap className="w-5 h-5" /></div>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Create Course', icon: BookOpen, gradient: 'linear-gradient(135deg, hsl(270 85% 60%) 0%, hsl(290 80% 55%) 100%)', nav: '/custom-courses' },
              { label: 'Manage Stations', icon: Monitor, gradient: 'linear-gradient(135deg, hsl(38 95% 55%) 0%, hsl(25 90% 50%) 100%)', nav: '/stations' },
              { label: 'View Reports', icon: Gauge, gradient: 'linear-gradient(135deg, hsl(210 95% 55%) 0%, hsl(220 90% 60%) 100%)', nav: '/reports' },
              { label: 'Track Progress', icon: Users, gradient: 'linear-gradient(135deg, hsl(150 70% 45%) 0%, hsl(170 65% 45%) 100%)', nav: '/station-progress' },
            ].map((action) => (
              <button key={action.label}
                className="h-auto py-6 px-4 flex flex-col items-center gap-3 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] group
                  bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10
                  shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.4)]
                  dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]
                  hover:shadow-lg hover:border-primary/30"
                onClick={() => navigate(action.nav)}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: action.gradient }}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────
export default function Dashboard() {
  const { theme } = useTheme();
  return theme === 'army' ? <ArmyDashboard /> : <DefaultDashboard />;
}

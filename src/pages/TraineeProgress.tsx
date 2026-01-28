import { useState } from 'react';
import { 
  Users, 
  Search,
  TrendingUp,
  Target,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Timer,
  Award,
  UserCheck,
  Clock,
  Sparkles,
  Medal,
  BarChart3,
  Crosshair,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { trainees, traineeProgress, scores } from '@/data/mockData';

interface TraineeProfile {
  trainee: typeof trainees[0];
  progress: typeof traineeProgress;
  scoreHistory: typeof scores;
}

export default function TraineeProgress() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeProfile | null>(null);

  const filteredTrainees = trainees.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return <Badge className="bg-[hsl(var(--status-active))]/15 text-[hsl(var(--status-active))] border-[hsl(var(--status-active))]/30">On Track</Badge>;
      case 'delayed':
        return <Badge className="bg-accent/15 text-accent border-accent/30">Delayed</Badge>;
      case 'pending':
        return <Badge className="bg-[hsl(var(--status-info))]/15 text-[hsl(var(--status-info))] border-[hsl(var(--status-info))]/30">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const openTraineeProfile = (trainee: typeof trainees[0]) => {
    const progress = traineeProgress.filter(p => p.traineeId === trainee.id);
    const scoreHistory = scores.filter(s => s.traineeId === trainee.id);
    setSelectedTrainee({ trainee, progress, scoreHistory });
  };

  // Calculate completion percentage for each trainee
  const getTraineeCompletion = (traineeId: string) => {
    const progress = traineeProgress.filter(p => p.traineeId === traineeId);
    if (progress.length === 0) return 0;
    const totalCompletion = progress.reduce((sum, p) => sum + p.completionRate, 0);
    return Math.round(totalCompletion / progress.length);
  };

  const onTrackCount = trainees.filter(t => t.status === 'on-track').length;
  const delayedCount = trainees.filter(t => t.status === 'delayed').length;
  const pendingCount = trainees.filter(t => t.status === 'pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="icon-gradient-primary p-2 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            Trainee Progress
          </h1>
          <p className="text-muted-foreground mt-1">Track trainee completion and performance</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search trainees..."
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
                  <UserCheck className="w-3.5 h-3.5" />
                  Total Trainees
                </p>
                <p className="metric-value text-foreground mt-1">{trainees.length}</p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(210 95% 55%) 0%, hsl(230 90% 60%) 100%)' }}>
                <Users className="w-6 h-6 text-white" />
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
                  On Track
                </p>
                <p className="metric-value text-[hsl(var(--status-active))] mt-1">{onTrackCount}</p>
              </div>
              <div className="icon-gradient-success p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6" />
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
                  Delayed
                </p>
                <p className="metric-value text-accent mt-1">{delayedCount}</p>
              </div>
              <div className="icon-gradient-accent p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard index={3} className="tactical-card-hover group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5" />
                  Pending
                </p>
                <p className="metric-value text-[hsl(var(--status-info))] mt-1">{pendingCount}</p>
              </div>
              <div className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, hsl(210 95% 55%) 0%, hsl(220 90% 60%) 100%)' }}>
                <Timer className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Trainee Table */}
      <AnimatedCard index={4} className="tactical-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Trainee</th>
                  <th>Unit</th>
                  <th>Missions Completed</th>
                  <th>Completion %</th>
                  <th>Total Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainees.map((trainee) => {
                  const completion = getTraineeCompletion(trainee.id);
                  return (
                    <tr key={trainee.id} className="group">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="icon-gradient-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform duration-200">
                            {trainee.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{trainee.name}</p>
                            <p className="text-xs text-muted-foreground">{trainee.rank}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted-foreground">{trainee.unit}</td>
                      <td>
                        <span className="font-medium text-foreground flex items-center gap-1.5">
                          <Crosshair className="w-3.5 h-3.5 text-primary" />
                          {trainee.missionsCompleted}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <Progress value={completion} className="h-2 flex-1" />
                          <span className="text-sm font-medium text-foreground w-10">{completion}%</span>
                        </div>
                      </td>
                      <td>
                        <span className="font-bold text-primary flex items-center gap-1">
                          <Medal className="w-3.5 h-3.5" />
                          {trainee.totalScore}
                        </span>
                      </td>
                      <td>{getStatusBadge(trainee.status)}</td>
                      <td>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="btn-interactive rounded-lg"
                          onClick={() => openTraineeProfile(trainee)}
                        >
                          View Profile
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Trainee Profile Dialog */}
      <Dialog open={!!selectedTrainee} onOpenChange={() => setSelectedTrainee(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-background rounded-2xl">
          {selectedTrainee && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="icon-gradient-primary w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
                    {selectedTrainee.trainee.avatar}
                  </div>
                  <div>
                    <p className="text-xl font-bold">{selectedTrainee.trainee.name}</p>
                    <p className="text-sm text-muted-foreground font-normal">
                      {selectedTrainee.trainee.rank} • {selectedTrainee.trainee.unit}
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
                    <p className="metric-value text-foreground">{selectedTrainee.trainee.missionsCompleted}</p>
                    <p className="text-xs text-muted-foreground">Missions</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                    <div className="icon-container-accent w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <p className="metric-value text-foreground">{selectedTrainee.trainee.totalScore}</p>
                    <p className="text-xs text-muted-foreground">Total Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                    <div className="icon-container w-12 h-12 mx-auto mb-2 bg-[hsl(var(--status-info))]/10 text-[hsl(var(--status-info))] group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="metric-value text-foreground">
                      {getTraineeCompletion(selectedTrainee.trainee.id)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Completion</p>
                  </div>
                </div>

                {/* Progress Summary */}
                {selectedTrainee.progress.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      Training Progress
                    </h3>
                    <div className="space-y-3">
                      {selectedTrainee.progress.map((p, i) => (
                        <div key={i} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground flex items-center gap-2">
                              <Crosshair className="w-4 h-4 text-primary" />
                              Training Track {i + 1}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {p.completedMissions}/{p.assignedMissions} missions
                            </span>
                          </div>
                          <Progress value={p.completionRate} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Score History */}
                {selectedTrainee.scoreHistory.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Medal className="w-4 h-4 text-accent" />
                      Recent Scores
                    </h3>
                    <div className="space-y-2">
                      {selectedTrainee.scoreHistory.map((s) => (
                        <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className={`icon-container w-10 h-10 ${s.result === 'pass' ? 'bg-[hsl(var(--status-active))]/10 text-[hsl(var(--status-active))]' : 'bg-destructive/10 text-destructive'} group-hover:scale-105 transition-transform`}>
                              {s.result === 'pass' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Training Session</p>
                              <p className="text-xs text-muted-foreground">{s.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold text-primary">{s.score}</p>
                              <p className="text-xs text-muted-foreground">{s.accuracy}% accuracy</p>
                            </div>
                            <Badge variant={s.result === 'pass' ? 'default' : 'destructive'} className="rounded-lg">
                              {s.result}
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

import { useState } from 'react';
import { 
  Users, 
  Search,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Timer,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        return <Badge className="bg-primary/20 text-primary border-primary/30">On Track</Badge>;
      case 'delayed':
        return <Badge className="bg-accent/20 text-accent border-accent/30">Delayed</Badge>;
      case 'pending':
        return <Badge className="bg-status-info/20 text-status-info border-status-info/30">Pending</Badge>;
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-7 h-7 text-status-info" />
            Trainee Progress
          </h1>
          <p className="text-muted-foreground">Track trainee completion and performance</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search trainees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-border"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trainees</p>
                <p className="metric-value text-foreground">{trainees.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-status-info/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-status-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="metric-value text-primary">{trainees.filter(t => t.status === 'on-track').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delayed</p>
                <p className="metric-value text-accent">{trainees.filter(t => t.status === 'delayed').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="metric-value text-status-info">{trainees.filter(t => t.status === 'pending').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-status-info/10 flex items-center justify-center">
                <Timer className="w-6 h-6 text-status-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trainee Table */}
      <Card className="tactical-card">
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
                    <tr key={trainee.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
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
                        <span className="font-medium text-foreground">{trainee.missionsCompleted}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <Progress value={completion} className="h-2 flex-1" />
                          <span className="text-sm font-medium text-foreground w-10">{completion}%</span>
                        </div>
                      </td>
                      <td>
                        <span className="font-bold text-primary">{trainee.totalScore}</span>
                      </td>
                      <td>{getStatusBadge(trainee.status)}</td>
                      <td>
                        <Button 
                          variant="ghost" 
                          size="sm"
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
      </Card>

      {/* Trainee Profile Dialog */}
      <Dialog open={!!selectedTrainee} onOpenChange={() => setSelectedTrainee(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-background">
          {selectedTrainee && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
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
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="metric-value text-foreground">{selectedTrainee.trainee.missionsCompleted}</p>
                    <p className="text-xs text-muted-foreground">Missions</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <Award className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <p className="metric-value text-foreground">{selectedTrainee.trainee.totalScore}</p>
                    <p className="text-xs text-muted-foreground">Total Score</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-status-info" />
                    <p className="metric-value text-foreground">
                      {getTraineeCompletion(selectedTrainee.trainee.id)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Completion</p>
                  </div>
                </div>

                {/* Progress Summary */}
                {selectedTrainee.progress.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground">Training Progress</h3>
                    <div className="space-y-3">
                      {selectedTrainee.progress.map((p, i) => (
                        <div key={i} className="p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground">
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
                    <h3 className="font-semibold mb-3 text-foreground">Recent Scores</h3>
                    <div className="space-y-2">
                      {selectedTrainee.scoreHistory.map((s) => (
                        <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-medium text-foreground">
                              Training Session
                            </p>
                            <p className="text-xs text-muted-foreground">{s.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold text-primary">{s.score}</p>
                              <p className="text-xs text-muted-foreground">{s.accuracy}% accuracy</p>
                            </div>
                            <Badge variant={s.result === 'pass' ? 'default' : 'destructive'}>
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

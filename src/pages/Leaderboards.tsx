import { useState } from 'react';
import { 
  Trophy, 
  Medal,
  Target,
  Clock,
  Percent,
  Filter,
  Crown,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trainees, simulatorTypes, scores, getSimulatorTypeName } from '@/data/mockData';

export default function Leaderboards() {
  const [selectedSimType, setSelectedSimType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  // Sort trainees by score
  const sortedTrainees = [...trainees].sort((a, b) => b.totalScore - a.totalScore);

  // Calculate accuracy and time for each trainee from scores
  const getTraineeStats = (traineeId: string) => {
    const traineeScores = scores.filter(s => s.traineeId === traineeId);
    if (traineeScores.length === 0) return { accuracy: 0, avgTime: 0 };
    
    const totalAccuracy = traineeScores.reduce((sum, s) => sum + s.accuracy, 0);
    const totalTime = traineeScores.reduce((sum, s) => sum + s.timeSeconds, 0);
    
    return {
      accuracy: Math.round(totalAccuracy / traineeScores.length),
      avgTime: Math.round(totalTime / traineeScores.length / 60), // Convert to minutes
    };
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
          <Crown className="w-6 h-6 text-white" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg">
          <Medal className="w-6 h-6 text-white" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
          <Award className="w-6 h-6 text-white" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <span className="text-lg font-bold text-muted-foreground">{rank}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-7 h-7 text-accent" />
            Leaderboards
          </h1>
          <p className="text-muted-foreground">Top performing trainees by score and accuracy</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedSimType} onValueChange={setSelectedSimType}>
            <SelectTrigger className="w-40 bg-muted border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Simulator Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {simulatorTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 bg-muted border-border">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedTrainees.slice(0, 3).map((trainee, index) => {
          const stats = getTraineeStats(trainee.id);
          const position = index + 1;
          
          return (
            <Card 
              key={trainee.id}
              className={`tactical-card relative overflow-hidden ${
                position === 1 ? 'md:order-2 ring-2 ring-accent/50' : 
                position === 2 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              {position === 1 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />
              )}
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {getRankBadge(position)}
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-3">
                  {trainee.avatar}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">{trainee.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{trainee.rank} • {trainee.unit}</p>
                
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold text-primary">{trainee.totalScore}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.accuracy}%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.avgTime}m</p>
                    <p className="text-xs text-muted-foreground">Avg Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Rankings Table */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Full Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-20">Rank</th>
                  <th>Trainee</th>
                  <th>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Total Score
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      Accuracy
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Avg Time
                    </div>
                  </th>
                  <th>Missions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTrainees.map((trainee, index) => {
                  const rank = index + 1;
                  const stats = getTraineeStats(trainee.id);
                  
                  return (
                    <tr 
                      key={trainee.id} 
                      className={rank <= 3 ? 'bg-accent/5' : ''}
                    >
                      <td>
                        <div className="flex items-center justify-center">
                          {rank <= 3 ? (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                              rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                              rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                              'bg-gradient-to-br from-amber-600 to-amber-800'
                            }`}>
                              {rank}
                            </div>
                          ) : (
                            <span className="text-lg font-medium text-muted-foreground">{rank}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                            {trainee.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{trainee.name}</p>
                            <p className="text-xs text-muted-foreground">{trainee.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-bold text-primary text-lg">{trainee.totalScore}</span>
                      </td>
                      <td>
                        <Badge variant={stats.accuracy >= 90 ? 'default' : stats.accuracy >= 70 ? 'secondary' : 'outline'}>
                          {stats.accuracy}%
                        </Badge>
                      </td>
                      <td className="text-muted-foreground">{stats.avgTime}m</td>
                      <td className="text-muted-foreground">{trainee.missionsCompleted}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stats by Simulator Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {simulatorTypes.map((type) => {
          const typeScores = scores.filter(s => s.simulatorType === type.id);
          const avgScore = typeScores.length > 0 
            ? Math.round(typeScores.reduce((sum, s) => sum + s.score, 0) / typeScores.length)
            : 0;
          const avgAccuracy = typeScores.length > 0
            ? Math.round(typeScores.reduce((sum, s) => sum + s.accuracy, 0) / typeScores.length)
            : 0;
          
          return (
            <Card key={type.id} className="tactical-card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{type.name}</Badge>
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{type.fullName}</p>
                <div className="flex items-baseline gap-4 mt-3">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{avgScore}</span>
                    <span className="text-xs text-muted-foreground ml-1">avg score</span>
                  </div>
                  <div>
                    <span className="text-lg font-medium text-primary">{avgAccuracy}%</span>
                    <span className="text-xs text-muted-foreground ml-1">accuracy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

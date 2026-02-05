import { useState } from 'react';
import { 
  Trophy, 
  Medal,
  Clock,
  Percent,
  Filter,
  Crown,
  Award,
  Crosshair,
  Users,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { trainees, scores, weapons, weaponScores, getWeaponById } from '@/data/mockData';
import { AnimatedCounter } from '@/hooks/useAnimatedCounter';

type LeaderboardView = 'overall' | 'weapons';

export default function Leaderboards() {
  const [dateRange, setDateRange] = useState<string>('all');
  const [selectedWeapon, setSelectedWeapon] = useState<string>('all');
  const [leaderboardView, setLeaderboardView] = useState<LeaderboardView>('overall');

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
      avgTime: Math.round(totalTime / traineeScores.length / 60),
    };
  };

  // Get weapon leaderboard data
  const getWeaponLeaderboard = () => {
    const filteredScores = selectedWeapon === 'all' 
      ? weaponScores 
      : weaponScores.filter(ws => ws.weaponId === selectedWeapon);

    if (selectedWeapon === 'all') {
      const traineeAggregates = new Map<string, { totalScore: number; accuracy: number; sessions: number }>();
      
      filteredScores.forEach(ws => {
        const existing = traineeAggregates.get(ws.traineeId);
        if (existing) {
          existing.totalScore += ws.totalScore;
          existing.accuracy = Math.round((existing.accuracy * existing.sessions + ws.accuracy * ws.sessions) / (existing.sessions + ws.sessions));
          existing.sessions += ws.sessions;
        } else {
          traineeAggregates.set(ws.traineeId, {
            totalScore: ws.totalScore,
            accuracy: ws.accuracy,
            sessions: ws.sessions,
          });
        }
      });

      return Array.from(traineeAggregates.entries())
        .map(([traineeId, stats]) => ({
          traineeId,
          trainee: trainees.find(t => t.id === traineeId),
          ...stats,
        }))
        .sort((a, b) => b.totalScore - a.totalScore);
    }

    return filteredScores
      .map(ws => ({
        traineeId: ws.traineeId,
        trainee: trainees.find(t => t.id === ws.traineeId),
        totalScore: ws.totalScore,
        accuracy: ws.accuracy,
        sessions: ws.sessions,
      }))
      .sort((a, b) => b.totalScore - a.totalScore);
  };

  const weaponLeaderboard = getWeaponLeaderboard();

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
          <Crown className="w-7 h-7 text-white" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-lg">
          <Medal className="w-7 h-7 text-gray-700" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
          <Award className="w-7 h-7 text-white" />
        </div>
      );
    }
    return (
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
        <span className="text-xl font-bold text-muted-foreground">{rank}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(38 95% 55%) 0%, hsl(25 90% 50%) 100%)' }}>
              <Trophy className="w-6 h-6 text-white" />
            </div>
            Leaderboards
          </h1>
          <p className="text-muted-foreground mt-1">Top performing trainees by accuracy</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 bg-card border-border rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent className="bg-popover rounded-xl">
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Leaderboard Tabs */}
      <Tabs value={leaderboardView} onValueChange={(v) => setLeaderboardView(v as LeaderboardView)}>
        <TabsList className="bg-muted rounded-xl p-1">
          <TabsTrigger value="overall" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Trophy className="w-4 h-4 mr-2" />
            Overall Rankings
          </TabsTrigger>
          <TabsTrigger value="weapons" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Crosshair className="w-4 h-4 mr-2" />
            By Weapon
          </TabsTrigger>
        </TabsList>

        {/* Overall Rankings Tab */}
        <TabsContent value="overall" className="space-y-6 mt-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedTrainees.slice(0, 3).map((trainee, index) => {
              const stats = getTraineeStats(trainee.id);
              const position = index + 1;
              
              return (
                <AnimatedCard 
                  key={trainee.id}
                  index={position - 1}
                  className={`tactical-card relative overflow-hidden group ${
                    position === 1 ? 'md:order-2 ring-2 ring-[hsl(var(--status-warning))]/50' : 
                    position === 2 ? 'md:order-1' : 'md:order-3'
                  }`}
                >
                  {position === 1 && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />
                  )}
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      {getRankBadge(position)}
                    </div>
                    <div className="icon-gradient-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                      {trainee.avatar}
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-1">{trainee.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{trainee.rank} • {trainee.unit}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
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
                </AnimatedCard>
              );
            })}
          </div>

          {/* Full Rankings Table */}
          <AnimatedCard index={3} className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                <div className="icon-container-primary w-9 h-9">
                  <Users className="w-5 h-5" />
                </div>
                Full Rankings
              </CardTitle>
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
                          className={`group ${rank <= 3 ? 'bg-[hsl(var(--status-warning))]/5' : ''}`}
                        >
                          <td>
                            <div className="flex items-center justify-center">
                              {rank <= 3 ? (
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white group-hover:scale-110 transition-transform ${
                                  rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md' :
                                  rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                                  'bg-gradient-to-br from-amber-600 to-amber-700'
                                }`}>
                                  {rank === 1 ? <Crown className="w-4 h-4" /> : rank === 2 ? <Medal className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                                </div>
                              ) : (
                                <span className="text-lg font-medium text-muted-foreground">{rank}</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="icon-gradient-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform">
                                {trainee.avatar}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{trainee.name}</p>
                                <p className="text-xs text-muted-foreground">{trainee.unit}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Badge 
                              variant={stats.accuracy >= 90 ? 'default' : stats.accuracy >= 70 ? 'secondary' : 'outline'}
                              className="rounded-lg"
                            >
                              {stats.accuracy}%
                            </Badge>
                          </td>
                          <td className="text-muted-foreground">{stats.avgTime}m</td>
                          <td className="text-muted-foreground flex items-center gap-1">
                            <Crosshair className="w-3.5 h-3.5" />
                            {trainee.missionsCompleted}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        {/* Weapons Leaderboard Tab */}
        <TabsContent value="weapons" className="space-y-6 mt-6">
          {/* Weapon Filter */}
          <AnimatedCard index={0} className="tactical-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-primary" />
                  Filter by Weapon:
                </label>
                <Select value={selectedWeapon} onValueChange={setSelectedWeapon}>
                  <SelectTrigger className="w-60 bg-muted border-border rounded-xl">
                    <SelectValue placeholder="Select weapon" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover rounded-xl">
                    <SelectItem value="all">All Weapons</SelectItem>
                    {weapons.map(weapon => (
                      <SelectItem key={weapon.id} value={weapon.id}>
                        {weapon.name} ({weapon.caliber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedWeapon !== 'all' && (
                  <Badge variant="secondary" className="ml-2 rounded-lg">
                    {getWeaponById(selectedWeapon)?.type.toUpperCase()}
                  </Badge>
                )}
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Weapon Top 3 */}
          {weaponLeaderboard.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weaponLeaderboard.slice(0, 3).map((entry, index) => {
                const position = index + 1;
                
                return (
                  <AnimatedCard 
                    key={entry.traineeId}
                    index={position}
                    className={`tactical-card relative overflow-hidden group ${
                      position === 1 ? 'md:order-2 ring-2 ring-[hsl(var(--status-warning))]/50' : 
                      position === 2 ? 'md:order-1' : 'md:order-3'
                    }`}
                  >
                    {position === 1 && (
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />
                    )}
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                        {getRankBadge(position)}
                      </div>
                      <div className="icon-gradient-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                        {entry.trainee?.avatar}
                      </div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{entry.trainee?.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{entry.trainee?.rank} • {entry.trainee?.unit}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-2xl font-bold text-foreground">{entry.accuracy}%</p>
                          <p className="text-xs text-muted-foreground">Accuracy</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{entry.sessions}</p>
                          <p className="text-xs text-muted-foreground">Sessions</p>
                        </div>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                );
              })}
            </div>
          )}

          {/* Weapon Rankings Table */}
          <AnimatedCard index={4} className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                <div className="icon-container-primary w-9 h-9">
                  <Crosshair className="w-5 h-5" />
                </div>
                {selectedWeapon === 'all' ? 'All Weapons Rankings' : `${getWeaponById(selectedWeapon)?.name} Rankings`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weaponLeaderboard.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No training data available for the selected weapon
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="w-20">Rank</th>
                        <th>Trainee</th>
                        <th>
                          <div className="flex items-center gap-1">
                            <Percent className="w-4 h-4" />
                            Accuracy
                          </div>
                        </th>
                        <th>Sessions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weaponLeaderboard.map((entry, index) => {
                        const rank = index + 1;
                        
                        return (
                          <tr 
                            key={entry.traineeId} 
                            className={`group ${rank <= 3 ? 'bg-[hsl(var(--status-warning))]/5' : ''}`}
                          >
                            <td>
                              <div className="flex items-center justify-center">
                                {rank <= 3 ? (
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white group-hover:scale-110 transition-transform ${
                                    rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md' :
                                    rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                                    'bg-gradient-to-br from-amber-600 to-amber-700'
                                  }`}>
                                    {rank === 1 ? <Crown className="w-4 h-4" /> : rank === 2 ? <Medal className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                                  </div>
                                ) : (
                                  <span className="text-lg font-medium text-muted-foreground">{rank}</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="icon-gradient-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform">
                                  {entry.trainee?.avatar}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{entry.trainee?.name}</p>
                                  <p className="text-xs text-muted-foreground">{entry.trainee?.unit}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <Badge 
                                variant={entry.accuracy >= 90 ? 'default' : entry.accuracy >= 70 ? 'secondary' : 'outline'}
                                className="rounded-lg"
                              >
                                {entry.accuracy}%
                              </Badge>
                            </td>
                            <td className="text-muted-foreground">{entry.sessions}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

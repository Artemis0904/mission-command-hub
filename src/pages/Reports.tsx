import { useState } from 'react';
import { 
  FileBarChart, 
  Play,
  Filter,
  Search,
  Download,
  Eye,
  Clock,
  Target,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { sessionReports, trainees, missions, replayEvents, getTraineeById, getCourseById } from '@/data/mockData';

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultFilter, setResultFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<typeof sessionReports[0] | null>(null);
  const [showReplay, setShowReplay] = useState(false);

  const filteredReports = sessionReports.filter(report => {
    const trainee = getTraineeById(report.traineeId);
    if (searchTerm && !trainee?.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (resultFilter !== 'all' && report.result !== resultFilter) return false;
    return true;
  });

  const openReportDetail = (report: typeof sessionReports[0]) => {
    setSelectedReport(report);
    setShowReplay(false);
  };

  const openReplay = (report: typeof sessionReports[0]) => {
    setSelectedReport(report);
    setShowReplay(true);
  };

  const getReplayEvents = (sessionId: string) => {
    return replayEvents[sessionId as keyof typeof replayEvents] || [];
  };

  const getMissionCourse = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission) {
      return getCourseById(mission.courseId);
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileBarChart className="w-7 h-7 text-primary" />
            Reports & Replay
          </h1>
          <p className="text-muted-foreground">View historical training data and session replays</p>
        </div>
        <Button variant="outline" className="btn-interactive hover:glow-primary">
          <Download className="w-4 h-4 mr-2" />
          Export Reports
        </Button>
      </div>

      {/* Filters */}
      <AnimatedCard index={0} className="tactical-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by trainee name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
            <Select value={resultFilter} onValueChange={setResultFilter}>
              <SelectTrigger className="w-36 bg-muted border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Reports Table */}
      <AnimatedCard index={1} className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Session Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Trainee</th>
                  <th>Course</th>
                  <th>Score</th>
                  <th>Result</th>
                  <th>Date/Time</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => {
                  const trainee = getTraineeById(report.traineeId);
                  const course = getMissionCourse(report.missionId);
                  
                  return (
                    <tr key={report.id}>
                      <td>
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {report.sessionId}
                        </code>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {trainee?.avatar}
                          </div>
                          <span className="font-medium text-foreground">{trainee?.name}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground">{course?.name || 'N/A'}</td>
                      <td>
                        <span className="font-bold text-primary">{report.score}</span>
                      </td>
                      <td>
                        <Badge variant={report.result === 'pass' ? 'default' : 'destructive'}>
                          {report.result === 'pass' ? (
                            <><CheckCircle className="w-3 h-3 mr-1" />Pass</>
                          ) : (
                            <><XCircle className="w-3 h-3 mr-1" />Fail</>
                          )}
                        </Badge>
                      </td>
                      <td className="text-sm text-muted-foreground">
                        {new Date(report.dateTime).toLocaleString()}
                      </td>
                      <td className="text-muted-foreground">{report.duration}m</td>
                      <td>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="btn-interactive"
                            onClick={() => openReportDetail(report)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="btn-interactive"
                            onClick={() => openReplay(report)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Replay
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No reports match the current filters
            </div>
          )}
        </CardContent>
      </AnimatedCard>

      {/* Report Detail / Replay Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-background">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {showReplay ? (
                    <>
                      <Play className="w-5 h-5 text-primary" />
                      Session Replay
                    </>
                  ) : (
                    <>
                      <FileBarChart className="w-5 h-5 text-primary" />
                      Session Report
                    </>
                  )}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Session Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Session ID</p>
                    <code className="text-sm font-mono">{selectedReport.sessionId}</code>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Trainee</p>
                    <p className="font-medium">{getTraineeById(selectedReport.traineeId)?.name}</p>
                  </div>
                </div>

                {!showReplay ? (
                  // Report View
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-muted/30 text-center">
                        <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="metric-value text-foreground">{selectedReport.score}</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30 text-center">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-accent" />
                        <p className="metric-value text-foreground">{selectedReport.duration}m</p>
                        <p className="text-xs text-muted-foreground">Duration</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30 text-center">
                        {selectedReport.result === 'pass' ? (
                          <CheckCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
                        ) : (
                          <XCircle className="w-6 h-6 mx-auto mb-2 text-destructive" />
                        )}
                        <p className="metric-value text-foreground capitalize">{selectedReport.result}</p>
                        <p className="text-xs text-muted-foreground">Result</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 btn-interactive glow-primary"
                        onClick={() => setShowReplay(true)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Replay
                      </Button>
                      <Button variant="outline" className="flex-1 btn-interactive hover:glow-primary">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </>
                ) : (
                  // Replay View
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Session Timeline</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowReplay(false)}
                      >
                        Back to Report
                      </Button>
                    </div>

                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                      
                      {/* Events */}
                      <div className="space-y-4">
                        {getReplayEvents(selectedReport.sessionId).length > 0 ? (
                          getReplayEvents(selectedReport.sessionId).map((event, index) => (
                            <div key={index} className="flex gap-4 relative">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                                event.event.includes('Hit') ? 'bg-primary/20 text-primary' :
                                event.event.includes('Miss') ? 'bg-destructive/20 text-destructive' :
                                event.event.includes('Complete') ? 'bg-accent/20 text-accent' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                <span className="text-xs font-mono">{Math.floor(event.time / 60)}:{(event.time % 60).toString().padStart(2, '0')}</span>
                              </div>
                              <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border">
                                <p className="font-medium text-foreground">{event.event}</p>
                                <p className="text-sm text-muted-foreground">{event.details}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            No detailed replay data available for this session
                          </div>
                        )}
                      </div>
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

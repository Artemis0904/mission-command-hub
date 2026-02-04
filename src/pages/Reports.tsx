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
  CheckCircle2,
  XCircle,
  Monitor,
  BarChart3,
  FileText,
  Timer,
  ArrowUpRight,
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
import { sessionReports, missions, replayEvents, getCourseById, getStationById } from '@/data/mockData';

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultFilter, setResultFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<typeof sessionReports[0] | null>(null);
  const [showReplay, setShowReplay] = useState(false);

  const filteredReports = sessionReports.filter(report => {
    const station = getStationById(report.stationId);
    if (searchTerm && !station?.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
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
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(270 85% 60%) 0%, hsl(290 80% 55%) 100%)' }}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Reports & Replay
          </h1>
          <p className="text-muted-foreground mt-1">View historical training data and session replays</p>
        </div>
        <Button variant="outline" className="btn-interactive hover:glow-primary rounded-xl">
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
                placeholder="Search by station name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted border-border rounded-xl"
              />
            </div>
            <Select value={resultFilter} onValueChange={setResultFilter}>
              <SelectTrigger className="w-36 bg-muted border-border rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent className="bg-popover rounded-xl">
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
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <div className="icon-container-primary w-9 h-9">
              <FileText className="w-5 h-5" />
            </div>
            Session Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Station</th>
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
                  const station = getStationById(report.stationId);
                  const course = getMissionCourse(report.missionId);
                  
                  return (
                    <tr key={report.id} className="group">
                      <td>
                        <code className="text-xs bg-muted px-2 py-1 rounded-lg font-mono">
                          {report.sessionId}
                        </code>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="icon-gradient-primary w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground">{station?.name || 'N/A'}</span>
                            <p className="text-xs text-muted-foreground">{station?.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted-foreground">{course?.name || 'N/A'}</td>
                      <td>
                        <span className="font-bold text-primary flex items-center gap-1">
                          <Target className="w-3.5 h-3.5" />
                          {report.score}
                        </span>
                      </td>
                      <td>
                        <Badge 
                          variant={report.result === 'pass' ? 'default' : 'destructive'}
                          className="rounded-lg"
                        >
                          {report.result === 'pass' ? (
                            <><CheckCircle2 className="w-3 h-3 mr-1" />Pass</>
                          ) : (
                            <><XCircle className="w-3 h-3 mr-1" />Fail</>
                          )}
                        </Badge>
                      </td>
                      <td className="text-sm text-muted-foreground">
                        {new Date(report.dateTime).toLocaleString()}
                      </td>
                      <td className="text-muted-foreground flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5" />
                        {report.duration}m
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="btn-interactive rounded-lg"
                            onClick={() => openReportDetail(report)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="btn-interactive rounded-lg"
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
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-background rounded-2xl">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {showReplay ? (
                    <>
                      <div className="icon-gradient-accent p-2 rounded-xl">
                        <Play className="w-5 h-5" />
                      </div>
                      Session Replay
                    </>
                  ) : (
                    <>
                      <div className="icon-gradient-primary p-2 rounded-xl">
                        <FileBarChart className="w-5 h-5" />
                      </div>
                      Session Report
                    </>
                  )}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Session Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <p className="text-xs text-muted-foreground mb-1">Session ID</p>
                    <code className="text-sm font-mono">{selectedReport.sessionId}</code>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <p className="text-xs text-muted-foreground mb-1">Station</p>
                    <p className="font-medium flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-primary" />
                      {getStationById(selectedReport.stationId)?.name}
                    </p>
                  </div>
                </div>

                {!showReplay ? (
                  // Report View
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                        <div className="icon-container-primary w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <Target className="w-6 h-6" />
                        </div>
                        <p className="metric-value text-foreground">{selectedReport.score}</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                        <div className="icon-container-accent w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <Clock className="w-6 h-6" />
                        </div>
                        <p className="metric-value text-foreground">{selectedReport.duration}m</p>
                        <p className="text-xs text-muted-foreground">Duration</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center group hover:bg-muted/50 transition-colors">
                        <div className={`icon-container w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform ${
                          selectedReport.result === 'pass' 
                            ? 'bg-[hsl(var(--status-active))]/10 text-[hsl(var(--status-active))]' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {selectedReport.result === 'pass' ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <XCircle className="w-6 h-6" />
                          )}
                        </div>
                        <p className="metric-value text-foreground capitalize">{selectedReport.result}</p>
                        <p className="text-xs text-muted-foreground">Result</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 btn-interactive glow-primary rounded-xl"
                        onClick={() => setShowReplay(true)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Replay
                      </Button>
                      <Button variant="outline" className="flex-1 btn-interactive hover:glow-primary rounded-xl">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </>
                ) : (
                  // Replay View
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Timer className="w-4 h-4 text-primary" />
                        Session Timeline
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowReplay(false)}
                        className="rounded-lg"
                      >
                        <ArrowUpRight className="w-4 h-4 mr-1" />
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
                            <div key={index} className="flex gap-4 relative group">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center z-10 transition-transform group-hover:scale-105 ${
                                event.event.includes('Hit') ? 'bg-[hsl(var(--status-active))]/20 text-[hsl(var(--status-active))]' :
                                event.event.includes('Miss') ? 'bg-destructive/20 text-destructive' :
                                event.event.includes('Complete') ? 'bg-accent/20 text-accent' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                <span className="text-xs font-mono">{Math.floor(event.time / 60)}:{(event.time % 60).toString().padStart(2, '0')}</span>
                              </div>
                              <div className="flex-1 p-3 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
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

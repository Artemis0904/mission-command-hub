import { useState } from 'react';
import { 
  Monitor, 
  Power, 
  PowerOff, 
  Activity,
  BookOpen,
  MapPin,
  Check,
  X,
  Settings,
} from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { iwtsStations, customCourses, getCourseById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function StationManagement() {
  const { toast } = useToast();
  const [stations, setStations] = useState(iwtsStations);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'idle':
        return <Power className="w-5 h-5 text-primary" />;
      case 'in-use':
        return <Activity className="w-5 h-5 text-accent" />;
      case 'offline':
        return <PowerOff className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Power className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'in-use':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'offline':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleAssignCourse = () => {
    if (!selectedStationId || !selectedCourseId) return;

    setStations(stations.map(station => 
      station.id === selectedStationId 
        ? { ...station, assignedCourseId: selectedCourseId }
        : station
    ));

    const course = getCourseById(selectedCourseId);
    const station = stations.find(s => s.id === selectedStationId);

    toast({
      title: 'Course Assigned',
      description: `"${course?.name}" assigned to ${station?.name}.`,
    });

    setAssignDialogOpen(false);
    setSelectedStationId(null);
    setSelectedCourseId('');
  };

  const handleClearAssignment = (stationId: string) => {
    setStations(stations.map(station => 
      station.id === stationId 
        ? { ...station, assignedCourseId: null }
        : station
    ));

    toast({
      title: 'Assignment Cleared',
      description: 'Course assignment has been removed.',
    });
  };

  const idleCount = stations.filter(s => s.status === 'idle').length;
  const inUseCount = stations.filter(s => s.status === 'in-use').length;
  const offlineCount = stations.filter(s => s.status === 'offline').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Monitor className="w-7 h-7 text-primary" />
            IWTS Stations
          </h1>
          <p className="text-muted-foreground">Manage and monitor all 10 IWTS training stations</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <AnimatedCard index={0} className="tactical-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Power className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{idleCount}</p>
              <p className="text-sm text-muted-foreground">Idle</p>
            </div>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard index={1} className="tactical-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{inUseCount}</p>
              <p className="text-sm text-muted-foreground">In Use</p>
            </div>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard index={2} className="tactical-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <PowerOff className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{offlineCount}</p>
              <p className="text-sm text-muted-foreground">Offline</p>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stations.map((station, index) => {
          const assignedCourse = station.assignedCourseId 
            ? getCourseById(station.assignedCourseId) 
            : null;

          return (
            <AnimatedCard 
              key={station.id}
              index={index + 3}
              className={cn(
                "tactical-card transition-all",
                station.status === 'offline' && "opacity-60"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{station.name}</CardTitle>
                  {getStatusIcon(station.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge className={cn("w-full justify-center py-1", getStatusColor(station.status))}>
                  {station.status === 'idle' ? 'Idle' : station.status === 'in-use' ? 'In Use' : 'Offline'}
                </Badge>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{station.location}</span>
                </div>

                {/* Assigned Course */}
                {assignedCourse ? (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{assignedCourse.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {assignedCourse.exerciseIds.length} exercises • {assignedCourse.totalTime} min
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-2 text-destructive hover:text-destructive"
                      onClick={() => handleClearAssignment(station.id)}
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-dashed border-border text-center">
                    <p className="text-xs text-muted-foreground mb-2">No course assigned</p>
                    <Dialog open={assignDialogOpen && selectedStationId === station.id} onOpenChange={(open) => {
                      setAssignDialogOpen(open);
                      if (!open) setSelectedStationId(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full btn-interactive hover:glow-primary"
                          disabled={station.status === 'offline'}
                          onClick={() => setSelectedStationId(station.id)}
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          Assign Course
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-background">
                        <DialogHeader>
                          <DialogTitle>Assign Course to {station.name}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                            <SelectTrigger className="bg-muted border-border">
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover">
                              {customCourses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.name} ({course.exerciseIds.length} exercises)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAssignCourse} disabled={!selectedCourseId} className="btn-interactive glow-primary">
                            <Check className="w-4 h-4 mr-2" />
                            Assign
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </AnimatedCard>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Plus,
  Users,
  Monitor,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { missions, customCourses, iwtsStations, getCourseById, getStationById } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function MissionScheduler() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 23)); // Jan 23, 2026
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get days for the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  // Get week days
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Get missions for a specific date
  const getMissionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return missions.filter(m => m.date === dateStr);
  };

  const navigatePrev = () => {
    if (view === 'monthly') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (view === 'weekly') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const navigateNext = () => {
    if (view === 'monthly') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (view === 'weekly') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const handleScheduleMission = () => {
    toast({
      title: 'Mission Scheduled',
      description: 'New mission has been added to the calendar.',
    });
    setIsDialogOpen(false);
  };

  const isToday = (date: Date) => {
    const today = new Date(2026, 0, 23); // Mock today
    return date.toDateString() === today.toDateString();
  };

  const weekDays = getWeekDays(currentDate);
  const monthDays = getDaysInMonth(currentDate);
  const availableStations = iwtsStations.filter(s => s.status !== 'offline');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-accent" />
            Mission Scheduler
          </h1>
          <p className="text-muted-foreground">Schedule and manage training missions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Mission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-background">
            <DialogHeader>
              <DialogTitle>Schedule New Mission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Mission Name</Label>
                <Input placeholder="Enter mission name" className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Custom Course</Label>
                <Select>
                  <SelectTrigger className="bg-muted">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {customCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.exerciseIds.length} exercises)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" className="bg-muted" defaultValue="2026-01-24" />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" className="bg-muted" defaultValue="09:00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>IWTS Station</Label>
                  <Select>
                    <SelectTrigger className="bg-muted">
                      <SelectValue placeholder="Select station" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {availableStations.map(station => (
                        <SelectItem key={station.id} value={station.id}>{station.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration (min)</Label>
                  <Input type="number" className="bg-muted" defaultValue="60" />
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleScheduleMission}>
                Schedule Mission
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar View Toggle */}
      <Card className="tactical-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={navigatePrev}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold text-foreground">
              {view === 'daily' 
                ? currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                : view === 'weekly'
                ? `Week of ${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                : `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              }
            </h2>
            <Button variant="ghost" size="icon" onClick={navigateNext}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as 'daily' | 'weekly' | 'monthly')}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {/* Daily View */}
          {view === 'daily' && (
            <div className="space-y-3">
              {getMissionsForDate(currentDate).length > 0 ? (
                getMissionsForDate(currentDate).map((mission) => {
                  const course = getCourseById(mission.courseId);
                  const station = getStationById(mission.stationId);
                  return (
                    <div
                      key={mission.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="w-16 text-center">
                        <span className="text-xl font-bold text-primary">{mission.time}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{mission.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Monitor className="w-3 h-3" />
                            {station?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {mission.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {mission.assignedTrainees.length} trainees
                          </span>
                        </div>
                      </div>
                      <Badge variant={mission.status === 'in-progress' ? 'default' : 'secondary'}>
                        {mission.status}
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No missions scheduled for this day
                </div>
              )}
            </div>
          )}

          {/* Weekly View */}
          {view === 'weekly' && (
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => {
                const dayMissions = getMissionsForDate(day);
                return (
                  <div
                    key={index}
                    className={`min-h-[200px] rounded-lg border p-2 ${
                      isToday(day) ? 'border-primary bg-primary/5' : 'border-border bg-muted/20'
                    }`}
                  >
                    <div className="text-center mb-2">
                      <p className="text-xs text-muted-foreground">{daysOfWeek[index]}</p>
                      <p className={`text-lg font-bold ${isToday(day) ? 'text-primary' : 'text-foreground'}`}>
                        {day.getDate()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      {dayMissions.map((mission) => (
                        <div
                          key={mission.id}
                          className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                            mission.status === 'in-progress'
                              ? 'bg-primary/20 text-primary border border-primary/30'
                              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          <p className="font-medium truncate">{mission.name}</p>
                          <p className="text-[10px] opacity-80">{mission.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Monthly View */}
          {view === 'monthly' && (
            <div>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="h-24" />;
                  }
                  const dayMissions = getMissionsForDate(day);
                  return (
                    <div
                      key={index}
                      className={`h-24 rounded-lg border p-2 overflow-hidden ${
                        isToday(day) ? 'border-primary bg-primary/5' : 'border-border bg-muted/10'
                      }`}
                    >
                      <p className={`text-sm font-medium mb-1 ${isToday(day) ? 'text-primary' : 'text-foreground'}`}>
                        {day.getDate()}
                      </p>
                      <div className="space-y-0.5">
                        {dayMissions.slice(0, 2).map((mission) => (
                          <div
                            key={mission.id}
                            className="text-[10px] bg-primary/20 text-primary px-1 py-0.5 rounded truncate"
                          >
                            {mission.name}
                          </div>
                        ))}
                        {dayMissions.length > 2 && (
                          <div className="text-[10px] text-muted-foreground">
                            +{dayMissions.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Missions List */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">All Scheduled Missions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mission Name</th>
                  <th>Station</th>
                  <th>Course</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Trainees</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {missions.map((mission) => {
                  const course = getCourseById(mission.courseId);
                  const station = getStationById(mission.stationId);
                  return (
                    <tr key={mission.id}>
                      <td className="font-medium text-foreground">{mission.name}</td>
                      <td>
                        <Badge variant="outline">{station?.name}</Badge>
                      </td>
                      <td className="text-muted-foreground">{course?.name}</td>
                      <td className="text-muted-foreground">{mission.date} at {mission.time}</td>
                      <td className="text-muted-foreground">{mission.duration} min</td>
                      <td>{mission.assignedTrainees.length}</td>
                      <td>
                        <Badge variant={
                          mission.status === 'in-progress' ? 'default' :
                          mission.status === 'completed' ? 'secondary' : 'outline'
                        }>
                          {mission.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

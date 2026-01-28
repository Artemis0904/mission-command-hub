import { useState } from 'react';
import { format } from 'date-fns';
import { 
  Plus, 
  Trash2, 
  Save, 
  BookOpen,
  Clock,
  Target,
  GripVertical,
  Check,
  Monitor,
  ChevronDown,
  ChevronRight,
  Search,
  Calendar as CalendarIcon,
  Repeat,
  Crosshair,
  RotateCw,
  Move,
  ArrowRight,
  ArrowLeft,
  Circle,
  MoveHorizontal,
  Users,
  AlertTriangle,
  X,
} from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { iwtsStations, customCourses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  ExerciseConfigurator, 
  ExerciseConfig, 
  ExerciseType, 
  EXERCISE_TYPES,
  getTargetName,
} from '@/components/ExerciseConfigurator';
import { CourseTemplateManager } from '@/components/CourseTemplateManager';

// Icons mapping for exercise types
const typeIcons: Record<string, React.ReactNode> = {
  'static-normal': <Target className="w-4 h-4" />,
  'squad-post-normal': <Users className="w-4 h-4" />,
  'grouping': <Circle className="w-4 h-4" />,
  'rotate': <RotateCw className="w-4 h-4" />,
  'moving-basic': <Move className="w-4 h-4" />,
  'moving-ltr': <ArrowRight className="w-4 h-4" />,
  'moving-rtl': <ArrowLeft className="w-4 h-4" />,
  'point-target': <Crosshair className="w-4 h-4" />,
  'traverse-target': <MoveHorizontal className="w-4 h-4" />,
};



// Configured exercise with type and settings
interface ConfiguredExercise {
  id: string;
  typeId: string;
  typeName: string;
  config: ExerciseConfig;
}

export default function CustomCourses() {
  const { toast } = useToast();
  const [courseName, setCourseName] = useState('');
  const [configuredExercises, setConfiguredExercises] = useState<ConfiguredExercise[]>([]);
  const [courses, setCourses] = useState(customCourses);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedCourseForAssign, setSelectedCourseForAssign] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  // Direct station assignment for new course - now supports multiple
  const [assignedStations, setAssignedStations] = useState<string[]>([]);
  
  // Scheduling state
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Available stations (moved up for use in handlers)
  const availableStations = iwtsStations.filter(s => s.status !== 'offline');

  // Check if all stations are selected
  const allStationsSelected = assignedStations.length === availableStations.length && availableStations.length > 0;

  const handleStationToggle = (stationId: string) => {
    setAssignedStations(prev => 
      prev.includes(stationId) 
        ? prev.filter(id => id !== stationId)
        : [...prev, stationId]
    );
  };

  const handleToggleAllStations = () => {
    if (allStationsSelected) {
      setAssignedStations([]);
    } else {
      setAssignedStations(availableStations.map(s => s.id));
    }
  };

  // Add configured exercise
  const handleAddExercise = (type: ExerciseType, config: ExerciseConfig) => {
    const newExercise: ConfiguredExercise = {
      id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      typeId: type.id,
      typeName: type.name,
      config,
    };
    setConfiguredExercises(prev => [...prev, newExercise]);
    toast({
      title: 'Exercise Added',
      description: `${type.name} exercise added to course.`,
    });
  };

  // Load template exercises
  const handleLoadTemplate = (exercises: { typeId: string; typeName: string; config: ExerciseConfig }[]) => {
    const loadedExercises: ConfiguredExercise[] = exercises.map((ex, idx) => ({
      id: `ex-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 9)}`,
      typeId: ex.typeId,
      typeName: ex.typeName,
      config: ex.config,
    }));
    setConfiguredExercises(prev => [...prev, ...loadedExercises]);
  };

  const removeExercise = (exerciseId: string) => {
    setConfiguredExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newExercises = [...configuredExercises];
      const [removed] = newExercises.splice(draggedIndex, 1);
      newExercises.splice(dragOverIndex, 0, removed);
      setConfiguredExercises(newExercises);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const getTotalTime = () => {
    return configuredExercises.reduce((total, ex) => {
      return total + Math.ceil(ex.config.scenarioTime / 60);
    }, 0);
  };

  const getTotalBullets = () => {
    return configuredExercises.reduce((total, ex) => {
      return total + ex.config.bullets;
    }, 0);
  };

  // Clear all functionality
  const handleClearAll = () => {
    setCourseName('');
    setConfiguredExercises([]);
    setStartDate(undefined);
    setEndDate(undefined);
    setAssignedStations([]);
    toast({
      title: 'Cleared',
      description: 'All course data has been cleared.',
    });
  };

  const handleSaveCourse = () => {
    if (!courseName || configuredExercises.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a course name and add at least one exercise.',
        variant: 'destructive',
      });
      return;
    }

    const newCourse = {
      id: `course-${Date.now()}`,
      name: courseName,
      exerciseIds: configuredExercises.map(ex => ex.id),
      createdAt: new Date().toISOString(),
      totalTime: getTotalTime(),
      totalTargets: configuredExercises.length,
      status: 'active' as const,
      assignedStations: assignedStations.length > 0 ? assignedStations : undefined,
      schedule: startDate && endDate ? {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      } : undefined,
    };

    setCourses([...courses, newCourse]);
    
    const scheduleText = startDate && endDate 
      ? ` (from ${format(startDate, 'MMM d')} to ${format(endDate, 'MMM d')})`
      : '';

    const stationText = assignedStations.length > 0
      ? assignedStations.length === availableStations.length
        ? ' and assigned to All Simulators'
        : ` and assigned to ${assignedStations.length} station(s)`
      : '';

    toast({
      title: 'Course Created',
      description: `"${courseName}" has been created with ${configuredExercises.length} exercises${scheduleText}${stationText}.`,
    });

    // Reset form
    handleClearAll();
  };

  const handleAssignToStation = () => {
    if (!selectedStation || !selectedCourseForAssign) return;

    toast({
      title: 'Course Assigned',
      description: `Course assigned to ${selectedStation.toUpperCase()}.`,
    });
    setAssignDialogOpen(false);
    setSelectedStation('');
    setSelectedCourseForAssign(null);
  };


  // Filter exercise types based on search query
  const filteredTypes = EXERCISE_TYPES.filter(type => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return type.name.toLowerCase().includes(query) || 
           type.description.toLowerCase().includes(query);
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-primary" />
            Custom Courses
          </h1>
          <p className="text-muted-foreground">Create training courses with configurable exercises</p>
        </div>
        <CourseTemplateManager
          configuredExercises={configuredExercises}
          onLoadTemplate={handleLoadTemplate}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Course Form */}
          <AnimatedCard index={0} className="tactical-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Create New Course</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={!courseName && configuredExercises.length === 0}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-background">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Clear All Course Data?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove the course name, all configured exercises, schedule settings, and station assignment. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleClearAll}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="bg-muted border-border"
                />
              </div>

              {/* Direct Station Assignment - Multi-Select */}
              <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
                <Label className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-primary" />
                  Assign to Stations (Optional)
                </Label>
                
                {/* All Simulators Option */}
                <div className="flex items-center space-x-2 pb-2 border-b border-border">
                  <Checkbox
                    id="all-stations"
                    checked={allStationsSelected}
                    onCheckedChange={handleToggleAllStations}
                  />
                  <label
                    htmlFor="all-stations"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    All Simulators ({availableStations.length} available)
                  </label>
                </div>

                {/* Individual Station Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {availableStations.map((station) => (
                    <div key={station.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={station.id}
                        checked={assignedStations.includes(station.id)}
                        onCheckedChange={() => handleStationToggle(station.id)}
                      />
                      <label
                        htmlFor={station.id}
                        className="text-sm leading-none cursor-pointer flex items-center gap-1"
                      >
                        {station.name}
                        {station.status === 'in-use' && (
                          <Badge variant="outline" className="text-xs ml-1">In Use</Badge>
                        )}
                      </label>
                    </div>
                  ))}
                </div>

                {assignedStations.length > 0 && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {assignedStations.length === availableStations.length 
                      ? 'All simulators selected'
                      : `${assignedStations.length} station(s) selected`}
                  </p>
                )}
              </div>

              {/* Schedule Section */}
              <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-medium">Task Schedule</Label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-background",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MMM d, yyyy") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-background",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MMM d, yyyy") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => startDate ? date < startDate : false}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {startDate && endDate && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Scheduled from {format(startDate, "MMM d")} to {format(endDate, "MMM d, yyyy")}
                  </p>
                )}
              </div>

              {/* Configured Exercises */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  <span>Configured Exercises</span>
                  <Badge variant="secondary">{configuredExercises.length} exercises</Badge>
                </Label>
                
                {configuredExercises.length > 0 ? (
                  <div className="space-y-2">
                    {configuredExercises.map((exercise, index) => (
                      <div
                        key={exercise.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragLeave={handleDragLeave}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 cursor-grab active:cursor-grabbing transition-all",
                          draggedIndex === index && "opacity-50 scale-95",
                          dragOverIndex === index && draggedIndex !== index && "border-primary border-2 bg-primary/10"
                        )}
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                        <span className="text-primary">{typeIcons[exercise.typeId]}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{exercise.typeName}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{formatTime(exercise.config.scenarioTime)}</span>
                            <span>•</span>
                            <span>{getTargetName(exercise.config.targetId)}</span>
                            <span>•</span>
                            <span>{exercise.config.range}m</span>
                            <span>•</span>
                            <span>{exercise.config.bullets} rounds</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs capitalize h-5">
                              {exercise.config.position}
                            </Badge>
                            {exercise.config.speed && (
                              <>
                                <span>•</span>
                                <span>Speed {exercise.config.speed}</span>
                              </>
                            )}
                            {exercise.config.groupingSize && (
                              <>
                                <span>•</span>
                                <span>{exercise.config.groupingSize}cm grouping</span>
                              </>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExercise(exercise.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Drag items to reorder
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-border rounded-lg text-muted-foreground">
                    Select an exercise type from the sidebar and configure it to add to your course
                  </div>
                )}
              </div>

              {/* Course Summary */}
              {configuredExercises.length > 0 && (
                <div className="flex items-center gap-6 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Est. Time: <strong>{getTotalTime()} min</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm">Total Bullets: <strong>{getTotalBullets()}</strong></span>
                  </div>
                </div>
              )}

              <Button 
                className="w-full bg-primary hover:bg-primary/90 btn-interactive hover:glow-primary" 
                onClick={handleSaveCourse}
                disabled={!courseName || configuredExercises.length === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Course {assignedStations.length > 0 && (
                  assignedStations.length === availableStations.length 
                    ? '& Assign to All Simulators' 
                    : `& Assign to ${assignedStations.length} Station(s)`
                )}
              </Button>
            </CardContent>
          </AnimatedCard>

          {/* Existing Courses */}
          <AnimatedCard index={1} className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Your Custom Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{course.name}</span>
                      <Badge variant="default">{course.status}</Badge>
                      {(course as any).schedule && (
                        <Badge variant="outline" className="text-xs">
                          <Repeat className="w-3 h-3 mr-1" />
                          {(course as any).schedule.frequency}
                        </Badge>
                      )}
                      {(course as any).assignedStation && (
                        <Badge variant="secondary" className="text-xs">
                          <Monitor className="w-3 h-3 mr-1" />
                          {(course as any).assignedStation.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{course.exerciseIds.length} exercises</span>
                      <span>•</span>
                      <span>{course.totalTime} min</span>
                      <span>•</span>
                      <span>{course.totalTargets} targets</span>
                    </div>
                  </div>
                  <Dialog open={assignDialogOpen && selectedCourseForAssign === course.id} onOpenChange={(open) => {
                    setAssignDialogOpen(open);
                    if (!open) setSelectedCourseForAssign(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="btn-interactive"
                        onClick={() => setSelectedCourseForAssign(course.id)}
                      >
                        <Monitor className="w-4 h-4 mr-2" />
                        Assign to Station
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background">
                      <DialogHeader>
                        <DialogTitle>Assign Course to Station</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <Label>Select IWTS Station</Label>
                        <Select value={selectedStation} onValueChange={setSelectedStation}>
                          <SelectTrigger className="mt-2 bg-muted border-border">
                            <SelectValue placeholder="Choose a station" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {availableStations.map((station) => (
                              <SelectItem key={station.id} value={station.id}>
                                {station.name} - {station.location}
                                {station.status === 'in-use' && ' (In Use)'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAssignToStation} disabled={!selectedStation} className="btn-interactive hover:glow-primary">
                          <Check className="w-4 h-4 mr-2" />
                          Assign
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Available Exercise Types Sidebar */}
        <div className="space-y-6">
          <AnimatedCard index={2} className="tactical-card">
            <CardHeader className="space-y-3">
              <CardTitle className="text-lg font-semibold">Exercise Types</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercise types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted border-border"
                />
              </div>
              <p className="text-sm text-muted-foreground">Select type • Configure • Add to course</p>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[700px] overflow-y-auto">
              {filteredTypes.length === 0 && searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  No exercise types found for "{searchQuery}"
                </div>
              )}
              {filteredTypes.map((type, index) => (
                <ExerciseTypeSection
                  key={type.id}
                  type={type}
                  onAddExercise={handleAddExercise}
                  icon={typeIcons[type.id]}
                  index={index}
                />
              ))}
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}

// Collapsible section for each exercise type with configurator
function ExerciseTypeSection({
  type,
  onAddExercise,
  icon,
  index,
}: {
  type: ExerciseType;
  onAddExercise: (type: ExerciseType, config: ExerciseConfig) => void;
  icon: React.ReactNode;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button 
          className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-primary">{icon}</span>
            <div className="text-left">
              <span className="font-medium text-foreground">{type.name}</span>
              <p className="text-xs text-muted-foreground">{type.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {type.hasSpeed && (
              <Badge variant="outline" className="text-xs">Speed</Badge>
            )}
            {type.hasGrouping && (
              <Badge variant="outline" className="text-xs">Grouping</Badge>
            )}
            {type.includesVehicles && (
              <Badge variant="outline" className="text-xs">Vehicles</Badge>
            )}
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <ExerciseConfigurator
          exerciseType={type}
          onAddExercise={onAddExercise}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

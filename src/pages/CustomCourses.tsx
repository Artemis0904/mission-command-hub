import { useState, useEffect, useRef } from 'react';
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
  CheckCircle2,
  Layers,
  Settings2,
  Zap,
  UserRound,
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
  DialogDescription,
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

// Icons mapping for exercise types with colors
const typeIconsConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'static-normal': { 
    icon: <Target className="w-4 h-4" />, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-500/10' 
  },
  'squad-post-normal': { 
    icon: <Users className="w-4 h-4" />, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10' 
  },
  'grouping': { 
    icon: <Circle className="w-4 h-4" />, 
    color: 'text-amber-500', 
    bg: 'bg-amber-500/10' 
  },
  'rotate': { 
    icon: <RotateCw className="w-4 h-4" />, 
    color: 'text-violet-500', 
    bg: 'bg-violet-500/10' 
  },
  'moving-basic': { 
    icon: <Move className="w-4 h-4" />, 
    color: 'text-cyan-500', 
    bg: 'bg-cyan-500/10' 
  },
  'moving-ltr': { 
    icon: <ArrowRight className="w-4 h-4" />, 
    color: 'text-orange-500', 
    bg: 'bg-orange-500/10' 
  },
  'moving-rtl': { 
    icon: <ArrowLeft className="w-4 h-4" />, 
    color: 'text-pink-500', 
    bg: 'bg-pink-500/10' 
  },
  'point-target': { 
    icon: <Crosshair className="w-4 h-4" />, 
    color: 'text-rose-500', 
    bg: 'bg-rose-500/10' 
  },
  'traverse-target': { 
    icon: <MoveHorizontal className="w-4 h-4" />, 
    color: 'text-teal-500', 
    bg: 'bg-teal-500/10' 
  },
  'snap-shot-target': { 
    icon: <UserRound className="w-4 h-4" />, 
    color: 'text-yellow-500', 
    bg: 'bg-yellow-500/10' 
  },
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

  // Course creation confirmation dialog state
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [createdCourseName, setCreatedCourseName] = useState('');
  const [createdCourseId, setCreatedCourseId] = useState('');
  const [wasAssignedToStations, setWasAssignedToStations] = useState(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Collapsible sections state
  const [showStations, setShowStations] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  // Auto-close confirmation dialog after 5 seconds
  useEffect(() => {
    if (confirmationDialogOpen) {
      autoCloseTimerRef.current = setTimeout(() => {
        setConfirmationDialogOpen(false);
      }, 5000);
    }
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [confirmationDialogOpen]);

  const handleConfirmationInteraction = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
  };

  const availableStations = iwtsStations.filter(s => s.status !== 'offline');
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
    setCreatedCourseName(courseName);
    setCreatedCourseId(newCourse.id);
    setWasAssignedToStations(assignedStations.length > 0);
    setConfirmationDialogOpen(true);
    handleClearAll();
  };

  const handleAssignFromConfirmation = () => {
    handleConfirmationInteraction();
    setConfirmationDialogOpen(false);
    setSelectedCourseForAssign(createdCourseId);
    setAssignDialogOpen(true);
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

  const [openExerciseTypeId, setOpenExerciseTypeId] = useState<string | null>(null);

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
    <>
      {/* Course Creation Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onOpenChange={(open) => {
        handleConfirmationInteraction();
        setConfirmationDialogOpen(open);
      }}>
        <DialogContent className="bg-background sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <DialogTitle className="text-center text-xl">Course Created Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              "{createdCourseName}" has been created and saved.
              {wasAssignedToStations 
                ? " The course has been assigned to the selected stations."
                : " You can assign it to stations now or later."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            {!wasAssignedToStations && (
              <Button 
                variant="outline" 
                onClick={handleAssignFromConfirmation}
                className="flex-1"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Assign to Station
              </Button>
            )}
            <Button 
              onClick={() => {
                handleConfirmationInteraction();
                setConfirmationDialogOpen(false);
              }}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Done
            </Button>
          </DialogFooter>
          <p className="text-xs text-muted-foreground text-center mt-2">
            This dialog will auto-close in a few seconds
          </p>
        </DialogContent>
      </Dialog>

      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              Custom Courses
            </h1>
            <p className="text-muted-foreground mt-1">Build training courses with configurable exercises</p>
          </div>
          <CourseTemplateManager
            configuredExercises={configuredExercises}
            onLoadTemplate={handleLoadTemplate}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Builder - Main Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Course Name Card */}
            <AnimatedCard index={0} className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Layers className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">Create New Course</h2>
                      <p className="text-xs text-muted-foreground">Give your course a name</p>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        disabled={!courseName && configuredExercises.length === 0}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-background">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-destructive" />
                          Clear All Course Data?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove all configured exercises and settings.
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
                </div>
                
                <Input
                  placeholder="Enter course name..."
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="bg-background/50 border-border/50 text-lg h-12"
                />
              </CardContent>
            </AnimatedCard>

            {/* Exercise List */}
            <AnimatedCard index={1} className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Target className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Exercises</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {configuredExercises.length === 0 
                          ? 'Add exercises from the sidebar' 
                          : `${configuredExercises.length} exercise${configuredExercises.length > 1 ? 's' : ''} configured`
                        }
                      </p>
                    </div>
                  </div>
                  {configuredExercises.length > 0 && (
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <strong className="text-foreground">{getTotalTime()}</strong> min
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <strong className="text-foreground">{getTotalBullets()}</strong> rounds
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {configuredExercises.length > 0 ? (
                  <div className="space-y-2">
                    {configuredExercises.map((exercise, index) => {
                      const iconConfig = typeIconsConfig[exercise.typeId];
                      return (
                        <div
                          key={exercise.id}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          onDragLeave={handleDragLeave}
                          className={cn(
                            "group flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-transparent cursor-grab active:cursor-grabbing transition-all hover:bg-muted/50",
                            draggedIndex === index && "opacity-50 scale-[0.98]",
                            dragOverIndex === index && draggedIndex !== index && "border-primary bg-primary/5"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground" />
                            <span className="text-xs font-medium text-muted-foreground w-5">{index + 1}</span>
                          </div>
                          <div className={cn("p-2 rounded-lg", iconConfig?.bg)}>
                            <span className={iconConfig?.color}>{iconConfig?.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm">{exercise.typeName}</p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                              <span>{formatTime(exercise.config.scenarioTime)}</span>
                              <span className="text-border">•</span>
                              <span>{exercise.config.range}m</span>
                              <span className="text-border">•</span>
                              <span>{exercise.config.bullets} rds</span>
                              <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                                {exercise.config.position}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExercise(exercise.id)}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                    <p className="text-[11px] text-muted-foreground text-center pt-2">
                      Drag to reorder exercises
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-border/50 rounded-xl bg-muted/20">
                    <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                      <Target className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">No exercises yet</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Select an exercise type from the sidebar →
                    </p>
                  </div>
                )}
              </CardContent>
            </AnimatedCard>

            {/* Optional Settings - Collapsible */}
            <AnimatedCard index={2} className="border-0 shadow-lg">
              <CardContent className="p-4 space-y-3">
                {/* Station Assignment Toggle */}
                <Collapsible open={showStations} onOpenChange={setShowStations}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-violet-500/10">
                          <Monitor className="w-4 h-4 text-violet-500" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">Assign to Stations</p>
                          <p className="text-xs text-muted-foreground">
                            {assignedStations.length > 0 
                              ? `${assignedStations.length} station${assignedStations.length > 1 ? 's' : ''} selected`
                              : 'Optional - assign later'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {assignedStations.length > 0 && (
                          <Badge className="bg-violet-500/20 text-violet-600 dark:text-violet-400 border-0">
                            {assignedStations.length}
                          </Badge>
                        )}
                        {showStations ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="all-stations"
                            checked={allStationsSelected}
                            onCheckedChange={handleToggleAllStations}
                          />
                          <label htmlFor="all-stations" className="text-sm font-medium cursor-pointer">
                            All Simulators ({availableStations.length})
                          </label>
                        </div>
                        {assignedStations.length > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-7"
                            onClick={() => setAssignedStations([])}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {availableStations.map((station) => (
                          <div key={station.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={station.id}
                              checked={assignedStations.includes(station.id)}
                              onCheckedChange={() => handleStationToggle(station.id)}
                            />
                            <label htmlFor={station.id} className="text-xs cursor-pointer truncate">
                              {station.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Schedule Toggle */}
                <Collapsible open={showSchedule} onOpenChange={setShowSchedule}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/10">
                          <CalendarIcon className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">Schedule Course</p>
                          <p className="text-xs text-muted-foreground">
                            {startDate && endDate 
                              ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
                              : 'Optional - set dates'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {startDate && endDate && (
                          <Badge className="bg-orange-500/20 text-orange-600 dark:text-orange-400 border-0">
                            Scheduled
                          </Badge>
                        )}
                        {showSchedule ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal h-9",
                                  !startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
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
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal h-9",
                                  !endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
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
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Save Button */}
                <Button 
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg" 
                  onClick={handleSaveCourse}
                  disabled={!courseName || configuredExercises.length === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Course
                  {assignedStations.length > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-0">
                      + {assignedStations.length} station{assignedStations.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </Button>
              </CardContent>
            </AnimatedCard>

            {/* Existing Courses */}
            {courses.length > 0 && (
              <AnimatedCard index={3} className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <BookOpen className="w-5 h-5 text-cyan-500" />
                    </div>
                    <CardTitle className="text-base">Your Courses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-foreground text-sm">{course.name}</span>
                          <Badge variant="outline" className="text-[10px] h-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                            {course.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{course.exerciseIds.length} exercises</span>
                          <span className="text-border">•</span>
                          <span>{course.totalTime} min</span>
                        </div>
                      </div>
                      <Dialog open={assignDialogOpen && selectedCourseForAssign === course.id} onOpenChange={(open) => {
                        setAssignDialogOpen(open);
                        if (!open) setSelectedCourseForAssign(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setSelectedCourseForAssign(course.id)}
                          >
                            <Monitor className="w-4 h-4 mr-1.5" />
                            Assign
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
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAssignToStation} disabled={!selectedStation}>
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
            )}
          </div>

          {/* Exercise Types Sidebar */}
          <div className="space-y-4">
            <AnimatedCard index={4} className="border-0 shadow-lg sticky top-20">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                    <Settings2 className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Exercise Types</CardTitle>
                    <p className="text-xs text-muted-foreground">Select • Configure • Add</p>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 bg-muted/50 border-0"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-1.5 max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredTypes.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No results for "{searchQuery}"
                  </div>
                )}
                {filteredTypes.map((type, index) => (
                  <ExerciseTypeSection
                    key={type.id}
                    type={type}
                    onAddExercise={handleAddExercise}
                    iconConfig={typeIconsConfig[type.id]}
                    index={index}
                    openTypeId={openExerciseTypeId}
                    onOpenChange={(id) => setOpenExerciseTypeId(id)}
                  />
                ))}
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </>
  );
}

// Collapsible section for each exercise type with configurator
function ExerciseTypeSection({
  type,
  onAddExercise,
  iconConfig,
  index,
  openTypeId,
  onOpenChange,
}: {
  type: ExerciseType;
  onAddExercise: (type: ExerciseType, config: ExerciseConfig) => void;
  iconConfig: { icon: React.ReactNode; color: string; bg: string };
  index: number;
  openTypeId: string | null;
  onOpenChange: (id: string | null) => void;
}) {
  const isOpen = openTypeId === type.id;

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open ? type.id : null);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
      <CollapsibleTrigger asChild>
        <button 
          className={cn(
            "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
            isOpen 
              ? "bg-gradient-to-r from-muted/80 to-muted/40 shadow-sm" 
              : "hover:bg-muted/50"
          )}
        >
          <div className={cn("p-2 rounded-lg transition-colors", iconConfig?.bg)}>
            <span className={iconConfig?.color}>{iconConfig?.icon}</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{type.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{type.description}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {type.hasSpeed && (
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" title="Has Speed" />
            )}
            {type.hasGrouping && (
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Has Grouping" />
            )}
            {type.includesVehicles && (
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" title="Includes Vehicles" />
            )}
            <ChevronRight className={cn(
              "w-4 h-4 text-muted-foreground transition-transform",
              isOpen && "rotate-90"
            )} />
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 animate-accordion-down">
        <ExerciseConfigurator
          exerciseType={type}
          onAddExercise={onAddExercise}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

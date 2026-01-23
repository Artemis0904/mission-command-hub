import { useState } from 'react';
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
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { exercises, customCourses, iwtsStations, getExerciseById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function CustomCourses() {
  const { toast } = useToast();
  const [courseName, setCourseName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [courses, setCourses] = useState(customCourses);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedCourseForAssign, setSelectedCourseForAssign] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState('');

  const addExercise = (exerciseId: string) => {
    if (!selectedExercises.includes(exerciseId)) {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
  };

  const getTotalTime = () => {
    return selectedExercises.reduce((total, id) => {
      const exercise = getExerciseById(id);
      return total + (exercise?.timeLimit || 0);
    }, 0);
  };

  const getTotalTargets = () => {
    return selectedExercises.reduce((total, id) => {
      const exercise = getExerciseById(id);
      return total + (exercise?.targets || 0);
    }, 0);
  };

  const handleSaveCourse = () => {
    if (!courseName || selectedExercises.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a course name and select at least one exercise.',
        variant: 'destructive',
      });
      return;
    }

    const newCourse = {
      id: `course-${Date.now()}`,
      name: courseName,
      exerciseIds: selectedExercises,
      createdAt: new Date().toISOString(),
      totalTime: getTotalTime(),
      totalTargets: getTotalTargets(),
      status: 'active' as const,
    };

    setCourses([...courses, newCourse]);
    setCourseName('');
    setSelectedExercises([]);

    toast({
      title: 'Course Created',
      description: `"${courseName}" has been created with ${selectedExercises.length} exercises.`,
    });
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

  const availableStations = iwtsStations.filter(s => s.status !== 'offline');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-primary" />
            Custom Courses
          </h1>
          <p className="text-muted-foreground">Create training courses by combining exercises</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Course Form */}
          <Card className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Create New Course</CardTitle>
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

              {/* Selected Exercises */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  <span>Selected Exercises</span>
                  <Badge variant="secondary">{selectedExercises.length} selected</Badge>
                </Label>
                
                {selectedExercises.length > 0 ? (
                  <div className="space-y-2">
                    {selectedExercises.map((id, index) => {
                      const exercise = getExerciseById(id);
                      if (!exercise) return null;
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                        >
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{exercise.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {exercise.timeLimit}min • {exercise.targets} targets
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExercise(id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-border rounded-lg text-muted-foreground">
                    Select exercises from the list on the right to add them to your course
                  </div>
                )}
              </div>

              {/* Course Summary */}
              {selectedExercises.length > 0 && (
                <div className="flex items-center gap-6 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Total Time: <strong>{getTotalTime()} min</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm">Total Targets: <strong>{getTotalTargets()}</strong></span>
                  </div>
                </div>
              )}

              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={handleSaveCourse}
                disabled={!courseName || selectedExercises.length === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Course
              </Button>
            </CardContent>
          </Card>

          {/* Existing Courses */}
          <Card className="tactical-card">
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
          </Card>
        </div>

        {/* Available Exercises Sidebar */}
        <div className="space-y-6">
          <Card className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Available Exercises</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {exercises.map((exercise) => {
                const isSelected = selectedExercises.includes(exercise.id);
                return (
                  <div
                    key={exercise.id}
                    onClick={() => !isSelected && addExercise(exercise.id)}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-primary/10 border-primary/30 opacity-60' 
                        : 'bg-muted/30 border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground text-sm">{exercise.name}</span>
                      {isSelected ? (
                        <Badge variant="secondary">Added</Badge>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Plus className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{exercise.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs capitalize">{exercise.difficulty}</Badge>
                      <span>{exercise.timeLimit}min</span>
                      <span>{exercise.targets} targets</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

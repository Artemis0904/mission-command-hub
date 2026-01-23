import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  FileEdit,
  Target,
  Clock,
  Hash,
  StickyNote,
  Gauge,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { simulatorTypes, exercises } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface TargetRow {
  id: string;
  name: string;
  distance: string;
  type: string;
  points: string;
}

export default function ExerciseBuilder() {
  const { toast } = useToast();
  const [exerciseName, setExerciseName] = useState('');
  const [simulatorType, setSimulatorType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [notes, setNotes] = useState('');
  const [targets, setTargets] = useState<TargetRow[]>([
    { id: '1', name: 'Target 1', distance: '100', type: 'stationary', points: '10' },
  ]);

  const addTarget = () => {
    const newId = String(targets.length + 1);
    setTargets([
      ...targets,
      { id: newId, name: `Target ${newId}`, distance: '100', type: 'stationary', points: '10' },
    ]);
  };

  const removeTarget = (id: string) => {
    if (targets.length > 1) {
      setTargets(targets.filter(t => t.id !== id));
    }
  };

  const updateTarget = (id: string, field: keyof TargetRow, value: string) => {
    setTargets(targets.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSave = (publish: boolean) => {
    toast({
      title: publish ? 'Exercise Published' : 'Exercise Saved as Draft',
      description: `"${exerciseName}" has been ${publish ? 'published' : 'saved'} successfully.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileEdit className="w-7 h-7 text-primary" />
            Exercise Builder
          </h1>
          <p className="text-muted-foreground">Create custom training exercises with targets and rules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Exercise Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Exercise Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter exercise name"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-primary" />
                    Simulator Type
                  </Label>
                  <Select value={simulatorType} onValueChange={setSimulatorType}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {simulatorTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} - {type.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    Difficulty Level
                  </Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Time Limit (minutes)
                  </Label>
                  <Input
                    id="time"
                    type="number"
                    placeholder="30"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-primary" />
                  Rules / Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any rules or notes for this exercise..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-muted border-border min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Targets */}
          <Card className="tactical-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Target Configuration
                <Badge variant="secondary" className="ml-2">{targets.length}</Badge>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={addTarget}>
                <Plus className="w-4 h-4 mr-2" />
                Add Target
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-3 px-3 py-2 bg-muted/50 rounded-lg text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Distance (m)</div>
                  <div className="col-span-3">Type</div>
                  <div className="col-span-2">Points</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {/* Target Rows */}
                {targets.map((target) => (
                  <div
                    key={target.id}
                    className="grid grid-cols-12 gap-3 items-center p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="col-span-3">
                      <Input
                        value={target.name}
                        onChange={(e) => updateTarget(target.id, 'name', e.target.value)}
                        className="bg-background border-border h-9"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={target.distance}
                        onChange={(e) => updateTarget(target.id, 'distance', e.target.value)}
                        className="bg-background border-border h-9"
                      />
                    </div>
                    <div className="col-span-3">
                      <Select
                        value={target.type}
                        onValueChange={(v) => updateTarget(target.id, 'type', v)}
                      >
                        <SelectTrigger className="bg-background border-border h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stationary">Stationary</SelectItem>
                          <SelectItem value="moving">Moving</SelectItem>
                          <SelectItem value="pop-up">Pop-up</SelectItem>
                          <SelectItem value="timed">Timed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={target.points}
                        onChange={(e) => updateTarget(target.id, 'points', e.target.value)}
                        className="bg-background border-border h-9"
                      />
                    </div>
                    <div className="col-span-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTarget(target.id)}
                        disabled={targets.length === 1}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => handleSave(false)}>
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => handleSave(true)}>
              <Target className="w-4 h-4 mr-2" />
              Publish Exercise
            </Button>
          </div>
        </div>

        {/* Sidebar - Existing Exercises */}
        <div className="space-y-6">
          <Card className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Existing Exercises</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{exercise.name}</span>
                    <Badge variant={exercise.status === 'published' ? 'default' : 'secondary'}>
                      {exercise.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{exercise.simulatorType.toUpperCase()}</span>
                    <span>•</span>
                    <span className="capitalize">{exercise.difficulty}</span>
                    <span>•</span>
                    <span>{exercise.targets} targets</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

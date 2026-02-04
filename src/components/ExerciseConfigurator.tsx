import { useState } from 'react';
import { 
  Timer, 
  Target, 
  Crosshair, 
  Gauge,
  Circle,
  RotateCw,
  Plus,
  Minus,
  User,
  Car,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Target options
const TARGETS = [
  { id: 'figure-11', name: 'Figure 11', type: 'human' },
  { id: 'figure-12', name: 'Figure 12', type: 'human' },
  { id: 'silhouette-a', name: 'Silhouette A', type: 'human' },
  { id: 'silhouette-b', name: 'Silhouette B', type: 'human' },
  { id: 'popup-target', name: 'Pop-up Target', type: 'human' },
  { id: 'moving-target', name: 'Moving Target', type: 'human' },
];

const VEHICLE_TARGETS = [
  { id: 'vehicle-truck', name: 'Truck', type: 'vehicle' },
  { id: 'vehicle-tank', name: 'Tank', type: 'vehicle' },
  { id: 'vehicle-apc', name: 'APC', type: 'vehicle' },
  { id: 'vehicle-jeep', name: 'Jeep', type: 'vehicle' },
];

export type Position = 'standing' | 'crouching' | 'prone';

export interface ExerciseConfig {
  scenarioTime: number;
  targetId: string;
  range: number;
  bullets: number;
  position: Position;
  groupingSize?: number;
  speed?: number;
}

export interface ExerciseType {
  id: string;
  name: string;
  description: string;
  icon: string;
  hasSpeed?: boolean;
  hasGrouping?: boolean;
  includesVehicles?: boolean;
}

export const EXERCISE_TYPES: ExerciseType[] = [
  { 
    id: 'static-normal', 
    name: 'Static Normal', 
    description: 'Standard static target engagement',
    icon: 'target',
  },
  { 
    id: 'squad-post-normal', 
    name: 'Squad Post Normal', 
    description: 'Squad position static engagement',
    icon: 'users',
  },
  { 
    id: 'grouping', 
    name: 'Grouping', 
    description: 'Precision grouping exercise with threshold',
    icon: 'circle',
    hasGrouping: true,
  },
  { 
    id: 'rotate', 
    name: 'Rotate', 
    description: 'Rotating target engagement',
    icon: 'rotate-cw',
    hasSpeed: true,
  },
  { 
    id: 'moving-basic', 
    name: 'Moving Basic', 
    description: 'Basic moving target practice',
    icon: 'move',
    hasSpeed: true,
  },
  { 
    id: 'moving-ltr', 
    name: 'Moving LTR', 
    description: 'Left to right moving targets including vehicles',
    icon: 'arrow-right',
    hasSpeed: true,
    includesVehicles: true,
  },
  { 
    id: 'moving-rtl', 
    name: 'Moving RTL', 
    description: 'Right to left moving targets including vehicles',
    icon: 'arrow-left',
    hasSpeed: true,
    includesVehicles: true,
  },
  { 
    id: 'point-target', 
    name: 'Point Target', 
    description: 'Precision point target engagement',
    icon: 'crosshair',
  },
  { 
    id: 'traverse-target', 
    name: 'Traverse Target', 
    description: 'Traversing field of fire exercise',
    icon: 'move-horizontal',
  },
];

interface ExerciseConfiguratorProps {
  exerciseType: ExerciseType;
  onAddExercise: (type: ExerciseType, config: ExerciseConfig) => void;
  className?: string;
}

export function ExerciseConfigurator({ 
  exerciseType, 
  onAddExercise,
  className 
}: ExerciseConfiguratorProps) {
  const [config, setConfig] = useState<ExerciseConfig>({
    scenarioTime: 60,
    targetId: 'figure-11',
    range: 100,
    bullets: 5,
    position: 'standing',
    groupingSize: exerciseType.hasGrouping ? 10 : undefined,
    speed: exerciseType.hasSpeed ? 5 : undefined,
  });

  const handleAddExercise = () => {
    onAddExercise(exerciseType, config);
    setConfig({
      scenarioTime: 60,
      targetId: 'figure-11',
      range: 100,
      bullets: 5,
      position: 'standing',
      groupingSize: exerciseType.hasGrouping ? 10 : undefined,
      speed: exerciseType.hasSpeed ? 5 : undefined,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("space-y-4 p-4 rounded-xl bg-muted/20 border border-border/50", className)}>
      {/* Scenario Time */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-xs">
            <Timer className="w-3.5 h-3.5 text-blue-500" />
            Scenario Time
          </Label>
          <Badge variant="secondary" className="font-mono text-xs h-5">
            {formatTime(config.scenarioTime)}
          </Badge>
        </div>
        <Slider
          value={[config.scenarioTime]}
          onValueChange={([value]) => setConfig(prev => ({ ...prev, scenarioTime: value }))}
          min={15}
          max={300}
          step={15}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>0:15</span>
          <span>5:00</span>
        </div>
      </div>

      {/* Target Selection */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-xs">
          <Target className="w-3.5 h-3.5 text-emerald-500" />
          Target
        </Label>
        <Select 
          value={config.targetId} 
          onValueChange={(value) => setConfig(prev => ({ ...prev, targetId: value }))}
        >
          <SelectTrigger className="bg-background/50 border-border/50 h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {exerciseType.includesVehicles && (
              <div className="px-2 py-1 text-[10px] text-muted-foreground font-medium">Human Targets</div>
            )}
            {TARGETS.map(target => (
              <SelectItem key={target.id} value={target.id} className="text-xs">
                <span className="flex items-center gap-2">
                  <User className="w-3 h-3" />
                  {target.name}
                </span>
              </SelectItem>
            ))}
            {exerciseType.includesVehicles && (
              <>
                <div className="px-2 py-1 text-[10px] text-muted-foreground font-medium mt-2">Vehicle Targets</div>
                {VEHICLE_TARGETS.map(target => (
                  <SelectItem key={target.id} value={target.id} className="text-xs">
                    <span className="flex items-center gap-2">
                      <Car className="w-3 h-3" />
                      {target.name}
                    </span>
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-xs">
            <Crosshair className="w-3.5 h-3.5 text-rose-500" />
            Range
          </Label>
          <Badge variant="secondary" className="font-mono text-xs h-5">
            {config.range}m
          </Badge>
        </div>
        <Slider
          value={[config.range]}
          onValueChange={([value]) => setConfig(prev => ({ ...prev, range: value }))}
          min={25}
          max={800}
          step={25}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>25m</span>
          <span>800m</span>
        </div>
      </div>

      {/* Bullets Counter */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-xs">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </div>
          Rounds
        </Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setConfig(prev => ({ ...prev, bullets: Math.max(1, prev.bullets - 1) }))}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <div className="flex-1 text-center">
            <span className="text-xl font-bold text-amber-500">{config.bullets}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setConfig(prev => ({ ...prev, bullets: Math.min(30, prev.bullets + 1) }))}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Position Selection */}
      <div className="space-y-2">
        <Label className="text-xs">Position</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['standing', 'crouching', 'prone'] as Position[]).map((pos) => (
            <Button
              key={pos}
              variant={config.position === pos ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "capitalize text-xs h-8",
                config.position === pos 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0" 
                  : ""
              )}
              onClick={() => setConfig(prev => ({ ...prev, position: pos }))}
            >
              {pos}
            </Button>
          ))}
        </div>
      </div>

      {/* Grouping Size (only for Grouping type) */}
      {exerciseType.hasGrouping && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-xs">
              <Circle className="w-3.5 h-3.5 text-amber-500" />
              Grouping Threshold
            </Label>
            <Badge variant="secondary" className="font-mono text-xs h-5">
              {config.groupingSize}cm
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Slider
              value={[config.groupingSize || 10]}
              onValueChange={([value]) => setConfig(prev => ({ ...prev, groupingSize: value }))}
              min={5}
              max={50}
              step={1}
              className="flex-1"
            />
            <div 
              className="rounded-full border-2 border-amber-500 flex items-center justify-center text-[10px] text-amber-500 font-medium transition-all"
              style={{ 
                width: `${Math.max(24, (config.groupingSize || 10) * 1.5)}px`,
                height: `${Math.max(24, (config.groupingSize || 10) * 1.5)}px`,
              }}
            >
              {config.groupingSize}
            </div>
          </div>
        </div>
      )}

      {/* Speed (for rotating/moving types) */}
      {exerciseType.hasSpeed && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-xs">
              {exerciseType.id === 'rotate' ? (
                <RotateCw className="w-3.5 h-3.5 text-cyan-500" />
              ) : (
                <Gauge className="w-3.5 h-3.5 text-cyan-500" />
              )}
              {exerciseType.id === 'rotate' ? 'Rotation' : 'Movement'} Speed
            </Label>
            <Badge variant="secondary" className="font-mono text-xs h-5">
              Level {config.speed}
            </Badge>
          </div>
          <Slider
            value={[config.speed || 5]}
            onValueChange={([value]) => setConfig(prev => ({ ...prev, speed: value }))}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
      )}

      {/* Add Button */}
      <Button 
        onClick={handleAddExercise}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add to Course
      </Button>
    </div>
  );
}

// Helper to get target name by id
export function getTargetName(targetId: string): string {
  const allTargets = [...TARGETS, ...VEHICLE_TARGETS];
  return allTargets.find(t => t.id === targetId)?.name || targetId;
}

// Helper to get exercise type by id
export function getExerciseTypeById(typeId: string): ExerciseType | undefined {
  return EXERCISE_TYPES.find(t => t.id === typeId);
}

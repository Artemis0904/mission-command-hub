import { useState } from 'react';
import { 
  ClipboardList, 
  Target, 
  Users, 
  Check,
  Clock,
  AlertCircle,
  CheckCircle,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { simulatorTypes, simulatorUnits, missions, trainees, assignments, getTraineeById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function MissionAssignment() {
  const { toast } = useToast();
  const [selectedSimType, setSelectedSimType] = useState('');
  const [selectedSimulator, setSelectedSimulator] = useState('');
  const [selectedMission, setSelectedMission] = useState('');
  const [selectedTrainees, setSelectedTrainees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSimulators = selectedSimType 
    ? simulatorUnits.filter(s => s.typeId === selectedSimType && s.status !== 'offline')
    : [];

  const filteredMissions = missions.filter(m => m.status === 'scheduled');

  const filteredTrainees = trainees.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTrainee = (traineeId: string) => {
    setSelectedTrainees(prev => 
      prev.includes(traineeId) 
        ? prev.filter(id => id !== traineeId)
        : [...prev, traineeId]
    );
  };

  const handleAssign = () => {
    if (!selectedSimulator || !selectedMission || selectedTrainees.length === 0) {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select a simulator, mission, and at least one trainee.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Mission Assigned',
      description: `${selectedTrainees.length} trainee(s) assigned to the mission.`,
    });

    // Reset form
    setSelectedTrainees([]);
    setSelectedMission('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-status-info/20 text-status-info border-status-info/30';
      case 'in-progress': return 'bg-primary/20 text-primary border-primary/30';
      case 'completed': return 'bg-primary/20 text-primary border-primary/30';
      case 'overdue': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Target className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-primary" />
            Mission Assignment
          </h1>
          <p className="text-muted-foreground">Assign missions to simulators and trainees</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">New Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Select Simulator Type & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Simulator Type
                  </Label>
                  <Select value={selectedSimType} onValueChange={(v) => {
                    setSelectedSimType(v);
                    setSelectedSimulator('');
                  }}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Select simulator type" />
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
                <div className="space-y-2">
                  <Label>Simulator Unit</Label>
                  <Select 
                    value={selectedSimulator} 
                    onValueChange={setSelectedSimulator}
                    disabled={!selectedSimType}
                  >
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Select simulator unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSimulators.map((sim) => (
                        <SelectItem key={sim.id} value={sim.id}>
                          {sim.name} ({sim.status === 'idle' ? 'Available' : 'In Use'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Step 2: Select Mission */}
              <div className="space-y-2">
                <Label>Mission</Label>
                <Select value={selectedMission} onValueChange={setSelectedMission}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Select a mission to assign" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredMissions.map((mission) => (
                      <SelectItem key={mission.id} value={mission.id}>
                        {mission.name} - {mission.date} at {mission.time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Step 3: Select Trainees */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Select Trainees
                  </Label>
                  <Badge variant="secondary">{selectedTrainees.length} selected</Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search trainees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-muted border-border"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2 rounded-lg border border-border p-3 bg-muted/20">
                  {filteredTrainees.map((trainee) => (
                    <div
                      key={trainee.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                        selectedTrainees.includes(trainee.id)
                          ? 'bg-primary/10 border border-primary/30'
                          : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                      }`}
                      onClick={() => toggleTrainee(trainee.id)}
                    >
                      <Checkbox
                        checked={selectedTrainees.includes(trainee.id)}
                        onCheckedChange={() => toggleTrainee(trainee.id)}
                      />
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                        {trainee.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{trainee.name}</p>
                        <p className="text-xs text-muted-foreground">{trainee.rank} • {trainee.unit}</p>
                      </div>
                      <Badge variant="outline">{trainee.totalScore} pts</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assign Button */}
              <Button 
                className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                onClick={handleAssign}
              >
                <Check className="w-5 h-5 mr-2" />
                Assign Mission
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Assignments Sidebar */}
        <div className="space-y-6">
          <Card className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Current Assignments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.map((assignment) => {
                const trainee = getTraineeById(assignment.traineeId);
                const mission = missions.find(m => m.id === assignment.missionId);
                const simulator = simulatorUnits.find(s => s.id === assignment.simulatorId);
                
                return (
                  <div
                    key={assignment.id}
                    className={`p-3 rounded-lg border ${getStatusColor(assignment.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{trainee?.name}</span>
                      <div className="flex items-center gap-1 text-xs">
                        {getStatusIcon(assignment.status)}
                        <span className="capitalize">{assignment.status}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Mission: {mission?.name}</p>
                      <p>Simulator: {simulator?.name}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Assignment Status Legend */}
          <Card className="tactical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Status Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { status: 'assigned', label: 'Assigned', desc: 'Waiting to start' },
                { status: 'in-progress', label: 'In Progress', desc: 'Currently active' },
                { status: 'completed', label: 'Completed', desc: 'Finished successfully' },
                { status: 'overdue', label: 'Overdue', desc: 'Past scheduled time' },
              ].map((item) => (
                <div key={item.status} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
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

import { useState } from 'react';
import { 
  FileDown, 
  FileUp, 
  Save, 
  Trash2, 
  FolderOpen,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { useToast } from '@/hooks/use-toast';
import { ExerciseConfig } from '@/components/ExerciseConfigurator';

// Template structure
export interface CourseTemplate {
  id: string;
  name: string;
  description: string;
  exercises: {
    typeId: string;
    typeName: string;
    config: ExerciseConfig;
  }[];
  createdAt: string;
}

// Local storage key
const TEMPLATES_STORAGE_KEY = 'iwts-course-templates';

// Load templates from localStorage
export function loadTemplates(): CourseTemplate[] {
  try {
    const stored = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save templates to localStorage
function saveTemplates(templates: CourseTemplate[]) {
  localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
}

interface CourseTemplateManagerProps {
  configuredExercises: {
    id: string;
    typeId: string;
    typeName: string;
    config: ExerciseConfig;
  }[];
  onLoadTemplate: (exercises: { typeId: string; typeName: string; config: ExerciseConfig }[]) => void;
}

export function CourseTemplateManager({ 
  configuredExercises, 
  onLoadTemplate 
}: CourseTemplateManagerProps) {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<CourseTemplate[]>(loadTemplates);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const refreshTemplates = () => {
    setTemplates(loadTemplates());
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter a name for the template.',
        variant: 'destructive',
      });
      return;
    }

    if (configuredExercises.length === 0) {
      toast({
        title: 'No Exercises',
        description: 'Add at least one exercise before saving as template.',
        variant: 'destructive',
      });
      return;
    }

    const newTemplate: CourseTemplate = {
      id: `template-${Date.now()}`,
      name: templateName.trim(),
      description: templateDescription.trim(),
      exercises: configuredExercises.map(ex => ({
        typeId: ex.typeId,
        typeName: ex.typeName,
        config: ex.config,
      })),
      createdAt: new Date().toISOString(),
    };

    const updatedTemplates = [...templates, newTemplate];
    saveTemplates(updatedTemplates);
    setTemplates(updatedTemplates);

    toast({
      title: 'Template Saved',
      description: `"${templateName}" saved with ${configuredExercises.length} exercises.`,
    });

    setTemplateName('');
    setTemplateDescription('');
    setSaveDialogOpen(false);
  };

  const handleLoadTemplate = (template: CourseTemplate) => {
    onLoadTemplate(template.exercises);
    toast({
      title: 'Template Loaded',
      description: `Loaded "${template.name}" with ${template.exercises.length} exercises.`,
    });
    setLoadDialogOpen(false);
  };

  const handleDeleteTemplate = (templateId: string, templateName: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    saveTemplates(updatedTemplates);
    setTemplates(updatedTemplates);
    toast({
      title: 'Template Deleted',
      description: `"${templateName}" has been deleted.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Save Template Button */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            disabled={configuredExercises.length === 0}
            className="btn-interactive"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="w-5 h-5 text-primary" />
              Save as Template
            </DialogTitle>
            <DialogDescription>
              Save the current course configuration as a reusable template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                placeholder="e.g., Basic Marksmanship Course"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="templateDescription">Description (Optional)</Label>
              <Input
                id="templateDescription"
                placeholder="Brief description of this template..."
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                This template will include <strong className="text-foreground">{configuredExercises.length} exercises</strong> with all their configurations.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveTemplate} 
              disabled={!templateName.trim()}
              className="btn-interactive hover:glow-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Template Button */}
      <Dialog open={loadDialogOpen} onOpenChange={(open) => {
        setLoadDialogOpen(open);
        if (open) refreshTemplates();
      }}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="btn-interactive"
          >
            <FileUp className="w-4 h-4 mr-2" />
            Load Template
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-background max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Load Template
            </DialogTitle>
            <DialogDescription>
              Select a template to load its exercises into the course builder.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {templates.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No Templates Saved</p>
                <p className="text-sm mt-1">
                  Configure exercises and save them as a template to reuse later.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">{template.name}</h4>
                          {template.description && (
                            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <Badge variant="secondary">
                              {template.exercises.length} exercises
                            </Badge>
                            <span>Created {formatDate(template.createdAt)}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {template.exercises.slice(0, 5).map((ex, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {ex.typeName}
                              </Badge>
                            ))}
                            {template.exercises.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.exercises.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleLoadTemplate(template)}
                            className="btn-interactive hover:glow-primary"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Load
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-background">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Template?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{template.name}". This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTemplate(template.id, template.name)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

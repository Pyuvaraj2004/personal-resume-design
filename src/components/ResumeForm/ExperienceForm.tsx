
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Experience } from '@/types/resume';
import { PlusCircle, Trash2 } from 'lucide-react';
import { createEmptyExperience } from '@/utils/resumeUtils';

interface ExperienceFormProps {
  experiences: Experience[];
  updateExperiences: (experiences: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, updateExperiences }) => {
  const handleChange = (id: string, field: keyof Experience, value: string) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    updateExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    updateExperiences([...experiences, createEmptyExperience()]);
  };

  const handleRemoveExperience = (id: string) => {
    if (experiences.length > 1) {
      const updatedExperiences = experiences.filter((exp) => exp.id !== id);
      updateExperiences(updatedExperiences);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="space-y-4">
            {index > 0 && <Separator className="my-4" />}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Experience {index + 1}</h3>
              {experiences.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExperience(experience.id)}
                  className="text-destructive h-8"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`title-${experience.id}`}>Job Title</Label>
                <Input
                  id={`title-${experience.id}`}
                  value={experience.title}
                  onChange={(e) => handleChange(experience.id, 'title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${experience.id}`}>Company</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleChange(experience.id, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${experience.id}`}>Location (Optional)</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location || ''}
                  onChange={(e) => handleChange(experience.id, 'location', e.target.value)}
                  placeholder="City, State or Remote"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={experience.endDate === 'Present' ? '' : experience.endDate}
                    onChange={(e) => handleChange(experience.id, 'endDate', e.target.value || 'Present')}
                    placeholder="Present"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${experience.id}`}>Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements in this role"
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">
                Use bullet points starting with action verbs. Focus on achievements and quantifiable results.
              </p>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={handleAddExperience}
          className="w-full mt-4"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Another Experience
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;

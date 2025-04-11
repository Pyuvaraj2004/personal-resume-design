
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Education } from '@/types/resume';
import { PlusCircle, Trash2 } from 'lucide-react';
import { createEmptyEducation } from '@/utils/resumeUtils';

interface EducationFormProps {
  educations: Education[];
  updateEducations: (educations: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ educations, updateEducations }) => {
  const handleChange = (id: string, field: keyof Education, value: string) => {
    const updatedEducations = educations.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    updateEducations(updatedEducations);
  };

  const handleAddEducation = () => {
    updateEducations([...educations, createEmptyEducation()]);
  };

  const handleRemoveEducation = (id: string) => {
    if (educations.length > 1) {
      const updatedEducations = educations.filter((edu) => edu.id !== id);
      updateEducations(updatedEducations);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.map((education, index) => (
          <div key={education.id} className="space-y-4">
            {index > 0 && <Separator className="my-4" />}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Education {index + 1}</h3>
              {educations.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEducation(education.id)}
                  className="text-destructive h-8"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => handleChange(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`school-${education.id}`}>School</Label>
                <Input
                  id={`school-${education.id}`}
                  value={education.school}
                  onChange={(e) => handleChange(education.id, 'school', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${education.id}`}>Location (Optional)</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location || ''}
                  onChange={(e) => handleChange(education.id, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${education.id}`}
                    type="month"
                    value={education.startDate}
                    onChange={(e) => handleChange(education.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${education.id}`}
                    type="month"
                    value={education.endDate === 'Present' ? '' : education.endDate}
                    onChange={(e) => handleChange(education.id, 'endDate', e.target.value || 'Present')}
                    placeholder="Present"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa || ''}
                  onChange={(e) => handleChange(education.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${education.id}`}>Description (Optional)</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description || ''}
                onChange={(e) => handleChange(education.id, 'description', e.target.value)}
                placeholder="Relevant coursework, academic achievements, extracurricular activities"
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={handleAddEducation}
          className="w-full mt-4"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Another Education
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationForm;

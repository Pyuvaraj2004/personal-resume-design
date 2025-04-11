
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skill } from '@/types/resume';
import { PlusCircle, Trash2 } from 'lucide-react';
import { createEmptySkill } from '@/utils/resumeUtils';

interface SkillsFormProps {
  skills: Skill[];
  updateSkills: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, updateSkills }) => {
  const handleNameChange = (id: string, value: string) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.id === id) {
        return { ...skill, name: value };
      }
      return skill;
    });
    updateSkills(updatedSkills);
  };

  const handleLevelChange = (id: string, value: Skill['level']) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.id === id) {
        return { ...skill, level: value };
      }
      return skill;
    });
    updateSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    updateSkills([...skills, createEmptySkill()]);
  };

  const handleRemoveSkill = (id: string) => {
    if (skills.length > 1) {
      const updatedSkills = skills.filter((skill) => skill.id !== id);
      updateSkills(updatedSkills);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor={`skillName-${skill.id}`} className="sr-only">
                  Skill Name
                </Label>
                <Input
                  id={`skillName-${skill.id}`}
                  value={skill.name}
                  onChange={(e) => handleNameChange(skill.id, e.target.value)}
                  placeholder="Skill name (e.g., JavaScript, Project Management)"
                />
              </div>
              <div className="w-36">
                <Label htmlFor={`skillLevel-${skill.id}`} className="sr-only">
                  Skill Level
                </Label>
                <Select
                  value={skill.level}
                  onValueChange={(value) => handleLevelChange(skill.id, value as Skill['level'])}
                >
                  <SelectTrigger id={`skillLevel-${skill.id}`}>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {skills.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddSkill}
            className="mt-2 w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Another Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;

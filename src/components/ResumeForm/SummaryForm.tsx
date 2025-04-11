
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryFormProps {
  summary: string;
  updateSummary: (summary: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ summary, updateSummary }) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary (Optional)</Label>
          <Textarea
            id="summary"
            value={summary || ''}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="A brief summary of your professional background, strengths, and career objectives."
            className="min-h-[120px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            A concise 2-4 sentence summary highlighting your experience, key skills, and what makes you unique.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryForm;

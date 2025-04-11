
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ResumeTemplate } from '@/types/resume';

interface TemplateSelectorProps {
  templates: ResumeTemplate[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate 
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
        <RadioGroup 
          value={selectedTemplate}
          onValueChange={onSelectTemplate}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {templates.map((template) => (
            <div key={template.id} className="relative">
              <RadioGroupItem
                value={template.id}
                id={`template-${template.id}`}
                className="sr-only"
              />
              <Label
                htmlFor={`template-${template.id}`}
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <div className={`
                  h-36 w-full border-2 rounded-md transition-all
                  ${selectedTemplate === template.id ? 'border-primary ring-2 ring-primary/20' : 'border-input'}
                  hover:border-primary/50
                `}>
                  <div className={`h-full w-full p-2 template-preview template-${template.id}`}>
                    <div className="h-4 w-2/3 bg-gray-300 mb-1.5 rounded"></div>
                    <div className="h-2 w-1/3 bg-gray-200 mb-3 rounded"></div>
                    <div className="flex space-x-1 mb-2">
                      <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                      <div className="h-1.5 w-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex space-x-1 mb-2">
                      <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                      <div className="h-1.5 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-3 w-full bg-gray-200 mt-3 rounded"></div>
                    <div className="h-2 w-full bg-gray-100 mt-1 rounded"></div>
                    <div className="h-2 w-5/6 bg-gray-100 mt-1 rounded"></div>
                  </div>
                </div>
                <span className="text-sm font-medium">
                  {template.name}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;

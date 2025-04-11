
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ResumeData, TemplateType } from '@/types/resume';
import { createEmptyResumeData, availableTemplates, generatePDF } from '@/utils/resumeUtils';
import ContactForm from '@/components/ResumeForm/ContactForm';
import SummaryForm from '@/components/ResumeForm/SummaryForm';
import ExperienceForm from '@/components/ResumeForm/ExperienceForm';
import EducationForm from '@/components/ResumeForm/EducationForm';
import SkillsForm from '@/components/ResumeForm/SkillsForm';
import TemplateSelector from '@/components/Templates/TemplateSelector';
import ResumePreview from '@/components/Templates/ResumePreview';
import { Download, FileUp, FilePlus2, Printer, Save } from 'lucide-react';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResumeData());
  const [activeTab, setActiveTab] = useState('build');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');

  const updateContact = (contact: ResumeData['contact']) => {
    setResumeData((prev) => ({ ...prev, contact }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const updateExperiences = (experience: ResumeData['experience']) => {
    setResumeData((prev) => ({ ...prev, experience }));
  };

  const updateEducations = (education: ResumeData['education']) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId as TemplateType);
  };

  const handleDownloadPDF = () => {
    const fullName = resumeData.contact.fullName.trim();
    const filename = fullName ? `${fullName.replace(/\s+/g, '_')}_Resume` : 'Resume';
    
    generatePDF('resume-preview', filename);
    toast.success('Resume downloaded successfully!');
  };

  const handleSaveResume = () => {
    // Save resume data to localStorage
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('selectedTemplate', selectedTemplate);
    toast.success('Resume saved successfully!');
  };

  const handleLoadResume = () => {
    try {
      const savedResumeData = localStorage.getItem('resumeData');
      const savedTemplate = localStorage.getItem('selectedTemplate');
      
      if (savedResumeData) {
        setResumeData(JSON.parse(savedResumeData));
        toast.success('Resume loaded successfully!');
      }
      
      if (savedTemplate) {
        setSelectedTemplate(savedTemplate as TemplateType);
      }
    } catch (error) {
      toast.error('Failed to load resume data');
    }
  };
  
  const handleResetResume = () => {
    setResumeData(createEmptyResumeData());
    setSelectedTemplate('modern');
    toast.success('Started a new resume');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Resume Builder</h1>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleLoadResume}>
            <FileUp className="h-4 w-4 mr-2" /> Load
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveResume}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetResume}>
            <FilePlus2 className="h-4 w-4 mr-2" /> New
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="build">Build Resume</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="build" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <ContactForm contact={resumeData.contact} updateContact={updateContact} />
                
                <h2 className="text-xl font-semibold">Professional Summary</h2>
                <SummaryForm summary={resumeData.summary || ''} updateSummary={updateSummary} />
                
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <ExperienceForm 
                  experiences={resumeData.experience} 
                  updateExperiences={updateExperiences} 
                />
                
                <h2 className="text-xl font-semibold">Education</h2>
                <EducationForm 
                  educations={resumeData.education} 
                  updateEducations={updateEducations} 
                />
                
                <h2 className="text-xl font-semibold">Skills</h2>
                <SkillsForm 
                  skills={resumeData.skills} 
                  updateSkills={updateSkills} 
                />
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Choose Template</h2>
                <TemplateSelector 
                  templates={availableTemplates} 
                  selectedTemplate={selectedTemplate} 
                  onSelectTemplate={handleTemplateChange} 
                />
                
                <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <h3 className="font-semibold mb-2">Resume Preview</h3>
                  <div className="border border-gray-200 rounded">
                    <div className="scale-[0.4] origin-top-left h-[400px] overflow-hidden">
                      <ResumePreview 
                        resumeData={resumeData} 
                        templateType={selectedTemplate} 
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      variant="default" 
                      onClick={() => setActiveTab('preview')} 
                      className="w-full"
                    >
                      View Full Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6">
            <div className="bg-gray-100 p-4 md:p-8 rounded-lg border border-gray-200 min-h-[800px] flex flex-col items-center">
              <div className="bg-white mb-4 shadow-md max-w-full overflow-auto">
                <ResumePreview 
                  resumeData={resumeData} 
                  templateType={selectedTemplate} 
                />
              </div>
              
              <div className="flex gap-4 mt-auto pt-4">
                <Button onClick={handleDownloadPDF} className="gap-2">
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <Button variant="outline" onClick={handlePrint} className="gap-2">
                  <Printer className="h-4 w-4" /> Print
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container text-center text-gray-500">
          <p>Create professional resumes in minutes with our easy-to-use resume builder.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

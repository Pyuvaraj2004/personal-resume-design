
import React from 'react';
import { ResumeData, TemplateType } from '@/types/resume';
import { formatDate } from '@/utils/resumeUtils';
import { AtSign, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateType: TemplateType;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, templateType }) => {
  const { contact, summary, experience, education, skills } = resumeData;

  return (
    <div id="resume-preview" className={`resume-preview template-${templateType} bg-white text-resume-primary w-full max-w-[8.5in] mx-auto shadow-md relative overflow-hidden`}>
      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="resume-header mb-6">
          {templateType === 'professional' ? (
            <>
              <div className="resume-header-content">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{contact.fullName || 'Your Name'}</h1>
                <div className="text-resume-muted text-sm md:text-base mb-2">
                  {contact.address && <span>{contact.address}</span>}
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-1">
                {contact.email && (
                  <div className="flex items-center text-xs md:text-sm">
                    <AtSign className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center text-xs md:text-sm">
                    <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.linkedin && (
                  <div className="flex items-center text-xs md:text-sm">
                    <Linkedin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.linkedin}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{contact.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-resume-muted">
                {contact.email && (
                  <div className="flex items-center">
                    <AtSign className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.address && (
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.address}</span>
                  </div>
                )}
                {contact.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.linkedin}</span>
                  </div>
                )}
                {contact.website && (
                  <div className="flex items-center">
                    <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.website}</span>
                  </div>
                )}
                {contact.github && (
                  <div className="flex items-center">
                    <Github className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{contact.github}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="mb-4">
            <h2 className="resume-section-title">Summary</h2>
            <p className="text-sm">{summary}</p>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && experience.some(exp => exp.title || exp.company) && (
          <div className="mb-4">
            <h2 className="resume-section-title">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                exp.title || exp.company ? (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{exp.title || 'Position'}</h3>
                        <div className="text-xs text-resume-primary">
                          {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                        </div>
                      </div>
                      {(exp.startDate || exp.endDate) && (
                        <div className="text-xs text-resume-muted">
                          {formatDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
                        </div>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-xs mt-1 whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && education.some(edu => edu.degree || edu.school) && (
          <div className="mb-4">
            <h2 className="resume-section-title">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                edu.degree || edu.school ? (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{edu.degree || 'Degree'}</h3>
                        <div className="text-xs text-resume-primary">
                          {edu.school}{edu.location ? ` | ${edu.location}` : ''}
                          {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                        </div>
                      </div>
                      {(edu.startDate || edu.endDate) && (
                        <div className="text-xs text-resume-muted">
                          {formatDate(edu.startDate)} - {edu.endDate === 'Present' ? 'Present' : formatDate(edu.endDate)}
                        </div>
                      )}
                    </div>
                    {edu.description && (
                      <p className="text-xs mt-1">{edu.description}</p>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && skills.some(skill => skill.name) && (
          <div>
            <h2 className="resume-section-title">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                skill.name ? (
                  <span key={skill.id} className="text-xs bg-resume-card px-2 py-1 rounded">
                    {skill.name}
                    {skill.level && templateType !== 'minimal' ? ` (${skill.level})` : ''}
                  </span>
                ) : null
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;

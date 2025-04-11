import { v4 as uuidv4 } from 'uuid';
import html2pdf from 'html2pdf.js';
import { Experience, Education, Skill, Project, ResumeData, ResumeTemplate } from '@/types/resume';

export const generateId = (): string => {
  return uuidv4();
};

export const createEmptyExperience = (): Experience => {
  return {
    id: generateId(),
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: []
  };
};

export const createEmptyEducation = (): Education => {
  return {
    id: generateId(),
    degree: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    gpa: ''
  };
};

export const createEmptySkill = (): Skill => {
  return {
    id: generateId(),
    name: '',
    level: "Intermediate"
  };
};

export const createEmptyProject = (): Project => {
  return {
    id: generateId(),
    title: '',
    description: '',
    technologies: '',
    link: '',
    startDate: '',
    endDate: ''
  };
};

export const createEmptyResumeData = (): ResumeData => {
  return {
    contact: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      github: ''
    },
    summary: '',
    experience: [createEmptyExperience()],
    education: [createEmptyEducation()],
    skills: [createEmptySkill()],
    projects: [],
    awards: [],
    languages: [],
    interests: []
  };
};

export const availableTemplates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A modern template with a colored header and clean sections.'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'A traditional template with a professional look.'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A clean, minimalist approach focusing on content.'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A structured layout ideal for corporate applications.'
  }
];

export const generatePDF = (elementId: string, filename: string): void => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (error) {
    return dateString;
  }
};

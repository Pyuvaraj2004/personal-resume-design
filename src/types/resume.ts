
export interface Contact {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  linkedin?: string;
  website?: string;
  github?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location?: string;
  startDate: string;
  endDate: string | "Present";
  description?: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string;
  link?: string;
  startDate?: string;
  endDate?: string | "Present";
}

export interface ResumeData {
  contact: Contact;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  awards?: string[];
  languages?: { language: string; proficiency: string }[];
  interests?: string[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description?: string;
  previewImage?: string;
}

export type TemplateType = "modern" | "classic" | "minimal" | "professional";

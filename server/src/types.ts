export interface ProfileStat {
  value: string;
  label: string;
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
}

export interface Education {
  school: string;
  degree: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  roles: string[];
  location: string;
  email: string;
  summary: string[];
  stats: ProfileStat[];
  socials: SocialLink[];
  education: Education[];
  certifications: string[];
  languages: Language[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  url: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  topics: string[];
  certificateUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  context: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
  stars?: number;
}

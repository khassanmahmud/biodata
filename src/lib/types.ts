export interface ProfileStat {
  value: string;
  label: string;
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  roles: string[];
  location: string;
  email: string;
  availability: string;
  responseTime: string;
  summary: string[];
  stats: ProfileStat[];
  socials: SocialLink[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  url: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
  accent: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
  gradient: string;
  accent: string;
  stars?: number;
}

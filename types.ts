
export interface Job {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  image: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface Education {
  degree: string;
  school: string;
  award: string;
}

export interface EngineeringScale {
  titlePart1: string;
  titlePart2: string; // The highlighted part
  description: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
}

export interface SectionVisibility {
  about: boolean;
  stats: boolean;
  experience: boolean;
  skills: boolean;
  projects: boolean;
  testimonials: boolean;
  contact: boolean;
}

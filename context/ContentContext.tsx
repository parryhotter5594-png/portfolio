
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  PERSONAL_INFO as INITIAL_INFO, 
  EXPERIENCE as INITIAL_EXP, 
  PROJECTS as INITIAL_PROJ, 
  STATS as INITIAL_STATS, 
  SKILLS as INITIAL_SKILLS,
  EDUCATION as INITIAL_EDUCATION,
  ENGINEERING_SCALE as INITIAL_ENG_SCALE,
  TESTIMONIALS as INITIAL_TESTIMONIALS,
  INITIAL_VISIBILITY
} from '../constants';
import { Job, Project, SkillGroup, Education, EngineeringScale, Testimonial, SectionVisibility } from '../types';

interface ContentContextType {
  isAdmin: boolean;
  toggleAdmin: (force?: boolean) => void;
  
  personalInfo: typeof INITIAL_INFO;
  updatePersonalInfo: (key: keyof typeof INITIAL_INFO, value: string) => void;
  
  experience: Job[];
  updateExperience: (id: string, field: keyof Job, value: any) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  
  projects: Project[];
  updateProject: (id: string, field: keyof Project, value: any) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  
  stats: typeof INITIAL_STATS;
  updateStat: (index: number, field: 'label' | 'value', value: string) => void;
  
  skills: SkillGroup[];
  addSkillCategory: () => void;
  removeSkillCategory: (id: string) => void;
  updateSkillCategory: (id: string, newCategory: string) => void;
  addSkillItem: (categoryId: string) => void;
  removeSkillItem: (categoryId: string, itemIndex: number) => void;
  updateSkillItem: (categoryId: string, itemIndex: number, newValue: string) => void;
  
  education: Education;
  updateEducation: (field: keyof Education, value: string) => void;
  
  engineeringScale: EngineeringScale;
  updateEngineeringScale: (field: keyof EngineeringScale, value: string) => void;

  testimonials: Testimonial[];
  updateTestimonial: (id: string, field: keyof Testimonial, value: string) => void;
  addTestimonial: () => void;
  removeTestimonial: (id: string) => void;

  sectionVisibility: SectionVisibility;
  toggleSectionVisibility: (section: keyof SectionVisibility) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(INITIAL_INFO);
  const [experience, setExperience] = useState<Job[]>(INITIAL_EXP);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJ);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [skills, setSkills] = useState<SkillGroup[]>(INITIAL_SKILLS);
  const [education, setEducation] = useState<Education>(INITIAL_EDUCATION);
  const [engineeringScale, setEngineeringScale] = useState<EngineeringScale>(INITIAL_ENG_SCALE);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(INITIAL_VISIBILITY);

  const toggleAdmin = (force?: boolean) => {
    if (typeof force === 'boolean') {
      setIsAdmin(force);
    } else {
      setIsAdmin(prev => !prev);
    }
  };

  const updatePersonalInfo = (key: keyof typeof INITIAL_INFO, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [key]: value }));
  };

  const updateExperience = (id: string, field: keyof Job, value: any) => {
    setExperience(prev => prev.map(job => job.id === id ? { ...job, [field]: value } : job));
  };

  const addExperience = () => {
    const newJob: Job = {
      id: Date.now().toString(),
      role: "New Role",
      company: "Company Name",
      period: "202X - Present",
      location: "Location",
      description: ["New responsibility description..."]
    };
    setExperience(prev => [newJob, ...prev]);
  };

  const removeExperience = (id: string) => {
    setExperience(prev => prev.filter(job => job.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Project",
      category: "Category",
      description: "Short description...",
      fullDescription: "Detailed description goes here...",
      tags: ["Tag1", "Tag2"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    setStats(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  // --- Skills Management ---

  const addSkillCategory = () => {
    const newCategory: SkillGroup = {
      id: Date.now().toString(),
      category: "New Category",
      items: ["New Item"]
    };
    setSkills(prev => [...prev, newCategory]);
  };

  const removeSkillCategory = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const updateSkillCategory = (id: string, newCategory: string) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, category: newCategory } : s));
  };

  const addSkillItem = (categoryId: string) => {
    setSkills(prev => prev.map(s => {
      if (s.id === categoryId) {
        return { ...s, items: [...s.items, "New Skill"] };
      }
      return s;
    }));
  };

  const removeSkillItem = (categoryId: string, itemIndex: number) => {
    setSkills(prev => prev.map(s => {
      if (s.id === categoryId) {
        return { ...s, items: s.items.filter((_, idx) => idx !== itemIndex) };
      }
      return s;
    }));
  };

  const updateSkillItem = (categoryId: string, itemIndex: number, newValue: string) => {
    setSkills(prev => prev.map(s => {
      if (s.id === categoryId) {
        const newItems = [...s.items];
        newItems[itemIndex] = newValue;
        return { ...s, items: newItems };
      }
      return s;
    }));
  };

  const updateEducation = (field: keyof Education, value: string) => {
    setEducation(prev => ({ ...prev, [field]: value }));
  };

  const updateEngineeringScale = (field: keyof EngineeringScale, value: string) => {
    setEngineeringScale(prev => ({ ...prev, [field]: value }));
  };

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: "Client Name",
      role: "Position",
      company: "Company",
      text: "Write a glowing recommendation here...",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=150"
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const toggleSectionVisibility = (section: keyof SectionVisibility) => {
    setSectionVisibility(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <ContentContext.Provider value={{
      isAdmin, toggleAdmin,
      personalInfo, updatePersonalInfo,
      experience, updateExperience, addExperience, removeExperience,
      projects, updateProject, addProject, removeProject,
      stats, updateStat,
      skills, addSkillCategory, removeSkillCategory, updateSkillCategory, addSkillItem, removeSkillItem, updateSkillItem,
      education, updateEducation,
      engineeringScale, updateEngineeringScale,
      testimonials, updateTestimonial, addTestimonial, removeTestimonial,
      sectionVisibility, toggleSectionVisibility
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};

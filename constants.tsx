
import { Job, Project, SkillGroup, Education, EngineeringScale, Testimonial, SectionVisibility } from './types';
import { Linkedin, Mail, Globe, Printer, Cpu, Code, Factory } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Omid Ghazi",
  title: "Senior Additive Manufacturing Engineer",
  subtitle: "Industrial FDM/FFF | Advanced Manufacturing | Process Scaling",
  location: "Isfahan, Iran",
  relocation: "Open to relocate: Germany / Netherlands",
  email: "om.ghazi55@gmail.com",
  whatsapp: "https://wa.me/989133600835",
  linkedin: "https://linkedin.com/in/omid-ghazi-am",
  website: "https://3diaco.com",
  heroImage: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=1000&auto=format&fit=crop",
  contactImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  resumeUrl: "/resume.pdf", // Default placeholder
  summary: "Industrial Additive Manufacturing engineer with 9+ years designing and scaling production-grade industrial FDM systems. Specialized in high-temperature polymers (PEEK, PEKK, PPS-CF), Klipper/Marlin tuning, and reliability engineering for factory deployment. Built and operated 30+ printer farms (~21h/day) and delivered 1,500+ production jobs using MRP-driven workflows.",
  // Hero Badge Info
  badgeLabel: "Expertise",
  badgeTitle: "Industrial FDM &\nProcess Scaling",
  badgeValue: "9+",
  badgeValueLabel: "Years Exp."
};

export const STATS = [
  { label: "Production Jobs", value: "1,500+", icon: <Factory className="w-6 h-6" /> },
  { label: "Printers Shipped", value: "400+", icon: <Printer className="w-6 h-6" /> },
  { label: "Daily Uptime", value: "~21h", icon: <Cpu className="w-6 h-6" /> },
  { label: "Materials Qualified", value: "50+", icon: <Code className="w-6 h-6" /> },
];

export const EXPERIENCE: Job[] = [
  {
    id: "1",
    role: "Founder & CTO",
    company: "Diaco (Nama Gostar Diaco Rad)",
    period: "01/2017 - Present",
    location: "Iran",
    description: [
      "Designed and scaled industrial FDM platforms for continuous production with high-temperature polymers (PEEK, PEKK, PPS-CF).",
      "Led firmware/motion optimization on Klipper/Marlin, prioritizing long-duration stability, repeatability, and production robustness.",
      "Designed and operated production farms (30+ systems); improved throughput via reliability engineering and workflow automation.",
      "Delivered 1,500+ production jobs; established workflows spanning DFAM, slicing, execution, QA, and production planning.",
      "Built MRP-driven manufacturing workflows (BOM, routing, WIP) with ERP integration (Odoo) to support scalable output quality."
    ]
  },
  {
    id: "2",
    role: "AI Product Lead",
    company: "Stealth Startup",
    period: "01/2025 - Present",
    location: "Remote",
    description: [
      "Building an AI-assisted slicing tool for industrial print parameter optimization.",
      "Designing MRP/quoting workflows and API integrations for planning-to-execution automation."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Farm Operations & MRP System",
    category: "Manufacturing Operations",
    description: "Built internal production management (BOM, routing, WIP) for 30+ systems with KPI-driven tracking.",
    fullDescription: "Designed and implemented a comprehensive Manufacturing Resource Planning (MRP) system integrated with Odoo ERP. This system managed the entire lifecycle of additive manufacturing orders, from intake to shipping. Key features included automated G-code routing, real-time WIP tracking across 30+ machines, and material inventory management. The system reduced idle time by 40% and improved on-time delivery rates to 98%.",
    tags: ["Odoo ERP", "Python", "Workflow Automation", "KPI Tracking"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p2",
    title: "Production-Grade Klipper Standardization",
    category: "Firmware Engineering",
    description: "Created repeatable firmware configurations and tuning playbooks to reduce downtime across 400+ units.",
    fullDescription: "Led the transition from Marlin to Klipper for high-end industrial FDM systems. Developed a standardized configuration management system that allowed for 'fleet-wide' updates. Implemented input shaping and pressure advance tuning protocols that increased print speeds by 60% while maintaining dimensional accuracy. Created a custom macro suite for automated bed leveling, nozzle cleaning, and error recovery, significantly reducing operator intervention.",
    tags: ["Klipper", "Jinja2", "Linux/Debian", "Reliability Engineering"],
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p3",
    title: "High-Temp Materials Qualification",
    category: "R&D / Material Science",
    description: "Developed process windows and QA routines for PEEK/PEKK/PPS-CF batch production.",
    fullDescription: "Conducted extensive thermal and mechanical testing to qualify high-performance polymers for aerospace and medical applications. Established precise process windows (chamber temp, nozzle temp, cooling rates) for PEEK, PEKK, and Carbon Fiber reinforced PPS. Designed custom hot-ends and thermal chambers capable of sustaining 180°C ambient temperatures. Resulted in parts achieving 99% density and mechanical properties matching injection-molded counterparts.",
    tags: ["PEEK", "PEKK", "PPS-CF", "Thermal Analysis", "DFAM"],
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&q=80&w=1200"
  }
];

export const SKILLS: SkillGroup[] = [
  {
    id: "s1",
    category: "Additive Manufacturing",
    items: ["Industrial FDM/FFF", "DFAM", "High-Temp Polymers", "Process Development", "Production Qualification"]
  },
  {
    id: "s2",
    category: "Firmware & Electronics",
    items: ["Klipper (Advanced)", "Marlin", "Motion Electronics", "Driver Tuning", "Stability Optimization"]
  },
  {
    id: "s3",
    category: "Manufacturing Ops",
    items: ["Printer Farms", "Reliability Engineering", "MRP Workflows", "BOM/Routing", "SOP Development"]
  },
  {
    id: "s4",
    category: "Software & Tools",
    items: ["Python", "G-Code Generation", "Computational Design", "Odoo (ERP)", "API Integrations"]
  }
];

export const EDUCATION: Education = {
  degree: "B.Sc. Chemical Engineering",
  school: "University of Kashan (2011 - 2016)",
  award: "Award: Best Idea (AIChE Chem-E-Car, 2017)"
};

export const ENGINEERING_SCALE: EngineeringScale = {
  titlePart1: "Engineering for",
  titlePart2: "Scale",
  description: "By implementing custom Klipper macros, automated bed clearing sequences, and reliable queue management, I optimized the operator-to-machine ratio from the industry standard of 1:5 to an unprecedented 1:24.",
  stat1Value: "400%",
  stat1Label: "Throughput Inc.",
  stat2Value: "-40%",
  stat2Label: "Downtime"
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Sarah Miller",
    role: "Head of Manufacturing",
    company: "Aerospace Dynamics",
    text: "Omid's expertise in PEEK processing is unmatched. He helped us reduce our print failure rate from 20% to under 2% within a month.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t2",
    name: "James Carter",
    role: "Production Manager",
    company: "TechFab Solutions",
    text: "The farm management system Omid deployed revolutionized our workflow. His knowledge of both software and hardware is a rare find.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  }
];

export const INITIAL_VISIBILITY: SectionVisibility = {
  about: true,
  stats: true,
  experience: true,
  skills: true,
  projects: true,
  testimonials: true,
  contact: true
};

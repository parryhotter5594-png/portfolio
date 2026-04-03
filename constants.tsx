
import { Job, Project, SkillGroup, Education, EngineeringScale, Testimonial, SectionVisibility } from './types';
import { Linkedin, Mail, Globe, Layers, Activity, FlaskConical, Factory, Users } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Omid Ghazi",
  title: "Industrial FDM/FFF Platform Design & Manufacturing Systems Engineer",
  subtitle: "Platform Design | Motion Systems | Materials Engineering | Industrialization",
  location: "Isfahan, Iran",
  relocation: "Open to relocate: DE / NL",
  email: "om.ghazi55@gmail.com",
  whatsapp: "https://wa.me/989133600835",
  linkedin: "https://linkedin.com/in/omid-ghazi-am",
  website: "https://omid-ghazi.info",
  heroImage: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=1000&auto=format&fit=crop",
  contactImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  resumeUrl: "/resume.pdf", // Default placeholder
  summary: "Additive Manufacturing engineer and hands-on engineering leader with 9+ years designing and industrializing production-grade industrial FDM/FFF platforms and scalable manufacturing systems. Strengths in mechanical design, motion systems, and electronics/firmware (Klipper/Marlin), with deep production experience in high-temperature polymers (PEEK, PEKK, PPS-CF). Hands-on with bound metal filament / metal MEX (BMD/ADAM-style) including debinding + sintering (SS316L, 17-4PH, Inconel 718), and ceramic filament systems (zirconia, alumina, SiC). Strong in commissioning, reliability engineering, and hybrid routes (AM + machining) for functional parts.",
  languages: "Persian (Native) | English (B2 / IELTS 6)",
  visa: "Requires sponsorship: DE EU Blue Card / NL HSM | Available: April 2026",
  // Hero Badge Info
  badgeLabel: "Expertise",
  badgeTitle: "Industrial FDM &\nManufacturing Systems",
  badgeValue: "9+",
  badgeValueLabel: "Years Exp."
};

export const STATS = [
  { label: "Production Jobs", value: "1,500+", icon: <Factory className="w-6 h-6" /> },
  { label: "Printers Shipped", value: "400+", icon: <Layers className="w-6 h-6" /> },
  { label: "Daily Uptime", value: "~21h", icon: <Activity className="w-6 h-6" /> },
  { label: "Operator Ratio", value: "1:24", icon: <Users className="w-6 h-6" /> },
];

export const EXPERIENCE: Job[] = [
  {
    id: "1",
    role: "Founder & CTO",
    company: "Diaco (Nema Gostar Diaco Rad)",
    period: "01/2017 - Present",
    location: "Isfahan, Iran",
    description: [
      "Platform Design, Motion Systems & Firmware: Led mechanical design of industrial FDM/FFF platforms (structure, kinematics, extrusion stack, thermal architecture) for production-grade reliability.",
      "Designed and optimized motion systems (drivetrain, rigidity, resonance mitigation) and commissioning workflows to maximize repeatability for long-duration runs.",
      "Owned electronics integration and firmware production tuning (Klipper/Marlin): standardized configurations, calibration, and stability improvements across platform variants.",
      "Process & Materials Engineering: Developed and qualified process windows and QA routines for PEEK/PEKK/PPS-CF and 50+ polymers overall; enabled consistent high-mix production.",
      "Bound metal filament / metal MEX (BMD/ADAM-style): printing, debinding, and sintering workflows for SS316L, 17-4PH, and Inconel 718; shrinkage compensation and inspection.",
      "Ceramic filament: process development and failure analysis for zirconia, alumina (Al2O3), and SiC.",
      "Industrialization & Production Systems: Built and operated high-utilization print farms (30+ systems); implemented SOPs, QA gates, and KPI tracking to support high-mix production.",
      "Implemented MRP-driven manufacturing in Odoo (BOM, routing, WIP, scheduling) and integrated ERP workflows to support scalable output quality.",
      "Developed hybrid manufacturing routes combining additive builds with machining/finishing for production-ready components."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Platform Design & Commissioning",
    category: "Hardware & Firmware",
    description: "Production-grade FDM/FFF platforms with standardized tuning, calibration, and field setup playbooks.",
    fullDescription: "Led the mechanical design and firmware integration (Klipper/Marlin) of industrial FDM/FFF platforms. Focused on structural rigidity, thermal architecture, and motion system optimization to ensure production-grade reliability. Developed standardized tuning profiles, calibration routines, and comprehensive field setup playbooks to streamline deployment and minimize downtime across 400+ shipped units.",
    tags: ["Mechanical Design", "Klipper/Marlin", "Motion Systems", "Commissioning"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p2",
    title: "Farm Operations & MRP",
    category: "Manufacturing Systems",
    description: "Internal production management (BOM, routing, WIP, scheduling) for 30+ systems with KPI-driven tracking.",
    fullDescription: "Built and operated a high-utilization print farm consisting of 30+ industrial systems. Implemented a comprehensive MRP-driven manufacturing workflow using Odoo, managing BOMs, routing, WIP, and scheduling. Established SOPs, QA gates, and KPI tracking, achieving an average print time of ~21h/day per machine and an operator-to-machine ratio of 1:24.",
    tags: ["Odoo ERP", "Print Farm", "KPI Tracking", "Production Planning"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p3",
    title: "High-Temp Materials Qualification",
    category: "Materials Engineering",
    description: "Repeatable process windows + QA routines for PEEK/PEKK/PPS-CF batch production.",
    fullDescription: "Developed and qualified robust process windows for high-temperature polymers including PEEK, PEKK, and PPS-CF. Executed a 1,000-part production run across 24 machines with zero defects by standardizing process parameters and implementing strict QA gates. Successfully reduced failed-print material loss to ~0.5 kg per 100 kg printed via predictive monitoring and preventative maintenance.",
    tags: ["PEEK", "PEKK", "PPS-CF", "QA Routines", "Process Optimization"],
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p4",
    title: "Bound Metal & Ceramic Filament",
    category: "Advanced Materials",
    description: "Parameter development, debind/sinter schedules, shrinkage compensation, and failure analysis.",
    fullDescription: "Pioneered capabilities in bound metal filament / metal MEX (BMD/ADAM-style) and ceramic filament printing. Developed end-to-end workflows including printing parameters, debinding, and sintering schedules for SS316L, 17-4PH, and Inconel 718. Addressed complex challenges such as shrinkage compensation and inspection routines. Also conducted process development and failure analysis for advanced ceramics like zirconia, alumina (Al2O3), and SiC.",
    tags: ["Metal MEX", "Ceramics", "Debinding & Sintering", "SS316L", "Inconel 718"],
    image: "https://images.unsplash.com/photo-1563452675059-efa1e2e7a787?auto=format&fit=crop&q=80&w=1200"
  }
];

export const SKILLS: SkillGroup[] = [
  {
    id: "s1",
    category: "Platform & Mechanical Design",
    items: ["Industrial FDM/FFF Design", "Motion Systems", "Mechanical Design", "SolidWorks", "Fusion 360", "Siemens NX"]
  },
  {
    id: "s2",
    category: "Materials & Process Engineering",
    items: ["High-Temp Polymers (PEEK, PEKK, PPS-CF)", "Metal MEX / BMD (SS316L, Inconel 718)", "Ceramic Filaments (ZrO2, Al2O3, SiC)", "Debinding & Sintering", "Hybrid AM + Machining"]
  },
  {
    id: "s3",
    category: "Manufacturing Systems & Ops",
    items: ["Print Farm Operations", "MRP/ERP (Odoo)", "BOM & Routing", "QA Routines & Commissioning", "DFAM"]
  },
  {
    id: "s4",
    category: "Firmware, Software & Slicing",
    items: ["Klipper / Marlin", "Python (Automation)", "Cura / OrcaSlicer / PrusaSlicer", "Materialise Magics", "Netfabb"]
  }
];

export const EDUCATION: Education = {
  degree: "B.Sc. Chemical Engineering",
  school: "University of Kashan (2011 - 2016)",
  award: "Awards: Winner - FDM category, Iran 3D Show Printer Competition (2017-2018) | Best Idea Award - AIChE Chem-E-Car Competition (2017)"
};

export const ENGINEERING_SCALE: EngineeringScale = {
  titlePart1: "Engineering for",
  titlePart2: "Scale",
  description: "By implementing predictive observation, preventative maintenance routines, and workflow automation, I optimized the operator-to-machine ratio to an unprecedented 1:24 and reduced failed-print material loss to ~0.5 kg per 100 kg printed.",
  stat1Value: "1:24",
  stat1Label: "Operator Ratio",
  stat2Value: "0.5%",
  stat2Label: "Material Loss"
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


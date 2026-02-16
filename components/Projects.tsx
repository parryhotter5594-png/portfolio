
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import Editable from './Editable';
import { Reveal } from './Animation';
import { Layers, ArrowRight, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects, updateProject, addProject, removeProject, isAdmin, sectionVisibility, toggleSectionVisibility } = useContent();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project: Project) => {
    // Only open modal if not clicking on an input/textarea in admin mode
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string, field: keyof Project, val: any) => {
    updateProject(id, field, val);
    if (selectedProject && selectedProject.id === id) {
       setSelectedProject(prev => prev ? ({ ...prev, [field]: val }) : null);
    }
  };

  if (!sectionVisibility.projects) {
    if (isAdmin) {
      return (
        <div 
          onClick={() => toggleSectionVisibility('projects')}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 border-y border-dashed border-slate-300 dark:border-slate-600 text-center cursor-pointer group hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <EyeOff size={16} /> Section "Projects" is hidden. Click to show.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950 relative group/section">
      {/* Admin Hide Control */}
      {isAdmin && (
        <button 
          onClick={() => toggleSectionVisibility('projects')}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-slate-500 hover:text-primary-600 shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover/section:opacity-100 transition-opacity"
          title="Hide Section"
        >
          <Eye size={20} />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
             <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Deep dives into scaling, automation, and material science.</p>
             </div>
             {isAdmin && (
               <button 
                 onClick={addProject}
                 className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700 transition-colors shadow-sm"
               >
                 <Plus size={16} className="mr-2" /> Add Project
               </button>
             )}
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <div 
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800 flex flex-col relative h-full"
              >
                {isAdmin && (
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       removeProject(project.id);
                     }}
                     className="absolute top-2 right-2 z-30 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                   >
                     <Trash2 size={16} />
                   </button>
                )}

                {/* Image Container */}
                <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => openProject(project)}>
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 z-20">
                     <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                    <Editable 
                      value={project.title} 
                      onSave={(val) => handleEdit(project.id, 'title', val)}
                    />
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                     <Editable 
                      value={project.description} 
                      onSave={(val) => handleEdit(project.id, 'description', val)}
                      textarea
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                     <div className="flex -space-x-2 overflow-hidden" onClick={() => openProject(project)}>
                        {project.tags.slice(0,3).map((tag, i) => (
                           <div key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-500 font-mono border border-white dark:border-slate-900 transition-transform hover:z-10 hover:scale-105">
                             {tag}
                           </div>
                        ))}
                        {project.tags.length > 3 && (
                           <div className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-500 font-mono border border-white dark:border-slate-900">
                              +{project.tags.length - 3}
                           </div>
                        )}
                     </div>
                     <span 
                       className="flex items-center text-primary-600 text-sm font-semibold cursor-pointer hover:underline underline-offset-4"
                       onClick={() => openProject(project)}
                      >
                       View Case <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                     </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Projects;

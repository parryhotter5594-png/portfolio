import React, { useEffect, useState } from 'react';
import { X, Calendar, Layers, Tag, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { updateProject, isAdmin } = useContent();
  const [localProject, setLocalProject] = useState<Project | null>(project);

  useEffect(() => {
    setLocalProject(project);
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !localProject) return null;

  const handleUpdate = (field: keyof Project, val: any) => {
    updateProject(localProject.id, field, val);
    setLocalProject(prev => prev ? ({ ...prev, [field]: val }) : null);
  };

  const handleTagsUpdate = (val: string) => {
    // Split string by comma to create array
    const newTags = val.split(',').map(t => t.trim()).filter(t => t.length > 0);
    handleUpdate('tags', newTags);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full text-slate-900 dark:text-white hover:bg-white dark:hover:bg-black transition-colors"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 group">
          <img 
            src={localProject.image} 
            alt={localProject.title} 
            className="w-full h-full object-cover"
          />
          {isAdmin && (
             <div className="absolute top-4 left-4 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur p-2 rounded-lg shadow-lg border border-red-500/50">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                    <ImageIcon size={10} /> Edit Project Image URL
                  </label>
                  <input 
                    type="text" 
                    value={localProject.image}
                    onChange={(e) => handleUpdate('image', e.target.value)}
                    className="text-xs bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-primary-500 outline-none w-64 text-slate-900 dark:text-slate-100"
                    placeholder="https://..."
                  />
                </div>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block mb-3">
               <span className="px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-primary-600 rounded-full">
                 <Editable 
                    value={localProject.category} 
                    onSave={(val) => handleUpdate('category', val)} 
                  />
               </span>
            </span>
            <h2 className="text-3xl font-bold text-white">
               <Editable 
                  value={localProject.title} 
                  onSave={(val) => handleUpdate('title', val)} 
                />
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-8">
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Layers size={20} className="text-primary-600" /> Project Overview
                </h3>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                   <Editable 
                      value={localProject.fullDescription || localProject.description} 
                      onSave={(val) => handleUpdate('fullDescription', val)} 
                      textarea
                      className="w-full min-h-[150px]"
                    />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Tag size={16} /> Tech Stack
                </h4>
                
                {isAdmin ? (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-500">Edit Tags (comma separated):</label>
                    <textarea 
                      className="w-full bg-slate-200 dark:bg-slate-700 p-2 rounded text-sm outline-none focus:border-primary-500 border border-transparent"
                      value={localProject.tags.join(', ')}
                      onChange={(e) => handleTagsUpdate(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {localProject.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:opacity-90 transition-opacity"
           >
             Close Details
           </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
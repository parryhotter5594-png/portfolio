
import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Reveal } from './Animation';
import { Calendar, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const Experience: React.FC = () => {
  const { experience, updateExperience, addExperience, removeExperience, isAdmin, sectionVisibility, toggleSectionVisibility } = useContent();

  if (!sectionVisibility.experience) {
    if (isAdmin) {
      return (
        <div 
          onClick={() => toggleSectionVisibility('experience')}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 border-y border-dashed border-slate-300 dark:border-slate-600 text-center cursor-pointer group hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <EyeOff size={16} /> Section "Experience" is hidden. Click to show.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-950 relative group/section">
      {/* Admin Hide Control */}
      {isAdmin && (
        <button 
          onClick={() => toggleSectionVisibility('experience')}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-slate-500 hover:text-primary-600 shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover/section:opacity-100 transition-opacity"
          title="Hide Section"
        >
          <Eye size={20} />
        </button>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Professional History</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">9+ Years of Industrial AM Engineering</p>
          </Reveal>
          {isAdmin && (
            <button 
              onClick={addExperience}
              className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus size={16} className="mr-2" /> Add Job
            </button>
          )}
        </div>

        <div className="relative space-y-12">
           {/* Vertical Line */}
           <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2 origin-top animate-scale-in"></div>

          {experience.map((job, index) => (
            <div key={job.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 top-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 border-primary-100 dark:border-primary-900/50 flex items-center justify-center transform -translate-x-1/2 z-10 hover:scale-110 transition-transform duration-300">
                <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse-slow"></div>
              </div>

              {/* Date (Desktop) */}
              <div className={`hidden md:block w-1/2 pt-1 ${index % 2 === 0 ? 'text-left pl-12' : 'text-right pr-12'}`}>
                <Reveal direction={index % 2 === 0 ? 'right' : 'left'} delay={0.2}>
                  <span className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                    <Calendar size={14} /> 
                    <Editable 
                      value={job.period} 
                      onSave={(val) => updateExperience(job.id, 'period', val)} 
                    />
                  </span>
                </Reveal>
              </div>

              {/* Content Card */}
              <div className="ml-12 md:ml-0 w-full md:w-1/2 group perspective-1000">
                <Reveal direction={index % 2 === 0 ? 'left' : 'right'} delay={0.1}>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative transform-gpu">
                     
                     {isAdmin && (
                       <button 
                         onClick={() => removeExperience(job.id)}
                         className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                         title="Remove Job"
                       >
                         <Trash2 size={16} />
                       </button>
                     )}

                     {/* Mobile Date */}
                     <div className="md:hidden mb-3">
                       <span className="text-xs font-mono text-slate-500">
                         <Editable 
                            value={job.period} 
                            onSave={(val) => updateExperience(job.id, 'period', val)} 
                          />
                       </span>
                     </div>

                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                       <Editable 
                          value={job.role} 
                          onSave={(val) => updateExperience(job.id, 'role', val)} 
                        />
                     </h3>
                     <div className="text-primary-600 font-medium mb-4">
                       <Editable 
                          value={job.company} 
                          onSave={(val) => updateExperience(job.id, 'company', val)} 
                        />
                     </div>
                     
                     <ul className="space-y-3">
                      {job.description.map((point, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300 leading-relaxed group/item relative">
                          <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full flex-shrink-0 group-hover/item:bg-primary-500 transition-colors"></span>
                          <span className="flex-1">
                             <Editable 
                                value={point} 
                                onSave={(val) => {
                                  const newDesc = [...job.description];
                                  newDesc[i] = val;
                                  updateExperience(job.id, 'description', newDesc);
                                }} 
                                textarea
                                className="min-h-[60px]"
                              />
                          </span>
                          {isAdmin && (
                             <button 
                               className="ml-2 text-red-400 opacity-0 group-hover/item:opacity-100"
                               onClick={() => {
                                 const newDesc = job.description.filter((_, idx) => idx !== i);
                                 updateExperience(job.id, 'description', newDesc);
                               }}
                             >
                               <Trash2 size={12} />
                             </button>
                          )}
                        </li>
                      ))}
                      {isAdmin && (
                        <li className="pt-2">
                          <button 
                            className="text-xs text-primary-500 flex items-center"
                            onClick={() => updateExperience(job.id, 'description', [...job.description, "New bullet point..."])}
                          >
                            <Plus size={12} className="mr-1" /> Add Point
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </Reveal>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;


import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Reveal } from './Animation';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const Skills: React.FC = () => {
  const { 
    skills, 
    isAdmin, 
    addSkillCategory, 
    removeSkillCategory, 
    updateSkillCategory, 
    addSkillItem, 
    removeSkillItem, 
    updateSkillItem,
    education,
    updateEducation,
    sectionVisibility,
    toggleSectionVisibility
  } = useContent();

  if (!sectionVisibility.skills) {
    if (isAdmin) {
      return (
        <div 
          onClick={() => toggleSectionVisibility('skills')}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 border-y border-dashed border-slate-300 dark:border-slate-600 text-center cursor-pointer group hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <EyeOff size={16} /> Section "Skills" is hidden. Click to show.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900 relative group/section">
      {/* Admin Hide Control */}
      {isAdmin && (
        <button 
          onClick={() => toggleSectionVisibility('skills')}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-slate-500 hover:text-primary-600 shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover/section:opacity-100 transition-opacity"
          title="Hide Section"
        >
          <Eye size={20} />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Technical Arsenal</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Specialized tools and technologies for advanced manufacturing.</p>
            </div>
            {isAdmin && (
              <button 
                onClick={addSkillCategory}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors shadow-sm"
              >
                <Plus size={18} /> Add Category
              </button>
            )}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 0.1}>
              <div className="relative group/column flex flex-col h-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                
                {isAdmin && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover/column:opacity-100 transition-opacity z-10">
                     <button 
                      onClick={() => removeSkillCategory(group.id)}
                      className="p-1.5 bg-red-100 text-red-500 rounded hover:bg-red-200 transition-colors"
                      title="Remove Category"
                     >
                       <Trash2 size={14} />
                     </button>
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-4 pr-6">
                  <Editable 
                    value={group.category} 
                    onSave={(val) => updateSkillCategory(group.id, val)}
                  />
                </h3>
                
                <div className="flex flex-col gap-3 flex-1">
                  {group.items.map((skill, i) => (
                    <div key={i} className="flex items-center justify-between group/item relative">
                      <span className="text-slate-600 dark:text-slate-400 font-medium text-sm w-full group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">
                         <Editable 
                          value={skill} 
                          onSave={(val) => updateSkillItem(group.id, i, val)}
                        />
                      </span>
                      
                      {/* Visual bar (decorative) */}
                      {!isAdmin && (
                        <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ml-2 flex-shrink-0">
                          <div className="h-full bg-primary-600 w-full origin-left scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 ease-out"></div>
                        </div>
                      )}

                      {/* Delete Item Button */}
                      {isAdmin && (
                        <button 
                          onClick={() => removeSkillItem(group.id, i)}
                          className="ml-2 text-red-400 opacity-0 group-hover/item:opacity-100 hover:text-red-500 transition-all"
                          title="Remove Skill"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {isAdmin && (
                  <button 
                    onClick={() => addSkillItem(group.id)}
                    className="mt-6 w-full py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded text-slate-400 hover:text-primary-500 hover:border-primary-500 text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Plus size={12} /> Add Skill
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        
        {/* Education Highlight */}
        <Reveal delay={0.4} width="100%">
          <div className="mt-16 bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border-l-4 border-primary-600 flex flex-col md:flex-row justify-between items-center shadow-md hover:shadow-lg transition-shadow">
              <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    <Editable 
                      value={education.degree} 
                      onSave={(val) => updateEducation('degree', val)}
                    />
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    <Editable 
                      value={education.school} 
                      onSave={(val) => updateEducation('school', val)}
                    />
                  </p>
              </div>
              <div className="mt-4 md:mt-0 px-4 py-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                    <Editable 
                      value={education.award} 
                      onSave={(val) => updateEducation('award', val)}
                    />
              </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;

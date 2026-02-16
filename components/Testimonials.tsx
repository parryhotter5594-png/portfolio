
import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Reveal } from './Animation';
import { Quote, Plus, Trash2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { testimonials, updateTestimonial, addTestimonial, removeTestimonial, isAdmin, sectionVisibility, toggleSectionVisibility } = useContent();

  if (!sectionVisibility.testimonials) {
    if (isAdmin) {
      return (
        <div 
          onClick={() => toggleSectionVisibility('testimonials')}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 border-y border-dashed border-slate-300 dark:border-slate-600 text-center cursor-pointer group hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <EyeOff size={16} /> Section "Recommendations" is hidden. Click to show.
          </p>
        </div>
      );
    }
    return null;
  }

  // If there are no testimonials and we are not admin, don't render anything (unless visibility is forced on, but logic above handles off)
  // This existing check is okay, but hidden visibility takes precedence.
  if (!testimonials.length && !isAdmin) return null;

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative group/section">
      {/* Admin Hide Control */}
      {isAdmin && (
        <button 
          onClick={() => toggleSectionVisibility('testimonials')}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-slate-500 hover:text-primary-600 shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover/section:opacity-100 transition-opacity"
          title="Hide Section"
        >
          <Eye size={20} />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
            <div className="text-center mb-16 relative">
                 {/* Decorative background quote */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 dark:text-slate-800 pointer-events-none opacity-50">
                    <Quote size={120} />
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">Trusted by Industry Leaders</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 relative z-10 max-w-2xl mx-auto">
                    Collaborating with engineering teams to solve complex manufacturing challenges.
                </p>

                {isAdmin && (
                    <button 
                        onClick={addTestimonial}
                        className="mt-6 relative z-10 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} className="mr-2" /> Add Recommendation
                    </button>
                )}
            </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {testimonials.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                    <div className="relative h-full p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary-100 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg group">
                        
                        {/* Remove Button */}
                        {isAdmin && (
                            <button 
                                onClick={() => removeTestimonial(item.id)}
                                className="absolute top-4 right-4 z-20 p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}

                        <div className="flex flex-col h-full">
                            <div className="mb-6 text-primary-500">
                                <Quote size={32} className="fill-current opacity-20" />
                            </div>
                            
                            <div className="flex-1 text-slate-600 dark:text-slate-300 italic text-lg leading-relaxed mb-6">
                                "
                                <Editable 
                                    value={item.text} 
                                    onSave={(val) => updateTestimonial(item.id, 'text', val)} 
                                    textarea
                                    className="min-h-[80px]"
                                />
                                "
                            </div>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
                                <div className="relative shrink-0">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm"
                                    />
                                    {isAdmin && (
                                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-1 rounded-full border border-slate-200 shadow-sm cursor-pointer group/edit-img">
                                            <ImageIcon size={10} className="text-slate-500" />
                                            <div className="hidden group-hover/edit-img:block absolute bottom-full left-0 bg-white dark:bg-slate-900 p-2 rounded shadow-xl border border-slate-200 w-48 z-50">
                                                 <input 
                                                    type="text" 
                                                    value={item.image}
                                                    onChange={(e) => updateTestimonial(item.id, 'image', e.target.value)}
                                                    className="w-full text-xs p-1 border rounded"
                                                    placeholder="Image URL"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white">
                                        <Editable 
                                            value={item.name} 
                                            onSave={(val) => updateTestimonial(item.id, 'name', val)} 
                                        />
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">
                                        <span className="font-medium text-primary-600">
                                            <Editable 
                                                value={item.role} 
                                                onSave={(val) => updateTestimonial(item.id, 'role', val)} 
                                            />
                                        </span>
                                        <span className="mx-1">at</span>
                                        <Editable 
                                            value={item.company} 
                                            onSave={(val) => updateTestimonial(item.id, 'company', val)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

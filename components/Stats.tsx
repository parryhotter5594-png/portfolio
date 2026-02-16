
import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Reveal, CountUp } from './Animation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Eye, EyeOff } from 'lucide-react';

const data = [
  { name: 'Standard', efficiency: 5 },
  { name: 'My Farm', efficiency: 24 },
];

const Stats: React.FC = () => {
  const { stats, updateStat, engineeringScale, updateEngineeringScale, isAdmin, sectionVisibility, toggleSectionVisibility } = useContent();

  if (!sectionVisibility.stats) {
    if (isAdmin) {
      return (
        <div 
          onClick={() => toggleSectionVisibility('stats')}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 border-y border-dashed border-slate-300 dark:border-slate-600 text-center cursor-pointer group hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <EyeOff size={16} /> Section "Stats" is hidden. Click to show.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <section className="relative py-20 bg-white dark:bg-slate-900 group/section">
      {/* Admin Hide Control */}
      {isAdmin && (
        <button 
          onClick={() => toggleSectionVisibility('stats')}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-slate-500 hover:text-primary-600 shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover/section:opacity-100 transition-opacity"
          title="Hide Section"
        >
          <Eye size={20} />
        </button>
      )}

      {/* Decorative divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mb-20">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="flex flex-col items-center text-center group cursor-default">
                <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                   {isAdmin ? (
                     <Editable 
                      value={stat.value} 
                      onSave={(val) => updateStat(index, 'value', val)} 
                     />
                   ) : (
                     <CountUp end={stat.value} />
                   )}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                   <Editable 
                      value={stat.label} 
                      onSave={(val) => updateStat(index, 'label', val)} 
                   />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Efficiency Chart Block */}
        <Reveal width="100%" delay={0.3}>
          <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 lg:p-16 shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  <Editable 
                     value={engineeringScale.titlePart1} 
                     onSave={(val) => updateEngineeringScale('titlePart1', val)} 
                  />
                  <span className="text-primary-400 relative inline-block ml-2">
                     <Editable 
                       value={engineeringScale.titlePart2} 
                       onSave={(val) => updateEngineeringScale('titlePart2', val)} 
                     />
                     <svg className="absolute w-full h-2 bottom-0 left-0 text-primary-600" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                     </svg>
                  </span>
                </h3>
                <div className="text-slate-300 text-lg leading-relaxed">
                   <Editable 
                     value={engineeringScale.description} 
                     onSave={(val) => updateEngineeringScale('description', val)} 
                     textarea
                     className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                   <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="text-2xl font-bold text-white">
                          {isAdmin ? (
                            <Editable 
                               value={engineeringScale.stat1Value} 
                               onSave={(val) => updateEngineeringScale('stat1Value', val)} 
                            />
                          ) : (
                            <CountUp end={engineeringScale.stat1Value} />
                          )}
                      </div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide">
                          <Editable 
                             value={engineeringScale.stat1Label} 
                             onSave={(val) => updateEngineeringScale('stat1Label', val)} 
                          />
                      </div>
                   </div>
                   <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="text-2xl font-bold text-white">
                          {isAdmin ? (
                            <Editable 
                               value={engineeringScale.stat2Value} 
                               onSave={(val) => updateEngineeringScale('stat2Value', val)} 
                            />
                          ) : (
                             <CountUp end={engineeringScale.stat2Value} />
                          )}
                      </div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide">
                          <Editable 
                             value={engineeringScale.stat2Label} 
                             onSave={(val) => updateEngineeringScale('stat2Label', val)} 
                          />
                      </div>
                   </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-80 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
                 <h4 className="text-slate-400 text-sm font-mono mb-4">Machines per Operator</h4>
                 <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={80} tick={{fill: '#cbd5e1', fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                      <Bar dataKey="efficiency" radius={[0, 4, 4, 0]} barSize={40} animationDuration={1500}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 1 ? '#3b82f6' : '#475569'} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Stats;

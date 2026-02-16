import React from 'react';
import { MapPin, Mail, Linkedin, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Reveal } from './Animation';

const Hero: React.FC = () => {
  const { personalInfo, updatePersonalInfo, isAdmin } = useContent();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="relative z-10 space-y-8 order-2 lg:order-1">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
                  <Editable 
                    value={personalInfo.relocation} 
                    onSave={(val) => updatePersonalInfo('relocation', val)} 
                  />
                </span>
              </div>
            </Reveal>
            
            <div>
              <Reveal delay={0.2}>
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  <Editable 
                    value={personalInfo.name} 
                    onSave={(val) => updatePersonalInfo('name', val)} 
                  />
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <h2 className="text-2xl lg:text-3xl font-medium text-primary-600 mt-4 font-mono">
                  <Editable 
                    value={personalInfo.title} 
                    onSave={(val) => updatePersonalInfo('title', val)} 
                  />
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed border-l-4 border-slate-200 dark:border-slate-800 pl-6 hover:border-primary-500 transition-colors duration-300">
                <Editable 
                    value={personalInfo.summary} 
                    onSave={(val) => updatePersonalInfo('summary', val)} 
                    textarea
                    className="min-h-[100px]"
                  />
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#contact" 
                  onClick={handleScrollToContact}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all transform hover:-translate-y-1 hover:shadow-primary-500/40 active:scale-95 cursor-pointer"
                >
                  Contact Me <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
                </a>
                <a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 dark:border-slate-700 text-base font-bold rounded-lg text-slate-700 dark:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all transform hover:-translate-y-1"
                >
                  <Linkedin className="mr-2 w-5 h-5" /> LinkedIn
                </a>
              </div>
            </Reveal>
            
            <Reveal delay={0.6}>
              <div className="flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-500">
                <div className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                  <MapPin size={18} className="text-primary-500" /> 
                  <Editable 
                    value={personalInfo.location} 
                    onSave={(val) => updatePersonalInfo('location', val)} 
                  />
                </div>
                <div className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                  <Mail size={18} className="text-primary-500" /> 
                  <Editable 
                    value={personalInfo.email} 
                    onSave={(val) => updatePersonalInfo('email', val)} 
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Visual Side */}
          <div className="relative order-1 lg:order-2 perspective-1000">
             {/* Disable animate-float when in admin mode to make editing easier */}
             <div className={`relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group ${isAdmin ? '' : 'animate-float'}`}>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                
                {/* Edit Button for Admin */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur p-2 rounded-lg shadow-lg border border-red-500/50">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                        <ImageIcon size={10} /> Edit Hero Image URL
                      </label>
                      <input 
                        type="text" 
                        value={personalInfo.heroImage}
                        onChange={(e) => updatePersonalInfo('heroImage', e.target.value)}
                        className="text-xs bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-primary-500 outline-none w-48 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>
                )}

                {/* Hero Image - Optimized */}
                <img 
                  src={personalInfo.heroImage} 
                  alt="Industrial Additive Manufacturing" 
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                />
                
                {/* Floating Badge - Re-implemented for better editing experience */}
                <div className="absolute bottom-6 left-4 right-4 z-40">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 w-full relative">
                      <div className="flex justify-between items-end gap-4">
                        
                        {/* Left Side: Label & Title */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-1 text-slate-300 text-sm font-mono">
                            <Editable 
                              value={personalInfo.badgeLabel ?? ""} 
                              onSave={(val) => updatePersonalInfo('badgeLabel', val)} 
                              className={isAdmin ? "!bg-white !text-slate-900 px-2 py-1 rounded shadow-lg border-2 border-yellow-400 font-bold" : ""}
                            />
                          </div>
                          <div className="text-white text-xl font-bold leading-tight whitespace-pre-wrap">
                            <Editable 
                              value={personalInfo.badgeTitle ?? ""} 
                              onSave={(val) => updatePersonalInfo('badgeTitle', val)}
                              textarea
                              className={`w-full ${isAdmin ? "!bg-white !text-slate-900 p-2 rounded shadow-lg border-2 border-yellow-400 min-h-[80px]" : "bg-transparent border-none"}`}
                            />
                          </div>
                        </div>

                        {/* Right Side: Stats */}
                        <div className="text-right shrink-0 flex flex-col items-end">
                          <div className="text-4xl font-bold text-white mb-1">
                            <Editable 
                              value={personalInfo.badgeValue ?? ""} 
                              onSave={(val) => updatePersonalInfo('badgeValue', val)}
                              className={`text-right ${isAdmin ? "w-24 !bg-white !text-slate-900 px-2 py-1 rounded shadow-lg border-2 border-yellow-400" : "w-auto bg-transparent"}`}
                            />
                          </div>
                          <div className="text-slate-300 text-xs uppercase tracking-wider">
                            <Editable 
                              value={personalInfo.badgeValueLabel ?? ""} 
                              onSave={(val) => updatePersonalInfo('badgeValueLabel', val)}
                              className={`text-right ${isAdmin ? "w-32 !bg-white !text-slate-900 px-2 py-1 rounded shadow-lg border-2 border-yellow-400" : "w-auto bg-transparent"}`}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                </div>
             </div>
             
             {/* Decorative grid pattern behind image */}
             <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-slate-200 dark:border-slate-800 rounded-3xl opacity-50 dark:opacity-20 hidden lg:block animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
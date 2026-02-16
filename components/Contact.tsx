
import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Mail, ArrowUpRight, MessageCircle, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

const Contact: React.FC = () => {
  const { personalInfo, updatePersonalInfo, isAdmin, sectionVisibility, toggleSectionVisibility } = useContent();

  if (!sectionVisibility.contact) {
    if (isAdmin) {
      return (
        <div 
          onClick={() => toggleSectionVisibility('contact')}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 border-y border-dashed border-slate-300 dark:border-slate-600 text-center cursor-pointer group hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <EyeOff size={16} /> Section "Contact" is hidden. Click to show.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-slate-900 group/section">
      {/* Admin Hide Control */}
      {isAdmin && (
        <button 
          onClick={() => toggleSectionVisibility('contact')}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-slate-500 hover:text-primary-600 shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover/section:opacity-100 transition-opacity"
          title="Hide Section"
        >
          <Eye size={20} />
        </button>
      )}

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src={personalInfo.contactImage} 
          alt="Global connectivity" 
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/80"></div>
      </div>
      
      {/* Admin Edit Image Control */}
      {isAdmin && (
        <div className="absolute top-4 right-16 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur p-2 rounded-lg shadow-lg border border-red-500/50">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
              <ImageIcon size={10} /> Edit BG Image URL
            </label>
            <input 
              type="text" 
              value={personalInfo.contactImage}
              onChange={(e) => updatePersonalInfo('contactImage', e.target.value)}
              className="text-xs bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-primary-500 outline-none w-48 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Scale Your Production?</h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          <Editable 
             value="I am currently open to relocation opportunities in Germany or Netherlands. Let's discuss how my experience in high-temperature FDM and farm automation can benefit your team."
             onSave={() => {}} // Static text mostly, can be made fully dynamic if requested
          />
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a 
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 w-full sm:w-auto justify-center"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </a>
          <a 
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20 w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
          <a 
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 border border-slate-600 bg-slate-800/50 backdrop-blur-sm rounded-lg font-medium text-slate-200 hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
          >
            LinkedIn Profile
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;


import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download, ShieldAlert, FileText, Link } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionVisibility } from '../types';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin, toggleAdmin, personalInfo, updatePersonalInfo, sectionVisibility } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allNavLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Recommendations', href: '#testimonials', id: 'testimonials' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Filter links based on visibility
  const navLinks = allNavLinks.filter(link => {
    // If it's the 'about' section (Hero), we generally keep it or check 'about' visibility
    // If the ID exists in sectionVisibility, use that value. Default to true.
    const key = link.id as keyof SectionVisibility;
    return sectionVisibility[key] !== false;
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setIsMobileMenuOpen(false);
      window.history.pushState(null, "", href);
    }
  };

  const handleSecretClick = (e: React.MouseEvent) => {
    // Check if clicked 4 times in rapid succession
    if (e.detail === 4) {
      toggleAdmin();
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Secret Invisible Button */}
          <div 
            onClick={handleSecretClick}
            className="w-4 h-10 cursor-default select-none bg-transparent"
            title="?" 
          ></div>

          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl relative">
            OG
            {isAdmin && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Omid Ghazi</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Senior AM Engineer</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative group/resume">
            <a 
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Download size={16} /> Resume
            </a>
            
            {/* Admin Resume Link Editor */}
            {isAdmin && (
              <div className="absolute top-full right-0 mt-3 w-64 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                    <Link size={10} /> PDF/File URL
                  </label>
                  <input 
                    type="text" 
                    value={personalInfo.resumeUrl}
                    onChange={(e) => updatePersonalInfo('resumeUrl', e.target.value)}
                    className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 focus:border-primary-500 outline-none w-full text-slate-900 dark:text-slate-100"
                    placeholder="https://..."
                  />
                  <div className="text-[10px] text-slate-400">
                    Paste a link to Google Drive, Dropbox, or hosted PDF.
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full text-slate-600 dark:text-slate-300"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-900 dark:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Admin Mode Indicator for Mobile/Feedback */}
      {isAdmin && (
        <div className="bg-red-500 text-white text-xs font-bold text-center py-1 absolute bottom-0 left-0 right-0 transform translate-y-full">
          ADMIN MODE ACTIVE
        </div>
      )}

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-base font-medium text-slate-600 dark:text-slate-300 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-primary-600 text-white py-3 rounded-md font-medium"
          >
            Download Resume
          </a>
          
          {isAdmin && (
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
               <label className="text-xs font-bold text-slate-500 block mb-1">Edit Resume URL</label>
               <input 
                 type="text" 
                 value={personalInfo.resumeUrl}
                 onChange={(e) => updatePersonalInfo('resumeUrl', e.target.value)}
                 className="w-full text-sm p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
               />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

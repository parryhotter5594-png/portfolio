
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ContentProvider } from './context/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load below-the-fold components to improve initial load time
const Stats = lazy(() => import('./components/Stats'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));

// Simple loading placeholder
const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
  </div>
);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ContentProvider>
      <div className="min-h-screen font-sans selection:bg-primary-500 selection:text-white">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          {/* Hero is loaded immediately for LCP */}
          <Hero />
          
          {/* Heavy components are lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <Stats />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
      </div>
    </ContentProvider>
  );
};

export default App;

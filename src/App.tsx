import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { WorkflowSimulator } from './components/sections/WorkflowSimulator';
import { Skills } from './components/sections/Skills';
import { AppsShowcase } from './components/sections/AppsShowcase';
import { Experience } from './components/sections/Experience';
import { Channels } from './components/sections/Channels';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="portfolio-app" data-theme={theme}>
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero with Interactive 3D Agentic Swarm */}
        <Hero theme={theme} />

        {/* 2. About Maaz Ali & Qualifications */}
        <About />

        {/* 3. All 43 Projects with Categories, Search & Modal */}
        <Projects />

        {/* 4. Interactive Agentic LangGraph & Automation Simulator */}
        <WorkflowSimulator />

        {/* 5. 3D Technology Cosmos & Skills Matrix */}
        <Skills theme={theme} />

        {/* 6. Published Mobile Applications on Google Play */}
        <AppsShowcase />

        {/* 7. Experience, Microsoft AZ-900 Certification & Degree */}
        <Experience />

        {/* 8. YouTube & Community Content Channels */}
        <Channels />

        {/* 9. Direct Contact & Collaboration Booking */}
        <Contact />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
};

export default App;

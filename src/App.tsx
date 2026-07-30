import React, { useState } from 'react';
import { AboutEducation } from './components/AboutEducation';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactFooter } from './components/ContactFooter';
import { ExperienceSection } from './components/ExperienceSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { Hero } from './components/Hero';
import { LearningPhilosophy } from './components/LearningPhilosophy';
import { MoreProjectsSection } from './components/MoreProjectsSection';
import { Navbar } from './components/Navbar';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { FeaturedProject } from './types/portfolio';

export function App() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* SaaS Navigation Header */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenResume={() => setResumeOpen(true)} />

      {/* About & Education */}
      <AboutEducation />

      {/* Skills Grid */}
      <SkillsSection />

      {/* Flagship Featured Projects Showcase */}
      <FeaturedProjectsSection onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* Secondary Projects Archive */}
      <MoreProjectsSection />

      {/* Work Experience */}
      <ExperienceSection />

      {/* Achievements & Certifications */}
      <AchievementsSection />

      {/* Learning & Philosophy */}
      <LearningPhilosophy />

      {/* Contact & Footer */}
      <ContactFooter />

      {/* Case Study Detail Modal View */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Resume View Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

export default App;

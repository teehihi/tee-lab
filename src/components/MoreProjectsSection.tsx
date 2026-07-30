import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FolderGit2, Layers, Sparkles, Trophy } from 'lucide-react';
import { secondaryProjects } from '../data/portfolioData';

export const MoreProjectsSection: React.FC = () => {
  return (
    <section id="more-projects" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>ADDITIONAL PORTFOLIO ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            More <span className="text-gradient-emerald">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
            Hackathon builds, web games, full-stack prototypes, and cultural web applications.
          </p>
        </div>

        {/* Secondary Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-6 border-white/10 space-y-5 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {project.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      project.status === 'Hackathon Winner'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                        : project.status === 'Live'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-gray-500/20 text-gray-300 border-gray-500/40'
                    }`}
                  >
                    {project.status === 'Hackathon Winner' && <Trophy className="w-3 h-3" />}
                    <span>{project.status}</span>
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-2 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Contributions */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                    My Contributions
                  </span>
                  <ul className="space-y-1">
                    {project.myContributions.map((contrib, idx) => (
                      <li key={idx} className="text-[11px] text-gray-300 flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack & Links */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white font-mono transition-colors"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>Code Repo</span>
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-mono transition-colors ml-auto"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

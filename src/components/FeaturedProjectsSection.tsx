import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot, ExternalLink, Flame, FolderGit2, Layers, Sparkles, Users, Zap } from 'lucide-react';
import { featuredProjects } from '../data/portfolioData';
import { FeaturedProject } from '../types/portfolio';

interface FeaturedProjectsSectionProps {
  onSelectProject: (project: FeaturedProject) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  onSelectProject,
}) => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Flagship <span className="text-gradient-emerald">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
            In-depth engineering breakdown of products built to solve real operational & educational problems.
          </p>
        </div>

        {/* Featured Projects Cards */}
        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card rounded-3xl p-6 sm:p-10 border-white/10 hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group shadow-2xl"
            >
              {/* Background Glow Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Visual Mockup / Visual Card */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 aspect-[16/10] group-hover:scale-[1.01] transition-transform duration-500 shadow-2xl flex flex-col justify-between p-6">
                    {/* Top Status Bar */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                        {project.status}
                      </span>
                      <span className="text-xs font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Center Title Graphic */}
                    <div className="space-y-2 py-6">
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-emerald-400 text-sm font-medium">{project.tagline}</p>
                    </div>

                    {/* Bottom Key Metric Pills */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                      {project.resultsMetrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <span className="block text-lg font-bold text-white font-mono">{metric.value}</span>
                          <span className="block text-[11px] text-gray-400 truncate">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Project Info & CTAs */}
                <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
                        Case Study #{index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Tech Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.flatMap((ts) => ts.technologies).slice(0, 7).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-95 transition-all"
                    >
                      <span>Explore Full Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white font-mono transition-colors"
                      >
                        <FolderGit2 className="w-4 h-4" />
                        <span>Repository</span>
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileCode,
  Flame,
  FolderGit2,
  Globe,
  Layers,
  Layout,
  Lightbulb,
  Milestone,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { FeaturedProject } from '../types/portfolio';

interface ProjectCaseStudyModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'architecture' | 'ai' | 'challenges' | 'metrics' | 'roadmap'
  >('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0b101d] border border-white/15 rounded-3xl w-full max-w-5xl my-auto overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
        >
          {/* Top Bar Navigation */}
          <div className="sticky top-0 z-30 bg-[#0b101d]/90 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 block uppercase tracking-wider">
                  Case Study • {project.category}
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  {project.title}
                  <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {project.status}
                  </span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-200 border border-white/10 transition-colors"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Selection Navigation Bar */}
          <div className="bg-[#070b14] px-6 py-2 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: 'Overview & Features', icon: Sparkles },
              { id: 'architecture', label: 'System Architecture', icon: Layers },
              { id: 'ai', label: 'AI Workflow & RAG', icon: Bot },
              { id: 'challenges', label: 'Engineering Challenges', icon: AlertTriangle },
              { id: 'metrics', label: 'Results & Metrics', icon: Zap },
              { id: 'roadmap', label: 'Lessons & Roadmap', icon: Milestone },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Main Content Scroll Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-10 flex-1">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* Motivation & Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6 space-y-3 border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                      <Target className="w-4 h-4" />
                      <span>WHY I BUILT THIS</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Motivation & Problem Solved</h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-light">
                      {project.motivation}
                    </p>
                  </div>

                  <div className="glass-card rounded-2xl p-6 space-y-3 border-white/10">
                    <div className="flex items-center gap-2 text-teal-400 text-xs font-mono">
                      <UserCheck className="w-4 h-4" />
                      <span>TARGET USERS</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Who This Serves</h3>
                    <ul className="space-y-2">
                      {project.targetUsers.map((user, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{user}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* My Role */}
                <div className="glass-card rounded-2xl p-6 space-y-4 border-white/10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-emerald-400" />
                    <span>My Role & Key Responsibilities</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.role.map((resp, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-gray-200"
                      >
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categorized Tech Stack Badges */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                    <span>Tech Stack Breakdown</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.techStack.map((stack) => (
                      <div
                        key={stack.category}
                        className="glass-card rounded-xl p-4 space-y-2 border-white/10"
                      >
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                          {stack.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {stack.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>Detailed Feature Walkthrough</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="glass-card rounded-xl p-5 space-y-2 border-white/10 hover:border-emerald-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white text-sm">{feature.title}</h4>
                          {feature.badge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              {feature.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SYSTEM ARCHITECTURE TAB */}
            {activeTab === 'architecture' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="glass-card rounded-2xl p-6 space-y-4 border-white/10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-400" />
                      <span>System Architecture Data Flow</span>
                    </h3>
                    <span className="text-xs font-mono text-gray-400">Interactive Pipeline</span>
                  </div>

                  {/* Flow Diagram Illustration */}
                  <div className="bg-[#050811] p-6 rounded-xl border border-white/10 space-y-6">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {project.architectureNodes.map((node, idx) => (
                        <React.Fragment key={idx}>
                          <div className="p-4 rounded-xl bg-white/[0.03] border border-emerald-500/30 w-48 text-center space-y-1 hover:border-emerald-500/60 transition-colors shadow-lg">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 inline-block">
                              {node.type}
                            </span>
                            <h4 className="font-bold text-white text-sm">{node.name}</h4>
                            <p className="text-[11px] text-gray-400 font-light">{node.description}</p>
                          </div>
                          {idx < project.architectureNodes.length - 1 && (
                            <div className="text-emerald-400 font-bold hidden sm:block">➔</div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI WORKFLOW TAB */}
            {activeTab === 'ai' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {project.aiWorkflow ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card rounded-2xl p-6 space-y-3 border-white/10">
                        <span className="text-xs font-mono text-emerald-400 block uppercase">
                          AI Model Provider
                        </span>
                        <h4 className="text-lg font-bold text-white">
                          {project.aiWorkflow.llmProvider}
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          {project.aiWorkflow.promptEngineering}
                        </p>
                      </div>

                      <div className="glass-card rounded-2xl p-6 space-y-3 border-white/10">
                        <span className="text-xs font-mono text-teal-400 block uppercase">
                          AI APIs & SDKs
                        </span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.aiWorkflow.aiApis.map((api) => (
                            <span
                              key={api}
                              className="px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono"
                            >
                              {api}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI Workflow Steps */}
                    <div className="glass-card rounded-2xl p-6 space-y-4 border-white/10">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Bot className="w-5 h-5 text-emerald-400" />
                        <span>AI Inference & Execution Steps</span>
                      </h3>
                      <div className="space-y-2">
                        {project.aiWorkflow.workflowSteps.map((step, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3"
                          >
                            <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-xs text-gray-200">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Limitations & Improvements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card rounded-2xl p-6 space-y-2 border-white/10 bg-red-950/20">
                        <h4 className="font-bold text-red-300 text-sm">Model Limitations</h4>
                        <p className="text-xs text-gray-300">{project.aiWorkflow.modelLimitations}</p>
                      </div>
                      <div className="glass-card rounded-2xl p-6 space-y-2 border-white/10 bg-emerald-950/20">
                        <h4 className="font-bold text-emerald-300 text-sm">Planned Enhancements</h4>
                        <p className="text-xs text-gray-300">{project.aiWorkflow.improvements}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-8 text-center text-gray-400 font-mono text-sm">
                    This project focuses primarily on Full-Stack Relational Architecture without direct GenAI integration.
                  </div>
                )}
              </div>
            )}

            {/* DEVELOPMENT CHALLENGES TAB */}
            {activeTab === 'challenges' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-emerald-400" />
                  <span>Technical Bottlenecks & Design Trade-offs</span>
                </h3>
                <div className="space-y-6">
                  {project.challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="glass-card rounded-2xl p-6 space-y-4 border-white/10"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-red-400 uppercase tracking-wider block">
                          Challenge #{idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white">{challenge.problem}</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                          <span className="text-[11px] font-mono text-emerald-400">Engineering Decision:</span>
                          <p className="text-xs text-gray-300 leading-relaxed">{challenge.decision}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                          <span className="text-[11px] font-mono text-teal-400">Measured Outcome:</span>
                          <p className="text-xs text-gray-300 leading-relaxed">{challenge.outcome}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* METRICS TAB */}
            {activeTab === 'metrics' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>Real Usage Statistics & Benchmarks</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.resultsMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="glass-card rounded-2xl p-5 border-white/10 space-y-1 text-center"
                    >
                      <span className="block text-3xl font-extrabold text-white font-mono text-gradient-emerald">
                        {metric.value}
                      </span>
                      <span className="block text-xs font-bold text-gray-200">{metric.label}</span>
                      {metric.subtext && (
                        <span className="block text-[11px] text-gray-400 font-mono">
                          {metric.subtext}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROADMAP TAB */}
            {activeTab === 'roadmap' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Lessons Learned */}
                <div className="glass-card rounded-2xl p-6 space-y-4 border-white/10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <span>Lessons Learned</span>
                  </h3>
                  <ul className="space-y-3">
                    {project.lessonsLearned.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Future Improvements */}
                <div className="glass-card rounded-2xl p-6 space-y-4 border-white/10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Milestone className="w-5 h-5 text-teal-400" />
                    <span>Future Roadmap</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.futureRoadmap.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-gray-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="bg-[#070b14] px-6 py-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">Nguyen Nhat Thien Portfolio</span>
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-colors flex items-center gap-2"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span>Launch Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

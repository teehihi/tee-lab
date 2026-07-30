import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, CheckCircle2, Code, Cpu, GraduationCap, Sparkles, Target, User } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const AboutEducation: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Me & <span className="text-gradient-emerald">Education</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
            Bridging academic foundation in Computer Science with real-world product engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: About Me Detailed Box */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Engineering Philosophy</h3>
                    <p className="text-xs font-mono text-emerald-400">Product-Driven Development</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  Full-Stack + AI
                </span>
              </div>

              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                {personalInfo.aboutText.map((paragraph, index) => (
                  <p key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{paragraph}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Core Values / Focus Chips */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                  Full-Stack
                </div>
                <p className="text-xs text-white font-medium">React, Node, Express, Python</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-teal-400" />
                  AI & Vision
                </div>
                <p className="text-xs text-white font-medium">YOLO, Gemini API, RAG</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                <div className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Workflow
                </div>
                <p className="text-xs text-white font-medium">AI-Assisted Prototyping</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Education Card & GPA Metric */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
          >
            {/* Education Main Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Higher Education</span>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {personalInfo.university}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Major:</span>
                  <span className="text-white font-medium">{personalInfo.major}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Expected Graduation:</span>
                  <span className="text-emerald-400 font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
                    {personalInfo.expectedGraduation}
                  </span>
                </div>
              </div>

              {/* GPA Feature Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-mono text-gray-400">Cumulative GPA</p>
                  <p className="text-2xl font-extrabold text-white tracking-tight">
                    {personalInfo.gpa}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Goal Card */}
            <div className="glass-card rounded-2xl p-6 border-white/10 bg-gradient-to-br from-[#0c1322] to-[#090d16] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                <Sparkles className="w-4 h-4" />
                <span>CAREER GOAL</span>
              </div>
              <p className="text-sm text-gray-200 font-medium leading-relaxed">
                To join a high-impact product team as a Software Engineer, scaling web platforms and AI capabilities for real-world user problems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

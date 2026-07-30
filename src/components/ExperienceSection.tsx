import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient-emerald">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
            Evaluating AI systems, fine-tuning multilingual prompt benchmarks, and RLHF workflows.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border-white/10 relative overflow-hidden space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                    {exp.type}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    {exp.role}
                    <span className="text-gray-400 font-normal text-lg">@ {exp.company}</span>
                  </h3>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                  {exp.period}
                </span>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  Key Responsibilities & Achievements
                </h4>
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Tags */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-gray-400 mr-2">Skills Applied:</span>
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

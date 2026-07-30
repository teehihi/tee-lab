import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Lightbulb, Quote, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const LearningPhilosophy: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: What I'm Learning */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 glass-card rounded-3xl p-8 border-white/10 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono">
                <Compass className="w-3.5 h-3.5" />
                <span>CONTINUOUS GROWTH</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What I'm Currently <span className="text-gradient-emerald">Exploring</span>
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Staying at the forefront of modern software engineering by diving into emerging paradigms in autonomous AI systems, LLM orchestration, and distributed cloud computing.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {personalInfo.learningTopics.map((topic, idx) => (
                  <div
                    key={topic}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium hover:bg-emerald-500/10 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-gray-400 font-mono">
              Always expanding technical horizon through hands-on building.
            </div>
          </motion.div>

          {/* Right: Engineering Philosophy Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 glass-card rounded-3xl p-8 border-emerald-500/30 bg-gradient-to-br from-[#0c1626] to-[#080d17] space-y-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Quote className="w-6 h-6" />
              </div>

              <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Engineering Philosophy
              </h3>

              <blockquote className="text-xl sm:text-2xl font-bold text-white leading-relaxed italic tracking-tight">
                "{personalInfo.quote}"
              </blockquote>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
                  NNT
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">{personalInfo.name}</span>
                  <span className="text-[11px] text-gray-400 font-mono">Software Engineer</span>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

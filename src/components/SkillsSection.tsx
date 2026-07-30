import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Code2, Database, Layers, Layout, Server, Sparkles, Terminal, Wrench } from 'lucide-react';
import { skillGroups } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...skillGroups.map((group) => group.category)];

  const filteredGroups =
    activeCategory === 'All'
      ? skillGroups
      : skillGroups.filter((group) => group.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'Frontend':
        return <Layout className="w-4 h-4 text-teal-400" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-cyan-400" />;
      case 'Tools':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'AI & Prompting':
        return <Bot className="w-4 h-4 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient-emerald">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
            Modern stack focused on production-grade full-stack web engineering & AI tool integration.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold scale-105'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-6 space-y-5 border-white/10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {getCategoryIcon(group.category)}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {group.category}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-gray-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
                  {group.skills.length} skills
                </span>
              </div>

              <div className="space-y-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="text-sm text-gray-200 font-medium">{skill.name}</span>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                        skill.level === 'Advanced'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-semibold'
                          : skill.level === 'Proficient'
                          ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                          : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

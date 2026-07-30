import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cloud, GraduationCap, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-emerald-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-teal-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-blue-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="achievements" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key <span className="text-gradient-emerald">Achievements</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
            Hackathons, AI prompt competitions, Cloud & Data certifications, and language proficiency.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.title + item.event}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-6 border-white/10 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    {getAchievementIcon(item.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                    {item.event} • {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-xs leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>Verified Credential</span>
                <span>✓</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, Download, ExternalLink, GraduationCap, Mail, MapPin, Phone, Sparkles, X } from 'lucide-react';
import { achievementsData, experienceData, personalInfo, skillGroups } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0b101d] border border-white/15 rounded-3xl w-full max-w-4xl my-auto overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="bg-[#070b14] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>CURRICULUM VITAE</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#090d16] text-gray-200 font-sans">
            {/* Personal Header */}
            <div className="border-b border-white/10 pb-6 space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{personalInfo.name}</h1>
              <p className="text-emerald-400 font-mono text-sm font-semibold">{personalInfo.title}</p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {personalInfo.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  {personalInfo.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {personalInfo.phone}
                </span>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h2>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex justify-between items-center text-sm font-bold text-white">
                  <span>{personalInfo.university}</span>
                  <span className="text-emerald-400 font-mono text-xs">Expected {personalInfo.expectedGraduation}</span>
                </div>
                <p className="text-xs text-gray-300">Major: {personalInfo.major} • GPA: {personalInfo.gpa}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider text-emerald-400">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {skillGroups.map((group) => (
                  <div key={group.category} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="font-mono text-emerald-400 font-bold block">{group.category}</span>
                    <span className="text-gray-300">{group.skills.map((s) => s.name).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-emerald-400">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </h2>
              {experienceData.map((exp) => (
                <div key={exp.company} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{exp.role} @ {exp.company}</span>
                    <span className="text-xs font-mono text-emerald-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Honors & Certifications</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {achievementsData.map((ach) => (
                  <div key={ach.title + ach.event} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block">{ach.title} ({ach.year})</span>
                    <span className="text-emerald-400 font-mono text-[11px] block">{ach.event}</span>
                    <span className="text-gray-400 text-[11px]">{ach.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

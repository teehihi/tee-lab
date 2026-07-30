import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Code2, Download, FileText, Mail, MapPin, Sparkles, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'ai'>('profile');

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineer & AI Roles</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-gray-400 font-mono text-sm tracking-wide">Hi, I'm</p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                <span className="block">{personalInfo.name}</span>
                <span className="block text-gradient-emerald mt-1">Software Engineer</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
              Building <span className="text-white font-medium underline decoration-emerald-500/50 underline-offset-4">AI-powered products</span> for real users. Specializing in Full-Stack web architecture, Computer Vision, and RAG applications.
            </p>

            {/* Location & Uni badge */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 pt-1">
              <span className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                HCMUTE Senior (GPA {personalInfo.gpa})
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 text-gray-200 hover:text-white font-medium text-sm transition-all hover:bg-white/10"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </a>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-teal-400 hover:border-emerald-500/40 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive SaaS Terminal Code Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-2xl p-5 border border-white/10 shadow-2xl relative group">
              {/* Decorative Window Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-gray-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    developer-profile.ts
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'profile' ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'stack' ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    TechStack
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'ai' ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    AI Integrations
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="font-mono text-xs leading-relaxed space-y-2 text-gray-300 bg-[#050811]/90 p-4 rounded-xl border border-white/5 overflow-x-auto">
                {activeTab === 'profile' && (
                  <>
                    <div><span className="text-purple-400">const</span> <span className="text-yellow-300">engineer</span> = &#123;</div>
                    <div className="pl-4"><span className="text-emerald-400">name</span>: <span className="text-teal-300">"Nguyen Nhat Thien"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">role</span>: <span className="text-teal-300">"Full-Stack & AI Developer"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">university</span>: <span className="text-teal-300">"HCMUTE (GPA: 3.24/4.0)"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">mindset</span>: <span className="text-teal-300">"Building real products &gt; just assignments"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">keyProjects</span>: [<span className="text-teal-300">"PhoenixVision"</span>, <span className="text-teal-300">"UniQuizz"</span>, <span className="text-teal-300">"XeNow"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-400">experience</span>: <span className="text-teal-300">"Outlier (AI Evaluator & RLHF)"</span></div>
                    <div>&#125;;</div>
                  </>
                )}

                {activeTab === 'stack' && (
                  <>
                    <div><span className="text-purple-400">const</span> <span className="text-yellow-300">techStack</span> = &#123;</div>
                    <div className="pl-4"><span className="text-emerald-400">languages</span>: [<span className="text-teal-300">"TypeScript"</span>, <span className="text-teal-300">"JavaScript"</span>, <span className="text-teal-300">"Python"</span>, <span className="text-teal-300">"Java"</span>, <span className="text-teal-300">"SQL"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-400">frontend</span>: [<span className="text-teal-300">"React"</span>, <span className="text-teal-300">"Tailwind CSS"</span>, <span className="text-teal-300">"Vite"</span>, <span className="text-teal-300">"Framer Motion"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-400">backend</span>: [<span className="text-teal-300">"Node.js"</span>, <span className="text-teal-300">"Express"</span>, <span className="text-teal-300">"FastAPI"</span>, <span className="text-teal-300">"Spring Boot"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-400">databases</span>: [<span className="text-teal-300">"MongoDB"</span>, <span className="text-teal-300">"MySQL"</span>, <span className="text-teal-300">"SQL Server"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-400">tools</span>: [<span className="text-teal-300">"Git"</span>, <span className="text-teal-300">"Electron"</span>, <span className="text-teal-300">"Postman"</span>, <span className="text-teal-300">"Vercel"</span>]</div>
                    <div>&#125;;</div>
                  </>
                )}

                {activeTab === 'ai' && (
                  <>
                    <div><span className="text-purple-400">async function</span> <span className="text-yellow-300">aiWorkflow</span>() &#123;</div>
                    <div className="pl-4 text-gray-500">// Modern AI Tooling & RAG Pipelines</div>
                    <div className="pl-4"><span className="text-purple-400">const</span> tools = [<span className="text-teal-300">"Gemini API"</span>, <span className="text-teal-300">"OpenAI Codex"</span>, <span className="text-teal-300">"Kiro"</span>];</div>
                    <div className="pl-4"><span className="text-purple-400">const</span> features = [<span className="text-teal-300">"RAG Vector Search"</span>, <span className="text-teal-300">"YOLO Object Detection"</span>, <span className="text-teal-300">"Prompt Design"</span>];</div>
                    <div className="pl-4"><span className="text-purple-400">return</span> &#123; productivityMultiplier: <span className="text-emerald-400">"10x"</span>, rapidPrototyping: <span className="text-emerald-400">true</span> &#125;;</div>
                    <div>&#125;</div>
                  </>
                )}
              </div>

              {/* Terminal Footer Metrics */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Status: 200 OK
                </span>
                <span>Location: Thu Duc, HCMC</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

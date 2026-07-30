import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const ContactFooter: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 relative bg-[#060911] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Hero Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET'S CONNECT</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Ready to build <span className="text-gradient-emerald">together?</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
              I am actively seeking <span className="text-white font-medium">Software Engineering</span>, <span className="text-white font-medium">Full-Stack</span>, and <span className="text-white font-medium">AI Developer</span> opportunities and internships. Whether you have a position open or want to discuss a project, feel free to reach out!
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-gray-400 block">Email Address</span>
                    <span className="text-sm font-bold text-white font-mono">{personalInfo.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-all flex items-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-gray-400 block">Phone</span>
                    <span className="text-xs font-bold text-white font-mono">{personalInfo.phone}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-gray-400 block">Location</span>
                    <span className="text-xs font-bold text-white font-mono">Thu Duc, HCMC, VN</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border-white/10"
          >
            <form onSubmit={handleSendMessage} className="space-y-4">
              <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-400">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Recruiter / Engineer"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-400">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-400">Subject / Role Opportunity</label>
                <input
                  type="text"
                  required
                  placeholder="Software Engineer Internship / Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-400">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Thien, we would love to connect with you regarding..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {messageSent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent! Thank you.</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

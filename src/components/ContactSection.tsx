import React, { useState } from "react";
import { Mail, Phone, GraduationCap, Copy, Check, Globe } from "lucide-react";
import { Card, SectionHeader } from "./ui";

function Github({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Scannable SVG QR paths generated for GitHub and LinkedIn URLs
const GITHUB_QR_PATH = "M2 2h7M12 2h4M18 2h4M24 2h7M2 3h1M8 3h1M12 3h2M15 3h3M19 3h1M22 3h1M24 3h1M30 3h1M2 4h1M4 4h3M8 4h1M15 4h1M18 4h3M22 4h1M24 4h1M26 4h3M30 4h1M2 5h1M4 5h3M8 5h1M11 5h2M14 5h4M20 5h2M24 5h1M26 5h3M30 5h1M2 6h1M4 6h3M8 6h1M11 6h1M14 6h3M18 6h3M24 6h1M26 6h3M30 6h1M2 7h1M8 7h1M10 7h3M14 7h3M21 7h1M24 7h1M30 7h1M2 8h7M10 8h1M12 8h1M14 8h1M16 8h1M18 8h1M20 8h1M22 8h1M24 8h7M12 9h1M14 9h1M16 9h1M19 9h2M22 9h1M2 10h1M5 10h1M7 10h2M10 10h2M14 10h1M17 10h1M23 10h1M25 10h1M2 11h2M5 11h1M7 11h1M9 11h1M13 11h2M16 11h2M22 11h1M24 11h1M27 11h1M30 11h1M2 12h8M12 12h1M14 12h1M18 12h1M20 12h4M26 12h4M2 13h3M10 13h2M14 13h1M16 13h2M21 13h1M26 13h1M28 13h2M2 14h1M5 14h4M12 14h1M14 14h1M18 14h2M23 14h2M27 14h1M29 14h2M3 15h4M10 15h3M17 15h1M21 15h3M4 16h2M8 16h2M12 16h3M17 16h4M22 16h1M24 16h7M3 17h2M6 17h2M10 17h7M18 17h3M22 17h3M27 17h1M29 17h1M4 18h1M6 18h1M8 18h2M12 18h1M15 18h4M20 18h1M22 18h1M25 18h1M29 18h1M3 19h2M6 19h2M10 19h1M13 19h1M17 19h1M19 19h1M22 19h4M27 19h1M30 19h1M2 20h1M4 20h1M6 20h3M10 20h3M14 20h2M19 20h1M23 20h1M25 20h2M29 20h2M4 21h1M10 21h6M17 21h2M22 21h2M25 21h2M29 21h2M2 22h1M4 22h1M6 22h1M8 22h1M12 22h3M16 22h1M18 22h2M21 22h6M28 22h1M10 23h2M14 23h2M17 23h3M21 23h2M26 23h1M28 23h3M2 24h7M13 24h1M15 24h3M20 24h1M22 24h1M24 24h1M26 24h1M29 24h1M2 25h1M8 25h1M10 25h4M15 25h1M18 25h1M20 25h1M22 25h1M26 25h5M2 26h1M4 26h3M8 26h1M13 26h1M16 26h2M20 26h1M22 26h5M2 27h1M4 27h3M8 27h1M10 27h3M16 27h3M20 27h3M24 27h5M30 27h1M2 28h1M4 28h3M8 28h1M11 28h1M21 28h2M26 28h3M30 28h1M2 29h1M8 29h1M12 29h3M16 29h2M21 29h3M26 29h1M29 29h1M2 30h7M10 30h5M22 30h6M29 30h1";

const LINKEDIN_QR_PATH = "M2 2h7M14 2h2M18 2h4M24 2h7M2 3h1M8 3h1M13 3h5M20 3h1M22 3h1M24 3h1M30 3h1M2 4h1M4 4h3M8 4h1M12 4h1M15 4h1M18 4h2M21 4h1M24 4h1M26 4h3M30 4h1M2 5h1M4 5h3M8 5h1M11 5h1M13 5h1M15 5h3M20 5h2M24 5h1M26 5h3M30 5h1M2 6h1M4 6h3M8 6h1M11 6h2M14 6h3M18 6h3M24 6h1M26 6h3M30 6h1M2 7h1M8 7h1M10 7h1M12 7h1M15 7h2M20 7h3M24 7h1M30 7h1M2 8h7M10 8h1M12 8h1M14 8h1M16 8h1M18 8h1M20 8h1M22 8h1M24 8h7M13 9h2M16 9h1M19 9h4M2 10h1M5 10h1M7 10h2M10 10h4M17 10h2M20 10h2M23 10h1M25 10h1M5 11h1M10 11h1M13 11h1M16 11h2M23 11h2M27 11h1M30 11h1M2 12h1M4 12h3M8 12h1M11 12h2M18 12h2M21 12h4M27 12h3M2 13h2M7 13h1M10 13h1M12 13h2M16 13h1M18 13h1M20 13h1M23 13h1M25 13h2M28 13h2M3 14h1M6 14h1M8 14h1M11 14h1M13 14h1M17 14h3M21 14h4M27 14h1M29 14h2M2 15h1M4 15h2M13 15h2M18 15h1M21 15h3M25 15h1M2 16h2M5 16h1M7 16h2M10 16h1M14 16h1M19 16h2M22 16h1M27 16h4M3 17h2M10 17h2M13 17h1M15 17h3M19 17h3M27 17h1M29 17h1M3 18h1M5 18h1M8 18h3M12 18h1M14 18h3M18 18h2M22 18h2M25 18h1M29 18h1M4 19h2M7 19h1M9 19h1M12 19h2M19 19h1M23 19h3M27 19h1M30 19h1M2 20h1M4 20h2M7 20h3M11 20h1M13 20h1M15 20h1M18 20h2M22 20h2M25 20h1M29 20h2M4 21h1M6 21h2M10 21h3M15 21h1M18 21h2M22 21h2M29 21h2M2 22h1M5 22h2M8 22h2M11 22h3M16 22h1M20 22h1M22 22h5M28 22h1M10 23h1M13 23h1M15 23h1M21 23h2M26 23h1M28 23h3M2 24h7M11 24h1M14 24h3M18 24h2M22 24h1M24 24h1M26 24h1M29 24h1M2 25h1M8 25h1M10 25h2M13 25h3M17 25h2M20 25h1M22 25h1M26 25h5M2 26h1M4 26h3M8 26h1M13 26h2M16 26h1M18 26h2M22 26h5M30 26h1M2 27h1M4 27h3M8 27h1M10 27h1M13 27h1M16 27h1M19 27h3M24 27h1M26 27h4M2 28h1M4 28h3M8 28h1M11 28h1M13 28h3M19 28h1M21 28h1M26 28h3M30 28h1M2 29h1M8 29h1M14 29h6M21 29h4M26 29h1M29 29h1M2 30h7M10 30h1M12 30h1M19 30h1M22 30h5M29 30h1";

interface ContactSectionProps {
  personalInfo: {
    email: string;
    phone: string;
    school: string;
    github: string;
    linkedin: string;
  };
}

export function ContactSection({ personalInfo }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-24 pt-10 sm:pt-14 pb-16 relative z-30">
      <style>{`
        .qr-card-hover {
          width: 185px;
          height: 185px;
          background: #14161f;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1.25rem;
          padding: 0.75rem;
          position: relative;
          z-index: 30;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .qr-card-hover:hover {
          cursor: none;
          background: #ffffff;
          border-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5);
          transform: translateY(-3px);
          z-index: 40;
        }

        .qr-card-hover svg.qr-svg path {
          transition: opacity 300ms ease;
          stroke: #000000;
          opacity: 0;
        }

        .qr-card-hover:hover svg.qr-svg path {
          opacity: 1;
        }

        .qr-card-hover .prompt-info {
          position: absolute;
          inset: 0;
          color: #ffffff;
          text-align: center;
          transition: opacity 300ms ease;
          opacity: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: #14161f;
          border-radius: 1.25rem;
        }

        .qr-card-hover:hover .prompt-info {
          opacity: 0;
          pointer-events: none;
        }

        .static-token-container {
          margin-bottom: 10px;
        }

        .blurry-splash-bg {
          position: absolute;
          inset: 0;
          width: 60px;
          height: 60px;
          margin: 0 auto;
          border-radius: 50%;
          z-index: 0;
          opacity: 40%;
          filter: blur(18px);
        }

        .really-small-text-hint {
          text-align: center;
          width: 100%;
          font-size: 10.5px;
          margin-top: 5px;
          opacity: 0.75;
          font-family: monospace;
          color: #94a3b8;
        }
      `}</style>

      <SectionHeader
        eyebrow="GET IN TOUCH"
        title="Let's Build Something Together"
        description="Open for software engineering opportunities, AI projects, and technical collaborations."
      />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Contact Details Card */}
        <Card
          className="p-6 sm:p-8 border border-white/20 bg-slate-950/40 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col justify-between gap-8 relative overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 11, 18, 0.45), rgba(10, 11, 18, 0.82)), url('/bgintro.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white tracking-tight">Contact Details</h3>

            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <Mail className="w-6 h-6 text-emerald-400 block shrink-0 transition-all group-hover:text-emerald-300 group-hover:scale-110" />
                <span className="text-sm sm:text-base font-mono text-gray-200 leading-none tracking-wide select-all transition-colors group-hover:text-white">
                  {personalInfo.email}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <Phone className="w-6 h-6 text-emerald-400 block shrink-0 transition-all group-hover:text-emerald-300 group-hover:scale-110" />
                <span className="text-sm sm:text-base font-mono text-gray-200 leading-none tracking-wide transition-colors group-hover:text-white">
                  {personalInfo.phone}
                </span>
              </div>

              {/* School */}
              <div className="flex items-center gap-4 group">
                <GraduationCap className="w-6 h-6 text-emerald-400 block shrink-0 transition-all group-hover:text-emerald-300 group-hover:scale-110" />
                <span className="text-sm sm:text-base font-mono text-gray-200 leading-none tracking-wide transition-colors group-hover:text-white">
                  {personalInfo.school}
                </span>
              </div>

              {/* Website */}
              <div className="flex items-center gap-4 group">
                <Globe className="w-6 h-6 text-emerald-400 block shrink-0 transition-all group-hover:text-emerald-300 group-hover:scale-110" />
                <a
                  href="https://nteelab.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm sm:text-base font-mono text-gray-200 leading-none tracking-wide transition-colors group-hover:text-emerald-300 underline decoration-emerald-500/30 underline-offset-4"
                >
                  https://nteelab.vercel.app
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs sm:text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 shrink-0 block" /> : <Copy className="h-4 w-4 shrink-0 block" />}
              <span>{copied ? "Email Copied!" : "Copy Email"}</span>
            </button>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl border border-white/15 bg-white/5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 hover:border-emerald-500/40 transition-all active:scale-95"
            >
              <span>Send Direct Email</span>
            </a>
          </div>
        </Card>

        {/* Connect Online Card */}
        <Card
          className="p-6 sm:p-8 border border-white/20 bg-slate-950/40 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col justify-between gap-6 relative overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 11, 18, 0.45), rgba(10, 11, 18, 0.82)), url('/bgintro.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Connect Online</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Explore my work and professional profile.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-around gap-5 pt-1 pb-2">
            {/* GitHub QR Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub Profile - Scan QR or Click"
              className="qr-card-hover group"
            >
              <svg className="qr-svg w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 33 33" shapeRendering="crispEdges">
                <path d={GITHUB_QR_PATH} />
              </svg>
              <div className="prompt-info">
                <div className="static-token-container relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img src="/github-logo.webp" alt="GitHub Logo" className="w-11 h-11 object-contain drop-shadow-md" />
                  </div>
                </div>
                <div className="blurry-splash-bg" style={{ background: "linear-gradient(120deg, #10b981, #059669, #00ddeb)" }} />
                <p className="text-xs font-bold text-slate-100 leading-tight relative z-10">
                  <span className="font-extrabold text-emerald-400 text-sm">GitHub</span>
                </p>
                <p className="really-small-text-hint relative z-10">Source Code & Projects</p>
              </div>
            </a>

            {/* LinkedIn QR Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile - Scan QR or Click"
              className="qr-card-hover group"
            >
              <svg className="qr-svg w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 33 33" shapeRendering="crispEdges">
                <path d={LINKEDIN_QR_PATH} />
              </svg>
              <div className="prompt-info">
                <div className="static-token-container relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img src="/linkedin.webp" alt="LinkedIn Logo" className="w-11 h-11 object-contain drop-shadow-md" />
                  </div>
                </div>
                <div className="blurry-splash-bg" style={{ background: "linear-gradient(120deg, #0077b5, #00a0dc, #38bdf8)" }} />
                <p className="text-xs font-bold text-slate-100 leading-tight relative z-10">
                  <span className="font-extrabold text-sky-400 text-sm">LinkedIn</span>
                </p>
                <p className="really-small-text-hint relative z-10">Professional Network</p>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}

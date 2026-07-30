import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bot,
  Briefcase,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink as ExternalIcon,
  FileText,
  Flame,
  FolderGit2,
  GraduationCap,
  Layers,
  Layout,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import {
  achievementsData,
  experienceData,
  featuredProjects,
  personalInfo,
  secondaryProjects,
  skillGroups,
} from "./data/portfolioData";
import { FeaturedProject } from "./types/portfolio";
import {
  InteractiveGrid,
  MouseGlow,
  ScrollProgress,
  ShimmerText,
  ThemeToggle,
} from "./components/effects";
import { Badge, Button, Card, SectionHeader, Stat } from "./components/ui";
import { ProjectCaseStudyModal } from "./components/ProjectCaseStudyModal";
import { ResumeModal } from "./components/ResumeModal";
import { GithubIcon, LinkedinIcon } from "./components/SocialIcons";

const navItems = [
  ["about", "About"],
  ["skills", "Skills"],
  ["showcase", "Projects"],
  ["experience", "Experience"],
  ["achievements", "Honors"],
  ["contact", "Contact"],
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-emerald-400 font-mono transition-colors"
    >
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

export function App() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "stack" | "ai">("profile");

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

  return (
    <main className="min-h-screen bg-[#070b14] text-gray-100 selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Grid Background */}
      <InteractiveGrid />

      {/* Mouse Glow */}
      <MouseGlow />

      {/* Sticky SaaS Navbar */}
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-[#090d16]/80 backdrop-blur-xl shadow-2xl">
        <a href="#about" className="font-bold text-xs font-mono px-3 py-1 text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          NNT
        </a>

        <div className="hidden sm:flex items-center gap-1">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-3 py-1 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <button
            onClick={() => setResumeOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Resume</span>
          </button>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-24 relative z-10">
        
        {/* HERO SECTION */}
        <section id="about" className="scroll-mt-32 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Bio & Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Software Engineer | Full-Stack & AI Developer</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-gradient-emerald">
                  Building AI-powered software for real users.
                </p>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Final-year Information Technology student at <strong>HCMUTE</strong> (GPA 3.24 / 4.00). Specialized in production full-stack web architecture, Computer Vision (YOLOv8), and Retrieval-Augmented Generation (RAG).
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <Stat value="3.24" label="HCMUTE GPA" />
                <Stat value="500+" label="AI Questions Generated" />
                <Stat value="2027" label="Expected Grad" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button as="a" href="#showcase" variant="primary">
                  <span>Explore Case Studies</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button onClick={() => setResumeOpen(true)} variant="outline">
                  <FileText className="h-4 w-4" />
                  <span>View Resume</span>
                </Button>

                <div className="flex items-center gap-2 pl-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-emerald-500/40 transition-colors"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-emerald-500/40 transition-colors"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Terminal Console Card */}
            <div className="lg:col-span-5">
              <Card className="p-5 border-white/15 bg-[#090d16]/90 shadow-2xl relative">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="font-mono text-xs text-gray-400 ml-1 flex items-center gap-1">
                      <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                      developer.ts
                    </span>
                  </div>

                  <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                    {(["profile", "stack", "ai"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition-colors ${
                          activeTab === tab ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Console Snippets */}
                <div className="font-mono text-xs leading-relaxed space-y-1.5 text-gray-300 bg-[#040710] p-4 rounded-xl border border-white/5 overflow-x-auto">
                  {activeTab === "profile" && (
                    <>
                      <div><span className="text-purple-400">const</span> <span className="text-yellow-300">engineer</span> = &#123;</div>
                      <div className="pl-4"><span className="text-emerald-400">name</span>: <span className="text-teal-300">"Nguyen Nhat Thien"</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">role</span>: <span className="text-teal-300">"Software Engineer"</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">university</span>: <span className="text-teal-300">"HCMUTE (3.24 GPA)"</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">focus</span>: [<span className="text-teal-300">"Full-Stack"</span>, <span className="text-teal-300">"AI"</span>, <span className="text-teal-300">"Vision"</span>],</div>
                      <div className="pl-4"><span className="text-emerald-400">experience</span>: <span className="text-teal-300">"Outlier AI Quality Evaluator"</span></div>
                      <div>&#125;;</div>
                    </>
                  )}

                  {activeTab === "stack" && (
                    <>
                      <div><span className="text-purple-400">const</span> <span className="text-yellow-300">techStack</span> = &#123;</div>
                      <div className="pl-4"><span className="text-emerald-400">languages</span>: [<span className="text-teal-300">"TS"</span>, <span className="text-teal-300">"JS"</span>, <span className="text-teal-300">"Python"</span>, <span className="text-teal-300">"Java"</span>, <span className="text-teal-300">"SQL"</span>],</div>
                      <div className="pl-4"><span className="text-emerald-400">frontend</span>: [<span className="text-teal-300">"React"</span>, <span className="text-teal-300">"Tailwind"</span>, <span className="text-teal-300">"Vite"</span>],</div>
                      <div className="pl-4"><span className="text-emerald-400">backend</span>: [<span className="text-teal-300">"Node"</span>, <span className="text-teal-300">"FastAPI"</span>, <span className="text-teal-300">"Spring Boot"</span>],</div>
                      <div className="pl-4"><span className="text-emerald-400">databases</span>: [<span className="text-teal-300">"MongoDB"</span>, <span className="text-teal-300">"MySQL"</span>]</div>
                      <div>&#125;;</div>
                    </>
                  )}

                  {activeTab === "ai" && (
                    <>
                      <div><span className="text-purple-400">async function</span> <span className="text-yellow-300">aiCapabilities</span>() &#123;</div>
                      <div className="pl-4"><span className="text-purple-400">return</span> &#123;</div>
                      <div className="pl-8"><span className="text-emerald-400">ragPipeline</span>: <span className="text-teal-300">"Gemini 1.5 Flash + Vector Search"</span>,</div>
                      <div className="pl-8"><span className="text-emerald-400">computerVision</span>: <span className="text-teal-300">"YOLOv8 + OpenCV Fire Detection"</span>,</div>
                      <div className="pl-8"><span className="text-emerald-400">tools</span>: [<span className="text-teal-300">"OpenAI Codex"</span>, <span className="text-teal-300">"Kiro"</span>]</div>
                      <div className="pl-4">&#125;;</div>
                      <div>&#125;</div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeader
            eyebrow="Capabilities"
            title="Technical Skills & Stack"
            description="Production-tested technologies across frontend, backend, databases, and AI frameworks."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <Card key={group.category} className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-white text-base">{group.category}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">{group.skills.length} skills</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      className={
                        skill.level === "Advanced"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                          : "bg-white/5 text-gray-300 border-white/10"
                      }
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FEATURED CASE STUDIES SHOWCASE */}
        <section id="showcase" className="scroll-mt-24 space-y-8">
          <SectionHeader
            eyebrow="Case Studies"
            title="Flagship Projects"
            description="Deep-dive engineering case studies. Click any project to open the full technical breakdown modal."
          />

          <div className="space-y-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-emerald-400">{project.category}</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{project.title}</h3>
                    <p className="text-xs font-mono text-gray-400">{project.tagline}</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs px-3 py-1">
                    {project.status}
                  </Badge>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed font-light">{project.summary}</p>

                {/* Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.resultsMetrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                      <strong className="block text-xl font-bold text-white font-mono text-gradient-emerald">
                        {m.value}
                      </strong>
                      <span className="block text-[11px] text-gray-400 font-mono">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.techStack.flatMap((ts) => ts.technologies).map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <Button onClick={() => setSelectedProject(project)} variant="primary">
                    <Sparkles className="h-4 w-4" />
                    <span>Explore Full Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-4">
                    <ExternalLink href={project.githubUrl}>GitHub Repo</ExternalLink>
                    {project.demoUrl && <ExternalLink href={project.demoUrl}>Live Demo</ExternalLink>}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* MORE PROJECTS ARCHIVE */}
          <div className="pt-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-400" />
              <span>More Projects & Hackathon Builds</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryProjects.map((project) => (
                <Card key={project.id} className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono text-gray-400">{project.category}</span>
                      <Badge className={project.status === "Hackathon Winner" ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : ""}>
                        {project.status}
                      </Badge>
                    </div>

                    <h4 className="font-bold text-white text-lg">{project.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">{project.description}</p>

                    <div className="space-y-1 pt-2">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase">Contributions</span>
                      {project.myContributions.map((c, i) => (
                        <p key={i} className="text-[11px] text-gray-400">• {c}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {project.githubUrl && <ExternalLink href={project.githubUrl}>Code</ExternalLink>}
                      {project.demoUrl && <ExternalLink href={project.demoUrl}>Demo</ExternalLink>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="scroll-mt-24 space-y-6">
          <SectionHeader
            eyebrow="Work Experience"
            title="AI Quality Evaluation & Prompt Iteration"
            description="Evaluating machine learning model accuracy, fine-tuning multilingual prompt benchmarks, and RLHF workflows."
          />

          {experienceData.map((exp) => (
            <Card key={exp.company} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role} @ {exp.company}</h3>
                  <p className="text-xs font-mono text-emerald-400">{exp.type} • {exp.period}</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">Active</Badge>
              </div>

              <ul className="space-y-2">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                {exp.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-300">
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </section>

        {/* HONORS & CERTIFICATIONS */}
        <section id="achievements" className="scroll-mt-24 space-y-6">
          <SectionHeader
            eyebrow="Honors & Credentials"
            title="Hackathon Awards & Cloud Certifications"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementsData.map((item) => (
              <Card key={item.title + item.event} className="space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Trophy className="h-5 w-5 text-emerald-400" />
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold">
                      {item.badge}
                    </Badge>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 uppercase">{item.event} • {item.year}</span>
                  <h4 className="font-bold text-white text-base">{item.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY QUOTE CARD */}
        <section className="scroll-mt-24">
          <Card className="p-8 text-center space-y-3 border-emerald-500/30 bg-emerald-950/20">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Engineering Philosophy</span>
            <blockquote className="text-xl sm:text-2xl font-bold text-white italic max-w-2xl mx-auto">
              "{personalInfo.quote}"
            </blockquote>
            <p className="text-xs text-gray-400 font-mono">— {personalInfo.name}</p>
          </Card>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <SectionHeader
            eyebrow="Contact & Collaboration"
            title="Let's build something great"
            description="Looking for Software Engineering, Full-Stack, or AI Developer roles and internships."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="space-y-4">
              <h3 className="text-lg font-bold text-white">Direct Contact</h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold"
                  >
                    {copiedEmail ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Phone className="h-4 w-4 text-teal-400" />
                  <span>{personalInfo.phone}</span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <ExternalLink href={personalInfo.github}>GitHub Profile</ExternalLink>
                <ExternalLink href={personalInfo.linkedin}>LinkedIn Profile</ExternalLink>
              </div>
            </Card>

            <Card className="space-y-3">
              <form onSubmit={handleSendMessage} className="space-y-3">
                <h3 className="text-lg font-bold text-white">Send Message</h3>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Your Message..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
                <Button type="submit" variant="primary" className="w-full">
                  {messageSent ? "Message Sent!" : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>

          <footer className="text-center pt-12 pb-6 border-t border-white/10 text-xs font-mono text-gray-500 space-y-1">
            <p>© {new Date().getFullYear()} {personalInfo.name}. Built with React, TypeScript, & Tailwind CSS.</p>
            <p>{personalInfo.university} • {personalInfo.major}</p>
          </footer>
        </section>

      </div>

      {/* Case Study Modal View */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}

export default App;

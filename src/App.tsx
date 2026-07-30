import React, { useState } from "react";
import {
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
  FileDown,
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
  ClickEffects,
  ElectricBorder,
  FluidGradientText,
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
    <a href={href} target="_blank" rel="noreferrer" className="inline-link">
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

export function App() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
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

  return (
    <main className="page-grid-shell">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Grid Background */}
      <InteractiveGrid
        clickInteraction
        clickForce={0.8}
        cursorTrail
        trailMode="hover"
        trailColor="#10b981"
        hoverColor="#10b981"
        gridSize={58}
        radius={310}
        repulsionStrength={-0.66}
        motionSpeed={0.68}
      />

      {/* Click Audio & Ripple Bloom Effect */}
      <ClickEffects />

      {/* Mouse Radial Glow */}
      <MouseGlow />

      {/* Section Navigation Header */}
      <nav className="section-nav" aria-label="Portfolio navigation">
        <a href="#about" className="nav-signature" aria-label="Back to top">
          NNT
        </a>
        <div className="nav-links">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </button>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon className="h-4 w-4" />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <div className="page-reveal mx-auto flex min-h-screen w-full max-w-5xl flex-col px-3 py-4 text-sm leading-loose sm:px-6 lg:px-8">
        {/* HERO / ABOUT SECTION */}
        <section id="about" className="scroll-mt-24 pt-8">
          <div className="hero-title">
            <FluidGradientText text="NGUYEN NHAT THIEN" />
          </div>

          <div className="intro-grid">
            <ElectricBorder color="#10b981" speed={0.75} chaos={0.08} borderRadius={999} className="hero-orbit-card">
              <div className="profile-avatar">
                <span className="text-xl font-bold text-white">NNT</span>
              </div>
            </ElectricBorder>

            <div className="intro-copy">
              <p className="eyebrow">{personalInfo.title} • {personalInfo.location}</p>
              <h1>
                Building <ShimmerText>AI-powered</ShimmerText> software products for real users.
              </h1>
              <p>
                Senior Information Technology student at <strong>HCMUTE</strong> (GPA {personalInfo.gpa}). Specializing in Full-Stack Web architecture, Computer Vision (YOLO), and RAG AI pipelines.
              </p>
              <div className="stat-strip">
                <Stat value="3.24" label="HCMUTE GPA" />
                <Stat value="500+" label="AI Questions Generated" />
                <Stat value="2027" label="Expected Grad" />
              </div>
              <div className="hero-actions">
                <Button as="a" href="#showcase">
                  <Rocket className="h-4 w-4" />
                  Showcase & Case Studies
                </Button>
                <Button onClick={() => setResumeOpen(true)} variant="outline">
                  <FileText className="h-4 w-4" />
                  View Resume
                </Button>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-[var(--line)] text-gray-300 hover:text-white">
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-[var(--line)] text-gray-300 hover:text-white">
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="content-section">
          <SectionHeader
            eyebrow="Capabilities"
            title="Technical Stack & Expertise"
            description="Modern full-stack web architecture, backend APIs, relational & vector databases, and AI tooling."
          />
          <div className="profile-grid">
            {skillGroups.map((group) => (
              <Card key={group.category} className="profile-card">
                <div className="profile-card-head">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3>{group.category}</h3>
                    <p className="profile-role">{group.skills.length} core technologies</p>
                  </div>
                </div>

                <div className="chip-list mt-4">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={
                        skill.level === "Advanced"
                          ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10 font-bold"
                          : ""
                      }
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS & SHOWCASE */}
        <section id="showcase" className="content-section">
          <SectionHeader
            eyebrow="Case Studies & Products"
            title="Featured Projects"
            description="In-depth engineering breakdown of software built to solve real-world problems. Click any project to open the full interactive Case Study."
          />
          <div className="project-grid featured-grid">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="project-card visual-project featured-project">
                <ElectricBorder color="#10b981" borderRadius={12} className="project-visual-border">
                  <div className="p-6 bg-[#090d16] space-y-4 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                        {project.status}
                      </Badge>
                      <span className="text-xs font-mono text-gray-400">{project.category}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-extrabold text-white">{project.title}</h3>
                      <p className="text-emerald-400 text-xs font-mono">{project.tagline}</p>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-light">{project.summary}</p>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.resultsMetrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="p-2 rounded bg-white/5 border border-white/10">
                          <span className="block text-base font-bold text-white font-mono">{m.value}</span>
                          <span className="block text-[10px] text-gray-400">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ElectricBorder>

                <div className="project-head mt-4">
                  <div>
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <Trophy className="h-5 w-5 text-emerald-400" />
                </div>

                <p className="card-copy">{project.motivation}</p>

                <div className="chip-list">
                  {project.techStack.flatMap((ts) => ts.technologies).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="link-row mt-4 flex items-center justify-between">
                  <Button onClick={() => setSelectedProject(project)}>
                    <Sparkles className="h-4 w-4" />
                    Explore Case Study →
                  </Button>

                  <div className="flex items-center gap-3">
                    <ExternalLink href={project.githubUrl}>GitHub</ExternalLink>
                    {project.demoUrl && <ExternalLink href={project.demoUrl}>Live Demo</ExternalLink>}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* SECONDARY / ARCHIVED PROJECTS */}
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-400" />
              <span>More Projects & Prototypes</span>
            </h3>

            <div className="supporting-projects">
              {secondaryProjects.map((project) => (
                <Card key={project.id} className="project-card">
                  <div className="project-head">
                    <div>
                      <p>{project.category}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <Badge>{project.status}</Badge>
                  </div>
                  <p className="card-copy">{project.description}</p>
                  
                  <div className="note-list project-note-list mt-3">
                    {project.myContributions.map((contrib, idx) => (
                      <p key={idx}>
                        <strong>• {contrib}</strong>
                      </p>
                    ))}
                  </div>

                  <div className="chip-list">
                    {project.techStack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="link-row mt-3">
                    {project.githubUrl && <ExternalLink href={project.githubUrl}>GitHub</ExternalLink>}
                    {project.demoUrl && <ExternalLink href={project.demoUrl}>Demo</ExternalLink>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="content-section">
          <SectionHeader
            eyebrow="Work Experience"
            title="AI Quality Evaluation & Prompt Iteration"
            description="Hands-on experience evaluating machine learning outputs, multilingual prompt tuning, and RLHF workflows."
          />
          <div className="space-y-4">
            {experienceData.map((exp) => (
              <Card key={exp.company} className="profile-card">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role} @ {exp.company}</h3>
                    <p className="text-xs text-emerald-400 font-mono">{exp.type} • {exp.period}</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">Active</Badge>
                </div>

                <div className="note-list project-note-list mt-4">
                  {exp.responsibilities.map((r, i) => (
                    <p key={i}>
                      <span className="text-gray-200">✓ {r}</span>
                    </p>
                  ))}
                </div>

                <div className="chip-list mt-4">
                  {exp.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="content-section">
          <SectionHeader
            eyebrow="Honors & Certifications"
            title="Hackathon Awards & Cloud Badges"
          />
          <div className="strength-grid">
            {achievementsData.map((ach) => (
              <Card key={ach.title + ach.event} className="strength-card">
                <Trophy className="h-5 w-5 text-emerald-400" />
                <h3>{ach.title}</h3>
                <p className="text-xs text-emerald-400 font-mono">{ach.event} ({ach.year})</p>
                <p>{ach.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY QUOTE CARD */}
        <section className="content-section">
          <Card className="p-8 text-center space-y-4 border-emerald-500/30 bg-emerald-950/20">
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Engineering Philosophy</p>
            <blockquote className="text-xl sm:text-2xl font-bold text-white italic">
              "{personalInfo.quote}"
            </blockquote>
            <p className="text-xs text-gray-400 font-mono">— {personalInfo.name}</p>
          </Card>
        </section>

        {/* CONTACT & FOOTER SECTION */}
        <section id="contact" className="content-section pb-12">
          <SectionHeader
            eyebrow="Contact & Collaboration"
            title="Let's build together"
            description="Available for Software Engineer, Full-Stack, and AI Developer opportunities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Direct Contact</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px]"
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

              <div className="flex gap-3 pt-2">
                <ExternalLink href={personalInfo.github}>GitHub</ExternalLink>
                <ExternalLink href={personalInfo.linkedin}>LinkedIn</ExternalLink>
              </div>
            </Card>

            <Card className="p-6">
              <form onSubmit={handleSendMessage} className="space-y-3">
                <h3 className="text-lg font-bold text-white">Send Message</h3>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Your Message..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
                <Button type="submit" className="w-full">
                  {messageSent ? "Message Sent!" : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>

          <footer className="footer-note mt-12">
            <p>Built with care by {personalInfo.name}.</p>
            <p>© {new Date().getFullYear()} {personalInfo.name} • {personalInfo.university}</p>
          </footer>
        </section>
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume View Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}

export default App;

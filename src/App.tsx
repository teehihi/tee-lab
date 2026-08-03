import React, { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Briefcase,
  Code2,
  Cpu,
  FileDown,
  GraduationCap,
  Mail,
  Phone,
  Puzzle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Check,
  Copy,
  ExternalLink as ExternalIcon
} from "lucide-react";
import {
  ClickEffects,
  ElectricBorder,
  FluidGradientText,
  InteractiveGrid,
  ScrollProgress,
  ShimmerText,
  ThemeToggle,
} from "./components/effects";
import { Button, Card, SectionHeader, Stat } from "./components/ui";
import { Macbook3DModel } from "./components/Macbook3DModel";

function Github({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function Linkedin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const personalInfo = {
  name: "Nguyen Nhat Thien",
  alias: "Tee",
  title: "Software Engineer | Full-Stack Developer",
  location: "Thu Duc, Ho Chi Minh City, Vietnam",
  email: "teeforwork21@gmail.com",
  phone: "(+84) 389 037 546",
  gpa: "3.24 / 4.00",
  school: "HCMUTE - Information Technology",
  expectedGrad: "2027",
  github: "https://github.com/teehihi",
  linkedin: "https://www.linkedin.com/in/tee21/",
  tagline: "Building AI-powered software products for real users.",
};

const projects = [
  {
    id: "maze",
    title: "ChayNgayDi MazeHunter",
    subtitle: "Core game project / pathfinding puzzle",
    variant: "maze",
    featured: true,
    tags: ["Pygame", "Pathfinding", "Pixel art", "Maze logic"],
    description:
      "A pixel-art maze game with pathfinding logic, animated characters, collectible objectives, and multiple environment styles. This is the clearest proof of puzzle/gameplay thinking.",
    links: [
      { label: "GitHub", href: "https://github.com/teehihi/ChayNgayDi_MazeHunter" }
    ],
  },
  {
    id: "apex",
    title: "APEX-CHAOS",
    subtitle: "Core game project / 1v1 autobattler",
    variant: "apex",
    featured: true,
    tags: ["React", "Vite", "Canvas", "Co-developed", "Combat balance"],
    description:
      "A co-developed browser autobattler with combat rules, eight distinct champions, fighter selection UI, animated asset sets, and a production loop shaped through GDDs, Codex specs, playtesting, and balance tuning. Deployed on Vercel.",
    links: [
      { label: "Live demo", href: "https://apexchaos.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Khanh-glitch/APEX-CHAOS" },
    ],
  },
  {
    id: "daiduongsanca",
    title: "Đại Dương Săn Cá",
    subtitle: "Core game project / browser arcade fish shooter",
    variant: "daiduongsanca",
    featured: true,
    tags: ["HTML5 Canvas", "Vanilla JS", "Arcade Shooter", "Collision Physics"],
    description:
      "A browser arcade-style fish shooting game featuring multiple fish types, smooth bullet physics, dynamic scoring, audio effects, and responsive controls. Built with canvas and vanilla Javascript.",
    links: [
      { label: "Live demo", href: "https://daiduongsanca.vercel.app/" },
      { label: "GitHub", href: "https://github.com/teehihi/dai-duong-san-ca" },
    ],
  },
  {
    id: "uniquizz",
    title: "UniQuizz",
    subtitle: "Supporting project / battle quiz + Qbit wardrobe",
    variant: "uniquizz",
    featured: false,
    tags: ["React", "NodeJS", "MongoDB", "Socket room", "Avatar system"],
    description:
      "A quiz platform with multiplayer rooms, answer flow, generated learning content, and a polished Qbit dressing system for the battle room.",
    links: [
      { label: "Live demo", href: "https://uniquizzdom.vercel.app/" },
      { label: "Frontend", href: "https://github.com/teehihi/UniQuizzFE" },
    ],
  },
  {
    id: "xenow",
    title: "XeNow",
    subtitle: "Supporting project / full-stack delivery",
    variant: "xenow",
    featured: false,
    tags: ["React", "NodeJS", "REST API", "MySQL", "Booking flow"],
    description:
      "A full-stack vehicle rental product showing auth, search, booking, upload, API integration, loading/error states, data models, and deployment discipline.",
    links: [
      { label: "Live demo", href: "https://xenow.vercel.app/" },
      { label: "GitHub", href: "https://github.com/teehihi/xe-now-ui" },
    ],
  },
  {
    id: "phoenixvision",
    title: "PhoenixVision AI",
    subtitle: "Computer Vision & Defect Detection",
    variant: "archaeologist",
    featured: false,
    tags: ["Python", "YOLOv11", "PyTorch", "FastAPI", "React"],
    description:
      "Real-time industrial anomaly detection system powered by YOLOv11 and PyTorch, featuring web dashboard monitoring, edge deployment support, and instant quality inspection reports.",
    links: [
      { label: "GitHub Repo", href: "https://github.com/teehihi" }
    ],
  },
];

const strengths = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    body: "Building scalable web applications with React, TypeScript, Node.js, FastAPI, RESTful APIs, and modern database architectures.",
  },
  {
    icon: Bot,
    title: "AI & Computer Vision",
    body: "Developing intelligent applications with YOLOv11, Retrieval-Augmented Generation (RAG), OCR, and AI-powered automation.",
  },
  {
    icon: Puzzle,
    title: "Product & Interactive Systems",
    body: "Creating engaging user experiences through real-time systems, game mechanics, Canvas rendering, and responsive interfaces.",
  },
  {
    icon: ShieldCheck,
    title: "Software Engineering",
    body: "Writing clean, maintainable code with Git, testing, debugging, performance optimization, and scalable software design.",
  },
];

const navItems = [
  ["about", "About Me"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["honors", "My Achievements"],
  ["contact", "Contact"],
];

const mazeDemoGifs = [
  {
    label: "Hunter chase",
    src: "https://media4.giphy.com/media/AoliG8SixDEgCZe3Hi/giphy.gif",
  },
  {
    label: "Gameplay",
    src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGQ3NjU3dHplYWlxcTV1ZGw0aDYzdzUxZXVseHE3bGhweTVhMG1tdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CTF3ctDQNVei069FBQ/giphy.gif",
  },
  {
    label: "Quiz gate",
    src: "https://media4.giphy.com/media/r5CpASYBt3VdaFHhLM/giphy.gif",
  },
  {
    label: "AI path",
    src: "https://media3.giphy.com/media/1WuKxMJwcY1Gecpo08/giphy.gif",
  },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-link">
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

function ProfileAvatar() {
  return (
    <div className="profile-avatar" aria-hidden="true">
      <img src="/team/tee.webp" alt="Nguyen Nhat Thien" onError={(e) => {
        (e.target as HTMLElement).style.display = 'none';
      }} />
      <span>NNT</span>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Card className={`project-card ${project.featured ? "featured" : ""}`}>
      <div className="project-head">
        <div>
          <span className="project-subtitle">{project.subtitle}</span>
          <h3>{project.title}</h3>
        </div>
      </div>
      <p className="project-description">{project.description}</p>
      <ProjectVisual variant={project.variant} />
      <div className="chip-list">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="link-row">
        {project.links.map((link) => (
          <ExternalLink key={link.href} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </Card>
  );
}

function ProjectVisual({ variant }: { variant: string }) {
  if (variant === "apex") return <ApexVisual />;
  if (variant === "uniquizz") return <UniQuizzVisual />;
  if (variant === "xenow") return <XeNowVisual />;
  if (variant === "daiduongsanca") return <DaiduongsancaVisual />;
  return <MazeVisual />;
}

function MazeVisual() {
  return (
    <div className="maze-visual">
      <div className="maze-demo-main">
        <img src={mazeDemoGifs[0].src} alt={`MazeHunter ${mazeDemoGifs[0].label} demo`} loading="lazy" />
        <span>{mazeDemoGifs[0].label}</span>
      </div>
      <div className="maze-demo-strip">
        {mazeDemoGifs.slice(1).map((gif) => (
          <div key={gif.label} className="maze-demo-tile">
            <img src={gif.src} alt={`MazeHunter ${gif.label} demo`} loading="lazy" />
            <span>{gif.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Qbit({ className = "", shirt = "shirt-aiute.svg", pants = "pants-cargo.svg", hat = "hat-frog.svg" }: { className?: string; shirt?: string; pants?: string; hat?: string }) {
  return (
    <div className={`qbit ${className}`} aria-hidden="true">
      <img src="/showcase/uniquizz/body.svg" alt="" className="qbit-layer qbit-body" />
      <img src={`/showcase/uniquizz/${pants}`} alt="" className="qbit-layer qbit-pants" />
      <img src="/showcase/uniquizz/shoes-jordans.svg" alt="" className="qbit-layer qbit-shoes" />
      <img src={`/showcase/uniquizz/${shirt}`} alt="" className="qbit-layer qbit-shirt" />
      <img src="/showcase/uniquizz/head.svg" alt="" className="qbit-layer qbit-head" />
      <img src={`/showcase/uniquizz/${hat}`} alt="" className="qbit-layer qbit-hat" />
    </div>
  );
}

function UniQuizzVisual() {
  const closetItems = [
    "shirt-mu.svg",
    "shirt-ueh.svg",
    "shirt-aiute.svg",
    "shirt-asn.svg",
    "shirt-brazil.svg",
    "shirt-aohub.svg",
    "pants-dino.svg",
    "pants-cargo.svg",
    "hat-frog.svg",
    "shoes-jordans.svg",
  ];

  return (
    <div className="uniquizz-visual">
      <div className="uniquizz-stage">
        <Qbit shirt="shirt-aiute.svg" pants="pants-cargo.svg" hat="hat-frog.svg" />
      </div>
      <div className="uniquizz-closet">
        {closetItems.map((item) => (
          <div key={item} className="closet-tile">
            <img src={`/showcase/uniquizz/${item}`} alt={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ApexVisual() {
  const fighters = [
    ["Vex", "autobattler-fighter-1.png"],
    ["Sylas", "autobattler-fighter-2.png"],
    ["Akali", "autobattler-fighter-3.png"],
    ["Darius", "autobattler-fighter-4.png"],
    ["Sett", "autobattler-fighter-5.png"],
    ["Lux", "autobattler-fighter-6.png"],
    ["Ahri", "autobattler-fighter-7.png"],
    ["Jinx", "autobattler-fighter-8.png"],
  ];

  return (
    <div className="apex-visual">
      <div className="apex-roster">
        {fighters.map(([name, file]) => (
          <div key={name} className="fighter-tile">
            <img src={`/showcase/apexchaos/${file}`} alt={name} loading="lazy" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function XeNowVisual() {
  return (
    <div className="xenow-visual">
      <div className="xenow-mockup">
        <div className="xenow-header">
          <span className="xenow-dot red" />
          <span className="xenow-dot yellow" />
          <span className="xenow-dot green" />
          <span className="xenow-title">XeNow Mobility Platform</span>
        </div>
        <div className="xenow-grid">
          <div className="xenow-card">
            <h4>EV Scooter Sedan</h4>
            <p>120 km/h • Electric</p>
            <span className="xenow-badge">Available</span>
          </div>
          <div className="xenow-card">
            <h4>City Cruiser SUV</h4>
            <p>Automatic • 5 Seats</p>
            <span className="xenow-badge">Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DaiduongsancaVisual() {
  const demos = [
    [
      "Gameplay",
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHYxcXV1bTV6ZXljZWQ3ZXdwcjZqMXE0NWtpaXV5eDlndjJ3dXNpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VlTspk3l4xQzW6y99t/giphy.gif",
    ],
    [
      "Boss Battle",
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjkxdW9reDh5MThnZzU1eXR2d2ZuN2lsZmQ0OWtyd24xMXJqa3lhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IsEJWcJEOwyWTyDQ2k/giphy.gif",
    ],
    [
      "Start Menu",
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2huMG1ncWZycXprbG91MjRvcXc5amVxcHkyanpnYTh2djBjaTZheiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KNWv19m2kr2XwP3OHc/giphy.gif",
    ],
  ];

  return (
    <div className="daiduongsanca-visual">
      <div className="daiduongsanca-demo-main">
        <img src={demos[0][1]} alt="Daiduongsanca gameplay demo" loading="lazy" />
        <span>{demos[0][0]}</span>
      </div>
      <div className="daiduongsanca-demo-strip">
        {demos.slice(1).map(([label, src]) => (
          <div key={label} className="daiduongsanca-demo-tile">
            <img src={src} alt={`Daiduongsanca ${label} demo`} loading="lazy" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "experience", "honors", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredProjects = projects.filter((project) => project.featured);
  const supportingProjects = projects.filter((project) => !project.featured);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="page-grid-shell">
      <ScrollProgress />
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
      <ClickEffects />

      {/* FLOATING NAVBAR */}
      <nav className="section-nav" aria-label="Portfolio navigation">
        <div className="nav-links">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <div className="page-reveal mx-auto flex min-h-screen w-full max-w-5xl flex-col px-3 py-4 text-sm leading-loose sm:px-6 lg:px-8">

        {/* HERO SECTION */}
        <section id="about" className="scroll-mt-24">
          <div className="hero-title">
            <FluidGradientText text="NHAT THIEN" />
          </div>

          <div className="intro-grid">
            <p className="eyebrow mb-4">{personalInfo.title} • {personalInfo.location}</p>
            <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
              <ElectricBorder color="#10b981" speed={0.75} chaos={0.08} borderRadius={999} className="hero-orbit-card flex-shrink-0 mt-1">
                <ProfileAvatar />
              </ElectricBorder>
              <div className="intro-copy flex-1">
                <h1>
                  Crafting <ShimmerText>AI-driven</ShimmerText> software that makes an impact.
                </h1>
                <p>
                  Senior Information Technology student at <strong>HCMUTE</strong> (GPA {personalInfo.gpa}) passionate about turning AI ideas into software that people actually use.
                  <br />
                  I build scalable full-stack applications, intelligent computer vision systems with YOLOv11, and Retrieval-Augmented Generation (RAG) solutions—focusing on clean architecture, real-world usability, and measurable impact rather than prototypes that never leave the lab.
                </p>
                <div className="stat-strip">
                  <Stat value="3.24" label="HCMUTE GPA" />
                  <Stat value="10+" label="Projects Built" />
                  <Stat value="2" label="Hackathons Won" />
                </div>
                <div className="hero-actions">
                  <Button href="#projects">Showcase & Case Studies</Button>
                  <Button href="#contact" variant="secondary">Get In Touch</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION (Expanded to ~90% screen width with 5-8% side padding) */}
        <section
          id="skills"
          className="scroll-mt-24 py-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-[5vw] lg:px-[6vw] xl:px-[8vw] max-w-screen overflow-x-hidden"
        >
          <div className="mx-auto w-full max-w-[1550px]">
            <SectionHeader
              eyebrow="CAPABILITIES"
              title="Technical Stack & Mindset"
              description="Proven tools and design philosophies honed through shipping production web apps and AI systems."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mt-8">
              {/* LEFT COLUMN: 6 Columns wide for Capabilities Cards */}
              <div className="w-full lg:col-span-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {strengths.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Card key={item.title} className="p-6 flex flex-col justify-between h-full min-h-[150px]">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                              <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: 6 Columns wide for Large 3D Three.js WebGL Macbook Model */}
              <div className="flex items-center justify-center w-full lg:col-span-6 relative z-20 overflow-visible">
                <Macbook3DModel screenImage="/bannerMac.png" className="h-[440px] sm:h-[500px] lg:h-[540px]" />
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24 py-16">
          <SectionHeader
            eyebrow="PORTFOLIO SHOWCASE"
            title="Featured Projects & Demos"
            description="Explore the software, AI applications, and interactive products I've designed, developed, and deployed."
          />

          <div className="featured-projects mt-8 space-y-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="supporting-projects mt-12">
            <h3 className="text-lg font-bold mb-6">Additional Web & AI Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="scroll-mt-24 py-16">
          <SectionHeader
            eyebrow="BACKGROUND"
            title="Education & Technical Journey"
            description="Academic milestones and hands-on software development experience."
          />
          <div className="mt-8 space-y-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold">{personalInfo.school}</h3>
                  <p className="text-sm text-emerald-500 font-medium">Bachelor of Science in Information Technology</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-mono">
                  2023 - 2027 (Expected)
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Currently maintaining a cumulative <strong>GPA of {personalInfo.gpa}</strong>. Specialized coursework in Data Structures & Algorithms, Database Management Systems, Software Architecture, Machine Learning, and Computer Vision.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold">Full-Stack Developer</h3>
                  <p className="text-sm text-emerald-500 font-medium">Independent & Team Projects</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-mono">
                  2023 - Present
                </span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Architected full-stack React + Node.js web applications with RESTful APIs and real-time Socket rooms.</li>
                <li>Trained and integrated computer vision models (YOLOv11) for real-time industrial anomaly inspection.</li>
                <li>Co-developed browser gameplay engines, 60fps HTML5 Canvas physics, and interactive puzzle UI loops.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* HONORS & ACHIEVEMENTS SECTION */}
        <section id="honors" className="scroll-mt-24 py-16">
          <SectionHeader
            eyebrow="MILESTONES"
            title="Honors & Achievements"
            description="Recognition and key milestones achieved during university and personal projects."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h3 className="text-base font-bold">High Academic Standing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Consistently maintained a <strong>3.24 / 4.00 GPA</strong> in Information Technology at HCMUTE.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="h-6 w-6 text-emerald-500" />
                <h3 className="text-base font-bold">6+ Shipped Web & AI Products</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Successfully deployed production projects across Vercel, Netlify, and GitHub pages serving live users.
              </p>
            </Card>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24 py-16">
          <SectionHeader
            eyebrow="GET IN TOUCH"
            title="Let's Build Something Together"
            description="Open for software engineering opportunities, AI projects, and technical collaborations."
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-bold">Contact Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <GraduationCap className="h-4 w-4 text-emerald-500" />
                  <span>{personalInfo.school}</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Email Copied!" : "Copy Email"}
                </button>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-line text-xs font-semibold hover:bg-muted transition"
                >
                  Send Direct Email
                </a>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-bold">Connect Online</h3>
              <p className="text-sm text-muted-foreground">
                Check out my open source repositories, live project demos, and professional career profile:
              </p>
              <div className="space-y-3 pt-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-line hover:border-emerald-500 transition"
                >
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-emerald-500" />
                    <span className="font-medium text-xs">GitHub Repository</span>
                  </div>
                  <ExternalIcon className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-line hover:border-emerald-500 transition"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-emerald-500" />
                    <span className="font-medium text-xs">LinkedIn Profile</span>
                  </div>
                  <ExternalIcon className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
            </Card>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 border-t border-line text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="mt-1">Engineered with React, Vite & Tailwind CSS • Powered by prompt-to-play architecture.</p>
        </footer>

      </div>
    </main>
  );
}

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Code2,
  Layers3,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Scroll } from '@react-three/drei';
import Background3D from './components/Background3D';

const profile = {
  name: 'Tee',
  handle: 'teehihi',
  avatar: '/tee-avatar.png',
  github: 'https://github.com/teehihi',
  email: 'mailto:tee@hcmute.edu.vn',
};

const stats = [
  { value: '40', label: 'public repos' },
  { value: '2022', label: 'started building' },
  { value: '2026', label: 'fresh activity' },
];

function GithubMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.2 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.2a5.44 5.44 0 0 0-1.44 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const projects = [
  {
    name: 'Findora App',
    type: 'Android lost & found',
    tech: ['Java', 'Maps', 'AI match'],
    href: 'https://github.com/teehihi/findora-app',
    tone: 'mint',
  },
  {
    name: 'DacSanViet UI',
    type: 'Regional specialty commerce',
    tech: ['TypeScript', 'React', 'Storefront'],
    href: 'https://github.com/teehihi/dacsanviet-app-ui',
    tone: 'rose',
  },
  {
    name: 'DacSanViet Manager',
    type: 'Admin and operations layer',
    tech: ['Dashboard', 'Management', 'Workflow'],
    href: 'https://github.com/teehihi/dacsanviet-manager',
    tone: 'amber',
  },
  {
    name: 'QuizzAppTee',
    type: 'Quiz experience on Vercel',
    tech: ['JavaScript', 'Vercel', 'Learning'],
    href: 'https://github.com/teehihi/QuizzAppTee',
    tone: 'violet',
  },
];

const stack = [
  'React',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'Android Java',
  'Three.js',
  'UI Motion',
  'Product Design',
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Shell({ children }) {
  return (
    <section className="section-shell">
      <motion.div
        className="section-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
        variants={stagger}
      >
        {children}
      </motion.div>
    </section>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
        <span>T</span>
        <strong>tee.dev</strong>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <Shell>
      <div className="hero-grid">
        <motion.div className="hero-copy" variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>
            <Sparkles size={15} /> GitHub powered portfolio
          </motion.p>
          <motion.h1 variants={fadeUp}>
            Tee builds sharp product interfaces with code that actually ships.
          </motion.h1>
          <motion.p className="hero-lede" variants={fadeUp}>
            A HCMUTE builder turning Android apps, commerce dashboards, quiz products, and cinematic web experiments into polished working systems.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a className="primary-action" href="#work">
              <Rocket size={18} /> View projects
            </a>
            <a className="ghost-action" href={profile.github} target="_blank" rel="noreferrer">
              <GithubMark /> github/{profile.handle}
            </a>
          </motion.div>
        </motion.div>

        <motion.aside className="profile-panel" variants={fadeUp}>
          <div className="avatar-ring">
            <img src={profile.avatar} alt="Tee GitHub avatar" />
          </div>
          <div>
            <p className="panel-kicker">Public profile</p>
            <h2>{profile.name}</h2>
            <a href={profile.github} target="_blank" rel="noreferrer">
              @{profile.handle} <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="stat-strip">
            {stats.map((item) => (
              <span key={item.label}>
                <strong>{item.value}</strong>
                {item.label}
              </span>
            ))}
          </div>
        </motion.aside>
      </div>
    </Shell>
  );
}

function Work() {
  return (
    <Shell>
      <motion.div className="section-heading" variants={fadeUp} id="work">
        <p className="eyebrow"><Layers3 size={15} /> Selected repos</p>
        <h2>Recent work with real GitHub trails.</h2>
      </motion.div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.a
            className={`project-card ${project.tone}`}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            key={project.name}
          >
            <span className="project-index">0{index + 1}</span>
            <h3>{project.name}</h3>
            <p>{project.type}</p>
            <div className="tag-row">
              {project.tech.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <ArrowUpRight className="corner-icon" size={21} />
          </motion.a>
        ))}
      </div>
    </Shell>
  );
}

function Stack() {
  return (
    <Shell>
      <div className="stack-layout" id="stack">
        <motion.div className="section-heading" variants={fadeUp}>
          <p className="eyebrow"><Code2 size={15} /> Build mode</p>
          <h2>Frontend taste, full-stack hands, mobile instincts.</h2>
          <p>
            The visual system leans into a TikTok-style kinetic 3D feel: luminous depth, moving code shards, and a scroll-driven camera, while the content still reads cleanly on desktop and mobile.
          </p>
        </motion.div>
        <motion.div className="stack-board" variants={stagger}>
          {stack.map((item) => (
            <motion.span variants={fadeUp} key={item}>{item}</motion.span>
          ))}
        </motion.div>
      </div>
    </Shell>
  );
}

function Contact() {
  return (
    <Shell>
      <motion.div className="contact-band" variants={fadeUp} id="contact">
        <p className="eyebrow"><MapPin size={15} /> Ho Chi Minh City</p>
        <h2>Ready for the next build.</h2>
        <p>
          Open for software engineering, frontend, Android, and UI-heavy product work. Bring the brief, Tee brings the velocity.
        </p>
        <div className="hero-actions contact-actions">
          <a className="primary-action" href={profile.email}>
            <Mail size={18} /> Email Tee
          </a>
          <a className="ghost-action" href={profile.github} target="_blank" rel="noreferrer">
            <GithubMark /> GitHub profile
          </a>
        </div>
      </motion.div>
    </Shell>
  );
}

function HtmlOverlay() {
  return (
    <Scroll html>
      <main className="scroll-document">
        <Hero />
        <Work />
        <Stack />
        <Contact />
      </main>
    </Scroll>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Background3D>
        <HtmlOverlay />
      </Background3D>
    </>
  );
}

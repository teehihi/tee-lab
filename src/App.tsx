// Cache Invalidation Timestamp: 2026-08-07T22:54:55Z
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Linkedin,
  Globe,
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
  ChevronLeft,
  ChevronRight,
  Film,
  X,
  ExternalLink as ExternalIcon
} from "lucide-react";

function ShineBorder({
  borderWidth = 1,
  duration = 3.4,
  shineColor = "rgba(16, 185, 129, 0.45)",
  className = "",
}: {
  borderWidth?: number;
  duration?: number;
  shineColor?: string;
  className?: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(transparent, transparent, ${shineColor}, transparent, transparent)`,
        backgroundSize: "300% 300%",
        animation: `shine ${duration}s linear infinite`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: `${borderWidth}px`,
      }}
      className={`pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] ${className}`}
    />
  );
}
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
import { DualIphone3DModel } from "./components/DualIphone3DModel";
import { InteractiveHorizontalTimeline } from "./components/InteractiveHorizontalTimeline";
import { IntroShowcase } from "./components/IntroShowcase";
import { HonorsAchievementsCards } from "./components/HonorsAchievementsCards";
import { ContactSection } from "./components/ContactSection";
import { preload3DAssets } from "./utils/modelCache";

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

export interface TechIconItem {
  name: string;
  iconUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  techIcons?: TechIconItem[];
  mediaType: "slideshow" | "gif" | "placeholder";
  bgGraphic: string;
  mediaImages?: string[];
  mediaUrl?: string;
  links: { label: string; href: string; isModal?: boolean }[];
}

const projects: ProjectItem[] = [
  {
    id: "phoenixvision",
    title: "Phoenix Vision",
    subtitle: "Early Fire Detection with AI Vision",
    description:
      "Improve fire safety using real-time computer vision that detects smoke and flames instantly, helping reduce response time and support early intervention.",
    tags: ["Computer Vision", "YOLOv11", "Real-Time AI", "PyTorch", "Fire Detection"],
    techIcons: [
      { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "OpenCV", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Electron", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg" },
    ],
    mediaType: "slideshow",
    bgGraphic: "/Bg2.webp",
    mediaImages: [
      "https://files.catbox.moe/brqvrv.png",
      "https://files.catbox.moe/nxdu8v.png",
      "https://files.catbox.moe/5i05c4.png",
      "https://files.catbox.moe/0gp87p.png",
      "https://files.catbox.moe/niaowz.png",
      "https://files.catbox.moe/6jdfby.png",
      "https://files.catbox.moe/pyy1kw.jpg",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/teehihi/phoenix-vision-fire-detection" },
      { label: "More Info...", href: "https://github.com/teehihi/phoenix-vision-fire-detection" },
    ],
  },
  {
    id: "uniquizz",
    title: "UniQuizz",
    subtitle: "Real-Time Quiz Platform for Live Events",
    description:
      "Create engaging classroom and event experiences with instant quizzes, live leaderboards, and synchronized multiplayer participation.",
    tags: ["React", "TypeScript", "NodeJS", "Socket.io", "MongoDB"],
    techIcons: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Socket.io", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg" },
      { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    ],
    mediaType: "gif",
    bgGraphic: "/bg1.webp",
    mediaUrl:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN25kb20ybWI3b282dmF1djN3a2NiaHh0N3A1NmxzZnRweTZtbjJ0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HcPgPBQKj7LoUYJG0H/giphy.gif",
    links: [
      { label: "Live Demo", href: "https://uniquizzdom.vercel.app/" },
      { label: "More Info...", href: "https://github.com/teehihi/UniQuizzHackathon" },
    ],
  },
  {
    id: "xenow",
    title: "XeNow",
    subtitle: "Rent Vehicles with Confidence",
    description:
      "Book cars and motorcycles through a seamless rental experience featuring smart search, identity verification, secure payments, and intuitive booking management.",
    tags: ["React", "TypeScript", "Vite", "NodeJS", "Express", "MongoDB"],
    techIcons: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Vite", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
      { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    ],
    mediaType: "slideshow",
    bgGraphic: "/bg3.webp",
    mediaImages: [
      "https://files.catbox.moe/oe3tyt.png",
      "https://files.catbox.moe/ygh8o2.png",
      "https://files.catbox.moe/0fdisu.png",
      "https://files.catbox.moe/74b8ga.png",
      "https://files.catbox.moe/tnt29g.png",
      "https://files.catbox.moe/5fgx8b.png",
    ],
    links: [
      { label: "Live Demo", href: "https://xenow.vercel.app/" },
      { label: "More Info...", href: "#", isModal: true },
    ],
  },
  {
    id: "moviedoublet",
    title: "Movie DoubleT",
    subtitle: "Discover Movies Without the Noise",
    description:
      "Explore thousands of movies through a fast, responsive interface with personalized recommendations, intelligent search, and a seamless browsing experience.",
    tags: ["React", "JavaScript", "Tailwind CSS", "TMDB API"],
    techIcons: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "TMDB API", iconUrl: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" },
    ],
    mediaType: "gif",
    bgGraphic: "/bg1.webp",
    mediaUrl:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXE3MmZjN3VwdjBrbjA0bTUyZGdpN3p3Y2VvaTZyb2V4MTBrd25qYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8kMQHXT5j4D9NHDxLs/giphy.gif",
    links: [
      { label: "GitHub", href: "https://github.com/teehihi/movie-double-t" },
      { label: "More Info...", href: "https://github.com/teehihi/movie-double-t" },
    ],
  },
];

// Archived / Secondary projects preserved for future sections
const archivedProjects = [
  {
    id: "maze",
    title: "ChayNgayDi MazeHunter",
    subtitle: "Core game project / pathfinding puzzle",
    tags: ["Pygame", "Pathfinding", "Pixel art", "Maze logic"],
  },
  {
    id: "apex",
    title: "APEX-CHAOS",
    subtitle: "Core game project / 1v1 autobattler",
    tags: ["React", "Vite", "Canvas", "Combat balance"],
  },
  {
    id: "daiduongsanca",
    title: "Đại Dương Săn Cá",
    subtitle: "Core game project / browser arcade fish shooter",
    tags: ["HTML5 Canvas", "Vanilla JS", "Arcade Shooter"],
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
  ["education", "Education"],
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

function ProjectSlideshow({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">("right");

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection("right");
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setSlideDirection(newIndex > currentIndex ? "right" : "left");
    setCurrentIndex(newIndex);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection("right");
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] overflow-hidden bg-black/80 group rounded-2xl border border-white/10">
      <div className="relative w-full h-full overflow-hidden">
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} screenshot ${currentIndex + 1}`}
          style={{
            animation:
              slideDirection === "right"
                ? "slideRight 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards"
                : "slideLeft 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-emerald-500 text-white hover:text-black transition-all duration-300 opacity-90 sm:opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10 z-10 active:scale-90 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-emerald-500 text-white hover:text-black transition-all duration-300 opacity-90 sm:opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10 z-10 active:scale-90 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pure Floating Dot Pagination Control (#1A1A1A Active, #B2B2B2 Unselected) */}
      <div className="absolute bottom-6 sm:bottom-7 inset-x-0 flex items-center justify-center gap-2.5 z-10 pointer-events-auto">
        {images.map((_, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${isSelected
                ? "bg-emerald-500 scale-125 shadow-[0_0_10px_rgba(16,185,129,0.85)]"
                : "bg-[#B2B2B2] hover:bg-emerald-400/70"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function ProjectMedia({ project }: { project: ProjectItem }) {
  if (project.mediaType === "slideshow" && project.mediaImages?.length) {
    return <ProjectSlideshow images={project.mediaImages} title={project.title} />;
  }

  if (project.mediaType === "gif" && project.mediaUrl) {
    return (
      <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] overflow-hidden rounded-2xl border border-white/10 flex items-center justify-center">
        <img
          src={project.mediaUrl}
          alt={`${project.title} GIF Demo`}
          className="w-full h-full object-cover object-center rounded-2xl"
        />
      </div>
    );
  }

  // Fallback / Placeholder Media Component for Movie DoubleT
  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] overflow-hidden bg-gradient-to-br from-slate-900 via-neutral-900 to-black group rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-center">
      {project.mediaUrl ? (
        <img
          src={project.mediaUrl}
          alt={`${project.title} Media`}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 mb-1">
            <Code2 className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-white tracking-wide">{project.title}</h4>
          <p className="text-xs text-slate-400 max-w-[260px] leading-relaxed">
            Case study & interactive demonstration coming soon.
          </p>
        </div>
      )}
    </div>
  );
}

function ScrollProjectCard({
  project,
  index,
  onOpenModal,
}: {
  project: ProjectItem;
  index: number;
  onOpenModal?: (project: ProjectItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInFocus, setIsInFocus] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInFocus(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (y / rect.height) * -8, y: (x / rect.width) * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.008) translateY(0px)`
          : isInFocus
            ? `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`
            : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.65) translateY(32px)`,
        opacity: isInFocus ? 1 : 0,
        transition: isHovered
          ? "transform 0.15s ease-out, opacity 0.6s ease-in-out"
          : "transform 1.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.15s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative w-full max-w-[1232px] mx-auto aspect-auto lg:aspect-[1232/540] min-h-[380px] rounded-[2.5rem] overflow-hidden flex items-center p-6 sm:p-10 lg:p-12 will-change-transform ${isInFocus
        ? "shadow-[0_25px_80px_rgba(0,0,0,0.7)] pointer-events-auto z-10"
        : "shadow-none pointer-events-none z-0"
        }`}
    >
      {/* Full Background Card Image with 85% Opacity (bg1.webp, Bg2.webp, bg3.webp) */}
      <img
        src={project.bgGraphic}
        alt=""
        className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none opacity-85"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full h-full">
        {/* MEDIA COLUMN (Balanced 6 columns, compact frame) */}
        <div className={`w-full lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div className="relative flex items-center justify-center w-full">
            {/* Primary Media Card Mockup */}
            <div className="relative z-10 w-full sm:w-[94%] aspect-[16/10] rounded-xl overflow-hidden border border-white/20 bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <ProjectMedia project={project} />
            </div>
          </div>
        </div>

        {/* DETAILS COLUMN (6 columns) */}
        <div className={`w-full lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4 leading-tight">
              {project.title}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Icons Row (Above Action Buttons) */}
          {project.techIcons && project.techIcons.length > 0 && (
            <div className="flex flex-wrap items-center gap-3.5 pt-2 z-20">
              {project.techIcons.map((tech) => (
                <div
                  key={tech.name}
                  className="group/tech relative flex items-center justify-center p-1 cursor-pointer hover:scale-125 transition-transform duration-300"
                >
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md transition-transform"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  {/* Floating Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900 border border-white/15 text-white text-[11px] font-mono font-medium opacity-0 group-hover/tech:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-30">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1 sm:pt-2">
            {project.links.map((link, idx) => {
              const isPrimary = idx === 0 || link.label.toLowerCase().includes("demo");
              return isPrimary ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="skew-fill-btn group cursor-pointer z-20"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="arrow-icon w-4 h-4" />
                </a>
              ) : link.isModal ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onOpenModal) onOpenModal(project);
                  }}
                  className="more-info-btn ml-2 sm:ml-4 cursor-pointer z-20 bg-transparent border-none p-0 outline-none"
                >
                  <p data-text={link.label}>{link.label}</p>
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="more-info-btn ml-2 sm:ml-4 cursor-pointer z-20"
                >
                  <p data-text={link.label}>{link.label}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SecondaryProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  mediaUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

const supportingProjects: SecondaryProjectItem[] = [
  {
    id: "dacsanviet",
    title: "Đặc Sản Việt",
    subtitle: "Bringing Local Specialties Online",
    description:
      "Connect customers with authentic Vietnamese specialty products through a modern e-commerce platform designed for smooth shopping and efficient store management.",
    tags: ["React", "NodeJS", "E-Commerce", "MongoDB"],
    mediaUrl:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXZvZGFleGkyM240Nm9mcnUwcmVvOGhsdHB6ZTZ2N2ZwdWllMXh3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bLKKAGW24Mbg0bhHD5/giphy.gif",
    demoUrl: "https://www.dacsanviet.site/",
    githubUrl: "",
  },
  {
    id: "chayngaydi",
    title: "Chạy Ngay Đi",
    subtitle: "2D Maze Hunter & Pathfinding Puzzle",
    description:
      "An action-packed maze survival game featuring intelligent hunter pathfinding AI, interactive quiz gates, and pixel-art rendering.",
    tags: ["Pygame", "Pathfinding AI", "Maze Logic", "Python"],
    mediaUrl:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGQ3NjU3dHplYWlxcTV1ZGw0aDYzdzUxZXVseHE3bGhweTVhMG1tdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CTF3ctDQNVei069FBQ/giphy.gif",
    demoUrl: "https://github.com/teehihi/ChayNgayDi_MazeHunter",
    githubUrl: "https://github.com/teehihi/ChayNgayDi_MazeHunter",
  },
  {
    id: "apex",
    title: "APEX-CHAOS",
    subtitle: "1v1 Tactical Auto-Battler Game",
    description:
      "Fast-paced 1v1 auto-combat game with custom Canvas rendering, spell interactions, and real-time battle balance mechanics.",
    tags: ["React", "HTML5 Canvas", "Game Mechanics", "Vite"],
    mediaUrl:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXUzeHpvcmRwbHFrampuaDdhMWlocjRtc3yxcG1hMWp5MWNud21leCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xGJhfJEIVrRScFvCUF/giphy.gif",
    demoUrl: "https://apexchaos.vercel.app/",
    githubUrl: "https://github.com/Khanh-glitch/APEX-CHAOS",
  },
  {
    id: "coravamaris",
    title: "CoravaMaris",
    subtitle: "24h Unity Pathfinding Puzzle Game",
    description:
      "Built in 24 hours at VNG Prompt to Play Hackathon. A Unity-powered pathfinding puzzle game featuring custom grid mechanics and interactive level design.",
    tags: ["Unity", "C#", "Pathfinding", "VNG Prompt to Play"],
    mediaUrl:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3N5eXR1OTZrbGdteDVxMWQ4cDhjNnN4bGc4OXR2dHI3OHA5MGc2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pSvAezoMonh5SPcZJl/giphy.gif",
    demoUrl: "https://teehihi.itch.io/corava-maris",
    githubUrl: "https://github.com/teehihi/corava-maris",
  },
];

function Flip3DProjectCard({ project }: { project: SecondaryProjectItem }) {
  return (
    <a
      href={project.demoUrl || "#"}
      target="_blank"
      rel="noreferrer"
      className="group relative shrink-0 w-[300px] sm:w-[340px] flex flex-col rounded-2xl overflow-hidden bg-[#121318] border border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(16,185,129,0.25)] hover:border-emerald-500/40 cursor-pointer select-none"
    >
      {/* TOP MEDIA AREA (ẢNH / GIF) & 3D FLIP OVERLAY */}
      <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden bg-[#0d0e12] perspective-1000 flex items-center justify-center">
        {project.mediaUrl ? (
          <img
            src={project.mediaUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-0 group-hover:opacity-0"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center transition-all duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-0 group-hover:opacity-0">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
              <Code2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-400 tracking-wider uppercase">
              ẢNH / GIF CHƯA CÓ
            </span>
          </div>
        )}

        {/* 3D FLIP CONTENT BOX ON HOVER (rotateX(-90deg) -> rotateX(0deg)) */}
        <div className="absolute inset-0 w-full h-full p-4 sm:p-5 bg-[#161824] text-left border-b border-emerald-500/30 origin-bottom [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)] transition-all duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] flex flex-col justify-between z-10">
          <div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
              {project.subtitle}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 font-normal">
              {project.description}
            </p>
          </div>
          <div className="flex items-end justify-between gap-2 pt-2 border-t border-white/5">
            <div className="flex flex-wrap gap-1 max-w-[190px] sm:max-w-[210px]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-400 border border-emerald-500/40 text-emerald-300 hover:text-black text-[11px] font-mono font-bold transition-all shadow-sm shrink-0 self-end mb-0.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM LABEL BAR (TÊN DỰ ÁN) */}
      <div className="w-full px-5 py-4 bg-[#171922] border-t border-white/5 flex items-center justify-between">
        <div className="pr-3 flex flex-col justify-center">
          <h4 className="text-base font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5 truncate max-w-[210px]">
            {project.subtitle}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
      </div>
    </a>
  );
}

function XeNowRepoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 20);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ease-out ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      onClick={handleClose}
    >
      {/* Modal Card using User's Gradient & Dual Shadow Button Styling - Expanded Size */}
      <div
        className={`relative w-full max-w-xl sm:w-[560px] rounded-[24px] bg-gradient-to-tr from-[#07102d] via-[#1a2340] to-[#3a3c54] border border-[#545a6a] p-7 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col text-left font-sans transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform ${isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-6"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Exit Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-red-500 hover:border-red-500 text-slate-300 hover:text-white transition-all border border-white/15 cursor-pointer z-20 hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header with Logo */}
        <div className="flex items-center gap-4 mb-2 pr-8">
          <img
            src="https://files.catbox.moe/hjoj92.webp"
            alt="XeNow Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-emerald-400 mb-0.5 block tracking-wider font-mono">
              XeNow Repositories
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight truncate">
              Full-Stack Code Base
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base font-medium text-[#9799a7] leading-relaxed mb-7">
          XeNow is split into two specialized repositories to maintain a clean decoupled architecture. Select a repository below to view on GitHub:
        </p>

        {/* Buttons Wrapper with btn-53 letter flip animation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          {/* Frontend Repo Button */}
          <a
            href="https://github.com/teehihi/xe-now-ui"
            target="_blank"
            rel="noreferrer"
            className="btn-53-custom w-full sm:flex-1 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_6px_15px_-2px_rgba(16,185,129,0.45)] no-underline"
          >
            <div className="original text-sm font-extrabold text-emerald-950">
              <Code2 className="w-5 h-5" />
              <span>Frontend Repo</span>
            </div>
            <div className="letters text-sm font-black text-emerald-950">
              <span>F</span>
              <span>R</span>
              <span>O</span>
              <span>N</span>
              <span>T</span>
              <span>E</span>
              <span>N</span>
              <span>D</span>
            </div>
          </a>

          {/* Backend Repo Button */}
          <a
            href="https://github.com/teehihi/xe-now-be"
            target="_blank"
            rel="noreferrer"
            className="btn-53-custom w-full sm:flex-1 bg-white hover:bg-slate-100 text-slate-950 shadow-[0_6px_15px_-2px_rgba(11,22,37,0.4)] no-underline"
          >
            <div className="original text-sm font-extrabold text-slate-950">
              <Cpu className="w-5 h-5" />
              <span>Backend Repo</span>
            </div>
            <div className="letters text-sm font-black text-slate-950">
              <span>B</span>
              <span>A</span>
              <span>C</span>
              <span>K</span>
              <span>E</span>
              <span>N</span>
              <span>D</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showIntro, setShowIntro] = useState(true);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [isMacOpen, setIsMacOpen] = useState(false);
  const [isXeNowModalOpen, setIsXeNowModalOpen] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const carouselRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    // Proactively preload 3D models and textures in background
    preload3DAssets();
  }, []);

  React.useEffect(() => {
    const el = skillsRef.current;
    if (el) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsSkillsVisible(true);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    }

    const carouselEl = carouselRef.current;
    if (carouselEl) {
      const carouselObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsCarouselVisible(true);
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
      );
      carouselObserver.observe(carouselEl);
    }
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "education", "honors", "contact"];
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

  const featuredProjects = projects;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {showIntro && (
        <IntroShowcase
          onMidTransition={() => {
            setIsHeroRevealed(true);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          onEnterPortfolio={() => {
            setShowIntro(false);
            setIsHeroRevealed(true);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      )}
      {!showIntro && (
        <InteractiveGrid
          clickInteraction
          clickForce={1.0}
          cursorTrail
          trailMode="hover"
          trailColor="#10b981"
          hoverColor="#10b981"
          gridSize={52}
          radius={360}
          repulsionStrength={-0.8}
          motionSpeed={0.8}
        />
      )}
      {!showIntro && <ClickEffects />}

      {/* FLOATING NAVBAR (Always sticky/fixed at top of screen after Intro Showcase) */}
      {!showIntro && (
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
      )}

      <main
        className={`page-grid-shell transition-all duration-[1200ms] cubic-bezier(0.16,1,0.3,1) transform ${showIntro && !isHeroRevealed
          ? "opacity-0 translate-y-16 pointer-events-none"
          : "opacity-100 translate-y-0"
          }`}
      >
        <ScrollProgress />

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
                  <div className="stat-strip grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 w-full">
                    <Stat value="3.24" label="HCMUTE GPA" />
                    <Stat value="10+" label="Projects Built" />
                    <Stat value="2" label="Hackathons Won" />
                  </div>
                  <div className="hero-actions">
                    <Button href="#projects">Showcase & Case Studies</Button>
                    <Button href="#honors" variant="secondary">My Achievements</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS SECTION (Expanded to ~90% screen width with 5-8% side padding) */}
          <section
            ref={skillsRef}
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
                    {strengths.map((item, idx) => {
                      const Icon = item.icon;
                      const isCardVisible = isSkillsVisible || isMacOpen;
                      return (
                        <Card
                          key={item.title}
                          style={{
                            transitionDelay: `${idx * 150}ms`,
                          }}
                          className={`p-6 flex flex-col justify-between h-full min-h-[150px] transition-opacity duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isCardVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        >
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
                  <Macbook3DModel
                    screenImage="/bannerMac.png"
                    className="h-[440px] sm:h-[500px] lg:h-[540px]"
                    onLidOpenStateChange={(isOpen) => setIsMacOpen(isOpen)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS SECTION (Expanded to full screen width with 5-8% side padding) */}
          <section
            id="projects"
            className="scroll-mt-24 py-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-[5vw] lg:px-[6vw] xl:px-[8vw] max-w-screen overflow-x-hidden"
          >
            <div className="mx-auto w-full max-w-[1550px]">
              <SectionHeader
                eyebrow="PORTFOLIO SHOWCASE"
                title="Featured Projects & Case Studies"
                description="Explore the AI vision systems, real-time multiplayer platforms, and full-stack web applications I've engineered."
              />

              <div className="featured-projects mt-12 space-y-10 sm:space-y-12 lg:space-y-14">
                {projects.map((project, idx) => (
                  <ScrollProjectCard
                    key={project.id}
                    project={project}
                    index={idx}
                    onOpenModal={() => setIsXeNowModalOpen(true)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SUPPORTING & EXPERIMENTAL PROJECTS MARQUEE CAROUSEL */}
          <section
            ref={carouselRef}
            className={`py-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden my-4 transition-all duration-[1200ms] cubic-bezier(0.16,1,0.3,1) transform ${isCarouselVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-16 scale-[0.97] pointer-events-none"
              }`}
          >
            <div className="mx-auto w-full max-w-[1550px] px-[5vw] lg:px-[6vw] xl:px-[8vw] mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                    MORE CREATIONS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Supporting & Experimental Projects
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md font-normal">
                  Continuous drifting carousel. Hover over any project card to halt movement and reveal 3D details.
                </p>
              </div>
            </div>

            {/* Marquee Track Container */}
            <div className="relative w-full overflow-hidden flex py-4">
              <div className="flex gap-6 animate-marquee-scroll shrink-0 min-w-full">
                {[...supportingProjects, ...supportingProjects, ...supportingProjects, ...supportingProjects].map((proj, idx) => (
                  <Flip3DProjectCard key={`${proj.id}-${idx}`} project={proj} />
                ))}
              </div>
            </div>
          </section>

          {/* EXPERIENCE & EDUCATION SECTION */}
          <section
            id="education"
            className="scroll-mt-24 py-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-[5vw] lg:px-[6vw] xl:px-[8vw] max-w-screen overflow-x-hidden"
          >
            <div className="mx-auto w-full max-w-[1550px]">
              <SectionHeader
                eyebrow="BACKGROUND"
                title="Growth Journey"
                description="From academic foundations to real-world software engineering and AI development."
              />
              <div className="mt-8">
                <InteractiveHorizontalTimeline />
              </div>
            </div>
          </section>

          {/* HONORS & ACHIEVEMENTS SECTION */}
          <section id="honors" className="scroll-mt-24 pt-2 pb-6 sm:pb-8 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="w-full max-w-[1750px] mx-auto">
              <SectionHeader
                eyebrow="MILESTONES"
                title="Honors & Achievements"
                description="Recognition and key milestones achieved during university and personal projects."
              />
              <div className="mt-10 sm:mt-12 w-full">
                <HonorsAchievementsCards />
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <ContactSection personalInfo={personalInfo} />

          {/* FOOTER */}
          <footer className="py-8 border-t border-line text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
            <p className="mt-1">Engineered with React, Vite & Tailwind CSS • Enhanced with AI-assisted development.</p>
          </footer>

        </div>
      </main>

      {/* XeNow Multi-Repo Selection Modal */}
      <XeNowRepoModal isOpen={isXeNowModalOpen} onClose={() => setIsXeNowModalOpen(false)} />
    </>
  );
}

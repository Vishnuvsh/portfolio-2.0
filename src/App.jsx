import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useInView,
  useMotionValueEvent,
} from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import {
  ArrowRight,
  Download,
  Sparkles,
  Mail,
  Code2,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  Cpu,
  Briefcase,
  Calendar,
  MapPin,
  Phone,
  Clock,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUp,
  ExternalLink,
  Layers,
  Zap,
  Loader,
  ChevronDown,
  Smartphone,
  Laptop,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// =====================================================================
// 1. BRAND ICONS (INLINE SVGs)
// =====================================================================
const GithubIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// =====================================================================
// 2. DATA COLLECTIONS
// =====================================================================
const ROLES = [
  'Full-Stack Developer',
  'React 19 Specialist',
  'Python & Django Architect',
  'UI/UX Craftsman',
  'Problem Solver',
];

const HERO_SOCIALS = [
  { icon: GithubIcon, href: 'https://github.com/Vishnuvsh', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'http://www.linkedin.com/in/vishnu-v-b5256b341', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:vishnuvsh44@gmail.com', label: 'Email' },
];

const PILLARS = [
  {
    icon: Code2,
    title: 'Clean Architecture',
    desc: 'Modular, maintainable codebases with predictable state management and scalable component hierarchies.',
    color: '#f43f5e',
    badge: 'Code Quality',
  },
  {
    icon: Layers,
    title: 'Full-Stack Mastery',
    desc: 'End-to-end fluency spanning normalized MySQL databases, Django REST APIs, and modern React 19 UIs.',
    color: '#ff6b6b',
    badge: 'End-to-End',
  },
  {
    icon: Sparkles,
    title: 'Human-Centric UX',
    desc: 'Crafting responsive, tactile micro-interactions with Lenis smooth scrolling and Framer Motion choreography.',
    color: '#fb923c',
    badge: 'Design First',
  },
  {
    icon: Zap,
    title: 'AI & MCP Integrated',
    desc: 'Building modern agentic systems, Model Context Protocol tools, and high-velocity automated workflows.',
    color: '#f59e0b',
    badge: 'Future Ready',
  },
];

const SKILL_CATEGORIES = [
  {
    name: 'Frontend',
    color: 'from-rose-500 via-rose-400 to-amber-500',
    glow: 'rgba(244, 63, 94, 0.35)',
    ringColor: '#f43f5e',
    skills: [
      { name: 'React 19', level: 92 },
      { name: 'Next.js', level: 80 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'Framer Motion', level: 88 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Responsive UI', level: 92 },
    ],
  },
  {
    name: 'Backend',
    color: 'from-rose-600 via-orange-500 to-amber-500',
    glow: 'rgba(255, 107, 107, 0.35)',
    ringColor: '#ff6b6b',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'Django & DRF', level: 88 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'Authentication / JWT', level: 85 },
      { name: 'Node.js Basics', level: 72 },
    ],
  },
  {
    name: 'Database & Tools',
    color: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16, 185, 129, 0.35)',
    ringColor: '#10b981',
    skills: [
      { name: 'MySQL', level: 88 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Vite / Tooling', level: 86 },
      { name: 'Figma UI Design', level: 78 },
      { name: 'Postman', level: 88 },
    ],
  },
  {
    name: 'AI & Architecture',
    color: 'from-amber-500 to-orange-400',
    glow: 'rgba(245, 158, 11, 0.35)',
    ringColor: '#f59e0b',
    skills: [
      { name: 'MCP Integration', level: 90 },
      { name: 'System Design', level: 86 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Web Performance', level: 88 },
    ],
  },
];

const PROJECTS = [
  {
    title: 'AI VIDEO TRANSLATOR',
    subtitle: 'AI Video Dubbing • 2026',
    category: 'AI API',
    tags: ['Web', 'AI API'],
    description: 'Translates and dubs video content across multiple languages with synchronized neural voice synthesis.',
    tech: ['React 19', 'JavaScript', 'AI APIs', 'Node.js'],
    github: 'https://github.com/Vishnuvsh/ai-video-translator',
    live: 'https://ai-video-translator-rouge.vercel.app',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    accent: '#f43f5e',
    device: 'laptop',
  },
  {
    title: 'HOME TRIP MODE',
    subtitle: 'Smart Travel Planner • 2026',
    category: 'Web',
    tags: ['Mobile', '3D'],
    description: 'Smart travel planning app with automated route optimization, checklist management, and real-time updates.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Vishnuvsh/home-trip-mode',
    live: 'https://home-trip-mode.vercel.app',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
    accent: '#ff6b6b',
    device: 'phone',
  },
  {
    title: 'STARTUP VALIDATOR',
    subtitle: 'Market Intelligence • 2026',
    category: 'AI API',
    tags: ['Web', 'AI API'],
    description: 'Automated platform that evaluates startup concepts, analyzes competition, and calculates feasibility scores.',
    tech: ['Next.js', 'TypeScript', 'AI APIs'],
    github: 'https://github.com/Vishnuvsh/ai-startup-validator',
    live: 'https://ai-startup-validator-xi.vercel.app',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop',
    accent: '#10b981',
    device: 'laptop',
  },
  {
    title: 'VISION CONTROLLER',
    subtitle: 'Computer Vision • 2026',
    category: 'Python',
    tags: ['Desktop', 'Python'],
    description: 'Computer vision software controlling desktop and cursor navigation in real-time via camera hand gestures.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    github: 'https://github.com/Vishnuvsh/ai-vision-computer-controller',
    live: 'https://github.com/Vishnuvsh/ai-vision-computer-controller',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    accent: '#fb923c',
    device: 'laptop',
  },
  {
    title: 'ASSET MANAGEMENT',
    subtitle: 'Enterprise Platform • 2025',
    category: 'Full-Stack',
    tags: ['Full-Stack', 'Django'],
    description: 'Enterprise asset tracking platform with Python REST API backend and responsive React analytics dashboard.',
    tech: ['Python', 'Django', 'React', 'REST APIs'],
    github: 'https://github.com/Vishnuvsh/asset-management-backend',
    live: 'https://asset-management-frontend-ochre.vercel.app',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    accent: '#f59e0b',
    device: 'laptop',
  },
  {
    title: 'E-COMMERCE SYSTEM',
    subtitle: 'Online Store & Admin • 2025',
    category: 'Full-Stack',
    tags: ['Web', 'Full-Stack'],
    description: 'Complete e-commerce platform with product catalogs, shopping cart, checkout workflow, and admin controls.',
    tech: ['Python', 'MySQL', 'HTML', 'Bootstrap'],
    github: 'https://github.com/Vishnuvsh/Ecommerce',
    live: 'https://github.com/Vishnuvsh/Ecommerce',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    accent: '#e11d48',
    device: 'phone',
  },
];

const EXPERIENCES = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance & Client Systems',
    location: 'Remote',
    period: '2023 – Present',
    type: 'Full-time / Contract',
    description:
      'Developing scalable web applications using React, Python, and Django for diverse client specifications. Focusing on clean code, responsive design, and seamless user experiences that drive real business value.',
    achievements: [
      'Delivered 10+ client web applications on time and with 100% satisfaction',
      'Improved core web vitals and application performance by 40% through code splitting',
      'Built reusable component architectures that accelerated feature release cycles by 30%',
    ],
    skills: ['React 19', 'Python', 'Django REST', 'MySQL', 'RESTful APIs', 'Tailwind CSS', 'MCP'],
    color: 'from-rose-500 to-amber-500',
    accent: '#f43f5e',
    accentLight: 'rgba(244, 63, 94, 0.12)',
  },
  {
    role: 'Software Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'On-site / Hybrid',
    period: '2022 – 2023',
    type: 'Internship',
    description:
      'Assisted in building RESTful APIs, optimized database queries, and collaborated with the engineering team to implement modern, responsive user interfaces.',
    achievements: [
      'Built and integrated 5+ RESTful endpoints consumed by mobile and web clients',
      'Reduced database query latency by 35% through indexing and query optimization',
      'Collaborated on frontend redesign that improved user retention by 25%',
    ],
    skills: ['Python', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'Git & GitHub'],
    color: 'from-orange-500 to-amber-500',
    accent: '#ff6b6b',
    accentLight: 'rgba(255, 107, 107, 0.12)',
  },
];

const CODE_SNIPPET = `// vishnu.config.ts
export const vishnu = {
  name: "Vishnu V",
  title: "Full-Stack Developer",
  location: "Kerala, India 🇮🇳",
  status: "Available for Hire 🟢",
  stack: {
    frontend: ["React 19", "Tailwind CSS", "Framer Motion", "Lenis"],
    backend:  ["Python", "Django REST Framework", "MySQL", "APIs"],
    tooling:  ["Model Context Protocol (MCP)", "Git", "Vite"]
  },
  deliverables: [
    "High-performance responsive web apps",
    "Scalable database architectures",
    "Production-grade full-stack solutions"
  ]
};`;

// =====================================================================
// 3. BACKGROUND & AMBIENT VISUALS
// =====================================================================
function FloatingParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2.8 + 1.2,
      duration: Math.random() * 14 + 16,
      delay: Math.random() * 6,
      color: i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent-2)',
    }))
  );

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" style={{ contain: 'paint' }} aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-4%',
            width: p.size,
            height: p.size,
            background: p.color,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -1100],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 25, 0],
            opacity: [0, 0.45, 0.45, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none" style={{ contain: 'paint' }} aria-hidden="true">
      {/* 1. Primary Central Overhead Stage Spotlight */}
      <motion.div
        animate={{ scale: [1, 1.08, 0.96, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] h-[90vw] max-h-[1000px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.22) 0%, rgba(255, 107, 107, 0.16) 32%, rgba(251, 146, 60, 0.08) 55%, transparent 75%)',
          filter: 'blur(100px)',
          willChange: 'transform, opacity',
        }}
      />
      {/* 2. Stage Left Rim Spotlight */}
      <motion.div
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] -left-[18%] w-[65vw] max-w-[800px] h-[65vw] max-h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.17) 0%, rgba(244, 63, 94, 0.09) 42%, transparent 70%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />
      {/* 3. Stage Right Fill Spotlight */}
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 50, -25, 0], scale: [1, 0.92, 1.10, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[32%] -right-[18%] w-[70vw] max-w-[850px] h-[70vw] max-h-[850px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 107, 0.19) 0%, rgba(251, 113, 133, 0.10) 40%, rgba(251, 146, 60, 0.05) 60%, transparent 75%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />
      {/* 4. Stage Floor Wash */}
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 35, 0], rotate: [0, 90, 180, 360] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute bottom-[6%] left-[12%] w-[60vw] max-w-[750px] h-[60vw] max-h-[750px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, rgba(255, 107, 107, 0.08) 45%, transparent 70%)',
          filter: 'blur(110px)',
          willChange: 'transform',
        }}
      />
      {/* 5. Dot-Grid Architectural Matrix */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #f43f5e 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        backgroundImage: 'linear-gradient(90deg, #f43f5e, #ff6b6b, #fb923c, #f43f5e)',
        backgroundSize: '300% 100%',
        animation: 'gradient-shift 3s linear infinite',
      }}
    />
  );
}

function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-md mx-auto my-0"
    >
      <div className="section-divider" />
    </motion.div>
  );
}

// =====================================================================
// 4. MICRO-INTERACTION COMPONENTS
// =====================================================================
function ScrambleTypewriter({ words }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0] || '');
  const [phase, setPhase] = useState('holding');
  const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&';

  useEffect(() => {
    const word = words[currentWordIndex];
    let iteration = 0;

    if (phase === 'typing') {
      const interval = setInterval(() => {
        setDisplayText(
          word.split('').map((letter, idx) => {
            if (idx < Math.floor(iteration)) return letter;
            if (letter === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('').slice(0, Math.ceil(iteration + 1))
        );
        iteration += 0.45;
        if (iteration >= word.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('holding'), 200);
        }
      }, 30);
      return () => clearInterval(interval);
    }

    if (phase === 'holding') {
      setDisplayText(word);
      const timeout = setTimeout(() => setPhase('deleting'), 2400);
      return () => clearTimeout(timeout);
    }

    if (phase === 'deleting') {
      let len = word.length;
      const interval = setInterval(() => {
        len -= 1;
        setDisplayText(word.slice(0, len));
        if (len <= 0) {
          clearInterval(interval);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setPhase('typing');
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [phase, currentWordIndex, words]);

  return (
    <span className="inline-block min-w-[20px]">
      <span className="text-gradient font-bold">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block ml-1 w-[3px] h-[0.85em] rounded-sm align-middle"
        style={{
          background: 'linear-gradient(180deg, var(--color-accent), var(--color-accent-2))',
          boxShadow: '0 0 10px var(--color-accent)',
        }}
      />
    </span>
  );
}

function SparklesText({ text }) {
  return (
    <span className="relative inline-block px-1.5 font-extrabold">
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent)] drop-shadow-sm">
        {text}
      </span>
      <motion.span
        className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </span>
  );
}

function MagneticButton({ href, children, variant = 'primary', onClick, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20 });
  const springY = useSpring(y, { stiffness: 220, damping: 20 });
  const lenis = useLenis();

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (href && href.startsWith('#')) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, { offset: -60, duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const cls = variant === 'primary'
    ? 'relative flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white font-semibold shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/50 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden group cursor-pointer text-sm sm:text-base'
    : 'relative flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-md text-[var(--color-text-main)] font-semibold hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden group cursor-pointer text-sm sm:text-base';

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={cls}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.a>
  );
}

// =====================================================================
// 5. NAVBAR
// =====================================================================
function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { scrollY } = useScroll();
  const lenis = useLenis();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      if (href === '#' || href === '') {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        lenis.scrollTo(href, { offset: -60, duration: 1.2 });
      }
    } else {
      if (href === '#' || href === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 glass-premium shadow-lg shadow-black/5 dark:shadow-black/30'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-6xl">
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="relative text-xl font-extrabold tracking-tight text-[var(--color-text-main)] group cursor-pointer"
        >
          <span className="text-gradient">Vishnu</span>
          <span className="text-[var(--color-accent-2)]">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors rounded-xl group cursor-pointer"
            >
              {link.name}
              <span className="absolute inset-0 rounded-xl bg-[var(--color-accent)]/0 group-hover:bg-[var(--color-accent)]/8 transition-all duration-300" />
              {activeLink === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2))',
                    boxShadow: '0 0 10px rgba(244, 63, 94, 0.5)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2.5 rounded-xl bg-[var(--color-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="ml-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white text-sm font-semibold shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-[var(--color-accent)]/50 transition-all cursor-pointer"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--color-secondary)] text-[var(--color-text-muted)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-premium border-b border-[var(--color-border)] px-6 py-5 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 text-base font-semibold text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-2 text-center py-3 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white font-semibold shadow-md"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// =====================================================================
// 6. HERO SECTION WITH CENTRAL CUTOUT PORTRAIT & CHOREOGRAPHY
// =====================================================================
function CentralCutoutPortrait({ scrollYProgress }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springProgress = useSpring(scrollYProgress, { stiffness: 85, damping: 24, restDelta: 0.001 });

  const portraitY = useTransform(springProgress, [0, 1], [0, 170]);
  const portraitScale = useTransform(springProgress, [0, 0.45, 1], [1, 1.09, 0.93]);
  const scrollRotateX = useTransform(springProgress, [0, 1], [0, 14]);
  const scrollRotateY = useTransform(springProgress, [0, 1], [0, -10]);
  const scrollRotateZ = useTransform(springProgress, [0, 1], [0, 2]);

  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 25 });
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 25 });

  const finalRotateX = useTransform([scrollRotateX, mouseRotateX], ([s, m]) => s + m);
  const finalRotateY = useTransform([scrollRotateY, mouseRotateY], ([s, m]) => s + m);

  const badgeExpY = useTransform(springProgress, [0, 1], [0, 80]);
  const badgeAvailY = useTransform(springProgress, [0, 1], [0, 220]);
  const badgeStatsY = useTransform(springProgress, [0, 1], [0, 130]);

  const stageLightScale = useTransform(springProgress, [0, 0.5, 1], [1, 1.25, 0.95]);
  const stageLightOpacity = useTransform(springProgress, [0, 0.8, 1], [0.95, 1, 0.35]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center my-6 lg:my-0 w-full max-w-[420px] lg:max-w-none mx-auto select-none"
      style={{ perspective: 1300 }}
    >
      {/* 1. Volumetric Key Glow Circle */}
      <motion.div
        className="absolute w-[360px] h-[360px] sm:w-[440px] h-[440px] lg:w-[480px] lg:h-[480px] rounded-full pointer-events-none"
        style={{
          scale: stageLightScale,
          opacity: stageLightOpacity,
          background: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.40) 0%, rgba(255, 107, 107, 0.28) 38%, rgba(251, 146, 60, 0.10) 60%, transparent 75%)',
          filter: 'blur(60px)',
          willChange: 'transform, opacity',
        }}
      />
      {/* 2. Secondary Animated Rim Halo Circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[400px] lg:h-[400px] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'conic-gradient(from 0deg, rgba(244, 63, 94, 0.45), rgba(255, 107, 107, 0.35), transparent 45%, rgba(255, 107, 107, 0.3), rgba(244, 63, 94, 0.45))',
          filter: 'blur(45px)',
        }}
      />
      {/* 3. Stage Floor Bounce Light Anchor */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] sm:w-[105%] h-20 rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.30) 0%, rgba(255, 107, 107, 0.15) 45%, transparent 75%)',
          filter: 'blur(28px)',
        }}
      />

      {/* 3D Cutout Portrait Container */}
      <motion.div
        style={{
          y: portraitY,
          scale: portraitScale,
          rotateX: finalRotateX,
          rotateY: finalRotateY,
          rotateZ: scrollRotateZ,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center cursor-pointer group"
      >
        <div
          className="relative w-[260px] h-[340px] sm:w-[310px] sm:h-[400px] md:w-[340px] md:h-[440px] lg:w-[360px] lg:h-[460px] xl:w-[380px] xl:h-[480px] rounded-[36px] sm:rounded-[44px] overflow-hidden border-2 border-white/85 dark:border-white/20 shadow-[0_25px_60px_-15px_rgba(244,63,94,0.32)] backdrop-blur-md"
          style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 100%)' }}
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20" />
          <img
            src="/profile.jpg"
            alt="Vishnu V - Full-Stack Developer"
            className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #f43f5e 0%, #ff6b6b 50%, #fb923c 100%)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/15 via-transparent to-[var(--color-accent-2)]/20 pointer-events-none mix-blend-overlay z-10" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-bg-base)]/70 via-[var(--color-bg-base)]/20 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
        </div>

        {/* Orbiting Satellite Badges */}
        <motion.div style={{ y: badgeExpY, z: 55 }} className="absolute -top-4 -left-4 sm:-top-5 sm:-left-8 lg:-left-6 z-30">
          <div className="glass-premium rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xl border border-white/80 dark:border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center text-white shadow-md shadow-[var(--color-accent)]/30">
              <Code2 size={19} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-text-main)]">3+ Years Exp.</div>
              <div className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-medium">Full-Stack Dev</div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y: badgeAvailY, z: 45 }} className="absolute top-24 -right-4 sm:top-28 sm:-right-8 lg:-right-6 z-30">
          <div className="glass-premium rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xl border border-white/80 dark:border-white/10 flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-text-main)]">Available for Hire</div>
              <div className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium">Full-time & Contracts</div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y: badgeStatsY, z: 35 }} className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:left-4 z-30 flex">
          <div className="glass-premium rounded-2xl px-3.5 py-2 shadow-lg border border-white/80 dark:border-white/10 flex items-center gap-2">
            <Sparkles size={14} className="text-[var(--color-accent)] animate-pulse" />
            <span className="text-xs font-semibold text-[var(--color-text-main)]">15+ Production Apps Built</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const handleScrollTo = (target) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-8 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
    >
      {/* Background Volumetric Mesh Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[var(--color-accent)]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--color-accent-2)]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 my-auto py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center">
          
          {/* Left Column: Headlines, Bio, Tech Stack, CTAs, Stats */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            {/* Status pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5">
              <span className="px-3.5 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-md text-xs font-semibold text-[var(--color-text-main)] shadow-xs flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for opportunities
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/8 backdrop-blur-md text-xs font-semibold text-[var(--color-accent)] shadow-xs flex items-center gap-2">
                <Sparkles size={13} className="text-[var(--color-accent)] animate-pulse" />
                MCP 1.0 & AI Integrated
              </span>
            </div>

            {/* Main Headline & Role */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-[var(--color-text-main)] mb-2">
                Hi, I'm <SparklesText text="Vishnu" />
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] min-h-[1.4em] flex items-center justify-center lg:justify-start">
                <ScrambleTypewriter words={ROLES} />
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed mb-6 font-normal">
              Engineering scalable web architectures, tactile micro-interactions, and AI-augmented applications with{' '}
              <span className="text-[var(--color-text-main)] font-semibold">React 19</span>,{' '}
              <span className="text-[var(--color-text-main)] font-semibold">Python</span>, and{' '}
              <span className="text-gradient-static font-semibold">volumetric design precision</span>.
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 max-w-xl">
              {['React 19', 'Python & Django', 'Tailwind CSS', 'MySQL', 'RESTful APIs', 'Model Context Protocol (MCP)'].map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/75 text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 hover:scale-105 transition-all duration-300 cursor-default shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs & Socials */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 w-full">
              <MagneticButton href="#projects" variant="primary">
                View My Work
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={18} />
                </motion.span>
              </MagneticButton>
              <MagneticButton
                href="https://resilient-genie-df3d71.netlify.app/VishnuV%20-%20Python%20Developer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Download CV
                <Download size={17} />
              </MagneticButton>

              <div className="flex items-center gap-2.5 sm:ml-2">
                {HERO_SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-md text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Impact Metrics Row */}
            <div className="w-full max-w-lg grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[var(--color-border)]/80">
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '15+', label: 'Projects Built' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient tracking-tight">{stat.value}</div>
                  <div className="text-[11px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Portrait with Orbiting Satellites */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <CentralCutoutPortrait scrollYProgress={scrollYProgress} />
          </div>

        </div>
      </div>

      {/* Scroll Cue */}
      <div
        onClick={() => handleScrollTo('#about')}
        className="relative z-10 flex flex-col items-center gap-2 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-accent)] transition-colors group pt-3 pb-1"
      >
        <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-[var(--color-border)] group-hover:border-[var(--color-accent)] flex items-start justify-center p-1 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-[var(--color-accent)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

// =====================================================================
// 7. ABOUT SECTION (DEVELOPER BENTO GRID)
// =====================================================================
function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-xs font-semibold text-[var(--color-accent)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Engineering Philosophy
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] tracking-tight mb-4">
            Crafting digital <span className="text-gradient">experiences</span> that matter
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            I combine robust software engineering with thoughtful design principles to build applications that are powerful, intuitive, and built for production.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Card 1: IDE Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/85 backdrop-blur-md shadow-xl overflow-hidden flex flex-col group hover:border-[var(--color-accent)]/40 transition-colors duration-400"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)]/70 bg-[var(--color-secondary)]/50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs font-mono font-medium text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <Terminal size={13} className="text-[var(--color-accent)]" />
                  vishnu.config.ts
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors cursor-pointer"
                aria-label="Copy snippet"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--color-text-main)] overflow-x-auto flex-1 bg-[var(--color-bg-base)]/50">
              <div className="text-[var(--color-text-muted)]">// System configuration &amp; architectural scope</div>
              <div>
                <span className="text-[var(--color-accent)] font-semibold">export const</span>{' '}
                <span className="font-bold text-[var(--color-accent-2)]">vishnu</span> = {'{'}
              </div>
              <div className="pl-4"><span className="text-[var(--color-text-muted)]">name:</span> <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Vishnu V"</span>,</div>
              <div className="pl-4"><span className="text-[var(--color-text-muted)]">role:</span> <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Full-Stack Developer"</span>,</div>
              <div className="pl-4"><span className="text-[var(--color-text-muted)]">status:</span> <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Available for Hire 🟢"</span>,</div>
              <div className="pl-4"><span className="text-[var(--color-text-muted)]">stack:</span> {'{'}</div>
              <div className="pl-8"><span className="text-[var(--color-text-muted)]">frontend:</span> [<span className="text-amber-600 dark:text-amber-400">"React 19"</span>, <span className="text-amber-600 dark:text-amber-400">"Tailwind CSS"</span>, <span className="text-amber-600 dark:text-amber-400">"Framer Motion"</span>],</div>
              <div className="pl-8"><span className="text-[var(--color-text-muted)]">backend:</span> [<span className="text-amber-600 dark:text-amber-400">"Python"</span>, <span className="text-amber-600 dark:text-amber-400">"Django REST"</span>, <span className="text-amber-600 dark:text-amber-400">"MySQL"</span>],</div>
              <div className="pl-8"><span className="text-[var(--color-text-muted)]">protocols:</span> [<span className="text-amber-600 dark:text-amber-400">"Model Context Protocol (MCP)"</span>, <span className="text-amber-600 dark:text-amber-400">"REST APIs"</span>]</div>
              <div className="pl-4">{'}'},</div>
              <div className="pl-4"><span className="text-[var(--color-text-muted)]">focus:</span> <span className="text-indigo-600 dark:text-indigo-400 font-medium">"High-velocity, performant &amp; delightful web applications"</span></div>
              <div>{'};'}</div>
            </div>

            <div className="px-5 py-3 border-t border-[var(--color-border)]/70 bg-[var(--color-secondary)]/30 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All systems operational</span>
              </span>
              <span className="font-mono text-[11px]">UTF-8 • Node v20 • React 19</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/85 backdrop-blur-md p-6 sm:p-8 shadow-xl flex flex-col justify-between group hover:border-[var(--color-accent)]/40 transition-colors duration-400 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-3">
                <Cpu size={14} />
                Background &amp; Expertise
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-main)] mb-3 leading-snug">
                Bridging backend stability with frontend finesse.
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                Based in Kerala, India, I specialize in full-stack architecture that scales effortlessly. My passion lies in taking ideas from raw database schemas to polished, responsive, and animated user experiences.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Whether implementing complex RESTful services in Python/Django or crafting buttery-smooth interactive components in React, I focus on velocity, maintainability, and client satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-6 mt-6 border-t border-[var(--color-border)]/70">
              {[
                '3+ Years Building',
                '15+ Projects Shipped',
                'Django REST APIs',
                'Modern React & Next.js',
                'MySQL Database Design',
                'MCP AI Integration',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-main)]">
                  <CheckCircle2 size={14} className="text-[var(--color-accent)] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bento Row 2: 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${pillar.color}15`, color: pillar.color }}
              >
                <pillar.icon size={20} />
              </div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-1">
                {pillar.badge}
              </div>
              <h4 className="text-base font-bold text-[var(--color-text-main)] mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {pillar.desc}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: pillar.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 8. SKILLS SECTION
// =====================================================================
function CircularProgressRing({ level, color, size = 80, strokeWidth = 5, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-border)" strokeWidth={strokeWidth} opacity={0.5} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-[var(--color-text-main)]">{level}%</span>
      </div>
    </div>
  );
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const activeCat = SKILL_CATEGORIES.find((c) => c.name === activeCategory);

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">Tech Stack</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-accent)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">Technologies and tools I wield to bring ideas to life.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden cursor-pointer ${
                activeCategory === cat.name
                  ? 'text-white shadow-lg'
                  : 'text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:text-[var(--color-text-main)]'
              }`}
            >
              {activeCategory === cat.name && (
                <motion.div
                  layoutId="active-cat-bg"
                  className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-2xl`}
                  style={{ boxShadow: `0 4px 20px ${cat.glow}` }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 py-4 max-w-4xl mx-auto"
          >
            {activeCat?.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <CircularProgressRing level={skill.level} color={activeCat.ringColor} delay={i * 0.05} />
                <span className="text-sm font-semibold text-[var(--color-text-main)] text-center leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Marquee Ticker */}
        <div className="mt-20 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg-base)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg-base)] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[...SKILL_CATEGORIES.flatMap((c) => c.skills.map((s) => s.name)), ...SKILL_CATEGORIES.flatMap((c) => c.skills.map((s) => s.name))].map((name, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/70 backdrop-blur-sm text-sm text-[var(--color-text-muted)] font-medium flex-shrink-0 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 9. PROJECTS SECTION (STUDIO NINE 2-COLUMN GRID)
// =====================================================================
function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web', 'AI API', 'Python', 'Full-Stack'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter || p.tags.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="py-24 sm:py-28 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative max-w-7xl">
        {/* iOS Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.1] backdrop-blur-md mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-accent)]">iOS App Suite • Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-3 tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed">
            A curated suite of production apps, AI integrations, and responsive architectures crafted with tactile precision.
          </p>
        </motion.div>

        {/* Apple iOS Segmented Control Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'text-[var(--color-text-main)] dark:text-white'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="ios-project-filter"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-black/[0.04] dark:border-white/[0.1]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat}
                    {cat === 'All' && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold' : 'bg-black/5 dark:bg-white/10 text-[var(--color-text-muted)]'}`}>
                        {PROJECTS.length}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact 3-Column iOS App Store Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group relative rounded-[26px] border border-black/[0.08] dark:border-white/[0.1] bg-white/75 dark:bg-[#12151c]/80 backdrop-blur-2xl p-3.5 sm:p-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(244,63,94,0.18)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle iOS ambient glow on hover */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ background: project.accent || 'var(--color-accent)' }}
                />

                <div>
                  {/* Compact Media Stage with iOS App Preview Frame */}
                  <div className="relative h-36 sm:h-40 w-full rounded-[18px] overflow-hidden bg-zinc-950 mb-3.5 group/media ring-1 ring-inset ring-black/10 dark:ring-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

                    {/* iOS Dynamic Glass Badges on Image */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-semibold text-white/90 border border-white/15 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent || '#f43f5e' }} />
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/15 flex items-center gap-1">
                        {project.device === 'phone' ? (
                          <>
                            <Smartphone size={11} className="text-white/80" />
                            <span>iOS</span>
                          </>
                        ) : (
                          <>
                            <Laptop size={11} className="text-white/80" />
                            <span>macOS</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* iOS App Meta Header: Squircle App Icon + Title */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div
                      className="w-10 h-10 rounded-[12px] flex items-center justify-center text-white shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${project.accent || 'var(--color-accent)'} 0%, var(--color-accent-2) 100%)`,
                        boxShadow: `0 4px 12px ${project.accent ? `${project.accent}40` : 'rgba(244,63,94,0.3)'}`,
                      }}
                    >
                      <Code2 size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-accent)] truncate">
                        {project.subtitle}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Concise 2-line Description */}
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-3 min-h-[2.5em]">
                    {project.description}
                  </p>

                  {/* Compact iOS Tech Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-[var(--color-text-main)] border border-black/[0.04] dark:border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* iOS App Store Action Bar */}
                <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Open</span>
                    <ExternalLink size={12} />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    aria-label={`Source code for ${project.title}`}
                  >
                    <GithubIcon size={13} />
                    <span className="text-[11px]">Code</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// =====================================================================
// 10. EXPERIENCE SECTION
// =====================================================================
function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">Journey</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-accent)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">My engineering path and measurable contributions across teams and clients.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-[var(--color-border)] space-y-8">
          {EXPERIENCES.map((exp, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={exp.role} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 z-10">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-[var(--color-bg-base)] shadow-md flex items-center justify-center"
                    style={{ background: exp.accent }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/85 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full text-left p-6 flex items-start gap-4 cursor-pointer"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                      style={{ background: `${exp.accent}15`, color: exp.accent }}
                    >
                      <Briefcase size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-[var(--color-text-main)]">{exp.role}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: exp.accentLight, color: exp.accent }}>
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[var(--color-text-muted)]">
                        <span className="font-semibold text-[var(--color-text-main)]">{exp.company}</span>
                        <span className="flex items-center gap-1"><Calendar size={13} /> {exp.period}</span>
                        <span className="flex items-center gap-1"><MapPin size={13} /> {exp.location}</span>
                      </div>
                    </div>
                    <ChevronDown size={18} className={`text-[var(--color-text-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 pt-2 border-t border-[var(--color-border)]/60"
                      >
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{exp.description}</p>
                        <div className="mb-4">
                          <h4 className="text-xs font-bold text-[var(--color-text-main)] uppercase tracking-wider mb-2">Key Accomplishments</h4>
                          <ul className="space-y-1.5">
                            {exp.achievements.map((ach, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text-muted)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((s) => (
                            <span key={s} className="px-2.5 py-1 text-xs font-semibold rounded-lg border" style={{ background: exp.accentLight, color: exp.accent, borderColor: `${exp.accent}25` }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// 11. CONTACT SECTION
// =====================================================================
function Contact() {
  const [submitState, setSubmitState] = useState('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('vishnuvsh44@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState('loading');
    setTimeout(() => setSubmitState('success'), 1200);
    setTimeout(() => setSubmitState('idle'), 4000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] relative"
        >
          {/* Left Panel */}
          <div className="lg:w-2/5 p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent)] text-white relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white mb-6 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                Available for New Projects
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                Let's build <br /> something <span className="italic font-normal underline decoration-white/40">extraordinary.</span>
              </h2>
              <p className="text-white/85 text-sm sm:text-base mb-10 max-w-sm font-light leading-relaxed">
                Whether you have an upcoming project, a full-time role, or an architectural challenge, my inbox is always open.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-sm backdrop-blur-sm flex-shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">Email</p>
                    <div className="flex items-center gap-2">
                      <a href="mailto:vishnuvsh44@gmail.com" className="text-sm sm:text-base font-semibold hover:text-white/80 transition-colors truncate">
                        vishnuvsh44@gmail.com
                      </a>
                      <button onClick={handleCopyEmail} className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors cursor-pointer text-white" title="Copy Email">
                        {copiedEmail ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-sm backdrop-blur-sm flex-shrink-0">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">Direct Call</p>
                    <a href="tel:+916282195381" className="text-sm sm:text-base font-semibold hover:text-white/80 transition-colors">
                      +91 6282195381
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-sm backdrop-blur-sm flex-shrink-0">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">Location &amp; Timezone</p>
                    <p className="text-sm sm:text-base font-semibold">Vadakara, Kerala, India</p>
                    <p className="text-xs text-white/75 mt-0.5 flex items-center gap-1">
                      <Clock size={11} /> UTC +5:30 (IST) • Rapid response
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-6 border-t border-white/20 flex flex-col gap-3">
              <p className="text-xs text-white/80 font-semibold tracking-wider uppercase">Direct Profiles</p>
              <div className="flex gap-3">
                <a href="https://github.com/Vishnuvsh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--color-accent)] transition-all cursor-pointer">
                  <GithubIcon size={18} />
                </a>
                <a href="http://www.linkedin.com/in/vishnu-v-b5256b341" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--color-accent)] transition-all cursor-pointer">
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:w-3/5 p-8 sm:p-12 lg:p-14 bg-[var(--color-bg-surface)] relative flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/8 text-xs font-semibold text-[var(--color-accent)] mb-4 border border-[var(--color-accent)]/20">
                <Sparkles size={12} />
                Direct Inquiry
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-main)] mb-2 tracking-tight">
                Send me a message
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mb-8">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">First Name *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]/50 focus:border-[var(--color-accent)] outline-none text-sm text-[var(--color-text-main)]" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]/50 focus:border-[var(--color-accent)] outline-none text-sm text-[var(--color-text-main)]" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Email *</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]/50 focus:border-[var(--color-accent)] outline-none text-sm text-[var(--color-text-main)]" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]/50 focus:border-[var(--color-accent)] outline-none text-sm text-[var(--color-text-main)]" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Subject *</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]/50 focus:border-[var(--color-accent)] outline-none text-sm text-[var(--color-text-main)]" placeholder="Project Opportunity" />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Message *</label>
                  <textarea rows={4} required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]/50 focus:border-[var(--color-accent)] outline-none text-sm text-[var(--color-text-main)] resize-none" placeholder="Tell me about your project or role..." />
                </div>

                <AnimatePresence mode="wait">
                  {submitState === 'success' ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-4 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 text-sm flex items-center gap-2.5">
                      <CheckCircle2 size={18} />
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitState === 'loading'}
                      className="self-start px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white font-semibold shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/45 transition-all cursor-pointer flex items-center gap-2 text-sm disabled:opacity-70"
                    >
                      {submitState === 'loading' ? (
                        <>
                          <Loader size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =====================================================================
// 12. FOOTER
// =====================================================================
function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-14 border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-extrabold tracking-tight text-gradient block mb-1">
              Vishnu<span className="text-[var(--color-accent-2)]">.</span>
            </span>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
              Crafting digital experiences that matter with React 19 &amp; Python.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/Vishnuvsh" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-colors">
              <GithubIcon size={17} />
            </a>
            <a href="http://www.linkedin.com/in/vishnu-v-b5256b341" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-colors">
              <LinkedinIcon size={17} />
            </a>
            <button onClick={scrollToTop} className="p-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-colors cursor-pointer" title="Back to top">
              <ArrowUp size={17} />
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-[var(--color-text-muted)] mt-8 pt-6 border-t border-[var(--color-border)]/50">
          © {new Date().getFullYear()} Vishnu V. All rights reserved. Built with React 19, Tailwind CSS &amp; Framer Motion.
        </div>
      </div>
    </footer>
  );
}

// =====================================================================
// 13. MAIN APP (SINGLE-PAGE ALL-IN-ONE ARCHITECTURE)
// =====================================================================
export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.6,
        infinite: false,
      }}
    >
      <div className="relative w-full overflow-x-hidden min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-main)] transition-colors duration-300">
        <ScrollProgress />
        <AnimatedBackground />
        <FloatingParticles />
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Contact />
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}

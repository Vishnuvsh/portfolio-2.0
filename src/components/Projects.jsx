import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, ArrowUpRight } from 'lucide-react';

// GitHub inline icon
const GithubIcon = ({ size = 15 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const projects = [
  {
    title: 'AI VIDEO TRANSLATOR',
    subtitle: 'AI Video Dubbing • 2026',
    tags: ['Web', 'AI API'],
    description: 'Translates and dubs video content across multiple languages with synchronized neural voice synthesis.',
    tech: ['React 19', 'JavaScript', 'AI APIs', 'Node.js'],
    github: 'https://github.com/Vishnuvsh/ai-video-translator',
    live: 'https://ai-video-translator-rouge.vercel.app',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    featured: true,
    accent: '#f43f5e',
    device: 'laptop',
  },
  {
    title: 'HOME TRIP MODE',
    subtitle: 'Smart Travel Planner • 2026',
    tags: ['Mobile', '3D'],
    description: 'Smart travel planning app with automated route optimization, checklist management, and real-time updates.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Vishnuvsh/home-trip-mode',
    live: 'https://home-trip-mode.vercel.app',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
    featured: true,
    accent: '#ff6b6b',
    device: 'phone',
  },
  {
    title: 'STARTUP VALIDATOR',
    subtitle: 'Market Intelligence • 2026',
    tags: ['Web', 'AI API'],
    description: 'Automated platform that evaluates startup concepts, analyzes competition, and calculates feasibility scores.',
    tech: ['Next.js', 'TypeScript', 'AI APIs'],
    github: 'https://github.com/Vishnuvsh/ai-startup-validator',
    live: 'https://ai-startup-validator-xi.vercel.app',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop',
    featured: true,
    accent: '#10b981',
    device: 'laptop',
  },
  {
    title: 'VISION CONTROLLER',
    subtitle: 'Computer Vision • 2026',
    tags: ['Desktop', 'Python'],
    description: 'Computer vision software controlling desktop and cursor navigation in real-time via camera hand gestures.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    github: 'https://github.com/Vishnuvsh/ai-vision-computer-controller',
    live: 'https://github.com/Vishnuvsh/ai-vision-computer-controller',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    featured: true,
    accent: '#fb923c',
    device: 'laptop',
  },
  {
    title: 'ASSET MANAGEMENT',
    subtitle: 'Enterprise Platform • 2025',
    tags: ['Full-Stack', 'Django'],
    description: 'Enterprise asset tracking platform with Python REST API backend and responsive React analytics dashboard.',
    tech: ['Python', 'Django', 'React', 'REST APIs'],
    github: 'https://github.com/Vishnuvsh/asset-management-backend',
    live: 'https://asset-management-frontend-ochre.vercel.app',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    featured: true,
    accent: '#f59e0b',
    device: 'laptop',
  },
  {
    title: 'E-COMMERCE SYSTEM',
    subtitle: 'Online Store & Admin • 2025',
    tags: ['Web', 'Full-Stack'],
    description: 'Complete e-commerce platform with product catalogs, shopping cart, checkout workflow, and admin controls.',
    tech: ['Python', 'MySQL', 'HTML', 'Bootstrap'],
    github: 'https://github.com/Vishnuvsh/Ecommerce',
    live: 'https://github.com/Vishnuvsh/Ecommerce',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    featured: false,
    accent: '#e11d48',
    device: 'phone',
  },
];

// Project Card inspired by Studio Nine layout
function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex flex-col"
    >
      <div className="group relative flex flex-col sm:flex-row justify-between h-full min-h-[250px] rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 md:p-7 transition-all duration-400 hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-[var(--color-accent)]/10">
        {/* Soft ambient colored glow behind device mockup */}
        <div
          className="absolute -right-6 -bottom-6 w-56 h-56 rounded-full blur-[65px] opacity-25 dark:opacity-35 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
        />

        {/* Left Side: Info & Actions */}
        <div className="flex flex-col justify-between z-10 sm:max-w-[55%] flex-1 pr-2 sm:pr-4">
          <div>
            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-[var(--color-border)] bg-[var(--color-secondary)]/80 text-[var(--color-text-muted)] tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bold Project Title */}
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors leading-tight mb-1">
              {project.title}
            </h3>

            {/* Subtitle / Category & Year */}
            <p className="text-xs font-semibold text-[var(--color-text-muted)] tracking-wide mb-2.5">
              {project.subtitle}
            </p>

            {/* Concise Description */}
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-2 mt-auto">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Live Demo</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:border-[var(--color-accent)]/40 transition-all hover:scale-105"
            >
              <GithubIcon size={13} />
              <span>Code</span>
            </a>
          </div>
        </div>

        {/* Right Side: Floating Device Showcase */}
        <div className="relative mt-5 sm:mt-0 sm:w-[45%] flex items-center justify-center sm:justify-end z-10 pointer-events-none">
          {project.device === 'phone' ? (
            /* Sleek Smartphone Mockup */
            <div className="relative w-28 md:w-32 rounded-[22px] border-[3px] border-slate-700/80 bg-slate-950 p-1 shadow-2xl transform sm:rotate-[-3deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
              {/* Dynamic island */}
              <div className="w-6 h-1.5 bg-black rounded-full mx-auto mb-1" />
              <div className="relative rounded-[16px] overflow-hidden h-36 md:h-40 bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          ) : (
            /* Sleek Laptop / Browser Mockup */
            <div className="relative w-full max-w-[210px] md:max-w-[230px] rounded-xl border border-slate-700/60 bg-slate-950 shadow-2xl overflow-hidden transform sm:rotate-[2.5deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
              {/* Browser bar */}
              <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-900/90 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                <div className="ml-1.5 px-1.5 py-0.2 rounded bg-white/10 text-[8px] text-white/50 font-mono truncate max-w-[90px]">
                  {project.live.replace('https://', '')}
                </div>
              </div>
              {/* Screen preview */}
              <div className="relative h-28 md:h-32 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = useMemo(() => [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'featured', label: '⭐ Featured', count: projects.filter((p) => p.featured).length },
    { id: 'python', label: '🐍 Python & Django', count: projects.filter((p) => p.tech.some((t) => /python|django/i.test(t))).length },
    { id: 'react', label: '⚛️ React / UI', count: projects.filter((p) => p.tech.some((t) => /react|next/i.test(t))).length },
  ], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'featured') return projects.filter((p) => p.featured);
    if (activeFilter === 'python') return projects.filter((p) => p.tech.some((t) => /python|django/i.test(t)));
    if (activeFilter === 'react') return projects.filter((p) => p.tech.some((t) => /react|next/i.test(t)));
    return projects;
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 dark:bg-[var(--color-bg-surface)]/20" />
      {/* Decorative ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-accent-2)]/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 md:px-12 relative max-w-7xl">
        {/* Studio Nine Inspired Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto mb-10 text-center md:text-left"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--color-accent)] block mb-2.5">
            Selected Works
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[var(--color-text-main)] tracking-tight leading-[1.14]">
            We build digital <span className="text-gradient">experiences</span> that matter
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-10 max-w-6xl mx-auto">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-md shadow-[var(--color-accent)]/20'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-secondary)]/60 border border-[var(--color-border)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[var(--color-secondary)] text-[var(--color-text-muted)]'}`}>
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Aligned Studio Nine Card Grid */}
        <div className="max-w-6xl mx-auto">
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Vishnuvsh"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-sm text-sm text-[var(--color-text-main)] font-semibold hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all duration-300 hover:shadow-md group"
          >
            <GithubIcon size={17} />
            Explore More on GitHub
            <ArrowUpRight size={14} className="text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

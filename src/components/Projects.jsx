import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

// Brand icon not in lucide-react v1
const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce solution with product catalog, cart management, order processing, and an admin dashboard. Built with Python backend and responsive frontend.',
    tech: ['Python', 'HTML', 'CSS', 'Bootstrap', 'MySQL'],
    github: 'https://github.com/Vishnuvsh/Ecommerce',
    live: 'https://github.com/Vishnuvsh/Ecommerce',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    featured: true,
    size: 'large',
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: '#3b82f6',
  },
  {
    title: 'Clinical Management System',
    description: 'Streamlines patient records, appointments, and clinical workflows. Features role-based access and real-time dashboard.',
    tech: ['Python', 'React', 'Tailwind CSS', 'MySQL'],
    github: 'https://github.com/Vishnuvsh',
    live: 'https://github.com/Vishnuvsh',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
    featured: true,
    size: 'medium',
    color: 'from-violet-500/20 to-purple-500/20',
    accent: '#7c3aed',
  },
  {
    title: 'CRM System',
    description: 'Customer relationship management with lead tracking, pipeline management, and automated reporting.',
    tech: ['Python', 'React', 'JavaScript', 'MySQL'],
    github: 'https://github.com/Vishnuvsh',
    live: 'https://github.com/Vishnuvsh',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    featured: false,
    size: 'medium',
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10b981',
  },
  {
    title: 'Portfolio Website',
    description: 'Personal developer portfolio with premium animations, dark mode, and responsive design.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/Vishnuvsh',
    live: 'https://resilient-genie-df3d71.netlify.app/',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    featured: false,
    size: 'small',
    color: 'from-rose-500/20 to-pink-500/20',
    accent: '#f43f5e',
  },
  {
    title: 'Movies CRUD App',
    description: 'Full CRUD application for managing movie lists with search, filter, and category management.',
    tech: ['Python', 'HTML', 'CSS', 'MySQL'],
    github: 'https://github.com/Vishnuvsh/CRUD_Movie_List',
    live: 'https://github.com/Vishnuvsh/CRUD_Movie_List',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
    featured: false,
    size: 'small',
    color: 'from-amber-500/20 to-orange-500/20',
    accent: '#f59e0b',
  },
  {
    title: 'Blog Application',
    description: 'Feature-rich blogging platform with authentication, rich-text editor, categories, and comments.',
    tech: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Vishnuvsh',
    live: 'https://github.com/Vishnuvsh',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    featured: false,
    size: 'small',
    color: 'from-sky-500/20 to-indigo-500/20',
    accent: '#6366f1',
  },
];

// 3D tilt card
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glareX = useTransform(x, [-0.5, 0.5], ['20%', '80%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, []);
  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, []);

  const isLarge = project.size === 'large';
  const isMedium = project.size === 'medium';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`${isLarge ? 'md:col-span-2 md:row-span-2' : isMedium ? 'md:col-span-1 md:row-span-2' : ''}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        className="group relative h-full rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge ? 'h-72' : isMedium ? 'h-52' : 'h-44'}`}>
          {/* Color overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500`} />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-surface)] via-transparent to-transparent z-10" />
          {/* Glare */}
          <motion.div
            className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: useTransform([glareX, glareY], ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.12), transparent 55%)`
              ),
            }}
          />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
            style={{ scale: 1 }}
          />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: project.accent }}
              />
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow" style={{ transform: 'translateZ(10px)' }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className={`font-bold text-[var(--color-text-main)] leading-tight group-hover:text-[var(--color-accent)] transition-colors ${isLarge ? 'text-2xl' : 'text-xl'}`}>
              {project.title}
            </h3>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight size={20} className="text-[var(--color-accent)]" />
            </motion.div>
          </div>

          <p className={`text-[var(--color-text-muted)] leading-relaxed mb-5 ${isLarge ? 'text-base' : 'text-sm'}`}>
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-secondary)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            >
                            <GithubIcon size={16} />
              Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{
                background: `${project.accent}18`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${project.accent}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${project.accent}18`;
              }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg-surface)] dark:bg-[var(--color-bg-surface)]/30" />
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-accent-2)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-[var(--color-accent)]" />
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">Portfolio</span>
            <div className="h-px w-10 bg-[var(--color-accent)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            A curated selection of my work — built with precision and care.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/Vishnuvsh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-main)] font-semibold hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-accent)]/10"
          >
            <GithubIcon size={20} />
            View All on GitHub
            <ArrowUpRight size={16} className="text-[var(--color-accent)]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

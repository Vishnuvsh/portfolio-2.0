import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Sparkles, Zap, Terminal, Copy, Check, Cpu, CheckCircle2 } from 'lucide-react';

const pillars = [
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

const codeSnippet = `// vishnu.config.ts
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

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[var(--color-bg-surface)]/40 dark:bg-[var(--color-bg-surface)]/20 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-accent) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Card 1: Interactive IDE / Code Architecture Preview (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/85 backdrop-blur-md shadow-xl overflow-hidden flex flex-col group hover:border-[var(--color-accent)]/40 transition-colors duration-400"
          >
            {/* Terminal Window Header */}
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

            {/* Code Body */}
            <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--color-text-main)] overflow-x-auto flex-1 bg-[var(--color-bg-base)]/50">
              <div className="text-[var(--color-text-muted)]">// System configuration &amp; architectural scope</div>
              <div>
                <span className="text-[var(--color-accent)] font-semibold">export const</span>{' '}
                <span className="font-bold text-[var(--color-accent-2)]">vishnu</span> = {'{'}
              </div>
              <div className="pl-4">
                <span className="text-[var(--color-text-muted)]">name:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Vishnu V"</span>,
              </div>
              <div className="pl-4">
                <span className="text-[var(--color-text-muted)]">role:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Full-Stack Developer"</span>,
              </div>
              <div className="pl-4">
                <span className="text-[var(--color-text-muted)]">status:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Available for Hire 🟢"</span>,
              </div>
              <div className="pl-4">
                <span className="text-[var(--color-text-muted)]">stack:</span> {'{'}
              </div>
              <div className="pl-8">
                <span className="text-[var(--color-text-muted)]">frontend:</span> [
                <span className="text-amber-600 dark:text-amber-400">"React 19"</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">"Tailwind CSS"</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">"Framer Motion"</span>],
              </div>
              <div className="pl-8">
                <span className="text-[var(--color-text-muted)]">backend:</span> [
                <span className="text-amber-600 dark:text-amber-400">"Python"</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">"Django REST"</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">"MySQL"</span>],
              </div>
              <div className="pl-8">
                <span className="text-[var(--color-text-muted)]">protocols:</span> [
                <span className="text-amber-600 dark:text-amber-400">"Model Context Protocol (MCP)"</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">"REST APIs"</span>]
              </div>
              <div className="pl-4">{'}'},</div>
              <div className="pl-4">
                <span className="text-[var(--color-text-muted)]">focus:</span>{' '}
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">"High-velocity, performant &amp; delightful web applications"</span>
              </div>
              <div>{'};'}</div>
            </div>

            {/* Terminal Footer Status Bar */}
            <div className="px-5 py-3 border-t border-[var(--color-border)]/70 bg-[var(--color-secondary)]/30 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All systems operational</span>
              </span>
              <span className="font-mono text-[11px]">UTF-8 • Node v20 • React 19</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Narrative & Proven Track Record (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/85 backdrop-blur-md p-6 sm:p-8 shadow-xl flex flex-col justify-between group hover:border-[var(--color-accent)]/40 transition-colors duration-400 relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[var(--color-accent)]/10 blur-3xl pointer-events-none" />

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

            {/* Quick Highlights Pill Checklist */}
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

        {/* Bento Row 2: Four Core Engineering Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              {/* Top Accent Indicator */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{
                  background: `${pillar.color}15`,
                  color: pillar.color,
                }}
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

              {/* Hover bottom line accent */}
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

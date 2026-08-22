import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Layers, Sparkles, Zap } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Clean Code', desc: 'Readable, maintainable, scalable architecture', color: '#6366f1' },
  { icon: Layers, label: 'Full-Stack', desc: 'End-to-end solutions from DB to UI', color: '#8b5cf6' },
  { icon: Sparkles, label: 'Creative', desc: 'Design-first approach with modern aesthetics', color: '#a78bfa' },
  { icon: Zap, label: 'Performant', desc: 'Optimized for speed and great UX', color: '#c4b5fd' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="py-28 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 dark:bg-[var(--color-bg-surface)]/20" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--color-accent) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center max-w-6xl mx-auto">
          {/* Image column */}
          <motion.div
            style={{ y: imageY }}
            className="lg:w-5/12 flex-shrink-0"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Decorative frame with animated gradient */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-3px] rounded-[32px]"
                style={{
                  background: 'conic-gradient(from 0deg, var(--color-accent), var(--color-accent-2), transparent 40%, var(--color-accent-2), var(--color-accent))',
                  opacity: 0.3,
                  filter: 'blur(2px)',
                }}
              />
              <div className="relative rounded-[30px] overflow-hidden border border-[var(--color-glass-border)] shadow-2xl glow-accent aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/20 z-10 mix-blend-overlay" />
                <img
                  src="/profile.jpg"
                  alt="Vishnu V"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('min-h-[400px]');
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)';
                  }}
                />
              </div>

              {/* Floating card with glassmorphism */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-6 bottom-12 glass-premium rounded-2xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/25">
                    <Code2 size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--color-text-main)]">Full-Stack Dev</div>
                    <div className="text-xs text-[var(--color-text-muted)]">React • Python • Django</div>
                  </div>
                </div>
              </motion.div>

              {/* Background accent glow */}
              <div className="absolute -z-10 -bottom-8 -left-8 w-56 h-56 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[var(--color-accent-2)]/10 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div className="lg:w-7/12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Section label */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
                <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">About Me</span>
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-6 leading-tight">
                Crafting digital{' '}
                <span className="text-gradient">experiences</span>
                {' '}that matter
              </motion.h2>

              <motion.p variants={itemVariants} className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-5">
                Hi, I'm <strong className="text-[var(--color-text-main)] font-semibold">Vishnu V</strong>, a passionate Full-Stack Developer
                dedicated to crafting exceptional digital experiences. I combine technical expertise with creative
                problem-solving to build applications that are both powerful and intuitive.
              </motion.p>

              <motion.p variants={itemVariants} className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-10">
                With a keen eye for detail and a commitment to clean code, I specialize in developing robust,
                scalable solutions — from elegant React frontends to powerful Django backends — that drive
                real business growth and deliver seamless user experiences.
              </motion.p>

              {/* Highlights grid with glassmorphism cards */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/60 backdrop-blur-sm hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/3 transition-all duration-400 cursor-default group relative overflow-hidden"
                    style={{
                      transition: 'all 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${item.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                    <div
                      className="p-2.5 rounded-xl transition-all duration-300 flex-shrink-0 relative"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      <item.icon size={18} />
                    </div>
                    <div className="relative">
                      <div className="font-semibold text-[var(--color-text-main)] text-sm">{item.label}</div>
                      <div className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

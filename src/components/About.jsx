import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Layers, Sparkles, Zap } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Clean Code', desc: 'Readable, maintainable, scalable architecture' },
  { icon: Layers, label: 'Full-Stack', desc: 'End-to-end solutions from DB to UI' },
  { icon: Sparkles, label: 'Creative', desc: 'Design-first approach with modern aesthetics' },
  { icon: Zap, label: 'Performant', desc: 'Optimized for speed and great UX' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="about" ref={ref} className="py-28 relative overflow-hidden">
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-[var(--color-bg-surface)] dark:bg-[var(--color-bg-surface)]/40" />
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
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="absolute inset-[-2px] rounded-[32px] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] opacity-20 blur-sm" />
              <div className="relative rounded-[30px] overflow-hidden border border-[var(--color-glass-border)] shadow-2xl shadow-[var(--color-accent)]/10 aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/15 to-[var(--color-accent-2)]/15 z-10 mix-blend-overlay" />
                <img
                  src="/profile.jpg"
                  alt="Vishnu V"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('min-h-[400px]');
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #1a3a6a 0%, #4a1d96 100%)';
                  }}
                />
              </div>

              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-6 bottom-12 glass rounded-2xl p-4 shadow-xl z-20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center">
                    <Code2 size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--color-text-main)]">Full-Stack Dev</div>
                    <div className="text-xs text-[var(--color-text-muted)]">React • Python • Django</div>
                  </div>
                </div>
              </motion.div>

              {/* Background accent */}
              <div className="absolute -z-10 -bottom-6 -left-6 w-48 h-48 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
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
                <div className="h-px w-10 bg-[var(--color-accent)]" />
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

              {/* Highlights grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/50 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/3 transition-all duration-300 cursor-default group"
                  >
                    <div className="p-2.5 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/15 transition-colors flex-shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
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

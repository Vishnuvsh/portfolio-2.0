import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const skillCategories = [
  {
    name: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59, 130, 246, 0.3)',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 75 },
      { name: 'JavaScript', level: 88 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 82 },
    ],
  },
  {
    name: 'Backend',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(124, 58, 237, 0.3)',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'Django', level: 85 },
      { name: 'Node.js', level: 70 },
      { name: 'Express', level: 68 },
      { name: 'REST APIs', level: 88 },
    ],
  },
  {
    name: 'Database & Tools',
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.3)',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'Git', level: 88 },
      { name: 'Figma', level: 72 },
      { name: 'Web Design', level: 80 },
    ],
  },
  {
    name: 'Soft Skills',
    color: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.3)',
    skills: [
      { name: 'Problem Solving', level: 95 },
      { name: 'Innovation', level: 90 },
      { name: 'Full-Stack Solutions', level: 88 },
      { name: 'Team Work', level: 92 },
    ],
  },
];

// Floating skill tag with magnetic hover
function SkillTag({ name, level, color, delay = 0, glow }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  }, []);
  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1, zIndex: 20 }}
      className="relative cursor-default group"
    >
      <div
        className="relative px-4 py-2.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] transition-all duration-300 group-hover:border-transparent overflow-hidden"
        style={{
          boxShadow: `0 0 0 0 ${glow}`,
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 24px 4px ${glow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 0 ${glow}`;
        }}
      >
        {/* Shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer" />
        {/* Gradient bg on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />

        <span className="relative text-sm font-semibold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {name}
        </span>
      </div>

      {/* Proficiency tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.9 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-xl text-xs font-bold text-[var(--color-text-main)] whitespace-nowrap pointer-events-none z-30 shadow-lg"
      >
        {level}%
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-[var(--color-glass)]" />
      </motion.div>
    </motion.div>
  );
}

// Skill category panel
function CategoryPanel({ cat, isActive, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(cat.name)}
      className={`relative px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
        isActive
          ? 'text-white shadow-lg'
          : 'text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:text-[var(--color-text-main)] hover:border-[var(--color-accent)]/40'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-cat"
          className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-2xl`}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative">{cat.name}</span>
    </motion.button>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const activeCat = skillCategories.find(c => c.name === activeCategory);

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg-base)]" />

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-[var(--color-accent)]" />
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">Tech Stack</span>
            <div className="h-px w-10 bg-[var(--color-accent)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Technologies and tools I wield to bring ideas to life.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map(cat => (
            <CategoryPanel
              key={cat.name}
              cat={cat}
              isActive={activeCategory === cat.name}
              onClick={setActiveCategory}
            />
          ))}
        </motion.div>

        {/* Skills Cluster */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Background glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${activeCat?.glow}, transparent 70%)` }}
            />

            <div className="flex flex-wrap justify-center gap-4 py-8">
              {activeCat?.skills.map((skill, i) => (
                <SkillTag
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={activeCat.color}
                  glow={activeCat.glow}
                  delay={i * 0.07}
                />
              ))}
            </div>

            {/* Proficiency bars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCat?.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm font-medium text-[var(--color-text-muted)] w-32 flex-shrink-0 truncate">{skill.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${activeCat.color}`}
                    />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-text-muted)] w-8 text-right">{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom marquee — all skills */}
        <div className="mt-20 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--color-bg-base)] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--color-bg-base)] to-transparent z-10" />
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[...skillCategories.flatMap(c => c.skills.map(s => s.name)), ...skillCategories.flatMap(c => c.skills.map(s => s.name))].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-sm text-[var(--color-text-muted)] font-medium flex-shrink-0"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';

const skillCategories = [
  {
    name: 'Frontend',
    color: 'from-indigo-500 to-cyan-400',
    glow: 'rgba(99, 102, 241, 0.35)',
    ringColor: '#6366f1',
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
    color: 'from-violet-500 to-purple-500',
    glow: 'rgba(139, 92, 246, 0.35)',
    ringColor: '#8b5cf6',
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
    color: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16, 185, 129, 0.35)',
    ringColor: '#10b981',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'Git', level: 88 },
      { name: 'Figma', level: 72 },
      { name: 'Web Design', level: 80 },
    ],
  },
  {
    name: 'Soft Skills',
    color: 'from-amber-500 to-orange-400',
    glow: 'rgba(245, 158, 11, 0.35)',
    ringColor: '#f59e0b',
    skills: [
      { name: 'Problem Solving', level: 95 },
      { name: 'Innovation', level: 90 },
      { name: 'Full-Stack Solutions', level: 88 },
      { name: 'Team Work', level: 92 },
    ],
  },
];

// Animated circular progress ring
function CircularProgressRing({ level, color, size = 80, strokeWidth = 5, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          opacity={0.5}
        />
        {/* Animated ring */}
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
          transition={{ duration: 1.5, delay: delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            filter: `drop-shadow(0 0 6px ${color}40)`,
          }}
        />
      </svg>
      {/* Percentage text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
      >
        <span className="text-sm font-bold text-[var(--color-text-main)]">{level}%</span>
      </motion.div>
    </div>
  );
}

// Skill card with glassmorphism
function SkillCard({ skill, color, ringColor, glow, delay = 0 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  }, []);
  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative group cursor-default"
    >
      <div
        className="relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-sm transition-all duration-500 group-hover:border-transparent overflow-hidden"
        style={{
          boxShadow: `0 0 0 0 ${glow}`,
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 30px 6px ${glow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 0 ${glow}`;
        }}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 rounded-2xl`} />

        <CircularProgressRing level={skill.level} color={ringColor} delay={delay} />
        <span className="relative text-sm font-semibold text-[var(--color-text-main)] text-center leading-tight">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

// Category tab
function CategoryPanel({ cat, isActive, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(cat.name)}
      className={`relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
        isActive
          ? 'text-white shadow-lg'
          : 'text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:text-[var(--color-text-main)] hover:border-[var(--color-accent)]/40'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-cat"
          className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-2xl`}
          style={{
            boxShadow: `0 4px 20px ${cat.glow}`,
          }}
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
          className="flex flex-wrap justify-center gap-3 mb-14"
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

        {/* Skills Grid with Circular Progress */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Background glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
              style={{ background: `radial-gradient(circle, ${activeCat?.glow}, transparent 70%)` }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 py-4">
              {activeCat?.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  color={activeCat.color}
                  ringColor={activeCat.ringColor}
                  glow={activeCat.glow}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom marquee — all skills */}
        <div className="mt-20 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg-base)] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg-base)] to-transparent z-10" />
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[...skillCategories.flatMap(c => c.skills.map(s => s.name)), ...skillCategories.flatMap(c => c.skills.map(s => s.name))].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/60 backdrop-blur-sm text-sm text-[var(--color-text-muted)] font-medium flex-shrink-0 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors"
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

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Download, ChevronDown, Sparkles } from 'lucide-react';

const ROLES = [
  'Full-Stack Developer',
  'React Specialist',
  'Python Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
];

// Advanced character-by-character typewriter with scramble
function ScrambleTypewriter({ words }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | holding | deleting
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
        iteration += 0.4;
        if (iteration >= word.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('holding'), 200);
        }
      }, 30);
      return () => clearInterval(interval);
    }

    if (phase === 'holding') {
      setDisplayText(word);
      const timeout = setTimeout(() => setPhase('deleting'), 2200);
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
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase, currentWordIndex]);

  return (
    <span className="inline-block min-w-[20px]">
      <span className="text-gradient font-bold">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block ml-0.5 w-[3px] h-[0.85em] rounded-sm align-middle"
        style={{
          background: 'linear-gradient(180deg, var(--color-accent), var(--color-accent-2))',
          boxShadow: '0 0 8px var(--color-accent)',
        }}
      />
    </span>
  );
}

// 3D Tilt Avatar with enhanced effects
function TiltAvatar() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 30 });
  const glareX = useTransform(x, [-0.5, 0.5], ['30%', '70%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['30%', '70%']);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative w-72 h-72 md:w-80 md:h-80 mx-auto cursor-pointer select-none"
    >
      {/* Outer glow ring — rotating gradient */}
      <motion.div
        className="absolute inset-[-14px] rounded-full animate-spin-slow"
        style={{
          background: 'conic-gradient(from 0deg, var(--color-accent), var(--color-accent-2), transparent 40%, var(--color-accent-2), var(--color-accent))',
          filter: 'blur(18px)',
          opacity: 0.35,
        }}
      />
      {/* Secondary pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[-20px] rounded-full"
        style={{
          background: 'conic-gradient(from 180deg, var(--color-accent-2), transparent 30%, var(--color-accent), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      {/* Card */}
      <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-[var(--color-glass-border)] shadow-2xl glow-accent-strong">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/25 via-transparent to-[var(--color-accent-2)]/25 z-10" />
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-[28px] opacity-20"
          style={{
            background: useTransform([glareX, glareY], ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.5), transparent 55%)`
            ),
          }}
        />
        <img
          src="/profile.jpg"
          alt="Vishnu V"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)';
          }}
        />
      </div>

      {/* Floating badge — Available */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-5 -right-5 glass-premium rounded-2xl px-4 py-2.5 shadow-xl z-30"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-[var(--color-text-main)]">Available for hire</span>
        </div>
      </motion.div>

      {/* Floating stats */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-5 -left-5 glass-premium rounded-2xl px-4 py-2.5 shadow-xl z-30"
        style={{ transform: 'translateZ(35px)' }}
      >
        <div className="text-center">
          <div className="text-lg font-bold text-gradient">3+</div>
          <div className="text-[10px] text-[var(--color-text-muted)] font-medium">Years Exp.</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Magnetic button with ripple
function MagneticButton({ href, children, variant = 'primary', ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const cls = variant === 'primary'
    ? 'relative flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white font-semibold shadow-xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/60 transition-shadow overflow-hidden group'
    : 'relative flex items-center gap-2.5 px-8 py-4 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/60 backdrop-blur-sm text-[var(--color-text-main)] font-semibold hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all overflow-hidden group';

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated accent glow behind hero */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.15), rgba(139,92,246,0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-7">
              <span className="px-5 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/70 backdrop-blur-sm text-sm font-medium text-[var(--color-text-muted)] animate-border-glow flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--color-accent)]" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-3 text-[var(--color-text-main)]">
                Hi, I'm{' '}
                <span className="text-gradient relative">
                  Vishnu
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight leading-snug mb-6 text-[var(--color-text-main)] min-h-[1.4em]">
                <ScrambleTypewriter words={ROLES} />
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              I design and build engaging web applications that enhance user experience and drive business growth with{' '}
              <span className="text-[var(--color-text-main)] font-medium">scalable, responsive,</span> and{' '}
              <span className="text-[var(--color-text-main)] font-medium">elegant solutions</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <MagneticButton href="#projects" variant="primary">
                View My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
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
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-10 mt-12 pt-8 border-t border-[var(--color-border)]"
            >
              {[
                { value: '3+', label: 'Years Exp.' },
                { value: '15+', label: 'Projects Built' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="text-2xl font-extrabold text-gradient">{stat.value}</div>
                  <div className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <TiltAvatar />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

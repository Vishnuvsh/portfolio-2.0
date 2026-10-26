import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Mail, Code2, CheckCircle2 } from 'lucide-react';
import { useLenis } from 'lenis/react';

const GithubIcon = ({ size = 19 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ size = 19 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const HERO_SOCIALS = [
  { icon: GithubIcon, href: 'https://github.com/Vishnuvsh', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'http://www.linkedin.com/in/vishnu-v-b5256b341', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:vishnuvsh44@gmail.com', label: 'Email' },
];

const ROLES = [
  'Full-Stack Developer',
  'React Specialist',
  'Python Developer',
  'UI/UX Craftsman',
  'Problem Solver',
];

// Character scramble typewriter
function ScrambleTypewriter({ words }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('typing');
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

// Sparkle Star decorative element
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function SparkleStar({ size, color, style }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className="absolute pointer-events-none z-20"
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      animate={{ scale: [0, 1, 0], rotate: [0, 90, 180], opacity: [0, 1, 0] }}
      transition={{ duration: random(1.6, 3), repeat: Infinity, ease: 'easeInOut', delay: random(0, 2) }}
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </motion.svg>
  );
}

function SparklesText({ text }) {
  const [sparkles, setSparkles] = useState([]);
  useEffect(() => {
    const generate = () => Array.from({ length: 6 }).map((_, i) => ({
      id: `star-${i}-${Date.now()}`,
      size: random(12, 32),
      color: ['#f43f5e', '#ff6b6b', '#fb923c'][random(0, 3)],
      top: `${random(-15, 80)}%`,
      left: `${random(-10, 100)}%`,
    }));
    setSparkles(generate());
    const interval = setInterval(() => setSparkles(generate()), 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block px-1.5">
      {sparkles.map((s) => (
        <SparkleStar key={s.id} size={s.size} color={s.color} style={{ top: s.top, left: s.left }} />
      ))}
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent)] drop-shadow-sm font-extrabold">
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

// Magnetic Button with smooth Lenis scroll
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

// Central Cutout Portrait with choreographed Lenis scroll motion & volumetric lighting
function CentralCutoutPortrait({ scrollYProgress }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring wrapper for scroll progress to pair with Lenis momentum
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. Scroll-Choreographed Parallax (glides with physical depth)
  const portraitY = useTransform(springProgress, [0, 1], [0, 170]);

  // 2. Scroll-Choreographed Zooming (cinematic expansion on scroll, then soft settle)
  const portraitScale = useTransform(springProgress, [0, 0.45, 1], [1, 1.09, 0.93]);

  // 3. Scroll-Choreographed 3D Rotation (pitch backward & azimuth pivot)
  const scrollRotateX = useTransform(springProgress, [0, 1], [0, 14]);
  const scrollRotateY = useTransform(springProgress, [0, 1], [0, -10]);
  const scrollRotateZ = useTransform(springProgress, [0, 1], [0, 2]);

  // Dynamic interactive mouse tilt when hovering near/over the portrait
  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 25 });
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 25 });

  // Combined final 3D angles
  const finalRotateX = useTransform([scrollRotateX, mouseRotateX], ([s, m]) => s + m);
  const finalRotateY = useTransform([scrollRotateY, mouseRotateY], ([s, m]) => s + m);

  // Multi-plane satellite badge parallax offsets (different depths)
  const badgeExpY = useTransform(springProgress, [0, 1], [0, 80]);
  const badgeAvailY = useTransform(springProgress, [0, 1], [0, 220]);
  const badgeStatsY = useTransform(springProgress, [0, 1], [0, 130]);

  // Volumetric stage lighting reactivity
  const stageLightScale = useTransform(springProgress, [0, 0.5, 1], [1, 1.25, 0.95]);
  const stageLightOpacity = useTransform(springProgress, [0, 0.8, 1], [0.95, 1, 0.35]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center my-8 md:my-12 w-full max-w-xl mx-auto select-none"
      style={{ perspective: 1300 }}
    >
      {/* ======================================================== */}
      {/* VOLUMETRIC STAGE LIGHTING EFFECTS BEHIND CENTRAL PORTRAIT */}
      {/* ======================================================== */}
      {/* 1. Primary Volumetric Key Glow Circle (Soft Crimson & Warm Coral Core) */}
      <motion.div
        className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] md:w-[640px] md:h-[640px] rounded-full pointer-events-none"
        style={{
          scale: stageLightScale,
          opacity: stageLightOpacity,
          background: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.45) 0%, rgba(255, 107, 107, 0.30) 38%, rgba(251, 146, 60, 0.12) 60%, transparent 75%)',
          filter: 'blur(65px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* 2. Secondary Animated Rim Halo Circle (Rotating Warm Coral Conic Rim) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'conic-gradient(from 0deg, rgba(244, 63, 94, 0.5), rgba(255, 107, 107, 0.4), transparent 45%, rgba(255, 107, 107, 0.35), rgba(244, 63, 94, 0.5))',
          filter: 'blur(45px)',
        }}
      />

      {/* 3. Volumetric Stage Floor Light Anchor (Soft warm coral bounce) */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] sm:w-[110%] h-24 rounded-full pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.35) 0%, rgba(255, 107, 107, 0.18) 45%, transparent 75%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ======================================================== */}
      {/* 3D SCROLL-CHOREOGRAPHED CUTOUT PORTRAIT CONTAINER */}
      {/* ======================================================== */}
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
        {/* Architectural Cutout Frame Card */}
        <div
          className="relative w-[260px] h-[330px] sm:w-[320px] sm:h-[400px] md:w-[370px] md:h-[460px] rounded-[38px] sm:rounded-[48px] overflow-hidden border-2 border-white/85 dark:border-white/20 shadow-[0_30px_70px_-15px_rgba(244,63,94,0.32)] backdrop-blur-md"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 100%)',
          }}
        >
          {/* Subtle rim light accent line at top */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20" />

          {/* Portrait Image (Cutout style framed with sculptural curves) */}
          <img
            src="/profile.jpg"
            alt="Vishnu V - Full-Stack Developer"
            className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #f43f5e 0%, #ff6b6b 50%, #fb923c 100%)';
            }}
          />

          {/* Internal Volumetric Glass Rim Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/15 via-transparent to-[var(--color-accent-2)]/20 pointer-events-none mix-blend-overlay z-10" />

          {/* Bottom Grounding Vignette (Gracefully blends portrait into the off-white stage) */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-bg-base)]/70 via-[var(--color-bg-base)]/20 to-transparent pointer-events-none z-10" />

          {/* Glass Glare Sweep on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
        </div>

        {/* ======================================================== */}
        {/* MULTI-PLANE FLOATING SATELLITE BADGES (CHOREOGRAPHED 3D) */}
        {/* ======================================================== */}
        {/* Badge 1: Top-Left Experience (Plane Z=55px) */}
        <motion.div
          style={{
            y: badgeExpY,
            z: 55,
          }}
          className="absolute -top-4 -left-4 sm:-top-6 sm:-left-12 z-30"
        >
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

        {/* Badge 2: Right Availability (Plane Z=45px) */}
        <motion.div
          style={{
            y: badgeAvailY,
            z: 45,
          }}
          className="absolute top-24 -right-4 sm:top-28 sm:-right-12 z-30"
        >
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

        {/* Badge 3: Bottom-Left Track Record (Plane Z=35px) */}
        <motion.div
          style={{
            y: badgeStatsY,
            z: 35,
          }}
          className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:left-4 z-30 hidden sm:flex"
        >
          <div className="glass-premium rounded-2xl px-3.5 py-2 shadow-lg border border-white/80 dark:border-white/10 flex items-center gap-2">
            <Sparkles size={14} className="text-[var(--color-accent)] animate-pulse" />
            <span className="text-xs font-semibold text-[var(--color-text-main)]">15+ Production Apps Built</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const heroRef = useRef(null);
  const lenis = useLenis();

  // Scroll tracking across the hero section for choreography
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

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
      className="relative min-h-[110vh] flex flex-col justify-between items-center pt-28 pb-16 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl flex flex-col items-center text-center relative z-10">
        {/* ======================================================== */}
        {/* TOP INTRO BLOCK (CENTERED HEADLINE & TYPOGRAPHY) */}
        {/* ======================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-3xl"
        >
          {/* Status Badges Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
            <span className="px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-md text-xs font-semibold text-[var(--color-text-main)] shadow-sm flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for opportunities
            </span>
            <span className="px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/8 backdrop-blur-md text-xs font-semibold text-[var(--color-accent)] shadow-sm flex items-center gap-2">
              <Sparkles size={13} className="text-[var(--color-accent)] animate-pulse" />
              MCP & AI Integrated
            </span>
          </motion.div>

          {/* Main Title & Typewriter Subtitle */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-[var(--color-text-main)] mb-2">
              Hi, I'm <SparklesText text="Vishnu" />
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-main)] min-h-[1.35em] mt-1">
              <ScrambleTypewriter words={ROLES} />
            </h2>
          </motion.div>

          {/* Descriptive Mission Statement */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-2"
          >
            Engineering scalable web architectures, tactile micro-interactions, and AI-augmented applications with{' '}
            <span className="text-[var(--color-text-main)] font-semibold">React</span>,{' '}
            <span className="text-[var(--color-text-main)] font-semibold">Python</span>, and{' '}
            <span className="text-gradient-static font-semibold">volumetric design precision</span>.
          </motion.p>
        </motion.div>

        {/* ======================================================== */}
        {/* CENTRAL CUTOUT PORTRAIT WITH CHOREOGRAPHED SCROLL */}
        {/* ======================================================== */}
        <CentralCutoutPortrait scrollYProgress={scrollYProgress} />

        {/* ======================================================== */}
        {/* BOTTOM CONTENT BLOCK: TECH PILLS, CTAS, SOCIALS, STATS */}
        {/* ======================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full max-w-3xl"
        >
          {/* Interactive Tech Stack Pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['React 19', 'Python & Django', 'Tailwind CSS', 'MySQL', 'RESTful APIs', 'Model Context Protocol (MCP)'].map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/75 text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 hover:scale-105 transition-all duration-300 cursor-default shadow-xs"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
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

          {/* Social Connect Icons with Tooltips */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5 mr-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Connect
            </span>
            <div className="flex items-center gap-2.5">
              {HERO_SOCIALS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-md text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10 hover:shadow-lg hover:shadow-[var(--color-accent)]/20 transition-all duration-300 group cursor-pointer"
                >
                  <social.icon size={18} />
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-medium text-white bg-slate-900/95 dark:bg-slate-800/95 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 z-30">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Three Key Stats Pill Bar */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-xl grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-border)]/80 mb-8"
          >
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '15+', label: 'Projects Built' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ y: -2, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="text-xl sm:text-2xl font-extrabold text-gradient">{stat.value}</div>
                <div className="text-[11px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Cue (Lenis linked) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => handleScrollTo('#about')}
          className="flex flex-col items-center gap-2 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-accent)] transition-colors group mt-2"
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
        </motion.div>
      </div>
    </section>
  );
}

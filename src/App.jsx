import { ThemeProvider } from './lib/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sync Lenis smooth scroll with GSAP ScrollTrigger
function LenisScrollSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

// Floating stage light motes (warm coral & crimson motes caught in volumetric light)
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.5,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 12,
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" style={{ contain: 'paint' }} aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            willChange: 'transform, opacity',
            background: p.id % 3 === 0
              ? 'rgba(244, 63, 94, 0.55)'      /* Soft Crimson */
              : p.id % 3 === 1
                ? 'rgba(255, 107, 107, 0.65)'  /* Warm Coral */
                : 'rgba(251, 146, 60, 0.45)',  /* Warm Amber/Peach */
            boxShadow: p.id % 2 === 0 ? '0 0 10px rgba(255, 107, 107, 0.5)' : 'none',
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, Math.sin(p.id) * 45],
            opacity: [0, p.opacity, p.opacity, 0],
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

// Volumetric Stage Lighting Background (Large heavily blurred soft crimson & warm coral circles)
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none" style={{ contain: 'paint' }} aria-hidden="true">
      {/* 1. Primary Central Overhead Stage Spotlight (Center Key Light) */}
      <motion.div
        animate={{
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] h-[90vw] max-h-[1000px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.22) 0%, rgba(255, 107, 107, 0.16) 32%, rgba(251, 146, 60, 0.08) 55%, transparent 75%)',
          filter: 'blur(100px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* 2. Stage Left Rim Spotlight (Soft Crimson Volumetric Glow) */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] -left-[18%] w-[65vw] max-w-[800px] h-[65vw] max-h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.17) 0%, rgba(244, 63, 94, 0.09) 42%, transparent 70%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />

      {/* 3. Stage Right Fill Spotlight (Warm Coral Volumetric Glow) */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -25, 0],
          scale: [1, 0.92, 1.10, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[32%] -right-[18%] w-[70vw] max-w-[850px] h-[70vw] max-h-[850px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 107, 0.19) 0%, rgba(251, 113, 133, 0.10) 40%, rgba(251, 146, 60, 0.05) 60%, transparent 75%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />

      {/* 4. Stage Floor Wash (Volumetric Depth Anchor for Lower Content) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 35, 0],
          rotate: [0, 90, 180, 360],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute bottom-[6%] left-[12%] w-[60vw] max-w-[750px] h-[60vw] max-h-[750px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, rgba(255, 107, 107, 0.08) 45%, transparent 70%)',
          filter: 'blur(110px)',
          willChange: 'transform',
        }}
      />

      {/* 5. Delicate Architectural Dot-Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #f43f5e 1px, transparent 1px)`,
          backgroundSize: '46px 46px',
        }}
      />
    </div>
  );
}

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        backgroundImage: 'linear-gradient(90deg, #f43f5e, #ff6b6b, #fb923c, #f43f5e)',
        backgroundSize: '300% 100%',
        animation: 'gradient-shift 3s linear infinite',
      }}
    />
  );
}

// Section divider with glow
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

function App() {
  return (
    <ThemeProvider>
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
        <LenisScrollSync />
        <div className="relative w-full overflow-x-hidden min-h-screen">
          <ScrollProgress />
          <AnimatedBackground />
          <FloatingParticles />
          <Navbar />
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
    </ThemeProvider>
  );
}

export default App;

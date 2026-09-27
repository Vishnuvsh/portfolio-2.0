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
import { ReactLenis } from 'lenis/react';

// Floating particles background
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0
              ? 'var(--color-accent)'
              : p.id % 3 === 1
                ? 'var(--color-accent-2)'
                : 'rgba(255,255,255,0.5)',
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, Math.sin(p.id) * 60],
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

// Animated background with aurora effect
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Aurora orb 1 */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[25%] -left-[20%] w-[70vw] h-[70vw] rounded-full opacity-[0.07] dark:opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #6366f1, #8b5cf6 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Aurora orb 2 */}
      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute -bottom-[30%] -right-[20%] w-[65vw] h-[65vw] rounded-full opacity-[0.06] dark:opacity-[0.035]"
        style={{
          background: 'radial-gradient(circle, #a78bfa, #6366f1 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Aurora orb 3 — center accent */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -20, 50, 0],
          rotate: [0, 90, 180, 360],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        className="absolute top-[40%] left-[25%] w-[45vw] h-[45vw] rounded-full opacity-[0.03] dark:opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #c4b5fd, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--color-accent) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)',
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
      <ReactLenis root>
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

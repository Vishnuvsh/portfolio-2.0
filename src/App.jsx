import { ThemeProvider } from './lib/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

// Animated background that reacts to scroll
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary gradient orb — top left */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -left-[15%] w-[60vw] h-[60vw] rounded-full opacity-[0.06] dark:opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #2a6dd9, #7c3aed 50%, transparent 80%)',
        }}
      />
      {/* Secondary orb — bottom right */}
      <motion.div
        animate={{
          x: [0, -35, 15, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute -bottom-[25%] -right-[15%] w-[55vw] h-[55vw] rounded-full opacity-[0.05] dark:opacity-[0.035]"
        style={{
          background: 'radial-gradient(circle, #7c3aed, #2a6dd9 50%, transparent 80%)',
        }}
      />
      {/* Tertiary orb — center */}
      <motion.div
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -10, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        className="absolute top-[35%] left-[30%] w-[40vw] h-[40vw] rounded-full opacity-[0.03] dark:opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #60a5fa, transparent 70%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.018] dark:opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42,109,217,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,109,217,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="relative w-full overflow-x-hidden min-h-screen">
        <AnimatedBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

import { useRef } from 'react';
import { Code2, Layers, Sparkles, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Code2, label: 'Clean Code', desc: 'Readable, maintainable, scalable architecture', color: '#6366f1' },
  { icon: Layers, label: 'Full-Stack', desc: 'End-to-end solutions from DB to UI', color: '#8b5cf6' },
  { icon: Sparkles, label: 'Creative', desc: 'Design-first approach with modern aesthetics', color: '#a78bfa' },
  { icon: Zap, label: 'Performant', desc: 'Optimized for speed and great UX', color: '#c4b5fd' },
];

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    // 1. Image animation
    gsap.from('.about-image', {
      scrollTrigger: { trigger: '.about-image', start: 'top 85%' },
      x: -80, opacity: 0, duration: 1.2, ease: 'power4.out'
    });

    // 2. Decorative elements rotation
    gsap.to('.about-decor', {
      rotate: 360, duration: 30, repeat: -1, ease: 'linear'
    });

    // 3. Text Stagger Reveal
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '.about-text-container', start: 'top 80%' },
      y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
    });

    // 4. Floating Card animation (continuous + scroll reveal)
    gsap.from('.about-floating-card', {
      scrollTrigger: { trigger: '.about-image', start: 'top 75%' },
      scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.5)'
    });
    gsap.to('.about-floating-card', {
      y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8
    });

    // 5. Highlights Cards Stagger
    gsap.from('.about-highlight', {
      scrollTrigger: { trigger: '.about-highlights-container', start: 'top 85%' },
      y: 30, opacity: 0, scale: 0.95, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)'
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-28 relative overflow-hidden">
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
          <div className="lg:w-5/12 flex-shrink-0 about-image">
            <div className="relative">
              {/* Decorative frame with animated gradient */}
              <div
                className="about-decor absolute inset-[-3px] rounded-[32px]"
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
              <div className="about-floating-card absolute -right-6 bottom-12 glass-premium rounded-2xl p-4 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/25">
                    <Code2 size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--color-text-main)]">Full-Stack Dev</div>
                    <div className="text-xs text-[var(--color-text-muted)]">React • Python • Django</div>
                  </div>
                </div>
              </div>

              {/* Background accent glow */}
              <div className="absolute -z-10 -bottom-8 -left-8 w-56 h-56 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[var(--color-accent-2)]/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Text column */}
          <div className="lg:w-7/12 about-text-container">
            {/* Section label */}
            <div className="about-text flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
              <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">About Me</span>
            </div>

            <h2 className="about-text text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-6 leading-tight">
              Crafting digital{' '}
              <span className="text-gradient">experiences</span>
              {' '}that matter
            </h2>

            <p className="about-text text-[var(--color-text-muted)] text-lg leading-relaxed mb-5">
              Hi, I'm <strong className="text-[var(--color-text-main)] font-semibold">Vishnu V</strong>, a passionate Full-Stack Developer
              dedicated to crafting exceptional digital experiences. I combine technical expertise with creative
              problem-solving to build applications that are both powerful and intuitive.
            </p>

            <p className="about-text text-[var(--color-text-muted)] text-lg leading-relaxed mb-10">
              With a keen eye for detail and a commitment to clean code, I specialize in developing robust,
              scalable solutions — from elegant React frontends to powerful Django backends — that drive
              real business growth and deliver seamless user experiences.
            </p>

            {/* Highlights grid with glassmorphism cards */}
            <div className="about-highlights-container grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="about-highlight flex items-start gap-4 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/60 backdrop-blur-sm hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/3 transition-all duration-400 cursor-default group relative overflow-hidden"
                  style={{ transition: 'all 0.4s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 25px ${item.color}20`;
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                  <div
                    className="p-2.5 rounded-xl transition-all duration-300 flex-shrink-0 relative"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    <item.icon size={18} />
                  </div>
                  <div className="relative">
                    <div className="font-semibold text-[var(--color-text-main)] text-sm">{item.label}</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

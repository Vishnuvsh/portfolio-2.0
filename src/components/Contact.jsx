import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader } from 'lucide-react';

// Brand icons not in lucide-react v1
const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vishnuvsh44@gmail.com',
    href: 'mailto:vishnuvsh44@gmail.com',
    color: 'from-blue-500 to-cyan-500',
    accent: '#3b82f6',
    accentLight: 'rgba(59,130,246,0.12)',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6282195381',
    href: 'tel:+916282195381',
    color: 'from-emerald-500 to-teal-500',
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.12)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Vadakara, Kerala, India',
    href: null,
    color: 'from-violet-500 to-purple-600',
    accent: '#7c3aed',
    accentLight: 'rgba(124,58,237,0.12)',
  },
];

const socialLinks = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/Vishnuvsh',
    color: '#24292e',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: 'http://www.linkedin.com/in/vishnu-v-b5256b341',
    color: '#0a66c2',
  },
];

// Magnetic social button
function SocialButton({ link }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, []);
  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, []);

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="w-12 h-12 rounded-2xl flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg"
      style={{ '--hover-color': link.color }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = link.color;
        e.currentTarget.style.borderColor = 'transparent';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '';
        e.currentTarget.style.borderColor = '';
      }}
      aria-label={link.label}
    >
      <link.icon size={20} />
    </motion.a>
  );
}

// Floating label input
function FormInput({ id, label, type = 'text', placeholder, rows, required }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const isActive = focused || value.length > 0;

  const inputClass = `w-full px-4 py-3.5 rounded-xl border bg-[var(--color-bg-surface)] text-[var(--color-text-main)] text-sm font-medium placeholder:text-transparent transition-all duration-200 focus:outline-none ${
    focused
      ? 'border-[var(--color-accent)] shadow-[0_0_0_3px_rgba(42,109,217,0.15)]'
      : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/40'
  }`;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
          isActive
            ? '-top-2.5 text-xs font-semibold px-1.5 bg-[var(--color-bg-surface)] rounded text-[var(--color-accent)]'
            : 'top-3.5 text-sm text-[var(--color-text-muted)]'
        }`}
      >
        {label}{required && ' *'}
      </label>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={inputClass}
          required={required}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState('loading');
    setTimeout(() => setSubmitState('success'), 1800);
    setTimeout(() => setSubmitState('idle'), 5000);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg-surface)] dark:bg-[var(--color-bg-surface)]/30" />
      {/* Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-[var(--color-accent)]" />
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">Contact</span>
            <div className="h-px w-10 bg-[var(--color-accent)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-4">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Have a project in mind or want to explore an opportunity? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left: Info + Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact cards */}
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: info.accentLight }}
                >
                  <info.icon size={20} style={{ color: info.accent }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm font-semibold text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-[var(--color-text-main)]">{info.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="pt-4"
            >
              <p className="text-sm text-[var(--color-text-muted)] font-medium mb-4">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <SocialButton key={link.label} link={link} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-sm flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput id="contact-name" label="Your Name" placeholder="John Doe" required />
                <FormInput id="contact-email" type="email" label="Email Address" placeholder="john@example.com" required />
              </div>
              <FormInput id="contact-subject" label="Subject" placeholder="Project inquiry..." required />
              <FormInput id="contact-message" label="Message" placeholder="Tell me about your project..." rows={5} required />

              {/* Submit */}
              <AnimatePresence mode="wait">
                {submitState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                  >
                    <CheckCircle size={20} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={submitState === 'loading'}
                    whileHover={{ scale: submitState === 'idle' ? 1.02 : 1, y: submitState === 'idle' ? -1 : 0 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white font-semibold shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-[var(--color-accent)]/40 transition-shadow overflow-hidden disabled:opacity-70"
                  >
                    {submitState === 'loading' ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={17} />
                      </>
                    )}
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity" />
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

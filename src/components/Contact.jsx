import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle, Loader, ArrowRight } from 'lucide-react';

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
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6282195381',
    href: 'tel:+916282195381',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Vadakara, Kerala, India',
    href: null,
  },
];

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/Vishnuvsh', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'http://www.linkedin.com/in/vishnu-v-b5256b341', label: 'LinkedIn' },
];

function FloatingInput({ id, label, type = 'text', rows, required }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const isActive = focused || value.length > 0;

  return (
    <div className="relative mb-8">
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? '-top-6 text-sm text-[var(--color-accent)] font-medium'
            : 'top-2 text-base text-[var(--color-text-muted)]'
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
          className="w-full bg-transparent border-b-2 border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none py-2 text-[var(--color-text-main)] resize-none transition-colors duration-300"
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
          className="w-full bg-transparent border-b-2 border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none py-2 text-[var(--color-text-main)] transition-colors duration-300"
          required={required}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [submitState, setSubmitState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState('loading');
    setTimeout(() => setSubmitState('success'), 1500);
    setTimeout(() => setSubmitState('idle'), 4000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[var(--color-accent-2)]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] relative"
        >
          {/* Left Panel: Contact Info */}
          <div className="lg:w-2/5 p-10 lg:p-14 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] text-white relative overflow-hidden flex flex-col justify-between">
            {/* Decorative background pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
                Let's create <br/> something <span className="text-white/80 italic font-medium">amazing.</span>
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-sm font-light">
                I'm currently available for freelance work and full-time roles. Feel free to reach out to me!
              </p>
              
              <div className="flex flex-col gap-8">
                {contactInfo.map((info, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-sm backdrop-blur-sm">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70 font-medium mb-1 tracking-wide uppercase">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-lg font-semibold hover:text-white/80 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-8 border-t border-white/20 flex flex-col gap-4">
              <p className="text-sm text-white/80 font-medium tracking-wide uppercase">Follow my work</p>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--color-accent)] transition-all duration-300 backdrop-blur-sm"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:w-3/5 p-10 lg:p-14 bg-[var(--color-bg-surface)] relative">
            <h3 className="text-3xl font-bold text-[var(--color-text-main)] mb-10 tracking-tight">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                <FloatingInput id="name" label="First Name" required />
                <FloatingInput id="lastname" label="Last Name" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                <FloatingInput id="email" type="email" label="Email Address" required />
                <FloatingInput id="phone" type="tel" label="Phone Number" />
              </div>
              
              <FloatingInput id="subject" label="Subject" required />
              <FloatingInput id="message" label="Your Message" rows={4} required />
              
              <AnimatePresence mode="wait">
                {submitState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 mt-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20"
                  >
                    <CheckCircle size={22} className="shrink-0" />
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={submitState === 'loading'}
                    whileHover={{ scale: submitState === 'idle' ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    className="self-start relative flex items-center justify-center gap-3 py-4 px-10 mt-4 rounded-full bg-[var(--color-primary)] text-[var(--color-bg-base)] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    {submitState === 'loading' ? (
                      <>
                        <Loader size={18} className="animate-spin relative z-10" />
                        <span className="relative z-10">Processing...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

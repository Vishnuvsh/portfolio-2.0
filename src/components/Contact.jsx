import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle, Loader, ArrowRight, Copy, Check, Clock, Sparkles } from 'lucide-react';

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
            ? '-top-6 text-xs text-[var(--color-accent)] font-semibold uppercase tracking-wider'
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
          className="w-full bg-transparent border-b-2 border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none py-2 text-[var(--color-text-main)] resize-none transition-colors duration-300 text-sm sm:text-base"
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
          className="w-full bg-transparent border-b-2 border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none py-2 text-[var(--color-text-main)] transition-colors duration-300 text-sm sm:text-base"
          required={required}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [submitState, setSubmitState] = useState('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('vishnuvsh44@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState('loading');
    setTimeout(() => setSubmitState('success'), 1200);
    setTimeout(() => setSubmitState('idle'), 4000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Volumetric Stage Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[var(--color-accent-2)]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] relative"
        >
          {/* Left Panel: Contact Info */}
          <div className="lg:w-2/5 p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent)] text-white relative overflow-hidden flex flex-col justify-between">
            {/* Background Texture & Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white mb-6 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                Available for New Projects
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                Let's build <br/> something <span className="italic font-normal underline decoration-white/40">extraordinary.</span>
              </h2>
              <p className="text-white/85 text-sm sm:text-base mb-10 max-w-sm font-light leading-relaxed">
                Whether you have an upcoming project, a full-time role, or an architectural challenge, my inbox is always open.
              </p>
              
              <div className="flex flex-col gap-6">
                {/* Email Item */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-sm backdrop-blur-sm flex-shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">Email</p>
                    <div className="flex items-center gap-2">
                      <a href="mailto:vishnuvsh44@gmail.com" className="text-sm sm:text-base font-semibold hover:text-white/80 transition-colors truncate">
                        vishnuvsh44@gmail.com
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors cursor-pointer text-white"
                        title="Copy Email"
                        aria-label="Copy Email"
                      >
                        {copiedEmail ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-sm backdrop-blur-sm flex-shrink-0">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">Direct Call</p>
                    <a href="tel:+916282195381" className="text-sm sm:text-base font-semibold hover:text-white/80 transition-colors">
                      +91 6282195381
                    </a>
                  </div>
                </div>

                {/* Location & Timezone Item */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-sm backdrop-blur-sm flex-shrink-0">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">Location &amp; Timezone</p>
                    <p className="text-sm sm:text-base font-semibold">Vadakara, Kerala, India</p>
                    <p className="text-xs text-white/75 mt-0.5 flex items-center gap-1">
                      <Clock size={11} /> UTC +5:30 (IST) • Rapid response
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="relative z-10 mt-12 pt-6 border-t border-white/20 flex flex-col gap-3">
              <p className="text-xs text-white/80 font-semibold tracking-wider uppercase">Direct Profiles</p>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/Vishnuvsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--color-accent)] transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </motion.a>
                <motion.a
                  href="http://www.linkedin.com/in/vishnu-v-b5256b341"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[var(--color-accent)] transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:w-3/5 p-8 sm:p-12 lg:p-14 bg-[var(--color-bg-surface)] relative flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/8 text-xs font-semibold text-[var(--color-accent)] mb-4 border border-[var(--color-accent)]/20">
                <Sparkles size={12} />
                Direct Inquiry
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-main)] mb-2 tracking-tight">
                Send me a message
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mb-8">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                  <FloatingInput id="name" label="First Name" required />
                  <FloatingInput id="lastname" label="Last Name" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                  <FloatingInput id="email" type="email" label="Email Address" required />
                  <FloatingInput id="phone" type="tel" label="Phone Number" />
                </div>
                
                <FloatingInput id="subject" label="Subject / Project Scope" required />
                <FloatingInput id="message" label="Your Message" rows={4} required />
                
                <AnimatePresence mode="wait">
                  {submitState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 mt-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 text-sm"
                    >
                      <CheckCircle size={20} className="shrink-0 text-emerald-500" />
                      Thank you! Your message has been sent successfully. I will get in touch shortly.
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      disabled={submitState === 'loading'}
                      whileHover={{ scale: submitState === 'idle' ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}
                      className="self-start relative flex items-center justify-center gap-2.5 py-3.5 px-8 mt-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white font-semibold shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/45 transition-all duration-300 disabled:opacity-70 group overflow-hidden cursor-pointer text-sm"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      {submitState === 'loading' ? (
                        <>
                          <Loader size={17} className="animate-spin relative z-10" />
                          <span className="relative z-10">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Send Message</span>
                          <ArrowRight size={17} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

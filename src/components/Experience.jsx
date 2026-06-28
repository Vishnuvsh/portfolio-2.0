import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    period: '2023 – Present',
    type: 'Full-time',
    description:
      'Developing scalable web applications using React, Python, and Django for various clients. Focusing on clean code, responsive design, and seamless user experiences that drive real business value.',
    achievements: [
      'Delivered 10+ client projects on time and within budget',
      'Improved application performance by 40% through code optimization',
      'Built reusable component libraries that reduced development time by 30%',
    ],
    skills: ['React', 'Python', 'Django', 'MySQL', 'REST API', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500',
    accent: '#3b82f6',
    accentLight: 'rgba(59, 130, 246, 0.12)',
  },
  {
    role: 'Software Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'On-site',
    period: '2022 – 2023',
    type: 'Internship',
    description:
      'Assisted in building RESTful APIs, optimized database queries, and collaborated with the design team to implement modern, responsive user interfaces.',
    achievements: [
      'Built and integrated 5+ RESTful APIs consumed by mobile and web clients',
      'Reduced database query time by 35% through indexing and query optimization',
      'Collaborated on UI redesign that improved user engagement by 25%',
    ],
    skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'MySQL', 'Git'],
    color: 'from-violet-500 to-purple-600',
    accent: '#7c3aed',
    accentLight: 'rgba(124, 58, 237, 0.12)',
  },
];

function ExperienceCard({ exp, index }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-[-21px] top-8 w-5 h-5 rounded-full border-2 border-[var(--color-bg-base)] shadow-md z-10 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent}88)` }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Card */}
      <motion.div
        layout
        className="ml-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Card Header — always visible */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 flex items-start gap-4 group"
        >
          {/* Company Icon */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: exp.accentLight }}
          >
            <Briefcase size={20} style={{ color: exp.accent }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-[var(--color-text-main)]">{exp.role}</h3>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: exp.accentLight, color: exp.accent }}
              >
                {exp.type}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span className="font-semibold" style={{ color: exp.accent }}>{exp.company}</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {exp.period}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {exp.location}
              </span>
            </div>
          </div>

          {/* Expand arrow */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1 text-[var(--color-text-muted)]"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-[var(--color-border)] pt-5">
                {/* Description */}
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-5 text-sm">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-5">
                  <h4 className="text-sm font-bold text-[var(--color-text-main)] mb-3 uppercase tracking-wide">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((a, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: exp.accent }}
                        />
                        {a}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech badges */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-text-main)] mb-3 uppercase tracking-wide">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((s, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        className="px-3 py-1 text-xs font-semibold rounded-lg border"
                        style={{
                          background: exp.accentLight,
                          color: exp.accent,
                          borderColor: `${exp.accent}30`,
                        }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg-base)]" />
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -right-32 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-[var(--color-accent-2)]/5 rounded-full blur-3xl" />

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
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent)]">Journey</span>
            <div className="h-px w-10 bg-[var(--color-accent)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-main)] mb-4">
            My <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            My professional journey and what I've accomplished along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-5 border-l-2 border-dashed border-[var(--color-border)]">
            {/* Gradient line overlay */}
            <div
              className="absolute left-[-1px] top-0 bottom-0 w-[2px]"
              style={{
                background: 'linear-gradient(to bottom, transparent, var(--color-accent) 20%, var(--color-accent-2) 80%, transparent)',
                opacity: 0.5,
              }}
            />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} exp={exp} index={index} />
              ))}
            </div>

            {/* Timeline end marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative mt-8 ml-4 flex items-center gap-3 text-sm text-[var(--color-text-muted)]"
            >
              <div className="absolute left-[-25px] w-4 h-4 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-bg-surface)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]" />
              </div>
              <span className="font-medium">The journey continues...</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

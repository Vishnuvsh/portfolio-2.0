#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Complete portfolio data embedded directly
const portfolioData = {
  profile: {
    name: 'Vishnu V',
    role: 'Full-Stack Developer',
    tagline: 'Crafting digital experiences that matter',
    bio: 'Passionate Full-Stack Developer dedicated to crafting exceptional digital experiences. Combines technical expertise with creative problem-solving to build applications that are both powerful and intuitive.',
    location: 'Vadakara, Kerala, India',
    contact: {
      email: 'vishnuvsh44@gmail.com',
      phone: '+91 6282195381',
      github: 'https://github.com/Vishnuvsh',
      linkedin: 'http://www.linkedin.com/in/vishnu-v-b5256b341',
      portfolio: 'https://resilient-genie-df3d71.netlify.app/',
    },
    highlights: [
      {
        title: 'Clean Code',
        description: 'Readable, maintainable, scalable architecture',
      },
      {
        title: 'Full-Stack',
        description: 'End-to-end solutions from DB to UI',
      },
      {
        title: 'Creative',
        description: 'Design-first approach with modern aesthetics',
      },
      {
        title: 'Performant',
        description: 'Optimized for speed and great UX',
      },
    ],
  },
  experiences: [
    {
      role: 'Full-Stack Developer',
      company: 'Freelance',
      location: 'Remote',
      period: '2023 – Present',
      type: 'Full-time',
      description: 'Developing scalable web applications using React, Python, and Django for various clients. Focusing on clean code, responsive design, and seamless user experiences that drive real business value.',
      achievements: [
        'Delivered 10+ client projects on time and within budget',
        'Improved application performance by 40% through code optimization',
        'Built reusable component libraries that reduced development time by 30%',
      ],
      skills: ['React', 'Python', 'Django', 'MySQL', 'REST API', 'Tailwind CSS'],
    },
    {
      role: 'Software Developer Intern',
      company: 'Tech Solutions Inc.',
      location: 'On-site',
      period: '2022 – 2023',
      type: 'Internship',
      description: 'Assisted in building RESTful APIs, optimized database queries, and collaborated with the design team to implement modern, responsive user interfaces.',
      achievements: [
        'Built and integrated 5+ RESTful APIs consumed by mobile and web clients',
        'Reduced database query time by 35% through indexing and query optimization',
        'Collaborated on UI redesign that improved user engagement by 25%',
      ],
      skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'MySQL', 'Git'],
    },
  ],
  skills: {
    Frontend: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 75 },
      { name: 'JavaScript', level: 88 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 82 },
    ],
    Backend: [
      { name: 'Python', level: 92 },
      { name: 'Django', level: 85 },
      { name: 'Node.js', level: 70 },
      { name: 'Express', level: 68 },
      { name: 'REST APIs', level: 88 },
    ],
    'Database & Tools': [
      { name: 'MySQL', level: 85 },
      { name: 'Git', level: 88 },
      { name: 'Figma', level: 72 },
      { name: 'Web Design', level: 80 },
    ],
    'Soft Skills': [
      { name: 'Problem Solving', level: 95 },
      { name: 'Innovation', level: 90 },
      { name: 'Full-Stack Solutions', level: 88 },
      { name: 'Team Work', level: 92 },
    ],
  },
  projects: [
    {
      title: 'Modern Developer Portfolio 2.0',
      description: 'Personal developer portfolio website built with React 19, Tailwind CSS, Framer Motion, and custom MCP AI Server.',
      tech: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'MCP'],
      github: 'https://github.com/Vishnuvsh/portfolio-2.0',
      live: 'https://github.com/Vishnuvsh/portfolio-2.0',
      featured: true,
    },
    {
      title: 'AI Video Translator',
      description: 'AI-driven application that translates and dubs video content with voice synthesis.',
      tech: ['JavaScript', 'React', 'AI APIs', 'Node.js'],
      github: 'https://github.com/Vishnuvsh/ai-video-translator',
      live: 'https://ai-video-translator-rouge.vercel.app',
      featured: true,
    },
    {
      title: 'Home Trip Mode',
      description: 'Smart travel planning web app with route optimization, checklist management, and real-time updates.',
      tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
      github: 'https://github.com/Vishnuvsh/home-trip-mode',
      live: 'https://home-trip-mode.vercel.app',
      featured: true,
    },
    {
      title: 'AI Startup Idea Validator',
      description: 'Analyzes startup ideas, evaluates market fit, competitors, and provides automated feasibility scoring.',
      tech: ['TypeScript', 'Next.js', 'AI APIs', 'Tailwind CSS'],
      github: 'https://github.com/Vishnuvsh/ai-startup-validator',
      live: 'https://ai-startup-validator-xi.vercel.app',
      featured: true,
    },
    {
      title: 'AI Vision Computer Controller',
      description: 'Computer vision application enabling desktop control via camera hand gestures and facial tracking.',
      tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
      github: 'https://github.com/Vishnuvsh/ai-vision-computer-controller',
      live: 'https://github.com/Vishnuvsh/ai-vision-computer-controller',
      featured: true,
    },
    {
      title: 'Live Sign Language Translator',
      description: 'Real-time sign language recognition using deep learning and computer vision to translate gestures to text.',
      tech: ['Python', 'Deep Learning', 'OpenCV', 'TensorFlow'],
      github: 'https://github.com/Vishnuvsh/live-sign-translator',
      live: 'https://github.com/Vishnuvsh/live-sign-translator',
      featured: true,
    },
    {
      title: 'Asset Management System (Full-Stack)',
      description: 'Enterprise asset tracking platform with Python REST API backend and responsive React frontend dashboard.',
      tech: ['Python', 'Django', 'React', 'REST APIs', 'PostgreSQL'],
      github: 'https://github.com/Vishnuvsh/asset-management-backend',
      live: 'https://asset-management-frontend-ochre.vercel.app',
      featured: true,
    },
    {
      title: 'Flow State Interactive Game',
      description: 'High-performance interactive web game built in TypeScript designed to induce deep cognitive flow.',
      tech: ['TypeScript', 'Canvas', 'HTML5'],
      github: 'https://github.com/Vishnuvsh/flow-state-game',
      live: 'https://github.com/Vishnuvsh/flow-state-game',
      featured: false,
    },
    {
      title: 'Full-Stack E-Commerce Solution',
      description: 'Comprehensive e-commerce platform with product catalogs, shopping cart, and order processing.',
      tech: ['Python', 'HTML', 'CSS', 'Bootstrap', 'MySQL'],
      github: 'https://github.com/Vishnuvsh/Ecommerce',
      live: 'https://github.com/Vishnuvsh/Ecommerce',
      featured: false,
    },
    {
      title: 'AI Receipt & Invoice OCR',
      description: 'Automated receipt text extraction, expense categorization, and structured data parsing from invoices.',
      tech: ['Python', 'OCR / Tesseract', 'Image Processing'],
      github: 'https://github.com/Vishnuvsh/ai-receipt-ocr',
      live: 'https://github.com/Vishnuvsh/ai-receipt-ocr',
      featured: false,
    },
    {
      title: 'AI Virtual Air Keyboard',
      description: 'Touchless air-typing system using camera hand-tracking to type keys on virtual screens.',
      tech: ['Python', 'OpenCV', 'MediaPipe'],
      github: 'https://github.com/Vishnuvsh/ai-virtual-keyboard',
      live: 'https://github.com/Vishnuvsh/ai-virtual-keyboard',
      featured: false,
    },
    {
      title: 'AirPureTech Commercial Web Platform',
      description: 'Product showcase and customer engagement website for environmental air purification solutions.',
      tech: ['JavaScript', 'React', 'Tailwind CSS'],
      github: 'https://github.com/Vishnuvsh/AirPureTech',
      live: 'https://air-pure-tech.vercel.app',
      featured: false,
    },
  ],
};

// Rich metadata dictionary for Vishnu's real GitHub repositories
const GITHUB_REPO_METADATA = {
  'portfolio-2.0': {
    title: 'Modern Developer Portfolio 2.0',
    description: 'Personal developer portfolio website built with React 19, Tailwind CSS, Framer Motion, and custom MCP AI Integration.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'MCP'],
    featured: true,
  },
  'ai-video-translator': {
    title: 'AI Video Translator',
    description: 'AI-driven application that translates and dubs video content into multiple languages with voice synthesis.',
    tech: ['JavaScript', 'React', 'AI APIs', 'Node.js'],
    featured: true,
    live: 'https://ai-video-translator-rouge.vercel.app',
  },
  'home-trip-mode': {
    title: 'Home Trip Mode',
    description: 'Smart travel planning web app with automated route optimization, checklist management, and real-time updates.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    featured: true,
    live: 'https://home-trip-mode.vercel.app',
  },
  'ai-startup-validator': {
    title: 'AI Startup Idea Validator',
    description: 'Analyzes startup ideas, evaluates market fit, competitors, and provides automated feasibility scoring.',
    tech: ['TypeScript', 'Next.js', 'AI APIs', 'Tailwind CSS'],
    featured: true,
    live: 'https://ai-startup-validator-xi.vercel.app',
  },
  'ai-vision-computer-controller': {
    title: 'AI Vision Computer Controller',
    description: 'Computer vision application in Python that enables controlling desktop and cursor via camera hand gestures and facial tracking.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    featured: true,
  },
  'live-sign-translator': {
    title: 'Live Sign Language Translator',
    description: 'Real-time sign language recognition using deep learning and computer vision to translate gestures to text.',
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV'],
    featured: true,
  },
  'flow-state-game': {
    title: 'Flow State Interactive Game',
    description: 'High-performance interactive web game built in TypeScript designed to induce deep cognitive flow.',
    tech: ['TypeScript', 'Canvas', 'HTML5', 'Game Dev'],
    featured: true,
  },
  'asset-management-backend': {
    title: 'Asset Management System (Backend API)',
    description: 'Enterprise asset tracking platform with Python REST API backend, audit logs, and status lifecycles.',
    tech: ['Python', 'Django', 'REST APIs', 'MySQL/PostgreSQL'],
    featured: true,
  },
  'asset-management-frontend': {
    title: 'Asset Management System (Frontend Dashboard)',
    description: 'Clean responsive dashboard for tracking organizational inventory, licenses, and lifecycle events.',
    tech: ['JavaScript', 'React', 'Tailwind CSS'],
    featured: true,
    live: 'https://asset-management-frontend-ochre.vercel.app',
  },
  'Ecommerce': {
    title: 'Full-Stack E-Commerce Solution',
    description: 'Comprehensive e-commerce platform with product catalogs, shopping cart, checkout workflow, and admin controls.',
    tech: ['Python', 'HTML', 'CSS', 'Bootstrap', 'MySQL'],
    featured: false,
  },
  'ai-receipt-ocr': {
    title: 'AI Receipt & Invoice OCR',
    description: 'Automated receipt text extraction, expense categorization, and structured data parsing from invoices.',
    tech: ['Python', 'OCR', 'Tesseract', 'Image Processing'],
    featured: false,
  },
  'ai-virtual-keyboard': {
    title: 'AI Virtual Air Keyboard',
    description: 'Touchless air-typing system using camera hand-tracking to type keys on virtual screens.',
    tech: ['Python', 'OpenCV', 'MediaPipe'],
    featured: false,
  },
  'AirPureTech': {
    title: 'AirPureTech Commercial Web Platform',
    description: 'Product showcase and customer engagement website for environmental air purification solutions.',
    tech: ['JavaScript', 'React', 'Tailwind CSS'],
    featured: false,
    live: 'https://air-pure-tech.vercel.app',
  },
  'learning-management-system': {
    title: 'Learning Management System (LMS)',
    description: 'Course management, student enrollment, quiz assessment, and teacher grading portal.',
    tech: ['Python', 'Django', 'MySQL', 'Bootstrap'],
    featured: false,
  },
  'crud-movie-list': {
    title: 'Movie Library CRUD Application',
    description: 'Full CRUD application for managing movie watchlists, ratings, filtering, and database search.',
    tech: ['Python', 'Django', 'MySQL'],
    featured: false,
  },
  'rubicon-3d-blueprint': {
    title: 'Rubicon 3D Interactive Blueprint',
    description: 'Interactive 3D architectural blueprint visualization rendered in browser.',
    tech: ['HTML', 'Three.js / Canvas', 'CSS'],
    featured: false,
  },
  'full-stack-todo': {
    title: 'Full-Stack Task Manager',
    description: 'Task management app featuring complete CRUD operations and user session authentication.',
    tech: ['Python', 'Django', 'HTML', 'CSS'],
    featured: false,
  },
};

// Fetch real repositories live from GitHub API with fallback
async function fetchRealGitHubProjects() {
  try {
    const res = await fetch('https://api.github.com/users/Vishnuvsh/repos?sort=updated&per_page=100', {
      headers: { 'User-Agent': 'Vishnu-Portfolio-MCP-Server' },
    });
    if (!res.ok) throw new Error(`GitHub API returned status ${res.status}`);
    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error('Invalid GitHub response structure');

    return repos
      .filter((r) => r.name !== 'Vishnuvsh') // exclude profile readme repo
      .map((r) => {
        const meta = GITHUB_REPO_METADATA[r.name] || {};
        const title = meta.title || r.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        const description = r.description || meta.description || 'Public GitHub project repository built by Vishnu V.';
        const tech = meta.tech || (r.language ? [r.language] : ['Software Dev']);
        const live = r.homepage || meta.live || r.html_url;
        const featured = meta.featured !== undefined ? meta.featured : (r.stargazers_count > 0);

        return {
          title,
          description,
          tech,
          github: r.html_url,
          live,
          featured,
          stars: r.stargazers_count || 0,
          updatedAt: r.updated_at,
          primaryLanguage: r.language || 'Other',
        };
      });
  } catch (err) {
    console.error('GitHub API live fetch error, using local fallback:', err.message);
    return portfolioData.projects;
  }
}

// Initialize MCP Server
const server = new Server(
  {
    name: 'vishnu-portfolio-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_projects',
        description:
          'Get the real-time list of public GitHub projects built by Vishnu V, fetched live from GitHub API (https://github.com/Vishnuvsh). Includes project titles, descriptions, tech stacks, GitHub URLs, and live demo links. Supports optional filtering by technology or featured status.',
        inputSchema: {
          type: 'object',
          properties: {
            tech: {
              type: 'string',
              description: 'Optional filter by technology (e.g., "Python", "React", "TypeScript", "Django", "MySQL")',
            },
            featuredOnly: {
              type: 'boolean',
              description: 'If true, returns only featured projects',
            },
          },
        },
      },
      {
        name: 'get_skills',
        description:
          'Get Vishnu V\'s technical skills and soft skills categorized into Frontend, Backend, Database & Tools, and Soft Skills, along with proficiency levels.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Optional category filter: "Frontend", "Backend", "Database & Tools", or "Soft Skills"',
            },
          },
        },
      },
      {
        name: 'get_resume',
        description:
          'Get Vishnu V\'s full professional profile and resume summary including bio, work experiences, career highlights, and contact information.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_contact_info',
        description:
          'Get Vishnu V\'s direct contact details and social links (Email, Phone, Location, GitHub, LinkedIn, Portfolio Website).',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Visual formatting helpers for Claude chatbot responses
function createProgressBar(level) {
  const totalBlocks = 10;
  const filledBlocks = Math.round((level / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const bar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  let badge = 'Proficient';
  if (level >= 90) badge = 'Expert';
  else if (level >= 80) badge = 'Advanced';
  return `\`[${bar}]\` **${level}%** (*${badge}*)`;
}

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  switch (name) {
    case 'get_projects': {
      // Fetch live real projects from GitHub API
      const liveProjects = await fetchRealGitHubProjects();
      let filtered = [...liveProjects];

      if (args.featuredOnly) {
        filtered = filtered.filter((p) => p.featured);
      }

      if (args.tech) {
        const query = args.tech.toLowerCase().trim();
        filtered = filtered.filter((p) =>
          p.tech.some((t) => t.toLowerCase().includes(query)) ||
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      }

      const projectCards = filtered.map((p, idx) => {
        const featuredBadge = p.featured ? ' ⭐ `FEATURED`' : '';
        const techTags = p.tech.map((t) => `\`${t}\``).join('  ');
        const demoLink = p.live && p.live !== p.github ? ` • [🌐 Live Demo](${p.live})` : '';
        return `### ${idx + 1}. 🚀 **${p.title}**${featuredBadge}
> ${p.description}

- 🛠️ **Tech Stack:** ${techTags}
- 🔗 **Links:** [📂 GitHub Repository](${p.github})${demoLink}`;
      }).join('\n\n---\n\n');

      const headerDetails = [
        `# 💼 Projects Built by Vishnu V (${filtered.length} Projects Available)`,
        `> 🟢 *Data Source:* **Live GitHub API (github.com/Vishnuvsh)**`,
        args.tech ? `> 🔍 *Filtered by Technology:* **${args.tech}**` : '',
        args.featuredOnly ? `> ⭐ *Showing:* **Featured Projects Only**` : '',
      ].filter(Boolean).join('\n');

      const markdownOutput = `${headerDetails}

---

${projectCards}

---
💡 **Tip:** You can ask me for more details on any specific project, such as the architecture, live demo, or tech stack!`;

      return {
        content: [
          {
            type: 'text',
            text: markdownOutput,
          },
        ],
      };
    }

    case 'get_skills': {
      const categoryIcons = {
        Frontend: '🎨',
        Backend: '⚙️',
        'Database & Tools': '🗄️',
        'Soft Skills': '🤝',
      };

      if (args.category) {
        const catKey = Object.keys(portfolioData.skills).find(
          (k) => k.toLowerCase() === args.category.toLowerCase().trim()
        );

        if (!catKey) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ **Category '${args.category}' not found.**\n\nAvailable categories: ${Object.keys(portfolioData.skills).map((k) => `\`${k}\``).join(', ')}`,
              },
            ],
            isError: true,
          };
        }

        const icon = categoryIcons[catKey] || '⚡';
        const skillList = portfolioData.skills[catKey]
          .map((s) => `- **${s.name.padEnd(14, ' ')}**: ${createProgressBar(s.level)}`)
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `## ${icon} ${catKey} Skills (${portfolioData.skills[catKey].length} Skills)\n\n${skillList}`,
            },
          ],
        };
      }

      // Format all categories
      const allCategories = Object.entries(portfolioData.skills)
        .map(([category, items]) => {
          const icon = categoryIcons[category] || '⚡';
          const itemsList = items
            .map((s) => `  - **${s.name}**: ${createProgressBar(s.level)}`)
            .join('\n');
          return `### ${icon} ${category}\n${itemsList}`;
        })
        .join('\n\n');

      const output = `# ⚡ Vishnu V — Technical & Professional Skills

${allCategories}

---
🌟 *High Proficiency Highlights:* React, Python, HTML/CSS, Problem Solving, Team Collaboration.`;

      return {
        content: [
          {
            type: 'text',
            text: output,
          },
        ],
      };
    }

    case 'get_resume': {
      const { profile, experiences, skills } = portfolioData;

      const highlightsList = profile.highlights
        .map((h) => `- ✨ **${h.title}**: ${h.description}`)
        .join('\n');

      const experienceList = experiences
        .map((exp) => {
          const achievements = exp.achievements.map((a) => `  - 🎯 ${a}`).join('\n');
          const techBadges = exp.skills.map((s) => `\`${s}\``).join(' ');
          return `### 💼 ${exp.role} — **${exp.company}**
*📅 ${exp.period} | 📍 ${exp.location} | 🏷️ ${exp.type}*

${exp.description}

**Key Impact & Achievements:**
${achievements}

**Technologies:** ${techBadges}`;
        })
        .join('\n\n---\n\n');

      const resumeMarkdown = `# 📄 Vishnu V — Full-Stack Developer Profile
> ${profile.tagline}

📍 **Location:** ${profile.location}  
📧 **Email:** [${profile.contact.email}](mailto:${profile.contact.email}) • 📱 **Phone:** [${profile.contact.phone}](tel:${profile.contact.phone.replace(/[^0-9+]/g, '')})  
🌐 **Portfolio:** [resilient-genie-df3d71.netlify.app](${profile.contact.portfolio}) • 🐙 **GitHub:** [Vishnuvsh](${profile.contact.github}) • 💼 **LinkedIn:** [Vishnu V](${profile.contact.linkedin})

---

## 🎯 Executive Summary
${profile.bio}

---

## 💎 Core Highlights
${highlightsList}

---

## 💼 Work Experience
${experienceList}

---

## 🛠️ Skills Snapshot
- 🎨 **Frontend:** ${skills.Frontend.map((s) => `\`${s.name} (${s.level}%)\``).join(' ')}
- ⚙️ **Backend:** ${skills.Backend.map((s) => `\`${s.name} (${s.level}%)\``).join(' ')}
- 🗄️ **Database & Tools:** ${skills['Database & Tools'].map((s) => `\`${s.name}\``).join(' ')}
`;

      return {
        content: [
          {
            type: 'text',
            text: resumeMarkdown,
          },
        ],
      };
    }

    case 'get_contact_info': {
      const { profile } = portfolioData;
      const contactMarkdown = `# 📇 Vishnu V — Digital Business Card
### **${profile.name}** | *${profile.role}*
> "${profile.tagline}"

📍 **Location:** ${profile.location}  
🟢 **Status:** Available for Freelance Projects & Full-Time Opportunities  

---

### 📬 Direct Contact:
- 📧 **Email:** [${profile.contact.email}](mailto:${profile.contact.email})
- 📱 **Phone / WhatsApp:** [${profile.contact.phone}](tel:${profile.contact.phone.replace(/[^0-9+]/g, '')})

---

### 🌐 Online Profiles:
- 💻 **Live Portfolio:** [${profile.contact.portfolio}](${profile.contact.portfolio})
- 🐙 **GitHub:** [@Vishnuvsh](${profile.contact.github})
- 💼 **LinkedIn:** [in/vishnu-v-b5256b341](${profile.contact.linkedin})

---
💬 *Feel free to reach out via Email or LinkedIn for collaboration!*`;

      return {
        content: [
          {
            type: 'text',
            text: contactMarkdown,
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start Server over Stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Vishnu Portfolio MCP Server is running over stdio...');
}

main().catch((err) => {
  console.error('Fatal error in MCP Server:', err);
  process.exit(1);
});

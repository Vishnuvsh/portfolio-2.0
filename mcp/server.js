#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load portfolio data
const dataPath = join(__dirname, 'portfolio-data.json');
const portfolioData = JSON.parse(readFileSync(dataPath, 'utf-8'));

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
          'Get the list of projects built by Vishnu V. Includes titles, descriptions, tech stacks, GitHub links, and live demo links. Supports optional filtering by technology or featured status.',
        inputSchema: {
          type: 'object',
          properties: {
            tech: {
              type: 'string',
              description: 'Optional filter by technology (e.g., "Python", "React", "Django", "MySQL")',
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
      let filtered = [...portfolioData.projects];

      if (args.featuredOnly) {
        filtered = filtered.filter((p) => p.featured);
      }

      if (args.tech) {
        const query = args.tech.toLowerCase().trim();
        filtered = filtered.filter((p) =>
          p.tech.some((t) => t.toLowerCase().includes(query))
        );
      }

      const projectCards = filtered.map((p, idx) => {
        const featuredBadge = p.featured ? ' ⭐ `FEATURED`' : '';
        const techTags = p.tech.map((t) => `\`${t}\``).join('  ');
        return `### ${idx + 1}. 🚀 **${p.title}**${featuredBadge}
> ${p.description}

- 🛠️ **Tech Stack:** ${techTags}
- 🔗 **Links:** [📂 GitHub Repository](${p.github}) • [🌐 Live Demo](${p.live})`;
      }).join('\n\n---\n\n');

      const headerDetails = [
        `# 💼 Projects Built by Vishnu V (${filtered.length} Projects)`,
        args.tech ? `> 🔍 *Filtered by Technology:* **${args.tech}**` : '',
        args.featuredOnly ? `> ⭐ *Showing:* **Featured Projects Only**` : '',
      ].filter(Boolean).join('\n');

      const markdownOutput = `${headerDetails}

---

${projectCards}

---
💡 **Tip:** You can ask me for more details on any specific project, such as the system architecture, challenges solved, or live demo!`;

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

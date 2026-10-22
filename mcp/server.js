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

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                total: filtered.length,
                projects: filtered,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case 'get_skills': {
      if (args.category) {
        const catKey = Object.keys(portfolioData.skills).find(
          (k) => k.toLowerCase() === args.category.toLowerCase().trim()
        );

        if (!catKey) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    error: `Category '${args.category}' not found. Available categories: ${Object.keys(portfolioData.skills).join(', ')}`,
                  },
                  null,
                  2
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                { category: catKey, skills: portfolioData.skills[catKey] },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(portfolioData.skills, null, 2),
          },
        ],
      };
    }

    case 'get_resume': {
      const { profile, experiences, skills } = portfolioData;

      const resumeMarkdown = `# ${profile.name} - ${profile.role}
**Location:** ${profile.location}
**Email:** ${profile.contact.email} | **Phone:** ${profile.contact.phone}
**GitHub:** ${profile.contact.github} | **LinkedIn:** ${profile.contact.linkedin}
**Portfolio:** ${profile.contact.portfolio}

---

## Professional Summary
${profile.bio}

## Core Highlights
${profile.highlights.map((h) => `- **${h.title}**: ${h.description}`).join('\n')}

## Work Experience
${experiences
  .map(
    (exp) => `### ${exp.role} — ${exp.company} (${exp.period})
*Location:* ${exp.location} | *Type:* ${exp.type}
${exp.description}

**Key Achievements:**
${exp.achievements.map((a) => `- ${a}`).join('\n')}

**Technologies Used:** ${exp.skills.join(', ')}`
  )
  .join('\n\n')}

## Technical Skills Overview
- **Frontend:** ${skills.Frontend.map((s) => `${s.name} (${s.level}%)`).join(', ')}
- **Backend:** ${skills.Backend.map((s) => `${s.name} (${s.level}%)`).join(', ')}
- **Database & Tools:** ${skills['Database & Tools'].map((s) => `${s.name} (${s.level}%)`).join(', ')}
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
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                name: portfolioData.profile.name,
                role: portfolioData.profile.role,
                location: portfolioData.profile.location,
                contact: portfolioData.profile.contact,
              },
              null,
              2
            ),
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

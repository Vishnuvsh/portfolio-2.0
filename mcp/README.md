# Vishnu Portfolio MCP Server

Model Context Protocol (MCP) server for Vishnu V's portfolio.

## Available Tools

1. **`get_projects`**:
   - Returns all projects with description, tech stack, and GitHub / live links.
   - Parameters:
     - `tech` (optional string): Filter projects by technology (e.g. `Python`, `React`, `Django`).
     - `featuredOnly` (optional boolean): Filter for featured projects.

2. **`get_skills`**:
   - Returns skills grouped by category (`Frontend`, `Backend`, `Database & Tools`, `Soft Skills`) with proficiency percentage.
   - Parameters:
     - `category` (optional string): Filter by category.

3. **`get_resume`**:
   - Returns full resume markdown summary with bio, role, work experience, achievements, and contact details.

4. **`get_contact_info`**:
   - Returns direct contact details (Email, Phone, Location, GitHub, LinkedIn, Portfolio).

---

## How to Run

### Direct run:
```bash
npm run mcp
```
or
```bash
node mcp/server.js
```

---

## Configuration for AI Clients

### Claude Desktop (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "vishnu-portfolio": {
      "command": "node",
      "args": ["c:/Users/vishn/OneDrive/Desktop/portfolio-2.0/mcp/server.js"]
    }
  }
}
```

### Antigravity IDE:
Configured automatically under:
`.agents/plugins/portfolio-mcp/mcp_config.json`

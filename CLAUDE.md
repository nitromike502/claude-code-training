# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains training materials for Claude Code, specifically a comprehensive "Lunch & Learn" series designed to onboard both non-technical team members and developers. The main content is structured as a 5-part educational series for non-technical users plus advanced developer training, covering Claude Code fundamentals through advanced automation features, complete with an interactive presentation delivery system and comprehensive development documentation.

## Key Files

- `overview.md` - Contains the complete "Claude Code Lunch & Learn Series: From Zero to Hero" curriculum, a comprehensive training program designed for both non-technical staff and developers
- `sessions/` - Individual session documents (session-1.md through session-5.md, plus dev-session-1/ directory containing comprehensive advanced developer training materials)
- `examples/laravel-vue-ecommerce/` - Live Laravel + Vue.js e-commerce application for training demonstrations
- `example-projects.md` - Alternative project options for training scenarios
- `presentation/` - Interactive presentation delivery system with Node.js server and web interface
- `docs/` - Comprehensive development documentation, research, and guidelines
- `.claude/` - Agent definitions and custom commands for specialized tasks

## Content Structure

The training series is organized into 5 progressive sessions for non-technical staff, plus comprehensive advanced developer training:

1. **Session 1**: Introduction to Claude Code and its core purpose (15 min)
2. **Session 2**: Project initialization and setup (20 min)
3. **Session 3**: Documentation generation with Markdown (20 min)
4. **Session 4**: MCP Servers and centralized analysis (15 min)
5. **Session 5**: Sub-agents overview (@explain, @docu, @find) (20 min)
6. **Dev Session Series**: Advanced developer topics organized in progressive modules:
   - **Dev Session 0**: Introduction and setup for advanced topics
   - **Dev Session 1**: Core subagents, slash commands, and hooks (main session)
   - **Dev Session 1a-1d**: Specialized modules covering advanced automation, custom agents, and workflow optimization

Each session includes:
- Clear learning objectives
- Practical examples and analogies
- Q&A preparation sections
- Specific use cases for non-technical roles

## Development Context

This repository includes training documentation, interactive presentation tools, and a fully functional demonstration project:

### Training Materials
The content focuses on educational materials for Claude Code adoption in enterprise environments, emphasizing practical, role-specific applications for:
- Project Managers
- Technical Writers  
- QA Testers
- Other non-technical team members

### Interactive Presentation System
The `presentation/` directory contains a complete Node.js-based presentation delivery system with:
- Express server with session content loading API
- Interactive web interface with accordion sections and timers
- Progress tracking and completion marking
- Professional styling optimized for training delivery
- Real-time session management with export capabilities

### Example Project
The `examples/laravel-vue-ecommerce/` directory contains a complete Laravel + Vue.js e-commerce application with:
- Laravel 11 backend with API endpoints
- Vue.js 3 admin panel with modern UI
- MariaDB database with seeders
- DDEV containerized development environment
- Real-world features: products, categories, orders, customers, reports

## Working with This Repository

### Training Content Development
When working on developing or improving the training materials, check the `docs/` directory for research, insights, and guidelines. The `docs/CLAUDE.md` file will automatically guide you to relevant documentation for your specific task.

### Presentation Delivery
To run live training sessions, use the interactive presentation system:

```bash
cd presentation
npm start
```

**Access Points:**
- Presentation Control: `http://localhost:3001`
- Session progress tracking with timers and completion marking
- Export capabilities for session documentation

### Documentation Maintenance
Since the main content is training materials, typical development commands (build, test, lint) are not applicable for the documentation. Focus on content review, editing, and ensuring the training materials remain current with Claude Code features.

### Complete Training Environment Setup
For a complete training delivery environment, set up both the demo project and presentation system:

**Demo Project Setup:**
```bash
cd examples/laravel-vue-ecommerce
ddev start
ddev start-dev  # Starts both Laravel and Vue.js dev servers
```

**Presentation System Setup:**
```bash
cd presentation
npm install
npm start
```

**Access URLs:**
- **Presentation Control**: `http://localhost:3001` - Interactive session management
- **Demo Frontend**: `http://laravel-vue-ecommerce.ddev.site` - Main e-commerce site
- **Demo Admin Panel**: `http://laravel-vue-ecommerce.ddev.site:3000` - Vue.js admin interface
- **Demo Admin Login**: `admin@example.com` / `admin123`

**Development Commands:**
- `ddev start-dev` - Start Vite development servers
- `ddev stop-dev` - Stop development servers  
- `ddev exec "php artisan migrate:fresh --seed"` - Reset database with sample data

**Security Note:**
- Google OAuth credentials for MCP servers should be configured in your `.bashrc` environment variables
- The `.mcp.json` file uses environment variable inheritance for secure credential management

### Custom Claude Commands
The repository includes specialized Claude commands for common training and development tasks:

- `/setup-demo` - Complete training environment preparation including DDEV setup, database seeding, and presentation server
- `/docs` - Comprehensive documentation maintenance and updates (currently running)
- `/commit` - Conventional commit creation with automatic change analysis
- `/present-session` - Session-specific presentation tools and guidance
- `/validate-sessions` - Training content quality assurance and validation

These commands are designed to streamline common development and presentation workflows.
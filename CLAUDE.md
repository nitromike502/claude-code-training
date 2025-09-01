# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains training materials for Claude Code, specifically a comprehensive "Lunch & Learn" series designed to onboard non-technical team members. The main content is structured as a 5-part educational series covering Claude Code fundamentals.

## Key Files

- `overview.md` - Contains the complete "Claude Code Lunch & Learn Series: From Zero to Hero" curriculum, a 5-session training program designed for non-technical staff
- `sessions/` - Individual session documents (session-1.md through session-5.md)
- `examples/laravel-vue-ecommerce/` - Live Laravel + Vue.js e-commerce application for training demonstrations
- `example-projects.md` - Alternative project options for training scenarios

## Content Structure

The training series is organized into 5 progressive sessions:

1. **Session 1**: Introduction to Claude Code and its core purpose (15 min)
2. **Session 2**: Project initialization and setup (20 min) 
3. **Session 3**: Documentation generation with Markdown (20 min)
4. **Session 4**: MCP Servers and centralized analysis (15 min)
5. **Session 5**: Sub-agents overview (@explain, @docu, @find) (20 min)

Each session includes:
- Clear learning objectives
- Practical examples and analogies
- Q&A preparation sections
- Specific use cases for non-technical roles

## Development Context

This repository includes both training documentation and a fully functional demonstration project:

### Training Materials
The content focuses on educational materials for Claude Code adoption in enterprise environments, emphasizing practical, role-specific applications for:
- Project Managers
- Technical Writers  
- QA Testers
- Other non-technical team members

### Example Project
The `examples/laravel-vue-ecommerce/` directory contains a complete Laravel + Vue.js e-commerce application with:
- Laravel 11 backend with API endpoints
- Vue.js 3 admin panel with modern UI
- MariaDB database with seeders
- DDEV containerized development environment
- Real-world features: products, categories, orders, customers, reports

## Working with This Repository

### Training Content Development
When working on developing or improving the training materials, check the `development/` directory for research, insights, and guidelines. The `development/CLAUDE.md` file will automatically guide you to relevant documentation for your specific task.

### Documentation Maintenance
Since the main content is training materials, typical development commands (build, test, lint) are not applicable for the documentation. Focus on content review, editing, and ensuring the training materials remain current with Claude Code features.

### Example Project Setup
To run the demonstration e-commerce project:

```bash
cd examples/laravel-vue-ecommerce
ddev start
ddev start-dev  # Starts both Laravel and Vue.js dev servers
```

**Access URLs:**
- Frontend: `http://laravel-vue-ecommerce.ddev.site`
- Admin Panel: `http://laravel-vue-ecommerce.ddev.site:3000`
- Admin Login: `admin@example.com` / `admin123`

**Development Commands:**
- `ddev start-dev` - Start Vite development servers
- `ddev stop-dev` - Stop development servers  
- `ddev exec "php artisan migrate:fresh --seed"` - Reset database with sample data
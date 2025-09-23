# Claude Code Lunch & Learn Training Materials

This repository contains a comprehensive 5-session training series designed to onboard non-technical team members to Claude Code. The training materials bridge the gap between technical and non-technical teams by making complex codebases accessible to everyone.

## Overall Goal
To empower non-technical staff to confidently use Claude Code for project analysis, documentation, and communication, bridging the gap between technical and non-technical teams.

## Training Series Structure

The training is organized as individual 15-20 minute sessions for non-technical staff, with an additional advanced developer session. Each session has specific learning objectives:

### Session Documents
- **[Session 1](sessions/session-1.md)**: What is Claude Code & Why Should I Use It?
- **[Session 2](sessions/session-2.md)**: Pointing Claude at Your Project
- **[Session 3](sessions/session-3.md)**: Creating Great Documentation with `.md` Files
- **[Session 4](sessions/session-4.md)**: The Next Level: What are MCP Servers?
- **[Session 5](sessions/session-5.md)**: Meet the Sub-Agents (Claude Code's "Modes")
- **[Dev Session 1](sessions/dev-session-1.md)**: Advanced Developer Topics: Subagents, Slash Commands & Hooks

## Example Project
The training materials use a **Laravel Vue.js E-commerce application** as the primary example throughout all sessions. This provides:

- **Relatable context**: E-commerce features everyone understands (shopping cart, checkout, user accounts)
- **Full-stack complexity**: Demonstrates Claude Code's ability to work with both backend (Laravel/PHP) and frontend (Vue.js/JavaScript) code
- **Real-world scenarios**: Practical examples for Project Managers, QA Testers, Technical Writers, and other non-technical roles

### Integrated Demo Project
- **Primary**: `examples/laravel-vue-ecommerce/` - Complete Laravel + Vue.js e-commerce platform with DDEV setup
- **Ready-to-use**: Full development environment with database seeders and realistic demo data
- **Alternative**: `example-projects.md` contains additional project options for different training scenarios

## Target Audience

### Primary Roles (Sessions 1-5)
- **Project Managers**: Understanding technical scope, timeline planning, stakeholder communication
- **QA Testers**: Writing better bug reports, understanding system workflows, test planning
- **Technical Writers**: Creating user documentation, API references, feature guides
- **Product Managers**: Understanding business logic implementation, feature impact analysis

### Advanced Users (Dev Session 1)
- **Software Developers**: Custom agent creation, workflow automation, advanced Claude Code features
- **DevOps Engineers**: CI/CD integration, automated documentation, deployment optimization
- **Technical Leads**: Team productivity enhancement, standardizing development workflows

### Key Learning Outcomes
By completing this training series, participants will be able to:

1. **Ask intelligent questions** about any codebase using plain English
2. **Generate professional documentation** from existing code  
3. **Locate specific functionality** across complex full-stack applications
4. **Understand system workflows** without interrupting developers
5. **Contribute meaningfully** to technical discussions and planning

## Session Delivery Notes

Each session document includes:
- ✅ **Presenter agenda** with specific timing
- ✅ **Live demo instructions** with actual commands
- ✅ **Q&A preparation** with common questions and answers  
- ✅ **Role-specific examples** tailored to different job functions
- ✅ **Real-world scenarios** using the Laravel Vue.js e-commerce project

## Getting Started

### For Presenters
1. **Review Content**: Study each session document before delivery
2. **Setup Environment**: Use the integrated demo project (`examples/laravel-vue-ecommerce/`)
3. **Launch Presentation System**: Run `npm start` in the `presentation/` directory for interactive session management

### For Demo Environment Setup
1. **Demo Project**: `cd examples/laravel-vue-ecommerce && ddev start && ddev start-dev`
2. **Presentation Control**: `cd presentation && npm start`
3. **Access URLs**: Demo at `https://laravel-vue-ecommerce.ddev.site`, Presentation control at `http://localhost:3001`

### For Participants
- No preparation needed - sessions build progressively from basics
- Live demonstrations use the integrated e-commerce platform

## Training Philosophy

This curriculum follows these principles:
- **Practical over theoretical**: Every concept demonstrated with real examples
- **Role-specific relevance**: Examples tailored to common non-technical use cases  
- **Progressive complexity**: Each session builds on the previous one
- **Hands-on practice**: Participants encouraged to try commands during sessions
- **Real-world context**: Using actual open-source projects rather than toy examples

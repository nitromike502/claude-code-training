# Development Documentation System

**Purpose:** This directory contains development notes, research findings, and learnings for building the Claude Code training series. This file serves as your navigation guide and token efficiency controller.

**Key Principle:** Only read files relevant to your current task to optimize token usage and maintain focus.

## Navigation Matrix & Subagent Optimization

### When Working on Training Content Development:

**For Session Development (any session):**
- Read: `research/content-principles.md` (proven training methodologies)
- Read: `research/audience-insights.md` (non-technical user needs)
- Read: `sessions/session-X-notes.md` (if exists, for specific session context)
- **Subagent Opportunity**: Use `general-purpose` agent for complex research across multiple session files

**For Claude Code Feature Research:**
- Read: `research/claude-code-features.md` (official documentation analysis)
- Skip: Session-specific files unless researching features for specific session
- **Subagent Opportunity**: Use `general-purpose` agent to systematically verify features across official documentation

**For Content Quality Assurance:**
- Read: `guidelines/content-standards.md` (writing and presentation standards)
- Read: `guidelines/validation-checklist.md` (quality testing procedures)
- **Subagent Opportunities**: 
  - Use `code-reviewer` agent for technical accuracy validation
  - Use `ui-ux-designer` agent for presentation accessibility review

**For Creating New Sessions:**
- Read: `sessions/templates/session-development-template.md`
- Read: `research/content-principles.md`
- Read: `research/audience-insights.md`
- **Subagent Opportunity**: Use `context-manager` agent to maintain consistency across all session materials

**For Demo Project Management:**
- **Primary Subagent**: Use `sql-pro` agent for database management, seeding, and query optimization
- **Secondary**: Use `general-purpose` agent for multi-technology troubleshooting (Laravel + Vue.js + DDEV)

## File Directory & Purpose

### research/
- **`claude-code-features.md`** - Analysis of official Claude Code documentation, capabilities, and corrections to assumptions
- **`audience-insights.md`** - Non-technical team member needs, fears, language patterns that work
- **`content-principles.md`** - Proven training structures, effective analogies, business value connections

### sessions/
- **`session-1-notes.md`** - Session 1 development learnings, timing insights, demo flow discoveries
- **`session-2-notes.md`** - (Future: Session 2 specific learnings)
- **`session-3-notes.md`** - (Future: Session 3 specific learnings) 
- **`session-4-notes.md`** - (Future: Session 4 specific learnings)
- **`session-5-notes.md`** - (Future: Session 5 specific learnings)
- **`templates/session-development-template.md`** - Standard format for documenting new session development

### guidelines/
- **`content-standards.md`** - Writing style, accessibility requirements, presentation guidelines
- **`validation-checklist.md`** - Testing procedures, command verification, user feedback protocols

## Token Efficiency Rules & Subagent Workflows

1. **Read Only What You Need:** Use navigation matrix above to determine relevant files
2. **Session-Specific Work:** Only read notes for the session you're currently developing
3. **General Development:** Research and guidelines files provide cross-session insights
4. **Avoid Redundant Reading:** If you've read a file in the current session, reference your memory rather than re-reading
5. **Leverage Subagents for Complex Tasks:** When work spans multiple files or requires specialized expertise, use appropriate subagents instead of reading everything manually

### Subagent Decision Matrix

**Use `general-purpose` agent when:**
- Researching across multiple session files simultaneously
- Verifying Claude Code features against official documentation  
- Troubleshooting complex multi-technology issues (Laravel + Vue.js + DDEV)
- Performing systematic searches across the entire documentation system

**Use `code-reviewer` agent when:**
- Validating technical accuracy of training examples
- Reviewing demo project code for quality and best practices
- Ensuring all code examples in training materials are correct
- Checking for security issues in demonstration code

**Use `ui-ux-designer` agent when:**
- Reviewing presentation materials for accessibility compliance
- Optimizing training content layout and visual hierarchy
- Ensuring training materials follow UX best practices
- Creating user-friendly navigation and information architecture

**Use `context-manager` agent when:**
- Maintaining consistency across all session materials
- Managing cross-references between different training documents
- Ensuring terminology and examples remain consistent throughout the series
- Tracking changes and dependencies across multiple files

**Use `sql-pro` agent when:**
- Managing demo project database schema and seeders
- Optimizing queries for training demonstrations
- Troubleshooting database-related issues in the e-commerce example
- Creating realistic test data for training scenarios

## Maintenance Protocols

### When to Update:
- **After completing work on any session:** Add learnings to session-specific notes
- **After discovering new Claude Code features:** Update `claude-code-features.md`
- **After identifying new audience insights:** Update `audience-insights.md`
- **After validating content approaches:** Update `content-principles.md`
- **After using subagents effectively:** Document successful subagent workflows in this file

### Subagent-Enhanced Maintenance Workflows

**For Content Updates:**
1. Use `context-manager` agent to identify all files requiring updates when content changes
2. Use `general-purpose` agent to systematically update related documentation
3. Use `code-reviewer` agent to validate any technical examples after updates

**For Quality Assurance:**
1. Use `ui-ux-designer` agent to review presentation materials against accessibility standards
2. Use `code-reviewer` agent to validate all technical claims and examples
3. Use `general-purpose` agent to cross-check content against current Claude Code documentation

**For Demo Project Maintenance:**
1. Use `sql-pro` agent to manage database updates and ensure data integrity
2. Use `general-purpose` agent for full-stack troubleshooting across Laravel + Vue.js + DDEV
3. Use `code-reviewer` agent to maintain code quality and security standards

### How to Keep Files Focused:
- **Single Purpose:** Each file covers one topic area only
- **Cross-Reference, Don't Duplicate:** Link to related information rather than copying it
- **Regular Review:** Remove outdated information, consolidate repeated patterns
- **Size Limits:** Keep individual files under 150 lines when possible

### File Naming Convention:
- **Research files:** `topic-name.md` (kebab-case, descriptive)
- **Session files:** `session-X-notes.md` (where X is session number)
- **Guidelines:** `purpose-name.md` (kebab-case, action-oriented)

## Quick Reference Summaries

### Files
- **claude-code-features.md:** "What Claude Code actually does vs. our assumptions"
- **audience-insights.md:** "How non-technical users think and what they need"  
- **content-principles.md:** "Training approaches that work and language patterns that connect"
- **session-X-notes.md:** "Specific lessons learned developing session X"
- **content-standards.md:** "Writing and presentation quality requirements"
- **validation-checklist.md:** "How to test and validate training content"

### Subagents
- **general-purpose:** "Multi-file research, feature verification, complex troubleshooting"
- **code-reviewer:** "Technical validation, security checks, code quality assurance"
- **ui-ux-designer:** "Accessibility compliance, presentation optimization, user experience"
- **context-manager:** "Cross-session consistency, dependency tracking, change management"
- **sql-pro:** "Database management, query optimization, demo data creation"

---

*This system is designed to grow efficiently with the project while maintaining Claude's ability to quickly find relevant information.*
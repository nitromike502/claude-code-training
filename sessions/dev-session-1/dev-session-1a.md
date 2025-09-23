# Dev Session 1a: Mastering Subagents

**Length:** 15-20 minutes (focused deep-dive)
**Goal:** Developers will understand Claude Code's subagent system and create their first custom subagent for their development workflow.
**Core Concepts:** Subagent Architecture, Configuration, Context Management, Security Best Practices

## Session Outline

### 1. (3 min) Introduction: What Are Subagents?

**Definition:** Subagents are specialized AI assistants within Claude Code that operate in separate context windows, each optimized for specific types of development tasks.

Think of subagents as having different "experts" on your development team:
- Your **security expert** (security-reviewer subagent) who focuses solely on finding vulnerabilities
- Your **database specialist** (database-expert subagent) who optimizes queries and schemas
- Your **documentation writer** (api-documenter subagent) who creates comprehensive docs
- Your **code reviewer** (code-reviewer subagent) who focuses on quality and maintainability

**Key Characteristics:**
- **Isolated context:** Each subagent operates in its own conversation context, preventing information bleed
- **Specialized instructions:** Custom system prompts tailored to specific domains
- **Tool restrictions:** Can be configured with limited tool access for security and focus
- **Reusable expertise:** Once created, can be used across projects and team members

### 2. (4 min) Why Use Subagents?

#### Context Preservation
Your main Claude Code conversation stays clean and focused while subagents handle specialized analysis in separate contexts.

#### Specialized Expertise
A security-focused subagent will provide deeper, more accurate security analysis than asking general Claude Code to "check for security issues."

#### Consistency
Subagents provide consistent analysis patterns - your code-reviewer subagent will always check the same quality criteria.

#### Efficiency
Subagents are optimized for their specific domain, often providing faster and more accurate results.

#### When to Use Subagents vs Main Claude Code

**Use subagents when you have:**
- **Repetitive specialized tasks** (code reviews, documentation generation, security analysis)
- **Complex analysis requiring domain expertise** (database optimization, API design)
- **Tasks that need consistent criteria** (coding standards enforcement, testing patterns)
- **Work requiring tool restrictions** (giving limited access for specific operations)

**Stick with main Claude Code for:**
- **General questions and conversations**
- **One-off tasks that don't need specialization**
- **Exploratory work where you're not sure what you need**
- **Simple tasks that don't benefit from specialized context**

### 3. (5 min) Subagent Architecture & Configuration

#### How Subagents Work

**Invocation Methods:**
1. **Automatic delegation:** Claude Code detects the task type and automatically invokes appropriate subagents, based on the descriptions defined in the subagents' YAML
2. **Explicit requests:** You can specifically request a subagent: "Use the security-reviewer subagent to analyze this authentication code"
3. **Command-based:** Some subagents can be invoked through custom slash commands

**Context Flow:**
```
Main Claude Code Session
├── Your conversation and general tasks
├── Subagent: security-reviewer (analyzing auth.php)
├── Subagent: database-expert (optimizing queries)
└── Subagent: api-documenter (generating docs)
```

Each subagent maintains its own context and memory, then reports back results to your main session.

#### Subagent Storage Locations

**Location:** Subagents are defined as Markdown files with YAML frontmatter in:
- **Project-level:** `.claude/agents/*.md` (shared with team)
- **User-level:** `~/.claude/agents/*.md` (personal subagents)
- **Project/User level:** `.claude/agents/*.local.md` (personal & project specific, requires .gitignore entry)
- **Organized:** `agents/dev/*.md` (grouped for organization, names must be unique)

#### Basic Subagent Structure

```yaml
---
name: my-code-reviewer
description: Reviews code for quality, security, and best practices
tools: Read, Grep, Glob
model: sonnet
color: blue
---

You are an expert code reviewer specializing in PHP and Laravel applications.

When reviewing code, focus on:
1. Security vulnerabilities (SQL injection, XSS, authentication issues)
2. Performance bottlenecks and optimization opportunities
3. Code maintainability and readability
4. Adherence to Laravel best practices
5. Proper error handling and logging

Provide specific, actionable feedback with code examples where helpful.
```

**Essential Configuration Fields:**
- `name`: Unique identifier (lowercase, hyphen-separated)
- `description`: When and how the subagent should be used. Be thorough, this is what Claude uses to determine if/when the subagent should be used
- `tools`: List of allowed tools (omit for full tool access)
- `model`: Model to use ("sonnet", "opus", "haiku", or "inherit")
- `color`: Color of the subagent Task in the CLI

### 4. (4 min) Security Best Practices

#### Tool Access Control
Subagents should follow the principle of least privilege when it comes to tool access:

```yaml
# Security-focused subagent - read-only access
---
name: security-scanner
description: Identifies security vulnerabilities in code
tools: Read, Grep, Glob  # No Write, Edit, or Bash access
---

# Documentation subagent - limited write access
---
name: doc-generator
description: Generates project documentation
tools: Read, Write, Glob  # No Bash access for security
---

# Full-access subagent - use sparingly
---
name: deployment-manager
description: Handles deployment and infrastructure tasks
# No tools specified = full access - use with extreme caution
---
```

#### Security Risk Assessment by Tool
- **High Risk:** `Bash`, `KillShell` - Can execute arbitrary commands
- **Medium Risk:** `Write`, `Edit`, `MultiEdit` - Can modify files and potentially inject malicious code
- **Low Risk:** `Read`, `Grep`, `Glob` - Read-only operations
- **Minimal Risk:** `TodoWrite` - Only affects session state
- **Variable Risk:** Individual MCP tools/functions

#### Team Security Best Practices
- Review all team-shared subagents before committing to repositories
- Establish code review processes for subagent modifications
- Define and document security requirements for different subagent types
- Regularly audit subagent tool permissions and usage patterns

### 5. (4 min) Context Management & Performance

#### Understanding Context Limits
Subagents operate with isolated contexts, but they still have token limitations that affect performance and accuracy:

**Context Size Factors:**
- **System Prompt Length:** Detailed subagent instructions consume tokens
- **File Content:** Large files can quickly fill context windows
- **Task Complexity:** Multi-step tasks require more context tracking
- **Tool Output:** Command results and file contents accumulate
- **Tool Permissions:** Every tool and MCP endpoint consume tokens, which can add up quickly

#### Optimization Strategies

**1. Scope Control:**
```yaml
---
name: focused-reviewer
description: Reviews specific file types for Laravel applications
---

When analyzing code, focus only on:
- PHP files in app/ directory
- Blade templates in resources/views/
- Ignore vendor/, node_modules/, and storage/ directories

Use targeted Read and Grep operations rather than broad directory scans.
```

**2. Progressive Analysis Pattern:**
```yaml
---
name: progressive-analyzer
description: Performs analysis in progressive stages to manage context
---

Analysis approach:
1. **Discovery Phase:** Use Glob and Grep to map the codebase structure
2. **Targeted Review:** Focus on specific files or patterns identified in phase 1
3. **Incremental Reporting:** Provide findings as you discover them
4. **Context Reset:** For large projects, recommend breaking into multiple subagent invocations
```

**Context Management Best Practices:**
- **Monitor subagent performance** - if responses become less accurate, context may be full
- **Design for incremental analysis** rather than comprehensive reviews
- **Use specific file patterns** instead of broad directory scans
- **Break complex tasks** into multiple focused subagent calls

## Hands-On Exercise (Live Demo)

### Creating Your First Subagent

**Scenario:** Create a Laravel-specific code reviewer that focuses on common Laravel security patterns.

```yaml
---
name: laravel-security-reviewer
description: Reviews Laravel code for security vulnerabilities and best practices
tools: Read, Grep, Glob
model: sonnet
color: red
---

You are a Laravel security expert specializing in web application security.

When reviewing Laravel code, focus on:
1. **Authentication & Authorization:**
   - Proper use of middleware and gates
   - Session security and CSRF protection
   - Password hashing and validation

2. **Database Security:**
   - SQL injection prevention with Eloquent
   - Mass assignment protection
   - Database connection security

3. **Input Validation:**
   - Form Request validation
   - XSS prevention in Blade templates
   - File upload security

4. **Configuration Security:**
   - Environment variable usage
   - Debug mode settings
   - HTTPS enforcement

Provide specific Laravel code examples and reference official documentation where applicable.
```

## Common Pitfalls & Troubleshooting

**Subagent Not Being Invoked:**
- Check that the `description` field clearly indicates when the subagent should be used
- Ensure the subagent name doesn't conflict with built-in subagents
- Verify the YAML frontmatter is properly formatted

**Poor Subagent Performance:**
- Avoid overly generic system prompts - be specific about the subagent's role
- Include examples in the system prompt for complex behaviors
- Consider tool restrictions if the subagent doesn't need full tool access

## Key Takeaways

- **Subagents provide specialized expertise** that's more accurate than general-purpose analysis
- **Context isolation** keeps your main conversation clean while enabling deep, focused analysis
- **Security considerations** are crucial - always use principle of least privilege for tool access
- **Performance optimization** through context management and progressive analysis patterns
- **Team collaboration** benefits from shared, well-documented subagent configurations

## Next Session Preview

In Dev Session 1b, we'll explore **Custom Slash Commands** - how to create streamlined development workflows with command shortcuts that integrate with your subagents and existing tools.
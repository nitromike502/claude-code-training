# Dev Session 1: Subagents, Slash Commands & Hooks Integration

**Length:** 50-60 minutes (technical deep-dive with practical implementation examples)
**Goal:** Developers will understand Claude Code's subagent system, master custom slash commands, and implement hooks for automated workflows in their development teams.
**Core Concepts:** Subagent Configuration, Custom Slash Commands, Hook Automation, Workflow Integration, Development Productivity

## Agenda

### 1. (5 min) Introduction: Beyond Basic Claude Code
Start by acknowledging that while basic Claude Code is powerful, the real productivity gains come from leveraging specialized subagents that handle specific development workflows.

### 2. (12 min) Understanding Subagents: The Foundation
Before diving into advanced topics, let's establish a solid understanding of what subagents are and why they're essential for developer productivity.

#### What Are Subagents?
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

#### Why Use Subagents Instead of General Claude Code?
**Context Preservation:** Your main Claude Code conversation stays clean and focused while subagents handle specialized analysis in separate contexts.

**Specialized Expertise:** A security-focused subagent will provide deeper, more accurate security analysis than asking general Claude Code to "check for security issues."

**Consistency:** Subagents provide consistent analysis patterns - your code-reviewer subagent will always check the same quality criteria.

**Efficiency:** Subagents are optimized for their specific domain, often providing faster and more accurate results.

#### When Should You Use Subagents?
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

#### How Do Subagents Work?
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

#### Creating Your First Subagent
**Location:** Subagents are defined as Markdown files with YAML frontmatter in:
- **Project-level:** `.claude/agents/*.md` (shared with team)
- **User-level:** `~/.claude/agents/*.md` (personal subagents)
- **Project/User level:** `.claude/agents/*.local.md` (personal & project specific, requires .gitignore entry)
- **Scoped:**: `.../agents/dev/*.md` (scoped for organization, not currently working in Windows)

**Basic Structure:**
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

#### Common Subagent Patterns for Developers

**Security-Focused Subagent:**
```yaml
---
name: security-scanner
description: Identifies security vulnerabilities and compliance issues
tools: Read, Grep, Bash
---
You are a cybersecurity expert specializing in web application security...
```

**Performance Analysis Subagent:**
```yaml
---
name: performance-analyzer
description: Analyzes code and database performance bottlenecks
tools: Read, Grep, Bash
---
You are a performance optimization specialist focusing on...
```

**API Documentation Subagent:**
```yaml
---
name: api-documenter
description: Generates comprehensive API documentation from code
tools: Read, Write, Glob
---
You are a technical writer specializing in API documentation...
```

#### Best Practices for Subagent Success
1. **Single Purpose:** Each subagent should have one clear, focused responsibility
2. **Detailed Prompts:** Write comprehensive system prompts with specific examples
3. **Tool Limitations:** Restrict tools to only what's needed for the specific task
4. **Naming Convention:** Use descriptive, consistent naming (e.g., `security-reviewer`, `performance-analyzer`)
5. **Team Sharing:** Store team subagents in `.claude/agents/` for project-wide access (when included in your repo)

#### Common Pitfalls and Troubleshooting
**Subagent Not Being Invoked:**
- Check that the `description` field clearly indicates when the subagent should be used
- Ensure the subagent name doesn't conflict with built-in subagents
- Verify the YAML frontmatter is properly formatted

**Poor Subagent Performance:**
- Avoid overly generic system prompts - be specific about the subagent's role
- Include examples in the system prompt for complex behaviors
- Consider tool restrictions if the subagent doesn't need full tool access

**Context Confusion:**
- Remember that subagents operate in isolated contexts - they don't know about your main conversation
- Include all necessary context in the task prompt when using explicit Task calls
- Consider when automatic delegation might be better than explicit invocation

**Team Adoption Issues:**
- Start with simple, high-value subagents (code-reviewer, security-scanner)
- Provide clear documentation on when and how to use each subagent
- Consider creating project-specific examples and use cases

### 3. (6 min) Advanced Subagent Features & Task Tool
Understanding the Task tool for explicit subagent invocation and advanced subagent capabilities.

#### Built-in vs Custom Subagents
**Built-in Subagents:** Claude Code comes with several pre-configured subagents:
- `general-purpose`: 
  - For complex multi-step tasks and research
  - Shows in CLI as `Task({prompt given to subagent})`
  - Invoke by prompting "Use the general-purpose subagent to ..."
- `statusline-setup`: 
  - To build a Status Line configuration. 
  - Invoke with `/statusline`
  - looks for existing PS1 prompt definitions (from `~/.bashrc` or similar)
- `output-style-setup`: 
  - To help the user build an output style
  - Provides a wizard type experience.
  - Invoke with `/output-style:new`, 

**Custom Subagents:** Your team-specific or project-specific agents stored in `.claude/agents/`

#### Subagent Selection Strategy
**Automatic Selection:** 
Claude Code analyzes your request and automatically chooses appropriate subagents based on:
- Task type and complexity
- Keywords in your request
- Project context and files involved

**Example prompt:** "Commit the code changes and create a **__git__** pull request" 

**Manual Selection:** 
Use explicit Task tool calls when you need:
- Specific expertise for a particular domain
- Consistent analysis patterns
- Tool restrictions for security
- Parallel processing of multiple tasks

**Example prompt:** "Use the **__git-workflow__** subagent to commit changes and create a PR

### 4. Other Ideas for Subagents

1. **Subagent Editor**: 
- You're in the middle of development for a ticket and realize you need to edit a subagent, because it made several mistakes when used.
- A subagent will research and learn how subagents work, then read the agent to be edited, provide suggested edits, and perform the requested changes

2. **Research Agent**: 
- You're performing a technical discovery and want Claude to research a feature, but don't want to risk reaching the session limit and auto-compacting
- The subagent will perform the research and generate a comprehensive answer, without affecting the main session context/tokens

3. **Documentation Maintainer**: 
- You've reached the end of a development session, and don't want to lose context, but docs need to be updated from your changes
- The subagent can consume more project documentation, review git changes, and determine where updates may need to be made

### 5. (12 min) Custom Slash Command System
How to create and use custom slash commands for streamlined development workflows.

#### Understanding Slash Command Types
**Built-in Commands:** System-provided commands like `/clear`, `/config`, `/status`, `/review`
**Custom Commands:** User-defined commands stored in `.claude/commands/` (project) or `~/.claude/commands/` (personal)
**MCP Commands:** Server-provided commands with format `/mcp__<server>__<prompt>`

#### Creating Custom Commands
**File Structure:** Markdown files with YAML frontmatter in command directories
**Command Storage:**
- Project-level: `.claude/commands/` (team-shared)
- Personal: `~/.claude/commands/` (user-specific)

#### Practical Command Examples

**Code Review Command:**
```yaml
---
description: "Perform comprehensive code review with security focus"
---

Please review the following code for:
1. Security vulnerabilities (SQL injection, XSS, authentication issues)
2. Performance bottlenecks and optimization opportunities
3. Code quality and maintainability issues
4. Adherence to team coding standards

Focus on actionable feedback and specific recommendations.

$ARGUMENTS
```

**API Documentation Command:**
```yaml
---
description: "Generate OpenAPI documentation for Laravel routes"
---

!php artisan route:list --json

Analyze the Laravel routes and generate comprehensive OpenAPI documentation including:
- Endpoint descriptions and HTTP methods
- Request/response schemas
- Authentication requirements
- Example requests and responses
- Error response formats

$ARGUMENTS
```

**Database Schema Command:**
```yaml
---
description: "Document database schema and relationships"
---

!php artisan schema:dump

Analyze the database schema and create documentation covering:
- Table structures and relationships
- Index strategies and performance considerations
- Data validation rules and constraints
- Migration history and evolution

Focus on: $1
```

#### Advanced Command Features
**Argument Handling:**
- `$ARGUMENTS`: All arguments passed to command
- `$1`, `$2`, etc.: Individual positional arguments
- File references with `@filename` syntax

**Bash Integration:**
```yaml
---
description: "Run tests and generate coverage report"
---

!vendor/bin/phpunit --coverage-html coverage
!echo "Test coverage report generated in coverage/ directory"

Please analyze the test results and provide recommendations for:
- Areas needing additional test coverage
- Test quality and effectiveness
- Performance bottlenecks in test suite
```

**Command Namespacing:**
- Directory structure creates command namespaces
- Example: `.claude/commands/laravel/migrate.md` becomes `/laravel/migrate`

### 6. (10 min) Hooks: Automated Workflow Integration
How to use hooks to automate development workflows and integrate Claude Code with your existing tools.

#### What Are Hooks?
**Definition:** User-defined shell commands that execute at specific points in Claude Code's workflow
**Purpose:** Provide deterministic control over Claude Code behavior and integrate with existing tools
**Security Note:** Hooks run automatically with your credentials - review carefully before implementation

#### Hook Event Types
**Core Events:**
- **PreToolUse:** Runs before any tool execution
- **PostToolUse:** Runs after tool completion
- **UserPromptSubmit:** Executes when user submits a prompt
- **SessionStart/SessionEnd:** Triggered at session boundaries
- **SubagentStop:** Runs when a subagent completes its task

#### Practical Hook Examples

**Automatic Code Formatting Hook:**
```json
{
  "PostToolUse": {
    "Edit": {
      "command": "prettier --write $EDITED_FILE",
      "description": "Auto-format code after edits"
    }
  }
}
```

**Git Commit Logging Hook:**
```json
{
  "PostToolUse": {
    "git": {
      "command": "echo \"$(date): Git command executed - $TOOL_ARGS\" >> .claude/git.log",
      "description": "Log all git commands for audit trail"
    }
  }
}
```

**Desktop Notification Hook:**
```json
{
  "SessionEnd": {
    "*": {
      "command": "osascript -e 'display notification \"Claude Code session completed\" with title \"Development Update\"'",
      "description": "Notify when session ends"
    }
  }
}
```

**Test Runner Hook:**
```json
{
  "PostToolUse": {
    "Write": {
      "command": "if [[ $FILENAME == *test* ]]; then vendor/bin/phpunit $FILENAME; fi",
      "description": "Auto-run tests when test files are modified"
    }
  }
}
```

#### Hook Configuration Structure
**Settings Location:** Configuration files or project settings
**Command Execution:** Hooks receive JSON input via stdin and can return structured output
**Timeout:** Default 60-second timeout per hook execution
**Error Handling:** Exit code 2 blocks the triggering action

#### Advanced Hook Patterns
**Conditional Execution:**
```bash
#!/bin/bash
# Only run in specific directories
if [[ $(pwd) == *"/src/"* ]]; then
    eslint --fix $FILENAME
fi
```

**Multi-Step Workflows:**
```json
{
  "PreToolUse": {
    "git": {
      "command": "git stash push -m 'Auto-stash before Claude Code git operations'",
      "description": "Safely stash changes before git operations"
    }
  },
  "PostToolUse": {
    "git": {
      "command": "git stash pop",
      "description": "Restore stashed changes after git operations"
    }
  }
}
```

#### Security Best Practices
**Input Validation:** Always sanitize and validate hook inputs
**Path Security:** Use absolute paths and avoid user-controlled path construction
**Credential Protection:** Never log or expose sensitive credentials in hooks
**Permission Limiting:** Run hooks with minimal required permissions

### 7. (7 min) Workflow Integration Strategies
How to integrate subagents and slash commands into your existing development workflows.

#### Development Lifecycle Integration
**Planning Phase:**
- **`/analyze requirements`** - [Stub - Requirements analysis and breakdown]
- **`/design architecture`** - [Stub - Architecture planning and documentation]
- **`/estimate complexity`** - [Stub - Development effort estimation]

**Development Phase:**
- **`/review code`** - [Stub - Continuous code review during development]
- **`/document changes`** - [Stub - Automatic documentation updates]
- **`/test coverage`** - [Stub - Test coverage analysis and suggestions]

**Deployment Phase:**
- **`/validate deployment`** - [Stub - Pre-deployment validation checks]
- **`/document release`** - [Stub - Release documentation and changelog]
- **`/monitor performance`** - [Stub - Post-deployment monitoring setup]

#### Team Collaboration Patterns
**Code Review Integration:**
- **PR analysis:** [Stub - Automated pull request analysis]
- **Documentation updates:** [Stub - Automatic documentation maintenance]
- **Knowledge sharing:** [Stub - Team knowledge base updates]

**Onboarding Workflows:**
- **Project orientation:** [Stub - New team member project introduction]
- **Codebase exploration:** [Stub - Guided codebase navigation]
- **Documentation creation:** [Stub - Knowledge capture from experienced developers]

#### Automation Opportunities
- **Scheduled analysis:** [Stub - Regular code quality assessments]
- **Documentation maintenance:** [Stub - Automated documentation updates]
- **Performance monitoring:** [Stub - Regular performance analysis]
- **Security scanning:** [Stub - Automated security assessments]

### 8. (3 min) Performance and Best Practices
Optimization strategies for maximum productivity with subagents.

#### Performance Optimization
**Context Management:**
- **Context scoping:** [Stub - Limiting context to relevant files and directories]
- **Memory optimization:** [Stub - Managing agent memory and history]
- **Caching strategies:** [Stub - Leveraging analysis caching]

**Command Efficiency:**
- **Batch operations:** [Stub - Combining multiple operations efficiently]
- **Targeted analysis:** [Stub - Focusing analysis on specific areas]
- **Result filtering:** [Stub - Filtering and prioritizing results]

#### Best Practices
**Agent Selection:**
- **Task matching:** [Stub - Choosing the right agent for each task]
- **Context awareness:** [Stub - Understanding agent capabilities and limitations]
- **Workflow optimization:** [Stub - Optimizing agent usage patterns]

**Quality Assurance:**
- **Result validation:** [Stub - Validating agent outputs and suggestions]
- **Continuous improvement:** [Stub - Refining agent configurations based on usage]
- **Team standardization:** [Stub - Establishing team-wide agent usage standards]

### 9. (2 min) Wrap-up & Advanced Topics Preview
Recap the power of subagent specialization and preview advanced topics like custom agent development and enterprise deployment strategies.

## Technical Implementation Examples

### Laravel + Vue.js E-commerce Project Examples

#### Code Analysis with @explain
**Complex Controller Analysis:**
```php
// [Stub - Example Laravel controller with complex business logic]
// Target: OrderController::processPayment() method
// Demonstration: How @explain breaks down payment processing logic
```

**Vue.js Component Explanation:**
```javascript
// [Stub - Example Vue.js component with complex state management]
// Target: ShoppingCart.vue component
// Demonstration: How @explain documents component architecture
```

#### Documentation Generation with @docu
**API Endpoint Documentation:**
```php
// [Stub - Laravel API route examples]
// Target: E-commerce API endpoints
// Demonstration: Automatic OpenAPI documentation generation
```

**Component Documentation:**
```javascript
// [Stub - Vue.js component examples]
// Target: Product catalog components
// Demonstration: Comprehensive component documentation
```

#### Advanced Search with @find
**Dependency Tracing:**
```bash
# [Stub - Example search commands]
# Target: Payment processing dependencies
# Demonstration: Tracing payment flow across frontend and backend
```

**Pattern Discovery:**
```bash
# [Stub - Pattern search examples]
# Target: Authentication patterns
# Demonstration: Finding authentication implementations across the project
```

## Developer-Specific Quick Wins

### Backend Developer
- **Use Case:** Rapid API documentation and database schema analysis
- **Example:** `/document api/orders --format=openapi`
- **Value:** Maintain comprehensive API documentation automatically

### Frontend Developer
- **Use Case:** Component analysis and state management documentation
- **Example:** `/explain components/ProductCatalog.vue --include-state`
- **Value:** Understand complex component relationships and data flow

### Full-Stack Developer
- **Use Case:** End-to-end feature analysis and integration documentation
- **Example:** `/trace user-registration --full-stack`
- **Value:** Map complete user workflows across frontend and backend

### DevOps Engineer
- **Use Case:** Configuration analysis and deployment documentation
- **Example:** `/analyze deployment --infrastructure`
- **Value:** Document infrastructure requirements and deployment procedures

## Advanced Q&A Preparation

**"How do subagents differ from regular Claude Code?"**
Answer: Subagents are specialized versions of Claude optimized for specific development tasks, providing deeper expertise and better performance for focused workflows.

**"Can I create custom agents for my team's specific needs?"**
Answer: Yes, custom agents can be configured through JSON definitions in the `.claude/agents/` directory, allowing for team-specific optimizations.

**"How do slash commands improve development productivity?"**
Answer: Slash commands provide direct access to specialized capabilities, eliminating the need for verbose prompting and enabling workflow automation.

**"What's the performance impact of using multiple subagents?"**
Answer: Subagents are optimized for their specific domains and typically perform better than general-purpose analysis for specialized tasks.

**"How do subagents handle large codebases?"**
Answer: Subagents use intelligent context management and caching strategies to efficiently analyze large projects without performance degradation.

**"Can subagents work with our existing development tools?"**
Answer: Yes, subagents are designed to integrate with common development tools like Git, IDEs, CI/CD pipelines, and testing frameworks.

## Live Demo Setup

### Recommended Project: Laravel Vue.js E-commerce
Use the included example project: `examples/laravel-vue-ecommerce/`
- **Why this project:** Complex full-stack architecture showcasing multiple subagent specializations
- **Demo environment:** Fully functional with realistic business logic

### Demo Flow: Subagent Mastery in 25 Minutes

#### 0. Pre-Demo Setup Verification (3 min)
- **Environment preparation:** [Stub - Ensure all subagents are configured]
- **Project state:** [Stub - Verify demo project is ready]
- **Command preparation:** [Stub - Prepare command examples and scenarios]
- **Audience setup:** [Stub - Developer environment expectations]

#### 1. Subagent Architecture Overview (5 min)
**Demonstrate Agent Ecosystem:**
- **Show agent directory:** [Stub - Display .claude/agents/ structure]
- **Explain routing logic:** [Stub - How commands map to agents]
- **Performance comparison:** [Stub - General vs specialized agent performance]

#### 2. @explain Deep Dive (7 min)
**Complex Code Analysis:**
- **Target:** [Stub - OrderController payment processing method]
- **Command:** `/explain app/Http/Controllers/OrderController.php::processPayment`
- **Follow-up:** [Stub - Request architectural diagrams and flow charts]
- **Integration:** [Stub - Show how explanation feeds into documentation]

#### 3. @docu Documentation Generation (5 min)
**Automated Documentation:**
- **API documentation:** `/document routes/api.php --format=openapi`
- **Component documentation:** `/document resources/js/components --framework=vue`
- **Database documentation:** `/document database/migrations --include-relationships`

#### 4. @find Advanced Search Capabilities (5 min)
**Complex Search Scenarios:**
- **Cross-stack tracing:** `/trace user-authentication --full-stack`
- **Pattern discovery:** `/search payment-processing --semantic`
- **Dependency analysis:** `/find unused-components --deep-scan`

#### 5. Custom Workflow Integration (5 min)
**Real-world Integration:**
- **Git hook integration:** [Stub - Show automated documentation updates]
- **CI/CD integration:** [Stub - Automated code quality checks]
- **IDE shortcuts:** [Stub - Keyboard shortcuts for common commands]

### Pro Demo Tips
- **Show real complexity:** Use genuinely complex code examples that developers face daily
- **Emphasize time savings:** Demonstrate how subagents reduce analysis time from hours to minutes
- **Highlight automation:** Show how subagents enable workflow automation
- **Address performance:** Demonstrate that specialized agents are faster than general-purpose analysis
- **Show integration:** Connect subagent usage to existing development tools and processes
- **Encourage experimentation:** Provide time for hands-on experimentation with commands

## Key Takeaways
- **Specialized Expertise:** Subagents provide deeper, more accurate analysis than general-purpose AI assistance
- **Workflow Integration:** Slash commands enable seamless integration with existing development workflows
- **Performance Optimization:** Specialized agents are faster and more accurate for domain-specific tasks
- **Customization Capability:** Teams can create custom agents tailored to their specific needs and technologies
- **Automation Opportunities:** Subagents enable significant workflow automation and productivity improvements
- **Scalable Architecture:** The subagent system scales effectively with project complexity and team size
- **Quality Assurance:** Specialized agents provide more reliable and consistent outputs for their domains
- **Team Collaboration:** Subagents facilitate better knowledge sharing and onboarding processes

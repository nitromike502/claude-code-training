# Dev Session 1: Subagents, Slash Commands & Hooks Integration

**Length:** 45-55 minutes (technical deep-dive with practical implementation examples)
**Goal:** Developers will understand Claude Code's subagent system, master custom slash commands, and implement hooks for automated workflows in their development teams.
**Core Concepts:** Subagent Configuration, Custom Slash Commands, Hook Automation, Workflow Integration, Development Productivity

## Agenda

### 1. (5 min) Introduction: Beyond Basic Claude Code
Start by acknowledging that while basic Claude Code is powerful, the real productivity gains come from leveraging specialized subagents that handle specific development workflows.

### 2. (8 min) Subagent System Overview
Understanding how Claude Code's subagent system works and how to create specialized AI assistants for your development workflows.

#### What Are Subagents?
- **Specialized AI assistants:** Independent context windows optimized for specific tasks
- **Custom system prompts:** Each subagent has tailored instructions for its domain
- **Tool restrictions:** Subagents can have limited tool access for security and focus
- **Automatic or explicit invocation:** Claude can delegate automatically or you can invoke directly

#### Real Subagent Examples
- **Code Reviewer:** Analyzes code quality, security vulnerabilities, and best practices
- **Debugger:** Investigates technical issues and suggests resolution strategies
- **Data Scientist:** Performs SQL queries and data analysis tasks
- **[Custom agents you create]:** Tailored to your team's specific needs and workflows

#### Technical Implementation
- **Agent definitions:** Markdown files with YAML frontmatter in `.claude/agents/` (project) or `~/.claude/agents/` (user)
- **Configuration fields:** `name`, `description`, `tools`, `model` selection
- **Context isolation:** Each subagent operates in its own context window
- **Flexible invocation:** Automatic delegation or explicit command-based activation

### 3. (10 min) Creating Custom Subagents
How to create specialized subagents tailored to your development team's specific needs and workflows.

#### Subagent Configuration Structure
**File Format:** Markdown files with YAML frontmatter
**Storage Locations:**
- Project-level: `.claude/agents/` (highest priority)
- User-level: `~/.claude/agents/`

**Configuration Fields:**
```yaml
---
name: "code-reviewer"
description: "Analyzes code quality, security vulnerabilities, and best practices"
tools: ["Read", "Grep", "Glob", "git"]
model: "sonnet" # Options: sonnet, opus, haiku, inherit
---

You are an expert code reviewer specializing in security vulnerabilities and best practices.
Focus on identifying potential issues in code quality, performance, and maintainability.

When reviewing code:
1. Analyze for security vulnerabilities
2. Check for performance bottlenecks
3. Suggest improvements for readability
4. Verify adherence to coding standards
```

#### Practical Subagent Examples

**Code Reviewer Subagent:**
```yaml
---
name: "security-reviewer"
description: "Specialized security analysis and vulnerability detection"
tools: ["Read", "Grep", "Bash"]
model: "sonnet"
---

You are a security-focused code reviewer. Analyze code for:
- SQL injection vulnerabilities
- XSS attack vectors
- Authentication/authorization flaws
- Insecure data handling
- Dependency vulnerabilities
```

**Database Expert Subagent:**
```yaml
---
name: "database-expert"
description: "Database schema analysis and query optimization specialist"
tools: ["Read", "Grep", "psql", "mysql"]
model: "sonnet"
---

You are a database specialist. Focus on:
- Schema design and optimization
- Query performance analysis
- Migration strategy recommendations
- Index optimization suggestions
- Data integrity validation
```

**API Documentation Subagent:**
```yaml
---
name: "api-documenter"
description: "Generates comprehensive API documentation from code"
tools: ["Read", "Write", "Glob"]
model: "sonnet"
---

You are an API documentation specialist. Create comprehensive documentation including:
- Endpoint descriptions and parameters
- Request/response examples
- Authentication requirements
- Error handling documentation
- OpenAPI/Swagger specifications
```

### 4. (12 min) Custom Slash Command System
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

### 5. (10 min) Hooks: Automated Workflow Integration
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

### 6. (7 min) Workflow Integration Strategies
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

### 7. (3 min) Performance and Best Practices
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

### 8. (2 min) Wrap-up & Advanced Topics Preview
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
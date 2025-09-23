# Dev Session 1b: Custom Slash Commands

**Length:** 15-20 minutes (focused deep-dive)
**Goal:** Developers will master custom slash commands to streamline their development workflows and integrate Claude Code with existing tools.
**Core Concepts:** Command Creation, Workflow Automation, Tool Integration, Advanced Features

## Session Outline

### 1. (3 min) Introduction: Understanding Slash Command Types

**Built-in Commands:** System-provided commands like `/clear`, `/config`, `/status`, `/review`

**Custom Commands:** User-defined commands stored in `.claude/commands/` (project) or `~/.claude/commands/` (personal)

**MCP Commands:** Server-provided commands with format `/mcp__<server>__<prompt>`

#### Why Custom Commands Matter

Custom slash commands transform repetitive development tasks into single-word shortcuts:
- **Before:** "Please review this code for security vulnerabilities, performance issues, and adherence to our team standards documented in docs/coding-standards.md"
- **After:** `/review-security`

This isn't just about saving typing - it's about:
- **Consistency:** Same analysis criteria every time
- **Speed:** Instant access to complex workflows
- **Integration:** Seamless connection with existing tools
- **Knowledge Capture:** Embedding team expertise into reusable commands

### 2. (5 min) Command Creation & Structure

#### File Structure & Storage

**Command Storage:**
- **Project-level:** `.claude/commands/` - Team shared
- **Personal:** `~/.claude/commands/` - User specific
- **Project/User level:** `.claude/commands/*.local.md` - Personal & Project specific (requires .gitignore entry)
- **Namespacing:** `commands/dev/*.md` - Grouped for organization, called using namespace prefix (i.e., `/dev:migrate`)

#### Basic Command Structure

Commands are Markdown files with YAML frontmatter:

```yaml
---
description: "Brief description of what this command does"
allowed-tools: Tool1, Tool2, Tool3  # Optional: restrict tool access
---

Command prompt content goes here.
Variables: $ARGUMENTS, $1, $2, etc.
File references: @filename
```

### 3. (8 min) Practical Command Examples

#### Code Review Command

```yaml
---
description: "Perform comprehensive code review with security focus"
allowed-tools: Read, Grep, Glob
---

Please review the following code for:
1. Security vulnerabilities (SQL injection, XSS, authentication issues)
2. Performance bottlenecks and optimization opportunities
3. Code quality and maintainability issues
4. Adherence to team coding standards, defined in @docs/coding-standards.md

Focus on actionable feedback and specific recommendations.

$ARGUMENTS
```

**Usage:** `/review app/Http/Controllers/OrderController.php`

#### API Documentation Command

```yaml
---
allowed-tools: Bash(php artisan:*), Write, Read, Glob
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

**Usage:** `/api-docs --format=yaml`

#### Database Schema Documentation

```yaml
---
allowed-tools: Bash(php artisan:*), Write, Read
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

**Usage:** `/schema "user authentication tables"`

#### Test Runner with Coverage

```yaml
---
allowed-tools: Bash(vendor/bin/phpunit:*, npm test:*), Write, Read
description: "Run tests and generate coverage report"
---

!vendor/bin/phpunit --coverage-html coverage
!echo "Test coverage report generated in coverage/ directory"

Please analyze the test results and provide recommendations for:
- Areas needing additional test coverage
- Test quality and effectiveness
- Performance bottlenecks in test suite

$ARGUMENTS
```

**Usage:** `/test-coverage --filter=AuthTest`

### 4. (4 min) Advanced Command Features

#### Argument Handling

**Variable Types:**
- `$ARGUMENTS`: All arguments passed to command
- `$1`, `$2`, etc.: Individual positional arguments
- Use quotes to enclose multi-word arguments: `/command "complex argument"`

**File References:**
- `@filename` syntax automatically includes file content
- Example: `@app/Models/User.php` includes the User model in the prompt

#### Bash Integration

Commands can execute shell commands using the `!` prefix:

```yaml
---
description: "Deploy application with pre-deployment checks"
allowed-tools: Bash(git:*, docker:*, php artisan:*), Read
---

!git status
!git diff --name-only HEAD~1

Pre-deployment checklist:
1. Verify all changes are committed
2. Run test suite
3. Check environment configuration
4. Validate database migrations

!php artisan config:cache
!php artisan migrate --dry-run

Proceed with deployment if all checks pass.
```

#### Command Namespacing

Directory structure creates command namespaces:
- `.claude/commands/laravel/migrate.md` becomes `/laravel:migrate`
- `.claude/commands/frontend/build.md` becomes `/frontend:build`

This allows for organized, conflict-free command libraries:

```
.claude/commands/
├── laravel/
│   ├── migrate.md      # /laravel:migrate
│   ├── tinker.md       # /laravel:tinker
│   └── deploy.md       # /laravel:deploy
├── frontend/
│   ├── build.md        # /frontend:build
│   ├── test.md         # /frontend:test
│   └── lint.md         # /frontend:lint
└── database/
    ├── backup.md       # /database:backup
    └── optimize.md     # /database:optimize
```

### 5. (2 min) Integration Patterns

#### Subagent Integration

Commands can explicitly invoke subagents for specialized analysis:

```yaml
---
description: "Security-focused code review using specialized subagent"
---

Use the security-reviewer subagent to analyze the following code with focus on:
- Authentication and authorization vulnerabilities
- Input validation and sanitization
- Database security patterns

$ARGUMENTS
```

#### Tool Chain Integration

Commands can orchestrate complex workflows:

```yaml
---
description: "Complete feature development workflow"
allowed-tools: Bash(git:*, php artisan:*, npm:*), Write, Edit, Read
---

!git checkout -b feature/$1
!php artisan make:controller $1Controller
!php artisan make:model $1
!php artisan make:migration create_$1_table

Created feature branch and Laravel scaffolding for: $1

Next steps:
1. Implement controller logic
2. Define model relationships
3. Create migration schema
4. Write feature tests

Generate boilerplate code for: $ARGUMENTS
```

## Hands-On Exercise (Live Demo)

### Creating a Laravel Development Command

Let's create a comprehensive Laravel feature development command:

```yaml
---
description: "Scaffold complete Laravel feature with tests"
allowed-tools: Bash(php artisan:*, composer:*), Write, Read, Edit
---

!php artisan make:controller $1Controller --resource
!php artisan make:model $1 --migration --factory --seed
!php artisan make:test $1Test --unit
!php artisan make:request Store$1Request
!php artisan make:request Update$1Request

Created Laravel scaffolding for: $1

Now generating:
1. RESTful controller with proper validation
2. Eloquent model with relationships
3. Database migration with indexes
4. Factory and seeder for testing
5. Form request classes for validation

Additional requirements: $ARGUMENTS
```

**Usage:** `/laravel:feature Product "with category relationship and image uploads"`

## Best Practices & Common Patterns

#### Security Considerations

**Tool Restrictions:** Always limit tools to what's actually needed
```yaml
# Good - limited tools
allowed-tools: Read, Grep, Glob

# Avoid - unnecessary access
# No tool restrictions = full access including Bash
```

**Input Validation:** Be cautious with user arguments in Bash commands
```yaml
# Avoid direct argument injection into shell commands
!rm -rf $1  # Dangerous!

# Better - validate and sanitize
Validate that $1 is a safe filename before proceeding with file operations.
```

#### Performance Optimization

**Focused Commands:** Each command should have a single, clear purpose
**Efficient Tool Usage:** Use Grep instead of Read for pattern searching
**Context Management:** Keep command prompts concise but specific

#### Team Adoption

**Documentation:** Include clear usage examples in command descriptions
**Naming Conventions:** Use consistent, descriptive command names
**Gradual Introduction:** Start with high-value, frequently used workflows

## Troubleshooting Common Issues

**Command Not Found:**
- Verify file is in correct directory (`.claude/commands/`)
- Check YAML frontmatter formatting
- Ensure unique command names (no conflicts)

**Tool Access Denied:**
- Review `allowed-tools` configuration
- Check if tools are spelled correctly
- Verify tool permissions in project settings

**Argument Issues:**
- Use quotes for multi-word arguments: `/command "long argument"`
- Check variable usage: `$1`, `$2` vs `$ARGUMENTS`
- Verify file reference syntax: `@path/to/file`

## Key Takeaways

- **Custom commands transform repetitive tasks** into single-word shortcuts
- **Tool restrictions enhance security** by limiting command capabilities
- **Namespacing prevents conflicts** and organizes commands logically
- **Bash integration enables complex workflows** with existing development tools
- **Argument handling provides flexibility** for various use cases
- **Team sharing through project-level commands** standardizes workflows

## Next Session Preview

In Dev Session 1c, we'll explore **Hooks** - automated workflow integration that responds to Claude Code events, enabling powerful automation patterns that work seamlessly with your existing development tools.
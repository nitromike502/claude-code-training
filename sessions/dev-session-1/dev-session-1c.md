# Dev Session 1c: Hooks & Automation

**Length:** 15-20 minutes (focused deep-dive)
**Goal:** Developers will master hooks for automated workflow integration, creating seamless automation that responds to Claude Code events and integrates with existing development tools.
**Core Concepts:** Hook Events, Automated Workflows, Security Patterns, Integration Strategies

## Session Outline

### 1. (3 min) Introduction: What Are Hooks?

**Definition:** User-defined shell commands that execute at specific points in Claude Code's workflow

**Purpose:** Provide deterministic control over Claude Code behavior and integrate with existing tools

#### Why Hooks Matter

Hooks transform Claude Code from a reactive tool into a proactive automation system:
- **Automatic code formatting** after every file edit
- **Test execution** when test files are modified
- **Documentation updates** when APIs change
- **Notification systems** for session completion
- **Git workflow automation** with commit hooks
- **Security scanning** on code changes

**Security Note:** Hooks run automatically with your credentials - review carefully before implementation

### 2. (5 min) Hook Event Types & Architecture

#### Core Events

**PreToolUse:** Runs before any tool execution
```json
{
  "PreToolUse": {
    "Edit": {
      "command": "git stash push -m 'Auto-stash before edits'",
      "description": "Safely backup changes before modifications"
    }
  }
}
```

**PostToolUse:** Runs after tool completion
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

**UserPromptSubmit:** Executes when user submits a prompt
```json
{
  "UserPromptSubmit": {
    "*": {
      "command": "echo \"$(date): $USER_PROMPT\" >> .claude/activity.log",
      "description": "Log all user interactions"
    }
  }
}
```

**SessionStart/SessionEnd:** Triggered at session boundaries
```json
{
  "SessionStart": {
    "*": {
      "command": "git fetch origin && git status",
      "description": "Update repository status at session start"
    }
  }
}
```

**SubagentStop:** Runs when a subagent completes its task
```json
{
  "SubagentStop": {
    "*": {
      "command": "echo \"Subagent completed: $SUBAGENT_NAME\" >> .claude/subagent.log",
      "description": "Track subagent usage patterns"
    }
  }
}
```

#### Hook Execution Context

**Command Execution:** Hooks receive JSON input via stdin and can return structured output
**Timeout:** Default 60-second timeout per hook execution
**Error Handling:** Exit code 2 blocks the triggering action
**Environment Variables:** Full access to user environment and Claude Code context variables

### 3. (8 min) Practical Hook Examples

#### Development Workflow Hooks

**Automatic Code Formatting Hook:**
```json
{
  "PostToolUse": {
    "Edit": {
      "command": "prettier --write $EDITED_FILE && eslint --fix $EDITED_FILE",
      "description": "Auto-format and lint after edits"
    },
    "Write": {
      "command": "if [[ $FILENAME == *.php ]]; then vendor/bin/php-cs-fixer fix $FILENAME; fi",
      "description": "Format PHP files with CS Fixer"
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
    },
    "Edit": {
      "command": "if [[ $EDITED_FILE == *Test.php ]]; then vendor/bin/phpunit --filter=$(basename $EDITED_FILE .php); fi",
      "description": "Run specific test class after editing"
    }
  }
}
```

#### Git Workflow Hooks

**Git Commit Logging Hook:**
```json
{
  "PostToolUse": {
    "Bash(git*": {
      "command": "echo \"$(date): Git command executed - $TOOL_ARGS\" >> .claude/git.log",
      "description": "Log all git commands for audit trail"
    }
  }
}
```

**Pre-commit Safety Hook:**
```json
{
  "PreToolUse": {
    "Bash(git commit*)": {
      "command": "git diff --cached --name-only | xargs grep -l 'TODO\\|FIXME\\|console\\.log' && echo 'Warning: Code contains development artifacts' || true",
      "description": "Check for development artifacts before commit"
    }
  }
}
```

#### Notification & Monitoring Hooks

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

**Slack Integration Hook:**
```json
{
  "PostToolUse": {
    "Bash(git push*)": {
      "command": "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Code pushed to repository by Claude Code\"}' $SLACK_WEBHOOK_URL",
      "description": "Notify team of code deployments"
    }
  }
}
```

#### Security & Compliance Hooks

**Security Scanning Hook:**
```json
{
  "PostToolUse": {
    "Write": {
      "command": "if [[ $FILENAME == *.php ]]; then vendor/bin/psalm --show-info=false $FILENAME; fi",
      "description": "Run static analysis on new PHP files"
    }
  }
}
```

**Credential Detection Hook:**
```json
{
  "PreToolUse": {
    "Write": {
      "command": "if grep -q 'password\\|secret\\|key' <<< \"$FILE_CONTENT\"; then echo 'Warning: Potential credentials detected' && exit 2; fi",
      "description": "Block commits containing potential credentials"
    }
  }
}
```

### 4. (3 min) Advanced Hook Patterns

#### Conditional Execution

```bash
#!/bin/bash
# Hook script: .claude/hooks/conditional-linter.sh

# Only run in specific directories
if [[ $(pwd) == *"/src/"* ]]; then
    eslint --fix $FILENAME
    echo "Linted file in src directory: $FILENAME"
else
    echo "Skipped linting - not in src directory"
fi
```

#### Multi-Step Workflows

```json
{
  "PreToolUse": {
    "Bash(git push*)": {
      "command": "git stash push -m 'Auto-stash before push' && npm run build && npm run test",
      "description": "Stash changes, build, and test before push"
    }
  },
  "PostToolUse": {
    "Bash(git push*)": {
      "command": "git stash pop && echo 'Push completed, changes restored'",
      "description": "Restore stashed changes after successful push"
    }
  }
}
```

#### Context-Aware Hooks

```bash
#!/bin/bash
# Hook script that reads Claude Code context

# Read JSON input from Claude Code
CONTEXT=$(cat)
TOOL_NAME=$(echo "$CONTEXT" | jq -r '.tool_name')
FILE_PATH=$(echo "$CONTEXT" | jq -r '.file_path')
PROJECT_TYPE=$(echo "$CONTEXT" | jq -r '.project_type')

case $PROJECT_TYPE in
    "laravel")
        if [[ $TOOL_NAME == "Edit" && $FILE_PATH == *"Controller.php" ]]; then
            php artisan route:cache
            echo "Laravel routes cached after controller edit"
        fi
        ;;
    "nodejs")
        if [[ $TOOL_NAME == "Write" && $FILE_PATH == "package.json" ]]; then
            npm install
            echo "Dependencies updated after package.json change"
        fi
        ;;
esac
```

### 5. (2 min) Security Best Practices

#### Input Validation
Always sanitize and validate hook inputs:

```bash
#!/bin/bash
# Validate file paths to prevent directory traversal
if [[ "$FILENAME" == *".."* ]]; then
    echo "Invalid file path detected"
    exit 2
fi

# Sanitize user input
SAFE_FILENAME=$(basename "$FILENAME")
```

#### Permission Limiting
Run hooks with minimal required permissions:

```json
{
  "PostToolUse": {
    "Write": {
      "command": "runuser -u limited-user -- /path/to/safe-script.sh $FILENAME",
      "description": "Run hook with limited user permissions"
    }
  }
}
```

#### Credential Protection
Never log or expose sensitive credentials in hooks:

```bash
#!/bin/bash
# Good - Use environment variables
curl -H "Authorization: Bearer $API_TOKEN" ...

# Bad - Don't hardcode credentials
# curl -H "Authorization: Bearer abc123" ...

# Good - Mask sensitive output
echo "API call completed" # Don't echo full response
```

## Hands-On Exercise (Live Demo)

### Creating a Complete Development Workflow Hook

Let's create a comprehensive hook system for a Laravel project:

```json
{
  "PreToolUse": {
    "Bash(git commit*)": {
      "command": ".claude/hooks/pre-commit-check.sh",
      "description": "Run pre-commit quality checks"
    }
  },
  "PostToolUse": {
    "Edit": {
      "command": ".claude/hooks/post-edit-format.sh $EDITED_FILE",
      "description": "Format and validate edited files"
    },
    "Write": {
      "command": ".claude/hooks/post-write-test.sh $FILENAME",
      "description": "Run tests for new files"
    }
  },
  "SessionEnd": {
    "*": {
      "command": ".claude/hooks/session-summary.sh",
      "description": "Generate session summary report"
    }
  }
}
```

**Pre-commit Check Script (`.claude/hooks/pre-commit-check.sh`):**
```bash
#!/bin/bash
echo "Running pre-commit checks..."

# Check for merge conflicts
if git diff --cached --name-only | xargs grep -l '<<<<<<<'; then
    echo "Error: Merge conflict markers found"
    exit 2
fi

# Run tests
if ! vendor/bin/phpunit --stop-on-failure; then
    echo "Error: Tests failing"
    exit 2
fi

# Check code style
if ! vendor/bin/php-cs-fixer fix --dry-run --diff; then
    echo "Error: Code style issues found"
    exit 2
fi

echo "Pre-commit checks passed"
```

## Troubleshooting Common Issues

**Hook Not Executing:**
- Check file permissions (`chmod +x hook-script.sh`)
- Verify hook configuration syntax
- Check Claude Code logs for error messages

**Hook Blocking Operations:**
- Review exit codes (exit 2 blocks action)
- Test hooks independently
- Add debugging output

**Performance Issues:**
- Monitor hook execution time
- Optimize slow operations
- Consider background execution for non-critical hooks

## Key Takeaways

- **Hooks enable proactive automation** that responds to Claude Code events
- **Security is paramount** - hooks run with your credentials and permissions
- **Conditional execution** makes hooks context-aware and efficient
- **Multi-step workflows** orchestrate complex development processes
- **Integration opportunities** with existing development tools are extensive
- **Error handling** ensures hooks don't break development workflows

## Next Session Preview

In Dev Session 1d, we'll bring everything together with **Parallel Workflow Integration** - combining subagents, slash commands, and hooks into powerful, automated development workflows that maximize team productivity.
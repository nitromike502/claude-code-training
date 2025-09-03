# Session 4: The Next Level: What are MCP Servers?

**Length:** 15 minutes  
**Goal:** Attendees will understand what an MCP (Model Context Protocol) Server is and the benefits it provides, such as shared knowledge and more powerful analysis.  
**Core Concepts:** MCP Servers, Centralized Analysis  

## Agenda

### 1. (3 min) Intro & Analogy

#### Current State: Personal Calculator
"So far, we've been using Claude Code on our own machines. It's like having a personal calculator."

Each person runs `claude-code init` on their laptop:
- ✅ Works great for individual analysis  
- ❌ Each person has their own separate "knowledge" of the project
- ❌ When code changes, everyone needs to re-index separately
- ❌ Limited by your laptop's processing power

#### The Vision: Shared Supercomputer  
"An MCP Server is like the entire company having access to a shared, central supercomputer. It does the same things, but is more powerful and connected."

### 2. (8 min) The Three Big Benefits of an MCP Server

#### Benefit 1: Shared Knowledge & Consistency
**The Problem:** Different answers from different machines
- Developer asks: "How does user authentication work?"
- PM asks similar question next day: "What's our login process?"  
- Both get slightly different answers based on their local indexing

**The Solution:** Single source of truth
- MCP server analyzes the Laravel Vue.js e-commerce project once
- Everyone gets the same, consistent answers  
- When developer adds new authentication features, everyone immediately sees the updates

**Real Example:**
```bash
# Developer (Monday): 
@claude explain our authentication system
# Gets: "Uses Laravel Sanctum with Vue.js frontend"

# PM (Tuesday):
@claude what's our user login process  
# Gets: Same information, consistent with developer's answer
```

#### Benefit 2: More Power & Deeper Analysis
**Individual laptops:** Limited to basic code analysis
- Can explain individual files
- Basic search and documentation
- Simple relationships between files

**MCP Server capabilities:**
- **Cross-project analysis:** "How does our e-commerce cart compare to our mobile app's cart?"
- **Historical tracking:** "What authentication changes were made this quarter?"  
- **Performance insights:** "Which API endpoints are called most frequently?"
- **Security analysis:** "Are there any potential vulnerabilities in our payment flow?"
- **Architecture visualization:** "Show me the complete data flow from product selection to order completion"

#### Benefit 3: "Always On" & Automatic Updates
**Current workflow:** Manual re-indexing
```bash
# Code changes happen...
# Each person needs to remember:
claude-code refresh
```

**MCP Server workflow:** Automatic synchronization  
- Connects to your GitHub/GitLab repository
- Automatically re-analyzes when code is pushed
- Everyone gets updated knowledge without doing anything
- Always reflects the latest `main` branch

**Real-world impact for Laravel Vue.js projects:**
- New Vue component added → Everyone can immediately ask about it
- Database migration runs → Everyone sees updated schema  
- API endpoint changes → Documentation automatically updates

### 3. (4 min) How You Use It (Spoiler: Almost No Change!)

#### The Setup (One-time, IT handles this)
Instead of each person running their own Claude Code, IT sets up:
```bash
# IT runs this once on company server:
claude-code-server init --project=our-ecommerce-app --auto-sync=github
```

#### Your Experience (Barely Changes)
```bash
# Instead of connecting to local analysis:
claude-code @explain ProductController.php

# You connect to company MCP server:
claude-code --server=company.mcp-server.com @explain ProductController.php
```

Or even simpler with configuration:
```bash
# Set once in your config:
claude-code config set server company.mcp-server.com

# Then use exactly the same commands:
claude-code @explain ProductController.php
claude-code @docu ShoppingCart.vue  
claude-code @find "payment processing"
```

#### What Gets Better
- **Faster responses:** Server has more processing power
- **More accurate answers:** Bigger context window, deeper analysis
- **Always current:** No need to remember to refresh
- **Collaborative insights:** Benefits from team's questions and usage

## Advanced MCP Features for Teams

### Multi-Project Analysis  
```bash
# Compare implementations across projects
@claude compare authentication between ecommerce-app and mobile-api

# Find common patterns  
@claude what payment processing patterns do we use across all projects?
```

### Team Analytics
```bash
# Popular questions and knowledge gaps
@claude what are the most asked questions about our codebase?

# Documentation needs analysis
@claude what parts of our system need better documentation?
```

### Integration Capabilities
- **Slack integration:** Ask Claude questions directly in team channels
- **Jira integration:** Auto-generate technical context for tickets  
- **Confluence integration:** Keep documentation automatically updated

## Managing MCP Servers with settings.json

### Configuration File Overview
Claude Code uses a `settings.json` file to manage which MCP servers are available and enabled. This gives you fine-grained control over your development environment.

#### Location of settings.json
```bash
# Find your Claude Code settings:
~/.config/claude-code/settings.json
# or on some systems:
~/.claude-code/settings.json
```

### Enabling and Disabling MCP Servers

#### Basic Server Configuration
```json
{
  "mcpServers": {
    "company-main": {
      "enabled": true,
      "url": "company.mcp-server.com",
      "description": "Main company MCP server"
    },
    "development-server": {
      "enabled": false,
      "url": "dev.mcp-server.com", 
      "description": "Development/testing MCP server"
    },
    "legacy-projects": {
      "enabled": false,
      "url": "legacy.mcp-server.com",
      "description": "Legacy project analysis"
    }
  }
}
```

#### Quick Enable/Disable Commands
```bash
# Enable a specific server
claude-code config enable-server company-main

# Disable a specific server  
claude-code config disable-server development-server

# List all configured servers and their status
claude-code config list-servers

# Switch primary server
claude-code config set-primary-server company-main
```

### Real-World Scenarios

#### Scenario 1: Development vs Production
```json
{
  "mcpServers": {
    "production": {
      "enabled": true,
      "url": "prod.mcp-server.com"
    },
    "staging": {
      "enabled": false,
      "url": "staging.mcp-server.com"
    }
  },
  "activeEnvironment": "production"
}
```

#### Scenario 2: Project-Specific Servers
```json
{
  "mcpServers": {
    "ecommerce-team": {
      "enabled": true,
      "projects": ["laravel-vue-ecommerce", "mobile-app"],
      "url": "ecommerce.mcp-server.com"
    },
    "infrastructure-team": {
      "enabled": false,
      "projects": ["devops-tools", "monitoring"],
      "url": "infra.mcp-server.com"
    }
  }
}
```

### Team Coordination Benefits

#### Consistent Team Environment
**The Problem:** Team members using different MCP servers
- Developer uses production server: Gets current production code analysis
- QA uses staging server: Gets outdated analysis
- Results in miscommunication and inconsistent information

**The Solution:** Standardized settings.json
```bash
# Team lead shares standard configuration
curl -o ~/.config/claude-code/settings.json \
  https://company-internal/claude-code/team-settings.json

# Or use version control
git clone company-configs/claude-code-settings
cp claude-code-settings/settings.json ~/.config/claude-code/
```

#### Environment-Specific Analysis  
```json
{
  "environments": {
    "development": {
      "mcpServer": "dev-server",
      "autoSync": true
    },
    "production": {
      "mcpServer": "prod-server", 
      "readOnly": true
    }
  }
}
```

### Troubleshooting Configuration Issues

#### Check Server Status
```bash
# Verify which servers are active
claude-code @status

# Test server connection
claude-code test-server company-main

# Reset to default configuration  
claude-code config reset
```

#### Common Configuration Problems
**Problem:** "No MCP server available"
```json
// Solution: Ensure at least one server is enabled
{
  "mcpServers": {
    "default": {
      "enabled": true,  // Make sure this is true
      "url": "your-server-url"
    }
  }
}
```

**Problem:** "Server connection failed"
```json
// Solution: Add fallback configuration
{
  "mcpServers": {
    "primary": {
      "enabled": true,
      "url": "primary-server.com"
    }
  },
  "fallback": {
    "enabled": true,
    "mode": "local"  // Falls back to local analysis
  }
}
```

## Implementation Considerations

### Security & Privacy
**Important company policy question:** "Is our code being sent to the cloud?"

**Typical enterprise answer:** 
- MCP server runs on company's private infrastructure (AWS VPC, on-premises)
- Code never leaves company network
- Same security as your existing development tools
- Complies with company data governance policies

### Rollout Strategy
1. **Phase 1:** IT sets up MCP server for one project (e.g., main e-commerce app)
2. **Phase 2:** Team pilots MCP server alongside individual installations  
3. **Phase 3:** Full migration once benefits are proven
4. **Phase 4:** Add additional projects and advanced integrations

## Q&A Preparation

**"Is our code being sent to the cloud?"**  
Answer: This depends on your company's setup. Most enterprises run MCP servers on their own private infrastructure - your code stays within company walls, just like your existing development tools.

**"Do I have to use it?"**  
Answer: It's highly recommended because it ensures everyone is working from the same 'source of truth' and you get better answers. But individual Claude Code installations can coexist during transition.

**"Will I need to learn new commands?"**  
Answer: Nope! All the same `@explain`, `@docu`, and `@find` commands work exactly the same. You might just add a server configuration.

**"What happens if the server goes down?"**  
Answer: Most setups include fallback to individual installations, so you're never completely blocked. Plus, IT teams typically ensure high availability for critical development tools.

**"Can it work with our CI/CD pipeline?"**  
Answer: Yes! MCP servers can integrate with GitHub Actions, Jenkins, or other automation to update analysis automatically when code is deployed.

## Key Takeaways

### For Non-Technical Staff
- MCP servers provide the same Claude Code experience, but better
- Everyone gets consistent, up-to-date information about projects
- No new commands to learn - same `@explain`, `@docu`, `@find`
- Enables powerful team collaboration and knowledge sharing

### For Decision Makers  
- Single source of truth for project knowledge across teams
- Reduced "knowledge silos" between developers and other roles
- Automatic synchronization reduces manual maintenance
- Enterprise-grade security and integration capabilities

### The Bottom Line
MCP servers transform Claude Code from a personal productivity tool into a team collaboration platform, while keeping the same simple interface everyone just learned.

## Next Steps
- **Individual practice:** Continue using Claude Code on your projects  
- **Team discussion:** Identify which projects would benefit most from shared analysis
- **IT consultation:** Discuss MCP server setup timeline and requirements
- **Pilot planning:** Consider starting with one high-impact project
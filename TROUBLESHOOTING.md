# Claude Code Training - Troubleshooting Guide

Quick reference for common issues when working with the training materials and example projects.

## Laravel Vue.js E-commerce Project Issues

### DDEV Environment

#### Project Won't Start
```bash
# Check DDEV status
ddev describe

# Full restart
ddev restart

# If that fails, recreate
ddev delete -Oy && ddev start
```

#### Development Servers Issues
```bash
# Check if servers are running
ddev exec "ps aux | grep -E 'vite|npm'"

# Stop and restart dev servers
ddev stop-dev
ddev start-dev

# View server logs
ddev exec "tail -f /tmp/laravel-vite.log"
ddev exec "tail -f /tmp/vue-admin-vite.log"
```

#### Database Connection Problems
Check `.env` file has correct DDEV database settings:
```env
DB_CONNECTION=mysql
DB_HOST=db
DB_DATABASE=db  
DB_USERNAME=db
DB_PASSWORD=db
```

Reset database:
```bash
ddev exec "php artisan migrate:fresh --seed"
```

### Access Issues

#### Admin Panel Login
- **URL**: `http://laravel-vue-ecommerce.ddev.site:3000`
- **Credentials**: `admin@example.com` / `admin123`

If login doesn't work:
```bash
# Recreate admin user
ddev exec "php artisan db:seed --class=AdminUserSeeder"
```

#### Port Conflicts
If ports 3000/3001 are in use:
```bash
# Kill conflicting processes
ddev exec "pkill -f vite"
ddev restart
ddev start-dev
```

### Performance Issues

#### Slow Hot Reloading
Vite configuration uses polling for file watching in containers. This is expected but can be resource-intensive.

To reduce resource usage:
```bash
ddev stop-dev  # When not actively developing
```

#### Container Memory Usage
```bash
# Check container resources
docker stats

# Restart DDEV if containers are using too much memory
ddev restart
```

## Training Session Specific Issues

### Session 1 - Introduction
**Common Issue**: Example project seems too complex for introduction
**Solution**: Start with frontend-only demonstration, show admin login screen

### Session 2 - Project Setup  
**Common Issue**: DDEV setup takes too long during session
**Solution**: Pre-setup DDEV environment, focus on `ddev start-dev` command

### Session 3 - Documentation
**Common Issue**: Generated documentation is too technical
**Solution**: Use business-focused prompts:
- "Document the product management workflow"
- "Explain the checkout process for business users"

### Session 4 - MCP Servers
**Common Issue**: MCP setup complexity
**Solution**: Use pre-configured examples, focus on results rather than setup

### Session 5 - Sub-agents
**Common Issue**: Too many files to navigate
**Solution**: Focus on specific areas:
- `app/Http/Controllers/ProductController.php` - Backend logic
- `backend/src/views/Products/` - Frontend components
- `database/migrations/` - Database structure

## General Claude Code Issues

### Connection Problems
```bash
# Check Claude Code status
claude-code --version

# Re-authenticate if needed
claude-code auth login
```

### Context Window Issues
**Problem**: "Context window full" errors during long sessions
**Solution**: 
- Use sub-agents (@explain, @docu, @find) to reduce context usage
- Break large tasks into smaller parts
- Start new sessions for unrelated tasks

### Performance Issues
**Problem**: Slow responses or timeouts
**Solution**:
- Reduce file search scope with specific paths
- Use @find agent instead of reading multiple files
- Limit output with specific requirements

## Environment Setup

### Prerequisites Check
```bash
# Required tools
docker --version          # Docker for DDEV
ddev --version            # DDEV development environment  
claude-code --version     # Claude Code CLI

# Optional but helpful
git --version             # Version control
node --version            # Node.js for frontend development
```

### Initial Setup Problems
```bash
# If DDEV installation fails
curl -fsSL https://ddev.com/install.sh | bash

# If Docker isn't running
sudo systemctl start docker    # Linux
open -a Docker                 # macOS
```

## Getting Help

### Documentation
- Main setup guide: `examples/laravel-vue-ecommerce/SETUP.md`
- Alternative projects: `example-projects.md`
- Session guides: `sessions/session-*.md`

### Debugging Commands
```bash
# DDEV debugging
ddev logs
ddev describe
ddev exec "php artisan tinker"

# Laravel debugging  
ddev exec "php artisan route:list"
ddev exec "php artisan config:cache --env"

# Vue.js debugging
ddev exec "cd backend && npm run build"
```

### Reset Everything
```bash
# Complete reset (nuclear option)
cd examples/laravel-vue-ecommerce
ddev delete -Oy
git checkout -- .
ddev start
ddev start-dev
```

## Quick Reference

### Essential URLs
- Frontend: `http://laravel-vue-ecommerce.ddev.site`
- Admin: `http://laravel-vue-ecommerce.ddev.site:3000`  
- Database: Available through DDEV (see `ddev describe`)

### Essential Commands
- `ddev start` - Start all services
- `ddev start-dev` - Start development servers
- `ddev stop-dev` - Stop development servers
- `ddev restart` - Full restart
- `ddev exec "COMMAND"` - Run command in container

### Default Credentials
- **Admin**: `admin@example.com` / `admin123`
- **Database**: `db` / `db` / `db` (user/pass/database)